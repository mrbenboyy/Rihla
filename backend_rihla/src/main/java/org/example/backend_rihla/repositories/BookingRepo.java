package org.example.backend_rihla.repositories;

import org.example.backend_rihla.entities.Booking;
import org.example.backend_rihla.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findBookingsByUser(User user);
}
