package com.docker.compose.email.controller;

import com.docker.compose.email.entity.EmailDetails;
import com.docker.compose.email.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping(value = "/thymeleafTemplate")
    public String getTemplate(@RequestParam(name="name", required = false, defaultValue = "World") String name, Model model){
        model.addAttribute("name", name);
        return "thymeleafTemplate";
    }


    @GetMapping("/purchase/email")
    public EmailDetails showMail(){
        EmailDetails details = new EmailDetails();
        details.setRecipient("simonbaranec58@gmail.com");
        details.setSubject("Nieco");
        details.setMsgBody("Ahoj");
        return details;
    }

    @PostMapping("/purchase/email")
    public String sendMail(@RequestBody EmailDetails details)
    {
        return emailService.sendSimpleMail(details);
    }

}
