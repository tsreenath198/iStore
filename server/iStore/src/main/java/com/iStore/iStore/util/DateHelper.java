package com.iStore.iStore.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.validation.ValidationException;

public class DateHelper {

	static DateFormat format = new SimpleDateFormat("yyyy-mm-dd", Locale.ENGLISH);

	public static Date convertStringToDate(String str) throws ParseException {
		Date dt = null;
		try {
			dt = format.parse(str);
		} catch (Exception e) {
			throw new ValidationException("Error in string");
		}
		return dt;
	}

	public static Date addOneDay(Date to) {
		Date dt = new Date(to.getTime() + (1000 * 60 * 60 * 24));
		return dt;
	}

	public static Date convertDateWithouTime(Date cd) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.parse(sdf.format(cd));
	}

	public static String convertDateToString(Date date) {
		return new SimpleDateFormat("yyyy-MM-dd").format(date);
	}

}
