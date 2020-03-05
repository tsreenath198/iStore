package com.iStore.iStore.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexValidator {
	public static boolean isValidName(String str) {
		return ((str != null) && (!str.equals("")) && (str.matches("^[a-zA-Z]*$")));
	}

	public static boolean isValidPhoneNumber(String s) {
		// 1) Begins with 0 or 91
		// 2) Then contains 6 or 8 or 9.
		// 3) Then contains 9 digits
		Pattern p = Pattern.compile("(0/91)?[6-9][0-9]{9}");
		Matcher m = p.matcher(s);
		return (m.find() && m.group().equals(s));
	}
}
