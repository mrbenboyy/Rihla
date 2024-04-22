package org.example.backend_rihla.repositories;

import org.example.backend_rihla.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo  extends JpaRepository<User,Long> {
    Optional<User> findOneByEmailAndPassword(String email, String password);

    User findByEmail(String email);
}
