package com.aimeneabdellah.backend.controller;

import com.aimeneabdellah.backend.entities.User;
import com.aimeneabdellah.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;


@RestController @RequestMapping(path="/api/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping(path="/all")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User GetUserById(@PathVariable Long id){
        return userRepository.findById(id).get();
    }

    @PutMapping("/{id}")
    public String UpdateUserById(@PathVariable Long id, @RequestBody User user){
        User u =  userRepository.findById(id).get();
        u.setAddress(user.getAddress());
        u.setFirstname(user.getFirstname());
        u.setLastname(user.getLastname());
        u.setCity(user.getCity());
        u.setCin(user.getCin());
        u.setPhone(user.getPhone());
        userRepository.save(u);
        return "updated";
    }

    @DeleteMapping("/{id}")
    public String DeleteUserById(@PathVariable Long id){
        userRepository.deleteById(id);
        return "deleted";
    }
}
