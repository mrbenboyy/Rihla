package org.example.backend_rihla.Util;

import org.example.backend_rihla.entities.User;
import org.example.backend_rihla.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtRequestFilter{
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    UserRepo userRepo;
    public User doFilter(String authorizationHeader)
            {

        String useremail = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            useremail = jwtUtil.getUsernameFromToken(jwt);
        }

        if (useremail != null && jwtUtil.validateToken(jwt)) {
            User useraut = userRepo.findByEmail(useremail);
            return useraut;
        }

        return null;
    }
}
