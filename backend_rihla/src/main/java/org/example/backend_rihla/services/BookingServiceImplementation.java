package org.example.backend_rihla.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend_rihla.entities.Booking;
import org.example.backend_rihla.entities.User;
import org.example.backend_rihla.repositories.BookingRepo;
import org.example.backend_rihla.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImplementation implements BookingService{
    @Autowired
    BookingRepo bookingRepo;
    @Autowired
    UserRepo userRepo;
    @Override
    public Booking add(Booking booking) {
        return bookingRepo.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @Override
    public Booking updateBooking(Long idBooking, Long idUser, Booking booking){
        Optional<Booking> optionalBooking = bookingRepo.findById(idBooking);
        Optional<User> optionalUser = userRepo.findById(idUser);
        if(optionalUser.isPresent() && optionalBooking.isPresent()){
            Booking updateBooking = optionalBooking.get();
            User user = optionalUser.get();
            updateBooking.setStartLocation(booking.getStartLocation());
            updateBooking.setDate(booking.getDate());
            updateBooking.setPlaces(booking.getPlaces());
            updateBooking.setCityBooked(booking.getCityBooked());
            updateBooking.setUser(user);
            return bookingRepo.save(updateBooking);
        }else{
            throw new EntityNotFoundException("booking ou utilisateur ne se trouve pas.");
        }
    }

    @Override
    public void deleteBooking(Long id) {
        Optional<Booking> optionalBooking = bookingRepo.findById(id);
        if(optionalBooking.isPresent()){
            Booking booking = optionalBooking.get();

            bookingRepo.delete(booking);
        }else{
            throw new EntityNotFoundException("Booking with id="+id+"dosen't exist!");
        }

    }

    @Override
    public List<Booking> getBookingsByUser(Long userId) {
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return bookingRepo.findBookingsByUser(user);
        } else {
            throw new EntityNotFoundException("User with id=" + userId + " not found.");
        }
    }
}
