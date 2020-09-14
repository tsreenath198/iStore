package com.istore.service;

import com.istore.constants.ISTOREConstants;
import com.istore.model.SMS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class SMSService {
    @Value("${sms.url}")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<String> sendSMS(SMS sms) {
        log.info("Sending sms to {}", sms.getContact());
        String htmlMsg = "Thank you for visiting Natural Fresh Ice Creams. Love to hear you feedback @ " +
                "https://bit.ly/2WkvYMb. Visit again.";
        String contacts = sms.getContact();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String body = "&contacts=" + contacts + "&msg=" + htmlMsg;
        HttpEntity<String> request = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error", e);
        }
        return null;
    }

    public void sendSMS(String phone) {
        SMS sms = new SMS();
        sms.setContact(phone);
        sendSMS(sms);
    }
}
