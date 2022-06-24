package com.aimeneabdellah.backend.entities;

import lombok.*;

import javax.persistence.*;

@Entity @Data @AllArgsConstructor @NoArgsConstructor
public class Fournisseurs {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Fournisseur;
    private String firstname;
    private String lastname;
    private String address;
    private String email;
    private String city;
    private String website;
    private long phone;
}
