package com.civ_online_server.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameTurnRepository extends JpaRepository<GameTurn, Long> {
    
}
