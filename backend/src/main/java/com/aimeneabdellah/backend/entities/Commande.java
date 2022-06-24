package com.aimeneabdellah.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity @Data
@AllArgsConstructor @NoArgsConstructor
public class Commande {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Temporal(TemporalType.DATE)
    private Date commandDate;
    private int qte;
    private String articleList;
    private String etat;
}
