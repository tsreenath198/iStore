package com.iStore.iStore.exception;

import javax.validation.ValidationException;

import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {

	@Override
	protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		return super.handleTypeMismatch(ex, headers, status, request);
	}

	@org.springframework.web.bind.annotation.ExceptionHandler(ValidationException.class)
	public ResponseEntity<Object> validationExceptionHandler(ValidationException ex, WebRequest request) {
		return new ResponseEntity<Object>(ex.getMessage(), HttpStatus.BAD_GATEWAY);
	}

}
