package org.example.backend_rihla.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend_rihla.Util.JwtUtil;
import org.example.backend_rihla.config.reponse.Loginreponse;
import org.example.backend_rihla.entities.Booking;
import org.example.backend_rihla.entities.Contact;
import org.example.backend_rihla.entities.User;
import org.example.backend_rihla.repositories.BookingRepo;
import org.example.backend_rihla.repositories.ContactRepo;
import org.example.backend_rihla.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{
    @Autowired
    UserRepo userRepo;

    @Autowired
    BookingRepo bookingRepo;

    @Autowired
    ContactRepo contactRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public User add(User user) {
        User useraut = userRepo.findByEmail(user.getEmail());
        if(useraut !=null){
            throw new EntityNotFoundException("email est déja exicte");
        }else {
            User newUser = new User();
            newUser.setFullName(user.getFullName());
            newUser.setEmail(user.getEmail());
            newUser.setPassword(this.passwordEncoder.encode(user.getPassword()));
            newUser.setPhoneNumber(user.getPhoneNumber());
            newUser.setRole(user.getRole());
            return userRepo.save(newUser);
        }
    }
    @Override
    public Loginreponse login(Loginclass user) {
        User userauth1 = userRepo.findByEmail(user.getEmail());
        Loginreponse loginreponse = new Loginreponse();
        if (userauth1 != null) {
            String password = user.getPassword();
            String encodedPassword = userauth1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> userauth = userRepo.findOneByEmailAndPassword(user.getEmail(), encodedPassword);
                if (userauth.isPresent()) {
                    String token = jwtUtil.generateToken(user.getEmail());
                    loginreponse.setToken(token);
                    loginreponse.setMessage(userauth1.getRole());

                } else {
                    loginreponse.setMessage("La connexion a échoué");
                }
            } else {
                loginreponse.setMessage("mot de passe incorrecte");
            }
        }else {
            loginreponse.setMessage("l'email n'existe pas");
        }
        return loginreponse;
    }


    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User updateUser(Long id, User newUser) {
        Optional<User> optionalUser = userRepo.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFullName(newUser.getFullName());
            user.setEmail(newUser.getEmail());
            user.setPhoneNumber(newUser.getPhoneNumber());

            return userRepo.save(user);
        }else {
            throw new EntityNotFoundException("Il n'ya pad de User avec cet ID"+id);
        }
    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> optionalUser = userRepo.findById(id);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            //-----------supp booking-------------------
            List<Booking> bookings = bookingRepo.findBookingsByUser(user);
            List<Contact> contacts = contactRepo.findContactsByUser(user);
            if (bookings.size() > 0 ){
                for(Booking booking : bookings){
                    bookingRepo.delete(booking);
                }
            }
            if (contacts.size() > 0 ){
                for(Contact contact : contacts){
                    contactRepo.delete(contact);
                }
            }

            //--------------------------

            userRepo.delete(user);
        }else{
            throw new EntityNotFoundException("User with id="+id+"dosen't exist!");
        }
    }

//    @Override
//    public List<User> searchByName(String str) {
//        return userRepo.findUsersByNomContains(str);
//    }

}
