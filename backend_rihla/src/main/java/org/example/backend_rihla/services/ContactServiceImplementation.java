package org.example.backend_rihla.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend_rihla.entities.Contact;
import org.example.backend_rihla.repositories.ContactRepo;
import org.example.backend_rihla.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactServiceImplementation implements ContactService{
    @Autowired
    ContactRepo contactRepo;
    @Autowired
    UserRepo userRepo;
    @Override
    public Contact add(Contact contact) {
        return contactRepo.save(contact);
    }

    @Override
    public List<Contact> getAllContacts() {
        return contactRepo.findAll();
    }


    @Override
    public void deleteContact(Long id) {
        Optional<Contact> optionalContact = contactRepo.findById(id);
        if(optionalContact.isPresent()){
            Contact contact = optionalContact.get();

            contactRepo.delete(contact);
        }else{
            throw new EntityNotFoundException("Contact with id="+id+"dosen't exist!");
        }

    }
}
