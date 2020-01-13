package com.iStore.iStore.model;

import static org.junit.Assert.assertEquals;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class CategoryTest {
	@InjectMocks
	private Category c;

	@Before
	public void setup() {
		c = new Category();
		c.setActiveFlag(1);
		c.setCategoryOrder(5);
		c.setCreatedDate(new Date());
		c.setDefaultDiscount(5);
		c.setDescription("sss");
		c.setId(5);
		c.setName("test");
		c.setUpdatedDate(new Date());
	}

	@Test
	public void test() {
		assertEquals(Integer.valueOf(5), c.getCategoryOrder());
		assertEquals(Integer.valueOf(5), c.getId());
		assertEquals(Integer.valueOf(1), c.getActiveFlag());
		assertEquals(Integer.valueOf(5), c.getDefaultDiscount());
		c.getDefaultDiscount();
	}

}
