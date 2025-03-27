package com.civ_online_server;

import java.io.IOException;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.civ_online_server.game_state.GameService;
import com.civ_online_server.persistance.GameTurnService;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GameWebSocket extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final ConnectionService connectionService;
    private final GameService gameService;
    private final GameTurnService gameTurnService;

    GameWebSocket(ConnectionService connectionService, GameService gameService, GameTurnService gameTurnService) {
        this.connectionService = connectionService;
        this.gameService = gameService;
        this.gameTurnService = gameTurnService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        System.out.println("New connection established: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        System.out.println("Connection closed: " + session.getId() + " with status " + status);
        WebSocketSession secondGameSession = this.connectionService.removeGame(session);
        try {
            if (secondGameSession != null) {
                secondGameSession.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        System.out.println("Error in session " + session.getId() + ": " + exception.getMessage());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();

        IncomingGameMessage incomingGameMessage = objectMapper.readValue(payload, IncomingGameMessage.class);
        
        switch (incomingGameMessage.type()) {
            case ADD_PLAYER:
                ReturnMessageType type = connectionService.handleGameId(incomingGameMessage.gameId(), session);
                if (type == ReturnMessageType.WAITING) {
                    ReturningGameMessage returnMessage = new ReturningGameMessage(
                        ReturnMessageType.WAITING,
                        incomingGameMessage.gameId(),
                        session.getId()
                    );
                    session.sendMessage(new TextMessage(returnMessage.toString()));
                }
                if (type == ReturnMessageType.START_GAME) {
                    var game = connectionService.games.get(incomingGameMessage.gameId());
                    ReturningGameMessage returnMessage = new ReturningGameMessage(
                        ReturnMessageType.START_GAME,
                        incomingGameMessage.gameId(),
                        game[0].getId() + ";" + game[1].getId()
                    );
                    this.gameService.startGame(incomingGameMessage.gameId(), game[0].getId(), game[1].getId());
                    this.connectionService.broadcastMessage(incomingGameMessage.gameId(), returnMessage.toString());
                    this.gameTurnService.createGameTurn(game[0].getId() + ";" + game[1].getId());
                }
                if (type == ReturnMessageType.GAME_FULL) {
                    ReturningGameMessage full = new ReturningGameMessage(
                        ReturnMessageType.GAME_FULL,
                        incomingGameMessage.gameId(),
                        session.getId()
                    );
                    session.sendMessage(new TextMessage(full.toString()));
                }
                break;
            case EVENT:
                this.gameService.handleEvent(incomingGameMessage);
                ReturningGameMessage gameEventMessage = new ReturningGameMessage(
                    ReturnMessageType.EVENT,
                    incomingGameMessage.gameId(),
                    this.gameService.gameStateToJSON(incomingGameMessage.gameId())
                );
                this.connectionService.broadcastMessage(incomingGameMessage.gameId(), gameEventMessage.toString());
                break;
            default:
                break;
        }
    }
}
