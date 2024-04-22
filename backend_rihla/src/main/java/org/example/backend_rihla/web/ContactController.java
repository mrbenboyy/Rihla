package org.example.backend_rihla.web;

import org.example.backend_rihla.Util.JwtRequestFilter;
import org.example.backend_rihla.entities.Booking;
import org.example.backend_rihla.entities.Contact;
import org.example.backend_rihla.entities.User;
import org.example.backend_rihla.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/contacts")
public class ContactController {
    @Autowired
    ContactService contactService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @CrossOrigin()
    @PostMapping("/add")
    public Contact ajouter(@RequestBody Contact contact,@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("user")){
            return contactService.add(contact);
        }else {
            Contact contacts = new Contact();
            return contacts;
        }
    }

    @CrossOrigin()
    @GetMapping("")
    public List<Contact> all(@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("admin")){
            return contactService.getAllContacts();
        }else {
            List<Contact>contacts=new ArrayList<>();
            return contacts;
        }
    }

    @CrossOrigin()
    @DeleteMapping("/delete/{idcontact}")
    public void delete(@PathVariable Long idcontact,@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("admin")){
            contactService.deleteContact(idcontact);
        }

    }
}
