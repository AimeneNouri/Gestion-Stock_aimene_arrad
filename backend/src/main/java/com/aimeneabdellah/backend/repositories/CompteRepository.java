package com.aimeneabdellah.backend.repositories;

import com.aimeneabdellah.backend.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteRepository extends JpaRepository<Compte,Integer> {
}
