package com.server.iot.server.helper;

import com.server.iot.server.errors.Error;
import com.server.iot.server.errors.ErrorResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class ErrorHandlingControllerAdvice {

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ErrorResponse onConstraintValidationException(
            ConstraintViolationException e) {
        ErrorResponse errors = new ErrorResponse();
        for (ConstraintViolation violation: e.getConstraintViolations()) {
            errors.addToResponse(
                    new Error(violation.getPropertyPath().toString(), violation.getMessage()));
        }
        return errors;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ErrorResponse onMethodArgumentNotValidException (
            MethodArgumentNotValidException e) {
        ErrorResponse errors = new ErrorResponse();
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            errors.addToResponse(
                    new Error(fieldError.getField(), fieldError.getDefaultMessage()));
        }
        return errors;
    }

}