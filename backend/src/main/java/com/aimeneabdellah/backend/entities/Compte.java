package com.aimeneabdellah.backend.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Compte {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Compte;
    private String firstname;
    private String lastname;
    private String address;
    private String email;
    private String city;
    private long phone;
    private String cin;
    @Lob
    private String Image;
    private String Task;


}
