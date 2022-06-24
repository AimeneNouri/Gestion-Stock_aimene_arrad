package com.aimeneabdellah.backend.controller;

import com.aimeneabdellah.backend.entities.Client;
import com.aimeneabdellah.backend.entities.Compte;
import com.aimeneabdellah.backend.entities.Fournisseurs;
import com.aimeneabdellah.backend.repositories.CompteRepository;
import com.aimeneabdellah.backend.repositories.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api/suppliers")
public class FournisseurController {
    @Autowired
    FournisseurRepository repo;
    @GetMapping("/all")
    public List<Fournisseurs> Fourni(){
        List<Fournisseurs> Fournisseur = repo.findAll();
        return Fournisseur;
    }
    @PostMapping("/add")
    public String Addfour(Fournisseurs c){
        repo.save(c);
        return "added";
    }
    @DeleteMapping("/{id}")
    public String Deletecli(@PathVariable Integer id){
        repo.deleteById(id);
        return "deleted";
    }
    @GetMapping ("/{id}")
    public Fournisseurs searchfour(@PathVariable Integer id){
        return repo.findById(id).get();
    }
    @PutMapping("/{id}")
    public String four(@PathVariable Integer id , Fournisseurs c){
        Fournisseurs four =repo.findById(id).get();
        four.setAddress(c.getAddress());
        four.setCity(c.getCity());
        four.setEmail(c.getEmail());
        four.setFirstname(c.getFirstname());
        four.setLastname(c.getLastname());
        four.setPhone(c.getPhone());
        four.setWebsite(c.getWebsite());
        repo.save(four);
        return "updated";
    }
}
