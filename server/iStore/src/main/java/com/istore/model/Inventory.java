package com.istore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table
@Entity
@Getter
@Setter
@ToString
public class Inventory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column
	@NotNull
	private String name;

	@Column
	@NotNull
	private Integer unitsPerQty;

	@Column
	@NotNull
	private Float availableUnits;

	@Column
	@NotNull
	private Integer minAvailableUnits;

	@Column
	@NotNull
	private Float price;

	// @Column
	// private Integer productId;

}
