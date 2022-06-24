package com.aimeneabdellah.backend.entities;

import lombok.*;

import javax.persistence.*;

@Entity @Data @Table(name = "Category")
@AllArgsConstructor @NoArgsConstructor
public class Categorie {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer Id_categorie;
    public String name;
    public String description;
}
