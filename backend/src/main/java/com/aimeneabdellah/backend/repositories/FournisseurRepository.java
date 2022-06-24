package com.aimeneabdellah.backend.repositories;

import com.aimeneabdellah.backend.entities.Fournisseurs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FournisseurRepository extends JpaRepository<Fournisseurs,Integer> {
}
