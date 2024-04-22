package org.example.backend_rihla.web;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend_rihla.Util.JwtRequestFilter;
import org.example.backend_rihla.entities.Booking;
import org.example.backend_rihla.entities.City;
import org.example.backend_rihla.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    BookingService bookingService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @CrossOrigin()
    @PostMapping("/add")
    public Booking ajouter(@RequestBody Booking booking,@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("user")){
            return bookingService.add(booking);
        }else {
            Booking booking1 = new Booking();
            return booking1;
        }
    }


    @CrossOrigin()
    @GetMapping("")
    public List<Booking> all(@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        if(jwtRequestFilter.doFilter(authorizationHeader)!=null ){
            return bookingService.getAllBookings();
        }else {
            List<Booking>bookings=new ArrayList<>();
            return bookings;
        }
    }

    @CrossOrigin()
    @PostMapping("/update/{idbooking}/{userId}")
    public Booking modif(@PathVariable Long idbooking, @PathVariable Long userId, @RequestBody Booking booking,@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){

        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("user")){
            return bookingService.updateBooking(idbooking, userId, booking);
        }else {
            Booking booking1 = new Booking();
            return booking1;
        }
    }

    @CrossOrigin()
    @DeleteMapping("/delete/{idbooking}")
    public void delete(@PathVariable Long idbooking,@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
            bookingService.deleteBooking(idbooking);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUser(userId);
    }
}
