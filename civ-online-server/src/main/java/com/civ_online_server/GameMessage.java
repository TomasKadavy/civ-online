package com.civ_online_server;

import com.fasterxml.jackson.databind.ObjectMapper;

public record GameMessage(String type, String message) {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public GameMessage {
        if (type == null || message == null) {
            throw new IllegalArgumentException("type and message must not be null");
        }
    }

    @Override
    public String toString() {
        try {
            return objectMapper.writeValueAsString(this);
        } catch (Exception e) {
            throw new RuntimeException("Error serializing message: " + e.getMessage());
        }
    }
}
