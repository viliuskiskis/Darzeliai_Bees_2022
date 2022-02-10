package it.akademija.compensationApplication.childData;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import it.akademija.compensationApplication.CompensationApplication;

@Entity
public class ChildData {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@OneToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "compensation_application_id")
	private CompensationApplication compensationApplication;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate birthdate;
	
	@NotEmpty(message = "Vardas privalomas!")
	@Size(min = 2, max = 70)
	@Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
	private String childName;
	
	@NotEmpty(message = "Pavardė privaloma!")
	@Size(min = 2, max = 70)
	@Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
	private String childSurname;
	
	@Pattern(regexp = "^(?!\\s*$)[0-9\\s]{11}$|")
	private String childPersonalCode;
	

	public ChildData() {
		super();
	}
	
	public ChildData(LocalDate birthdate, String childName, String childPersonalCode, String childSurname) {
		super();
		this.birthdate = birthdate;
		this.childName = childName;
		this.childPersonalCode = childPersonalCode;
		this.childSurname = childSurname;
	}

	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public String getChildName() {
		return childName;
	}

	public void setChildName(String childName) {
		this.childName = childName;
	}

	public String getChildPersonalCode() {
		return childPersonalCode;
	}

	public void setChildPersonalCode(String childPersonalCode) {
		this.childPersonalCode = childPersonalCode;
	}

	public String getChildSurname() {
		return childSurname;
	}

	public void setChildSurname(String childSurname) {
		this.childSurname = childSurname;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CompensationApplication getCompensationApplication() {
		return compensationApplication;
	}

	public void setCompensationApplication(CompensationApplication compensationApplication) {
		this.compensationApplication = compensationApplication;
	}

}
