package com.iStore.iStore.model;

import java.util.Date;

import com.iStore.iStore.constants.PaymentMode;

public interface OrderDetails {
	public Integer getId();

	public Float getTotal();

	public Integer getMonth();

	public Date getCreatedDate();

	public Date getUpdatedDate();

	public String getDescription();

	public Integer getTotalDiscount();

	public Integer getActiveFlag();

	public PaymentMode getPaymentMode();

	public Contact getContact();
}
