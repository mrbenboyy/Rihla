package org.example.backend_rihla.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.util.Date;
@Service
public class JwtUtil {

    private String secret ="1255868564169712569668734784646878979698778" ;

    public String generateToken(String useremail) {
        return Jwts.builder()
                .setSubject(useremail)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 heures
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(secret)
                    .build()
                    .parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            // Gérer les exceptions ici (token expiré, signature incorrecte, etc.)
            return false;
        }
    }

    // Extract username from the token
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Méthode pour valider le token et extraire des informations, etc.
}
