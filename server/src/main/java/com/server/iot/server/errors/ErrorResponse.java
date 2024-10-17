package com.server.iot.server.errors;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ErrorResponse {

    private List<Error> errors = new ArrayList<>();

    public void addToResponse(Error error) {
        errors.add(error);
    }

    @Override
    public String toString() {
        return "ErrorResponse{" +
                "errors=" + errors +
                '}';
    }
}
