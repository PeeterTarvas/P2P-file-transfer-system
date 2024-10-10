package com.server.iot.server.helper;

import com.server.iot.server.errors.Error;
import com.server.iot.server.errors.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ResponseHandler {

    public ErrorResponse convertErrorToErrorResponse(Error error) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.addToResponse(error);
        return errorResponse;
    }

    public Error conevrtJavaErrortoCustomError(java.lang.Error error) {
        return new Error(error.getMessage());
    }

    public ResponseEntity returnErrorResponse(HttpStatus status, Error error) {
        ErrorResponse errorResponse = convertErrorToErrorResponse(error);
        return ResponseEntity.status(status).body(errorResponse);
    }

    public ResponseEntity returnResponse(HttpStatus status, Object object) {
        return ResponseEntity.status(status).body(object);
    }

    public ResponseEntity returnResponse(HttpStatus status) {
        return ResponseEntity.status(status).build();
    }

}
