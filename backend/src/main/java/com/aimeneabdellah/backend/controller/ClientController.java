package com.aimeneabdellah.backend.controller;

import com.aimeneabdellah.backend.entities.Article;
import com.aimeneabdellah.backend.entities.Categorie;
import com.aimeneabdellah.backend.entities.Client;
import com.aimeneabdellah.backend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController @RequestMapping(path = "/api/clients")
public class ClientController {
    @Autowired
    ClientRepository repo;
    @GetMapping("/all")
    public List<Client> Clients(){
        List<Client> clients = repo.findAll();
        return clients;
    }
    @PostMapping("/add")
    public String Addcli(Client c){
        repo.save(c);
        return "added";
    }

    @DeleteMapping("/{id}")
    public String Deletecli(@PathVariable Integer id){
        repo.deleteById(id);
        return "deleted";
    }
    @GetMapping ("/{id}")
    public Client searchcli(@PathVariable Integer id){
        return repo.findById(id).get();
    }

    @PutMapping("/{id}")
    public String putcli(@PathVariable Integer id , Client c){
        Client cli =repo.findById(id).get();
        cli.setAddress(c.getAddress());
        cli.setCity(c.getCity());
        cli.setEmail(c.getEmail());
        cli.setFirstname(c.getFirstname());
        cli.setLastname(c.getLastname());
        cli.setPhone(c.getPhone());
        cli.setWebsite(c.getWebsite());
        repo.save(cli);
        return "updated";
    }
}
