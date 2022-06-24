package com.aimeneabdellah.backend.repositories;

import com.aimeneabdellah.backend.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Integer> {
}
