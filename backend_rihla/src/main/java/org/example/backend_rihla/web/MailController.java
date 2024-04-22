package org.example.backend_rihla.web;

import org.example.backend_rihla.Util.JwtRequestFilter;
import org.example.backend_rihla.entities.Contact;
import org.example.backend_rihla.entities.MailStructure;
import org.example.backend_rihla.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private MailService mailService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @CrossOrigin()
    @PostMapping("/send/{mail}")
    public String sendMail(@PathVariable String mail, @RequestBody MailStructure mailStructure,@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){
        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("admin")){
            mailService.sendMail(mail, mailStructure);
            return "Successfully sent the mail";
        }else {
            return "error email not sent";
        }
    }
}
