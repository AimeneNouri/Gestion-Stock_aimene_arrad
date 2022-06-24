package com.aimeneabdellah.backend.controller;

import com.aimeneabdellah.backend.entities.Compte;
import com.aimeneabdellah.backend.repositories.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/api")
public class CompteController {
    @Autowired
    CompteRepository repo;
    @GetMapping("/compte")
    public List<Compte> Comptes(){
        List<Compte> Comptes = repo.findAll();
        System.out.println("****************************************");
        return Comptes;
    }
    @PostMapping("/compte/add")
    public String Addcomp(Compte c){
        repo.save(c);
        return "added";
    }
}
