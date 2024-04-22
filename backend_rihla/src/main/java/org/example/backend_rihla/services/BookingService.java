package org.example.backend_rihla.services;

import org.example.backend_rihla.entities.Booking;

import java.util.List;


public interface BookingService {
    Booking add(Booking booking);
    List<Booking> getAllBookings();
    Booking updateBooking(Long idBooking, Long idUser, Booking booking);
    void deleteBooking(Long id);
    List<Booking> getBookingsByUser(Long userId);
}
