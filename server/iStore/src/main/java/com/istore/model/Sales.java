package com.istore.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Sales {
	private String Category;
	private Float cashTotal;
	private Float bankTotal;
	private String date;
	private Integer quantity;
}
