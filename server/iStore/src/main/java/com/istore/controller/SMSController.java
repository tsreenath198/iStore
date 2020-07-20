package com.istore.controller;

import com.istore.constants.ISTOREConstants;
import com.istore.model.SMS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.SMS)
@Slf4j
public class SMSController {
    @Value("${sms.url}")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping(ISTOREConstants.SEND)
    public ResponseEntity<String> sendSMS(@RequestBody SMS sms) {
        String htmlMsg = "Thank you for visiting Natural Fresh Ice Creams. "
                + "Please review us at (https://bit.ly/2WkvYMb). Wish to see you again in our store soon.";
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
}
