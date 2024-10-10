package com.server.iot.server.errors;

/**
 * Error response to be sent to the front-end when something is wrong.
 */
public class Error extends Exception {

    private String violationMessage;

    private String message;

    /**
     * Use super so that stack trace won't be sent with the error.
     * @param message
     */
    public Error( String message) {
        super(message,null,false,false);
        this.message = message;
    }
    public Error(String violationMessage, String message) {
        super(message,null,false,false);
        this.violationMessage = violationMessage;
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
