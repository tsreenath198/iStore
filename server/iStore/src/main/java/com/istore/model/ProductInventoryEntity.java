package com.istore.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table(name = "Product_Inventory_Required")
@Entity
@Getter
@Setter
@ToString
public class ProductInventoryEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	@EmbeddedId
	private ProductInventoryId productInventoryId;
	@Column(name = "units_required")
	@NotNull
	private Float unitsRequired;

}
