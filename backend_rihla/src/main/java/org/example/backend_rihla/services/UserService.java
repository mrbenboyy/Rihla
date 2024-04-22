package org.example.backend_rihla.services;

import org.example.backend_rihla.config.reponse.Loginreponse;
import org.example.backend_rihla.entities.User;

import java.util.List;

public interface UserService {
    User add(User user);
    Loginreponse login(Loginclass user);
    List<User> getAllUsers();
    User updateUser(Long id, User newUser);
    void deleteUser(Long id);
//    List<User> searchByName(String str);
}
