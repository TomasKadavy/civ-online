package com.civ_online_server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class GameWebSocket extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new ArrayList<>();

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
        
        for (WebSocketSession s : sessions) {
            if (s.isOpen()) {
                if (!s.getId().equals(session.getId())) {
                    s.sendMessage(message);
                }
            }
        }
    
    }

    // Sends a message to all connected clients
    public void broadcastMessage(String message) throws IOException {
        TextMessage textMessage = new TextMessage(message);
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                session.sendMessage(textMessage);
            }
        }
    }
}
