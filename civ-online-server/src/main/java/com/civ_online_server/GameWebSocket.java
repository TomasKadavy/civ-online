package com.civ_online_server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

public class GameWebSocket extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final ConnectionService connectionService;

    GameWebSocket(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        sessions.add(session);
        System.out.println("New connection established: " + session.getId());
        try {
            GameMessage message = new GameMessage("connection", session.getId());
            session.sendMessage(new TextMessage(message.toString()));
        } catch (Exception e) {
            System.out.println("Error sending message to " + session.getId() + ": " + e.getMessage());
        }
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
        System.out.println("Received message: " + payload + " from " + session.getId());

        var parsedPayload = objectMapper.readValue(payload, GameMessage.class);
        ConnectionReturnType connectionReturnType = connectionService.handleMessage(parsedPayload, session.getId());
        switch (connectionReturnType) {
            case FIRST_PLAYER:
                GameMessage first = new GameMessage(ConnectionReturnType.FIRST_PLAYER.toString(), session.getId());
                session.sendMessage(new TextMessage(first.toString()));
                break;
            case SECOND_PLAYER:
                GameMessage second = new GameMessage(ConnectionReturnType.SECOND_PLAYER.toString(), session.getId());
                this.broadcastMessage(second.toString(), true);
                break;
            case GAME_FULL:
                GameMessage full = new GameMessage(ConnectionReturnType.GAME_FULL.toString(), session.getId());
                session.sendMessage(new TextMessage(full.toString()));
                break;
        
            case UNKNOWN:
                // Unknown
                break;
        }

        //broadcastMessage(payload, false);
    
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
