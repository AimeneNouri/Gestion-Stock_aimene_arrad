package com.aimeneabdellah.backend.entities;

import lombok.*;

import javax.persistence.*;
import javax.persistence.criteria.Path;
import java.util.List;

@Entity @Table(name = "Article")
@Data @AllArgsConstructor @NoArgsConstructor
public class Article {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer Id_Article;
    private String nameArticle;
    private Double price;
    private String Description;
    @Column(columnDefinition = "integer default 0")
    private Long CountInStock;
//    @Lob
    private String Image;
    private String Category;
    private String options;
    private String taille;
}
