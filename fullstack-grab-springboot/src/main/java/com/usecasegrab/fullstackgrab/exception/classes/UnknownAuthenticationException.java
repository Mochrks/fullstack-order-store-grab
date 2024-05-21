package com.usecasegrab.fullstackgrab.exception.classes;

public class UnknownAuthenticationException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1518887744760894675L;

	public UnknownAuthenticationException(String message) {
		super(message);
	}
}
