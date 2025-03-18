package com.civ_online_server;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class ConnectionService {
    public ConcurrentHashMap<String, String[]> games = new ConcurrentHashMap<>();

    public ReturnMessageType handleGameId(String gameId, String socketConnectionId) {
        var game = games.get(gameId);
        // first player to connect
        if (game == null) {
            String[] socketIds = new String[2];
            socketIds[0] = socketConnectionId;
            games.put(gameId, socketIds);
            return ReturnMessageType.WAITING;
        } 

        if (game[1] == null) {
            game[1] = socketConnectionId;
            return ReturnMessageType.START_GAME;
        } 

        return ReturnMessageType.GAME_FULL;
    }
}
