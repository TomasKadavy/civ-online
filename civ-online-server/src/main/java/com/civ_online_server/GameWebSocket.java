package com.civ_online_server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.civ_online_server.game_state.GameService;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GameWebSocket extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final ConnectionService connectionService;
    private final GameService gameService;

    GameWebSocket(ConnectionService connectionService, GameService gameService) {
        this.connectionService = connectionService;
        this.gameService = gameService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        sessions.add(session);
        System.out.println("New connection established: " + session.getId());
        // try {
        //     GameMessage message = new GameMessage("connection", session.getId());
        //     session.sendMessage(new TextMessage(message.toString()));
        // } catch (Exception e) {
        //     System.out.println("Error sending message to " + session.getId() + ": " + e.getMessage());
        // }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        sessions.remove(session);
        System.out.println("Connection closed: " + session.getId() + " with status " + status);
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
                ReturnMessageType type = connectionService.handleGameId(incomingGameMessage.gameId(), session.getId());
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
                        game[0] + ";" + game[1]
                    );
                    this.gameService.startGame(incomingGameMessage.gameId(), game[0], game[1]);
                    this.broadcastMessage(returnMessage.toString(), true);
    
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
                broadcastMessage(gameEventMessage.toString(), true);
                break;
            default:
                break;
        }
    }

    // Sends a message to all connected clients
    public void broadcastMessage(String message, boolean sendToSame) throws IOException {
        // GameMessage message = new GameMessage("connection", session.getId());
        TextMessage textMessage = new TextMessage(message);
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                if (sendToSame) {
                    session.sendMessage(textMessage);
                } else {
                    if (!session.getId().equals(session.getId())) {
                        session.sendMessage(textMessage);
                    }
                }
            }
        }
    }
}
