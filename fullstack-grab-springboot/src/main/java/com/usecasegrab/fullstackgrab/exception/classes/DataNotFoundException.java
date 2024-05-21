package com.usecasegrab.fullstackgrab.exception.classes;

public class DataNotFoundException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8800565442287420414L;

	public DataNotFoundException(String message) {
		super(message);
	}
}
