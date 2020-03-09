package com.iStore.iStore.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
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

	public static Date convertDateWithoutSeconds(Date cd) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.parse(sdf.format(cd));
	}

	public static String convertDateToString(Date date) {
		return new SimpleDateFormat("yyyy-MM-dd").format(date);
	}

	public static Calendar convertDateToCalenderDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar;
	}

	public static String getNextDay(String toDate) {
		try {
			Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(toDate);
			Calendar c = Calendar.getInstance();
			c.setTime(date1);
			c.add(Calendar.DATE, 1);
			Date date = c.getTime();
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			String date2 = format.format(date);
			Date d = format.parse(date2);
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			return dateFormat.format(d);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		return null;
	}
}
