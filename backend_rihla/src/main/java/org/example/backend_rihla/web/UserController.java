package org.example.backend_rihla.web;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend_rihla.Util.JwtRequestFilter;
import org.example.backend_rihla.config.reponse.Loginreponse;
import org.example.backend_rihla.entities.Booking;
import org.example.backend_rihla.entities.User;
import org.example.backend_rihla.repositories.UserRepo;
import org.example.backend_rihla.services.Loginclass;
import org.example.backend_rihla.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepo userRepo;
    @Autowired
    UserService userService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @CrossOrigin()
    @GetMapping("")
    public List<User> findAll(@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("admin")){
            return userService.getAllUsers();
        }else {
            List<User>users=new ArrayList<>();
            return users;
        }
    }
    @CrossOrigin()
    @PostMapping("/add")
    public User ajouter(@RequestBody User user){
        return userService.add(user);
    }
    @CrossOrigin()
    @PostMapping("/login")
    public Loginreponse login(@RequestBody Loginclass user){
        return userService.login(user);
    }
    //----------------------------------
    @CrossOrigin()
    @PostMapping("/update/{id}")
    public User modification(@PathVariable Long id, @RequestBody User user,@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("admin")){
            return userService.updateUser(id,user);
        }else {
            User users = new User();
            return users;
        }
    }
    //-------------------------------------
    @CrossOrigin()
    @DeleteMapping("/delete/{id}")
    public void suppression(@PathVariable Long id,@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("admin")){
            userService.deleteUser(id);
        }
    }


    //---------------------------------
    @CrossOrigin()
    @GetMapping("/user-authentication")
    public User userAuthentication(@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        return jwtRequestFilter.doFilter(authorizationHeader);
    }
}
