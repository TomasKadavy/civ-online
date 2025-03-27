package com.civ_online_server.persistance;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameTurnService {
    @Autowired
    private GameTurnRepository gameTurnRepository;

    public GameTurn createGameTurn(String name) {
        GameTurn gameTurn = new GameTurn();
        gameTurn.setName(name);
        return gameTurnRepository.save(gameTurn);
    }

    public List<GameTurn> getAllGameTurns() {
        return gameTurnRepository.findAll();
    }

    public Optional<GameTurn> getGameTurnById(Long id) {
        return gameTurnRepository.findById(id);
    }

    public void deleteGameTurn(Long id) {
        gameTurnRepository.deleteById(id);
    }
}
