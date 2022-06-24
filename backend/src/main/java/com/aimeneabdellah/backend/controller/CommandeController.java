package com.aimeneabdellah.backend.controller;

import com.aimeneabdellah.backend.entities.Article;
import com.aimeneabdellah.backend.entities.Categorie;
import com.aimeneabdellah.backend.entities.Client;
import com.aimeneabdellah.backend.entities.Commande;
import com.aimeneabdellah.backend.repositories.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping(path="/api/commandes")
public class CommandeController {
    @Autowired
    CommandeRepository repo;

    @GetMapping("/all")
    public List<Commande> Commandes(){
        List<Commande> commandes = repo.findAll();
        System.out.println("****************************************");
        return commandes;
    }
    @PostMapping("/add")
    public String Addcomm(@RequestBody Commande c){
        repo.save(c);
        return "added";
    }

    @GetMapping ("/{id}")
    public Commande getCommandeById(@PathVariable Integer id){
       return repo.findById(id).get();
    }

    @DeleteMapping ("/{id}")
    public String Deletecomm(@PathVariable Integer id){
        repo.deleteById(id);
        return "added";
    }

    @PutMapping("/{id}")
    public String updateCommande(@PathVariable Integer id, @RequestBody Commande cmd){
        Commande commande = repo.findById(id).get();
        commande.setArticleList(cmd.getArticleList());
        commande.setEtat(cmd.getEtat());
        commande.setId(cmd.getId());
        repo.save(commande);
        return "updated";
    }
}
