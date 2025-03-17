package com.civ_online_server;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class ConnectionService {
    ConcurrentHashMap<String, String[]> games = new ConcurrentHashMap<>();
    // public SocketMessageType handleMessage(GameMessage gameMessage, String socketConnectionId) {
    //     String type = gameMessage.type();
    //     String message = gameMessage.message();

    //     switch (type) {
    //         case "gameId":
    //             return handleGameId(message, socketConnectionId);

    //         default:
    //             return SocketMessageType.UNKNOWN;
    //     }
    // }


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
