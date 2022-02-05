package it.akademija.compensationApplication;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.format.annotation.DateTimeFormat;

import it.akademija.application.ApplicationStatus;
import it.akademija.user.User;

@Entity
public class CompensationApplication {
	
	@Id
	@Column(name = "compensattion_application_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "user_id")
	private User mainGuardian;
	
	@Column(name = "date_of_submition")
	private LocalDate submitedAt;
	
	private ApplicationStatus aplicationStatus;
	
	
	private String childPersonalCode;
	

	private String childName;

	
	private String childSurname;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate birthdate;
	
	private LocalDate approvalDate;
	
	private String kindergartenName;
	
	private String kindergartenCode;
	
	private String kindergartenPhone;
	
	private String kindergartenEmail;
	
	private String kindergartenBankName;
	
	private String kindergartenBankAccount;
	
	private String kindergartenBankCode;
	
	@Override
	public String toString() {
		return "CompensationApplication [id=" + id + ", mainGuardian=" + mainGuardian + ", submitedAt=" + submitedAt
				+ ", aplicationStatus=" + aplicationStatus + ", childPersonalCode=" + childPersonalCode + ", childName="
				+ childName + ", childSurname=" + childSurname + ", birthdate=" + birthdate + ", approvalDate="
				+ approvalDate + ", kindergardenName=" + kindergartenName + ", kindergardenCode=" + kindergartenCode
				+ ", kindergardenPhone=" + kindergartenPhone + ", kindergardenEmail=" + kindergartenEmail
				+ ", kindergadenBankName=" + kindergartenBankName + ", kindergardenBankAccount="
				+ kindergartenBankAccount + ", kindergardenBankCode=" + kindergartenBankCode + "]";
	}

	public CompensationApplication() { }

	public CompensationApplication( LocalDate submitedAt, ApplicationStatus aplicationStatus, 
			String childPersonalCode,
			String childName,
			String childSurname,
			LocalDate birthdate, 
			String kindergardenName,
			String kindergardenCode,
			String kindergardenPhone,
			String kindergardenEmail,
			String kindergadenBankName,
			String kindergardenBankAccount,
			String kindergardenBankCode ) {
		super();
		
		this.submitedAt = submitedAt;
		this.aplicationStatus = aplicationStatus;
		this.childPersonalCode = childPersonalCode;
		this.childName = childName;
		this.childSurname = childSurname;
		this.birthdate = birthdate;
		this.kindergartenName = kindergardenName;
		this.kindergartenCode = kindergardenCode;
		this.kindergartenPhone = kindergardenPhone;
		this.kindergartenEmail = kindergardenEmail;
		this.kindergartenBankName = kindergadenBankName;
		this.kindergartenBankAccount = kindergardenBankAccount;
		this.kindergartenBankCode = kindergardenBankCode;
	}

	Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getSubmitedAt() {
		return submitedAt;
	}

	public void setSubmitedAt(LocalDate submitedAt) {
		this.submitedAt = submitedAt;
	}

	public String getChildPersonalCode() {
		return childPersonalCode;
	}

	public void setChildPersonalCode(String childPersonalCode) {
		this.childPersonalCode = childPersonalCode;
	}

	public String getChildName() {
		return childName;
	}

	public void setChildName(String childName) {
		this.childName = childName;
	}

	public String getChildSurname() {
		return childSurname;
	}

	public void setChildSurname(String childSurname) {
		this.childSurname = childSurname;
	}

	
	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public LocalDate getApprovalDate() {
		return approvalDate;
	}

	public void setApprovalDate(LocalDate approvalDate) {
		this.approvalDate = approvalDate;
	}

	public String getKindergartenName() {
		return kindergartenName;
	}

	public void setKindergartenName(String kindergartenName) {
		this.kindergartenName = kindergartenName;
	}

	public String getKindergartenCode() {
		return kindergartenCode;
	}

	public void setKindergartenCode(String kindergartenCode) {
		this.kindergartenCode = kindergartenCode;
	}

	public String getKindergartenPhone() {
		return kindergartenPhone;
	}

	public void setKindergartenPhone(String kindergartenPhone) {
		this.kindergartenPhone = kindergartenPhone;
	}

	public String getKindergartenEmail() {
		return kindergartenEmail;
	}

	public void setKindergartenEmail(String kindergartenEmail) {
		this.kindergartenEmail = kindergartenEmail;
	}

	public String getKindergartenBankName() {
		return kindergartenBankName;
	}

	public void setKindergartenBankName(String kindergartenBankName) {
		this.kindergartenBankName = kindergartenBankName;
	}

	public String getKindergartenBankAccount() {
		return kindergartenBankAccount;
	}

	public void setKindergartenBankAccount(String kindergartenBankAccount) {
		this.kindergartenBankAccount = kindergartenBankAccount;
	}

	public String getKindergartenBankCode() {
		return kindergartenBankCode;
	}

	public void setKindergartenBankCode(String kindergartenBankCode) {
		this.kindergartenBankCode = kindergartenBankCode;
	}

	public User getMainGuardian() {
		return mainGuardian;
	}

	public void setMainGuardian(User mainGuardian) {
		this.mainGuardian = mainGuardian;
	}

	public ApplicationStatus getAplicationStatus() {
		return aplicationStatus;
	}

	public void setAplicationStatus(ApplicationStatus aplicationStatus) {
		this.aplicationStatus = aplicationStatus;
	}
	
	
}
