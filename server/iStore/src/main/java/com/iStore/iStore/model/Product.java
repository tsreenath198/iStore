package com.iStore.iStore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table
@Entity
@Getter
@Setter
@ToString
public class Product extends BaseModel {
	@Column
	@NotNull
	@NotEmpty
	private String name;
	@Column
	@NotNull
	@NotEmpty
	private Float price;

}
