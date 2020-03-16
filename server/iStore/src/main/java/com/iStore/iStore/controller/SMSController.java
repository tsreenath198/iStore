package com.iStore.iStore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.SMS;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.SMS)
public class SMSController {
	@Value("${sms.url}")
	private String url;

	@Value("${sms.auth.key}")
	private String authKey;

	@Value("${sms.sender}")
	private String sender;

	@Value("${sms.route}")
	private String route;

	@Autowired
	private RestTemplate restTemplate;

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@PostMapping(ISTOREConstants.SEND)
	public ResponseEntity<String> sendSMS(@RequestBody SMS sms) {
		String htmlMsg = "Thanks for your visit, and We hope to see you soon!";
		StringBuilder sb = new StringBuilder();
		sb.append(htmlMsg);
		sb.append("\n Write us a review at");
		sb.append("\n https://bit.ly/2WkvYMb");
		sb.append("\n Natural Fresh Ice Creams Nizamabad");

		String contacts = sms.getContact();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		String body = "authkey=" + authKey + "&sender=" + sender + "&route=" + route + "&message=" + sb + "&mobiles="
				+ contacts;
		HttpEntity<String> request = new HttpEntity<String>(body, headers);
		try {
			ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
			return new ResponseEntity<String>(response.getBody(), HttpStatus.OK);
		} catch (Exception e) {
		}
		return null;
	}
}
