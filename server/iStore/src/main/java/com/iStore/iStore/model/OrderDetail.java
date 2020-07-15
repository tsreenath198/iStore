package com.iStore.iStore.model;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.iStore.iStore.constants.PaymentMode;

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
	private Integer totalDiscount;
	@Column
	private Integer activeFlag = 0;
	@Enumerated(EnumType.STRING)
	private PaymentMode paymentMode;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "orderId")
	private List<Item> items;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "contact", referencedColumnName = "id", nullable = true)
	private Contact contact;

}
