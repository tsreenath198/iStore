package com.istore.util;

import lombok.extern.slf4j.Slf4j;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import javax.validation.ValidationException;

@Slf4j
public class DateHelper {

	private DateHelper() {

	}

	private static String PATTERN = "yyyy-MM-dd";
	private static String DATE_PATTERN = "dd_MM_yyyy";
	private static DateFormat FORMAT = new SimpleDateFormat(PATTERN, Locale.ENGLISH);

	public static Date convertStringToDate(String str) {
		Date dt;
		try {
			dt = FORMAT.parse(str);
		} catch (Exception e) {
			throw new ValidationException("Error in string");
		}
		return dt;
	}

	public static Date addOneDay(Date to) {
		return new Date(to.getTime() + (1000 * 60 * 60 * 24));
	}

	public static Date convertDateWithouTime(Date cd) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.parse(sdf.format(cd));
	}

	public static Date convertDateWithoutSeconds(Date cd) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat(PATTERN);
		return sdf.parse(sdf.format(cd));
	}

	public static String convertDateToString(Date date) {
		return new SimpleDateFormat(PATTERN).format(date);
	}

	public static String convertDateToStringPattern(Date date) {
		return new SimpleDateFormat(DATE_PATTERN).format(date);
	}

	public static Calendar convertDateToCalenderDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar;
	}

	public static String getNextDay(String toDate) {
		try {
			Date date1 = new SimpleDateFormat(PATTERN).parse(toDate);
			Calendar c = Calendar.getInstance();
			c.setTime(date1);
			c.add(Calendar.DATE, 1);
			c.set(Calendar.HOUR, 0);
			c.set(Calendar.MINUTE, 0);
			c.set(Calendar.MILLISECOND, 0);
			Date date = c.getTime();
			SimpleDateFormat format = new SimpleDateFormat(PATTERN);
			String date2 = format.format(date);
			Date d = format.parse(date2);
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			return dateFormat.format(d);
		} catch (ParseException e1) {
			log.error("error", e1);
		}
		return null;
	}
}
