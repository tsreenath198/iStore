package com.istore.model;

import java.util.Date;

import com.istore.constants.PaymentMode;

public interface OrderDetails {
	Integer getId();

	Float getTotal();

	Integer getMonth();

	Date getCreatedDate();

	Date getUpdatedDate();

	String getDescription();

	Integer getTotalDiscount();

	Integer getActiveFlag();

	PaymentMode getPaymentMode();

	Contact getContact();
}
