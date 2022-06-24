package com.aimeneabdellah.backend.repositories;

import com.aimeneabdellah.backend.entities.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article,Integer> {
    Article findByNameArticle(String nameArticle);
}
