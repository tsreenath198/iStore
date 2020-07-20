package com.istore.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import com.istore.constants.PaymentMode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table
@Getter
@Setter
@ToString
@Entity
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column
	@NotNull
	private Float total;
	@Column
	@CreationTimestamp
	private Date createdDate;
	@Column
	@UpdateTimestamp
	private Date updatedDate;
	@Column
	private String description;

	@Column
	private String orderType;

	@Column
	@JsonDeserialize(using = DateDeserializers.DateDeserializer.class)
	@JsonSerialize(using = DateSerializer.class)
	private Date invoiceDate;

	@Column
	private Integer totalDiscount;
	@Column
	private Integer activeFlag = 0;
	@Enumerated(EnumType.STRING)
	private PaymentMode paymentMode;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "orderId")
	private List<Item> items;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "contact", referencedColumnName = "id")
	private Contact contact;

}
