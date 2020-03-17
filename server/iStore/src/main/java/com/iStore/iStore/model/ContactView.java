package com.iStore.iStore.model;

import java.util.Date;

public interface ContactView {
	Integer getId();

	String getName();

	String getPhone();

	Date getCreatedDate();

	Date getUpdatedDate();

	String getDescription();

	Integer getActiveFlag();

	Boolean getSubscribe();

	Date getLastContactDate();

	Integer getCount();

}