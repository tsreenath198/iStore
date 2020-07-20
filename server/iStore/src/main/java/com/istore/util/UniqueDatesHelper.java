package com.istore.util;

import java.text.ParseException;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.istore.model.OrderDetail;

public class UniqueDatesHelper {
	private UniqueDatesHelper(){
		// cannot instantiate
	}
	public static Set<Date> uniqueDates(List<OrderDetail> orders){
		Set<Date> uni = new LinkedHashSet<>();
		for (OrderDetail od : orders) {
			uni.add(od.getCreatedDate());
		}
		return uni;
	}

	public static Set<Date> uniqueDatesWithoutTime(List<OrderDetail> orders) throws ParseException {
		Set<Date> uni = new LinkedHashSet<>();
		for (OrderDetail od : orders) {
			Date dateWithoutTime = DateHelper.convertDateWithouTime(od.getCreatedDate());
			uni.add(dateWithoutTime);
		}
		return uni;
	}
	public static Set<Date> uniqueDatesWithoutSeconds(List<OrderDetail> orders) throws ParseException {
		Set<Date> uni = new LinkedHashSet<>();
		for (OrderDetail od : orders) {
			Date dateWithoutTime = DateHelper.convertDateWithoutSeconds(od.getCreatedDate());
			uni.add(dateWithoutTime);
		}
		return uni;
	}
}
