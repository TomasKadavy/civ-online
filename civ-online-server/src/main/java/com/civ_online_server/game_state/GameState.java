package com.civ_online_server.game_state;

import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GameState {

    public static final int BOARD_SIZE = 100;

    public String gameId;
    public String turn;

    @JsonProperty("board")
    HashMap<Integer, Tile> board = new HashMap<>();

    // Only for jackson
    GameState() {}

    GameState(String gameId, String turn) {
        this.gameId = gameId;
        //TODO decide who goes first
        this.turn = turn;

        this.populateBoard();
    }

    private void populateBoard() {
        for (int i = 0; i < BOARD_SIZE; i++) {
            board.put(i, new Tile(null, "", i));
        }
    }

}
