package com.istore.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProfitAndLoss {
	private String Category;
	private Float total;
	private String date;
}
