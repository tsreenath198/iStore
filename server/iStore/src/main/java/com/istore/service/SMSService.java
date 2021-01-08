package com.istore.service;

import com.istore.model.SMS;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.regex.Pattern;

@Component
@Slf4j
public class SMSService {
    @Value("${sms.url}")
    private String url;
    @Value("${sms.auth.url}")
    private String authUrl;
    @Value("${sms.auth.username}")
    private String username;
    @Value("${sms.auth.password}")
    private String password;
    @Autowired
    private RestTemplate restTemplate;
    Pattern phonePattern = Pattern.compile("(\\+91)?(-)?\\s*?(91)?\\s*?(\\d{3})-?\\s*?(\\d{3})-?\\s*?(\\d{4})");

    public ResponseEntity<String> sendSMS(SMS sms) {
        if (sms.getContact() != null && sms.getContact().trim().length() >= 10 && phonePattern.matcher(sms.getContact().trim()).find()) {
            String sessionId = loginAndGetSessionId();
            if (sessionId != null) {
                String htmlMsg = "Thank you for visiting Natural Fresh Ice Creams. Love to hear you feedback @ " + "https://tinyurl.com/y536yhlj. Visit again.";
                String phoneNumbers = sms.getContact();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                headers.add("Cookie", sessionId);
                String params = getPostMap(phoneNumbers, htmlMsg);
                System.out.println("Params : " + params);
                HttpEntity<String> request = new HttpEntity<>(params, headers);
                try {
                    ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
                    return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
                } catch (Exception e) {
                    log.error("Error while sending sms.", e);
                }
            } else {
                log.error("Unable to send sms could not login");
            }
        }
        return null;
    }

    private String getPostMap(String phoneNumbers, String htmlMsg) {
        return "charLength=1280&routes=31&senderid=17173&pe_id=1501597220000019588&template_id=1212&rm_dup=1&rm_inv=on&type=text&schedule=now&hours=01&minutes=00&timezone=Asia/Kolkata&" + "smstext=" + htmlMsg + "&nos=" + phoneNumbers;
    }

    private String loginAndGetSessionId() {
        String encodedParams = "username=" + username + "&password=" + password;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<String> request = new HttpEntity<>(encodedParams, headers);
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(authUrl, request, String.class);
            String cookie = response.getHeaders().get("set-cookie").get(0);
            cookie = cookie.split(";")[0];
            return cookie;
        } catch (Exception e) {
            log.error("Error while logging into sms website.", e);
        }
        return null;
    }

    public void sendSMS(String phone) {
        SMS sms = new SMS();
        sms.setContact(phone);
        sendSMS(sms);
    }
}