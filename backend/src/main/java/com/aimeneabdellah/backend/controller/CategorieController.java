package com.aimeneabdellah.backend.controller;

import com.aimeneabdellah.backend.entities.Categorie;
import com.aimeneabdellah.backend.repositories.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/api/categories")
public class CategorieController {
    @Autowired
    CategorieRepository repo;

    @GetMapping(path="/all")
    public List<Categorie> Categories(){
        return repo.findAll();
    }

    @PostMapping("/add")
    public String Addcat(Categorie c){
        repo.save(c);
        return "added";
    }
    @DeleteMapping  ("/{id}")
    public String Deletecat(@PathVariable Integer id){
        repo.deleteById(id);
        return "deleted";
    }

    @GetMapping ("/{id}")
    public Categorie searchcat(@PathVariable Integer id){
        return repo.findById(id).get();
    }
    @PutMapping("/{id}")
    public String putcat(@PathVariable Integer id , Categorie c){
        Categorie cat =repo.findById(id).get();
        cat.setDescription(c.getDescription());
        cat.setName(c.getName());
        repo.save(cat);
        return "updated";
    }
}
