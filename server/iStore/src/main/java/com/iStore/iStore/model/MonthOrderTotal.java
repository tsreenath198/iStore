package com.iStore.iStore.model;

import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MonthOrderTotal {
	private Map<Integer, List<OrderTotal>> monthOrders;
}
