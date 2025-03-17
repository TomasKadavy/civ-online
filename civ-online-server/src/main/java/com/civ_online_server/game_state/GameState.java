package com.civ_online_server.game_state;

import java.util.HashMap;

public class GameState {

    public static final int BOARD_SIZE = 100;

    public String gameId;
    public String playerOne;
    public String playerTwo;
    public String turn;

    HashMap<Integer, Tile> board = new HashMap<>();

    GameState(String gameId, String playerOne, String playerTwo) {
        this.gameId = gameId;
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        //TODO decide who goes first
        this.turn = playerOne;

        this.populateBoard();
    }

    private void populateBoard() {
        for (int i = 0; i < BOARD_SIZE; i++) {
            board.put(i, new Tile(null, ""));
        }
    }

}
