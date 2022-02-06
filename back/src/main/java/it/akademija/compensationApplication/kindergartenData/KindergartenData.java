package it.akademija.compensationApplication.kindergartenData;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import it.akademija.compensationApplication.CompensationApplication;


@Entity
public class KindergartenData {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@OneToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "compensation_application_id")
	private CompensationApplication compensationApplication;
	
	private String entityName;
	private String code;
	private String phone;
	private String email;
	private String address;
	private String account;
	private String bankCode;
	private String bankName;
	
	public KindergartenData() {
		super();
	}

	public KindergartenData(String entityName, String code,
			String phone, String email, String address, String account, String bankCode, String bankName) {
		super();
		this.entityName = entityName;
		this.code = code;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.account = account;
		this.bankCode = bankCode;
		this.bankName = bankName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getBankCode() {
		return bankCode;
	}

	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public CompensationApplication getCompensationApplication() {
		return compensationApplication;
	}

	public void setCompensationApplication(CompensationApplication compensationApplication) {
		this.compensationApplication = compensationApplication;
	}

}
