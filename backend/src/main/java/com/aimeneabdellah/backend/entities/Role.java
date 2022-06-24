package com.aimeneabdellah.backend.entities;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name = "roles")
@Data @AllArgsConstructor @NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;
}
