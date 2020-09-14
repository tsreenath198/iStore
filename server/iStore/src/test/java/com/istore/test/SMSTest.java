package com.istore.test;

import com.istore.model.SMS;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class SMSTest {
    private String url = "http://smsweb.smsleases.com/app/sendSMS";

    private String authUrl = "http://smsweb.smsleases.com/app/auth/authService";

    private String username = "NaturalFresh";

    private String password = "730ba";

    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> sendSMS(SMS sms) {
        String sessionId = loginAndGetSessionId();
        if (sessionId != null) {
            String htmlMsg = "Thank you for visiting Natural Fresh Ice Creams. Love to hear you feedback @ " +
                    "https://bit.ly/2WkvYMb. Visit again.";
            String phoneNumbers = sms.getContact();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.add("Cookie", sessionId);
            String params = getPostMap(phoneNumbers, htmlMsg);
            HttpEntity<String> request = new HttpEntity<>(params, headers);
            try {
                ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
                System.out.println(response.getStatusCode());
                System.out.println(response.getHeaders());
                System.out.println(response.getBody());
                return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            System.err.println("Unable to send sms could not login");
        }
        return null;
    }

    private String getPostMap(String phoneNumbers, String htmlMsg) {

        return "charLength=1280&routes=31&senderid=16342&rm_dup=1&rm_inv=on&type=text&schedule=now&hours=01&minutes=00&timezone=Asia/Kolkata&" +
                "smstext=" + htmlMsg + "&nos=" + phoneNumbers;

    }

    private String loginAndGetSessionId() {
        String encodedParams = "username="+username+"&password="+password;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<String> request = new HttpEntity<>(encodedParams, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(authUrl, request, String.class);
            System.out.println(response.getStatusCode());
            System.out.println(response.getHeaders());
            System.out.println(response.getBody());
            String cookie = response.getHeaders().get("set-cookie").get(0);
            cookie = cookie.split(";")[0];
            System.out.println(cookie);
            return cookie;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void sendSMS(String phone) {
        SMS sms = new SMS();
        sms.setContact(phone);
        sendSMS(sms);
    }

    public static void main(String[] args) {
        SMSTest test = new SMSTest();
        test.sendSMS("9848071296");
        System.out.println("DONE!!!!!!");
    }
}
