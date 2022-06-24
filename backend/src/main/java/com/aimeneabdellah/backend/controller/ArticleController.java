package com.aimeneabdellah.backend.controller;

import com.aimeneabdellah.backend.entities.Article;
import com.aimeneabdellah.backend.repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping(path="/api/articles")
public class ArticleController {
    @Autowired
    ArticleRepository repo;

    @GetMapping(path="/all")
    public List<Article> Articles(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Article GetArticleById(@PathVariable Integer id){
        return repo.findById(id).get();
    }

    @GetMapping("/search/{nameArticle}")
    public Article GetArticleByName(@PathVariable String nameArticle){
        return repo.findByNameArticle(nameArticle);
    }

    @PostMapping("/add")
    public String AddArticle(@RequestBody Article a){
        repo.save(a);
        return "addded";
    }

    @PutMapping("/{id}")
    public String updateArticle(@PathVariable Integer id, Article a){
        Article article = repo.findById(id).get();
        article.setNameArticle(a.getNameArticle());
        article.setDescription(a.getDescription());
        article.setCountInStock(a.getCountInStock());
        article.setOptions(a.getOptions());
        article.setPrice(a.getPrice());
        article.setTaille(a.getTaille());
        article.setCategory(a.getCategory());
        repo.save(article);
        return "updated";
    }

    @DeleteMapping("/article/{id}")
    public String DeleteArticle(@PathVariable Integer id){
        repo.deleteById(id);
        return "deleted";
    }
}
