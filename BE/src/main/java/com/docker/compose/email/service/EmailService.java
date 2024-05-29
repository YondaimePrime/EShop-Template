package com.docker.compose.email.service;

import com.docker.compose.email.entity.EmailDetails;


public interface EmailService {
    String sendSimpleMail(EmailDetails details);
}
