package it.akademija.compensationApplication;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import it.akademija.application.ApplicationStatus;
import it.akademija.user.User;

@Entity
public class CompensationApplication {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "user_id")
	private User mainGuardian;
	
	private LocalDate submitedAt;
	
	private ApplicationStatus aplicationStatus;
	
	
	private String childPersonalCode;
	

	private String childName;

	
	private String childSurname;
	
	private LocalDate birthdate;
	
	private LocalDate approvalDate;
	
	private String kindergardenName;
	
	private String kindergardenCode;
	
	private String kindergardenPhone;
	
	private String kindergardenEmail;
	
	private String kindergadenBankName;
	
	private String kindergardenBankAccount;
	
	private String kindergardenBankCode;
	
	@Override
	public String toString() {
		return "CompensationApplication [id=" + id + ", mainGuardian=" + mainGuardian + ", submitedAt=" + submitedAt
				+ ", aplicationStatus=" + aplicationStatus + ", childPersonalCode=" + childPersonalCode + ", childName="
				+ childName + ", childSurname=" + childSurname + ", birthdate=" + birthdate + ", approvalDate="
				+ approvalDate + ", kindergardenName=" + kindergardenName + ", kindergardenCode=" + kindergardenCode
				+ ", kindergardenPhone=" + kindergardenPhone + ", kindergardenEmail=" + kindergardenEmail
				+ ", kindergadenBankName=" + kindergadenBankName + ", kindergardenBankAccount="
				+ kindergardenBankAccount + ", kindergardenBankCode=" + kindergardenBankCode + "]";
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
		this.kindergardenName = kindergardenName;
		this.kindergardenCode = kindergardenCode;
		this.kindergardenPhone = kindergardenPhone;
		this.kindergardenEmail = kindergardenEmail;
		this.kindergadenBankName = kindergadenBankName;
		this.kindergardenBankAccount = kindergardenBankAccount;
		this.kindergardenBankCode = kindergardenBankCode;
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

	public String getKindergardenName() {
		return kindergardenName;
	}

	public void setKindergardenName(String kindergardenName) {
		this.kindergardenName = kindergardenName;
	}

	public String getKindergardenCode() {
		return kindergardenCode;
	}

	public void setKindergardenCode(String kindergardenCode) {
		this.kindergardenCode = kindergardenCode;
	}

	public String getKindergardenPhone() {
		return kindergardenPhone;
	}

	public void setKindergardenPhone(String kindergardenPhone) {
		this.kindergardenPhone = kindergardenPhone;
	}

	public String getKindergardenEmail() {
		return kindergardenEmail;
	}

	public void setKindergardenEmail(String kindergardenEmail) {
		this.kindergardenEmail = kindergardenEmail;
	}

	public String getKindergadenBankName() {
		return kindergadenBankName;
	}

	public void setKindergadenBankName(String kindergadenBankName) {
		this.kindergadenBankName = kindergadenBankName;
	}

	public String getKindergardenBankAccount() {
		return kindergardenBankAccount;
	}

	public void setKindergardenBankAccount(String kindergardenBankAccount) {
		this.kindergardenBankAccount = kindergardenBankAccount;
	}

	public String getKindergardenBankCode() {
		return kindergardenBankCode;
	}

	public void setKindergardenBankCode(String kindergardenBankCode) {
		this.kindergardenBankCode = kindergardenBankCode;
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
