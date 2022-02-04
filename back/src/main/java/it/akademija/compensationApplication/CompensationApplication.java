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
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import it.akademija.application.ApplicationStatus;
import it.akademija.user.User;

@Entity
public class CompensationApplication {
	
	@Id
	@Column(name = "compensationApplication_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "user_id")
	private User mainGuardian;
	
	@Column(name = "date_of_submition")
	LocalDate submitedAt;
	
	private ApplicationStatus aplicationStatus;
	
	@Pattern(regexp = "^(?!\\s*$)[0-9\\s]{11}$|")
	private String childPersonalCode;
	
	@NotEmpty(message = "Vardas privalomas!")
	@Size(min = 2, max = 70)
	@Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
	private String childName;

	@NotEmpty(message = "Pavardė privaloma!")
	@Size(min = 2, max = 70)
	@Pattern(regexp = "^\\p{L}+(?: \\p{L}+)*$")
	private String childSurname;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate birthdate;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate approvalDate;
	
	@NotEmpty(message = "Ugdymo įstaigos pavadinimas privalomas!")
	@Size(min = 2, max = 70)
	private String kindergardenName;
	
	@NotEmpty(message = "Ugdymo įstaigos kodas privalomas!")
	@Pattern(regexp = "[0-9]{9}")
	private String kindergardenCode;
	
	@NotEmpty(message = "Ugdymo įstaigos telefono numeris privalomas!")
	@Pattern(regexp = "[+]?[0-9]{4,17}")
	private String kindergardenPhone;
	
	@NotEmpty(message = "Ugdymo įstaigos elektroninio pašto adresas privalomas!")
	@Pattern(regexp = "\"^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$\"")
	private String kindergardenEmail;
	
	@NotEmpty(message = "Ugdymo įstaigos banko pavadinimas privalomas!")
	@Size(min = 2, max = 50)
	private String kindergadenBankName;
	
	@NotEmpty(message = "Ugdymo įstaigos banko sąskaitos numeris privalomas!")
	@Pattern(regexp = "[A-Za-z]{2}[0-9]{2}[A-z0-9]{11,30}")
	private String kindergardenBankAccount;
	
	@NotEmpty(message = "Ugdymo įstaigos banko kodas privalomas!")
	@Pattern(regexp = "[A-Za-z]{6}[A-Za-z0-9]{2,5}")
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

	public CompensationApplication(User mainGuardian, LocalDate submitedAt, ApplicationStatus aplicationStatus, 
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
		this.mainGuardian = mainGuardian;
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
