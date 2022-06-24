package com.aimeneabdellah.backend.repositories;

import com.aimeneabdellah.backend.entities.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande,Integer> {
}
