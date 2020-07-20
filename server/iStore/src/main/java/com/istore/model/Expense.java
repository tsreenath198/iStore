package com.istore.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table
@Getter
@Setter
@ToString
@Entity
public class Expense {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column
	private String description;

	@Column
	private Float amount;

	@Column
	private String mode;

	@Column
	private String comment;

	@Column
	@JsonDeserialize(using = DateDeserializers.DateDeserializer.class)
	@JsonSerialize(using = DateSerializer.class)
	private Date date;

	@Column
	@CreationTimestamp
	private Date createdDate;

	@Column
	@UpdateTimestamp
	private Date updatedDate;
	@Column
	private Integer activeFlag = 0;
}
