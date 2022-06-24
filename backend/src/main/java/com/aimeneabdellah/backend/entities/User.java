package com.aimeneabdellah.backend.entities;

import lombok.*;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

@Entity
@Table(	name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
@Data @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;

    private String lastname;

    private String address;

    private String phone;

    private String cin;

    private String city;

    @Column(length = 20)
    private String username;

    @Column(length = 50)
    private String email;

    @Column(length = 120)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String firstname, String lastname, String address, String phone,
                String cin, String city, String username, String email, String password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.phone = phone;
        this.cin = cin;
        this.city = city;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
