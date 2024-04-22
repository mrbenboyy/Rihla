package org.example.backend_rihla.services;

import org.example.backend_rihla.entities.Contact;

import java.util.List;

public interface ContactService {
    Contact add(Contact contact);
    List<Contact> getAllContacts();
    void deleteContact(Long id);
}
