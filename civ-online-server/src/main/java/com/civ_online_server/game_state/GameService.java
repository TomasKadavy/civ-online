package com.civ_online_server.game_state;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.civ_online_server.IncomingGameMessage;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GameService {
    private final ObjectMapper objectMapper = new ObjectMapper();

    // key = gameId, value = gameState
    private ConcurrentHashMap<String, GameState> games = new ConcurrentHashMap<>(); 

    public void handleEvent(IncomingGameMessage incomingGameMessage) {
        try {
            GameState incomingState = objectMapper.readValue(incomingGameMessage.message(), GameState.class);
            String gameId = incomingGameMessage.gameId();
            GameState game = this.games.get(gameId);

            for (Map.Entry<Integer, Tile> entry : incomingState.board.entrySet()) {
                Integer tileId = entry.getKey();
                Tile tile = entry.getValue();
                game.board.put(tileId, tile);
            }
            game.turn = incomingState.turn;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void startGame(String gameId, String playerOne, String playerTwo) {
        this.games.put(gameId, new GameState(gameId, playerOne));
    }

    public String gameStateToJSON(String gameId) {
        try {
            return objectMapper.writeValueAsString(this.games.get(gameId));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
