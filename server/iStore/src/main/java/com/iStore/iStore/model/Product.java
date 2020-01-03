package com.iStore.iStore.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table
@Entity
@Getter
@Setter
@ToString
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column
	@NotNull
	private String name;
	@Column
	private Integer order;
	@Column
	@NotNull
	private Float price;
	@Column
	@NotNull
	private Integer inventory;
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "category_id", referencedColumnName = "id")
	private Category category;
	@Column
	@CreationTimestamp
	private Date createdDate;
	@Column
	@UpdateTimestamp
	private Date updatedDate;
	@Column
	private String description;
	@Column
	private Integer activeFlag = 0;
}
