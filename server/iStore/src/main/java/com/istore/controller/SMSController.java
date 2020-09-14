package com.istore.controller;

import com.istore.constants.ISTOREConstants;
import com.istore.model.SMS;
import com.istore.service.SMSService;
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

    @Autowired
    private SMSService smsService;

    @PostMapping(ISTOREConstants.SEND)
    public ResponseEntity<String> sendSMS(@RequestBody SMS sms) {
        smsService.sendSMS(sms);
        return null;
    }
}
