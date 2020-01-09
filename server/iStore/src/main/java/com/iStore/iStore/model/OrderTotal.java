package com.iStore.iStore.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderTotal {
	private Date date;
	private Float total;
}
