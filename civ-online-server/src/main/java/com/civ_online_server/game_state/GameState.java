package com.civ_online_server.game_state;

import java.io.IOException;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GameState {

    public static final int BOARD_SIZE = 100;

    public String gameId;
    public String turn;

    @JsonIgnore
    public String playerOne;
    @JsonIgnore
    public String playerTwo;

    @JsonProperty("board")
    HashMap<Integer, Tile> board = new HashMap<>();

    @JsonIgnore
    // key = sessionId, value = playerState
    HashMap<String, PlayerState> playerStates = new HashMap<>();

    private PlayerState currenPlayerState;

    public PlayerState getCurrenPlayerState() {
        return currenPlayerState;
    }

    public void setCurrenPlayerState(PlayerState playerState) {
        this.currenPlayerState = playerState;
    }

    @JsonProperty("playerState")
    private void setCurrenPlayerState(String playerStateJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            this.currenPlayerState = objectMapper.readValue(playerStateJson, PlayerState.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    // Only for jackson
    GameState() {}

    GameState(String gameId, String playerOne, String playerTwo) {
        this.gameId = gameId;
        //TODO decide who goes first
        this.turn = playerOne;
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;

        this.populateBoard();
        this.populatePlayeStates();
    }

    private void populateBoard() {
        for (int i = 0; i < BOARD_SIZE; i++) {
            board.put(i, new Tile(null, "", i));
        }
    }

    private void populatePlayeStates() {
        playerStates.put(playerOne, new PlayerState(10));
        playerStates.put(playerTwo, new PlayerState(10));
    }

}
