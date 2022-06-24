package com.aimeneabdellah.backend.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity @Data
@AllArgsConstructor @NoArgsConstructor
public class Client {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Client;
    private String firstname;
    private String lastname;
    private String address;
    private String email;
    private String city;
    private String website;
    private long phone;


}
