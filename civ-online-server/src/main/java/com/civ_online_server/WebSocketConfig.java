package com.civ_online_server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final ConnectionService connectionService;

    public WebSocketConfig(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(gameWebSocketHandler(), "/game")
            .setAllowedOrigins("*");
    }
    
    @Bean
    public GameWebSocket gameWebSocketHandler() {
        return new GameWebSocket(connectionService);
    }
}
