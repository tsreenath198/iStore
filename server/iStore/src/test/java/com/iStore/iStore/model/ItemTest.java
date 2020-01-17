package com.iStore.iStore.model;

import static org.junit.Assert.assertEquals;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ItemTest {
	@InjectMocks
	private Item itemc;

	@Before
	public void setup() {
		itemc = new Item();
		itemc.setActiveFlag(1);
		itemc.setDiscount(5);
		itemc.setCreatedDate(new Date());
		itemc.setDescription("sss");
		itemc.setOrderId(1);
		itemc.setId(5);
		itemc.setUpdatedDate(new Date());
	}

	@Test
	public void test() {
		assertEquals(Integer.valueOf(5), itemc.getDiscount());
		assertEquals(Integer.valueOf(5), itemc.getId());
		assertEquals(Integer.valueOf(1), itemc.getActiveFlag());
		assertEquals(Integer.valueOf(1), itemc.getOrderId());
	}

}
