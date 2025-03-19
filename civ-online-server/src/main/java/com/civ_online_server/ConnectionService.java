package com.civ_online_server;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Service
public class ConnectionService {
    public ConcurrentHashMap<String, WebSocketSession[]> games = new ConcurrentHashMap<>();

    public ReturnMessageType handleGameId(String gameId, WebSocketSession socketConnection) {
        var game = games.get(gameId);
        // first player to connect
        if (game == null) {
            WebSocketSession[] sockets = new WebSocketSession[2];
            sockets[0] = socketConnection;
            games.put(gameId, sockets);
            return ReturnMessageType.WAITING;
        } 

        if (game[1] == null) {
            game[1] = socketConnection;
            return ReturnMessageType.START_GAME;
        } 

        return ReturnMessageType.GAME_FULL;
    }

    public WebSocketSession removeGame(WebSocketSession session) {
        for (var entry : games.entrySet()) {
            String gameId = entry.getKey();
            WebSocketSession[] sockets = entry.getValue();
    
            if ((sockets[0] != null && sockets[0].getId().equals(session.getId())) ||
                (sockets[1] != null && sockets[1].getId().equals(session.getId()))) {

                games.remove(gameId);
    
                if (sockets[0] != null && sockets[0].getId().equals(session.getId())) {
                    return sockets[1];
                } else {
                    return sockets[0];
                }
            }
        }
        return null;
    }

    public void broadcastMessage(String gameId, String message) throws IOException {
        WebSocketSession[] sockets = games.get(gameId);
        if (sockets != null) {
            TextMessage textMessage = new TextMessage(message);
            for (WebSocketSession session : sockets) {
                if (session != null && session.isOpen()) {
                    session.sendMessage(textMessage);
                }
            }
        }
    }
}
