package com.civ_online_server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.civ_online_server.game_state.GameService;
import com.civ_online_server.persistance.GameTurnService;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final ConnectionService connectionService;
    private final GameService gameService;
    private final GameTurnService gameTurnService;

    public WebSocketConfig(ConnectionService connectionService, GameService gameService, GameTurnService gameTurnService) {
        this.connectionService = connectionService;
        this.gameService = gameService;
        this.gameTurnService = gameTurnService;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(gameWebSocketHandler(), "/game")
            .setAllowedOrigins("*");
    }
    
    @Bean
    public GameWebSocket gameWebSocketHandler() {
        return new GameWebSocket(connectionService, gameService, gameTurnService);
    }
}
