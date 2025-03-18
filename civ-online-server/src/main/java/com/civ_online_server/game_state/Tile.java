package com.civ_online_server.game_state;

public class Tile {
    public String owner;

    // Todo create class for each game object
    public String building;

    public int hexIndex;

    public Tile() {}

    public Tile(String owner, String building, int hexIndex) {
        this.owner = owner;
        this.building = building;
        this.hexIndex = hexIndex;
    }

}
