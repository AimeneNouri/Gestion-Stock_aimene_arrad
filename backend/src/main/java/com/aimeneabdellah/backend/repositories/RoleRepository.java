package com.aimeneabdellah.backend.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aimeneabdellah.backend.entities.ERole;
import com.aimeneabdellah.backend.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
