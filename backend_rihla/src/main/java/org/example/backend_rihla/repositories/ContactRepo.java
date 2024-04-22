package org.example.backend_rihla.repositories;

import org.example.backend_rihla.entities.Contact;
import org.example.backend_rihla.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepo  extends JpaRepository<Contact, Long> {
    List<Contact> findContactsByUser(User user);
}
