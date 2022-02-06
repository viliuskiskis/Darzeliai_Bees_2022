package it.akademija.compensationApplication;

import java.time.LocalDate;

import it.akademija.user.UserDTO;

public class CompensationApplicationDTO {
	
	private LocalDate birthdate;
	private String childName;
	private String childPersonalCode;
	private String childSurname;
	private KindergartenData kindergartenData;
	private UserDTO mainGuardian;
	
	public CompensationApplicationDTO() {
		super();
	}
	
	public CompensationApplicationDTO(LocalDate birthdate,
										String childName, 
										String childPersonalCode, 
										String childSurname,
										KindergartenData kindergartenData, 
										UserDTO mainGuardian) {
		super();
		this.birthdate = birthdate;
		this.childName = childName;
		this.childPersonalCode = childPersonalCode;
		this.childSurname = childSurname;
		this.kindergartenData = kindergartenData;
		this.mainGuardian = mainGuardian;
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

	public KindergartenData getKindergartenData() {
		return kindergartenData;
	}

	public void setKindergartenData(KindergartenData kindergartenData) {
		this.kindergartenData = kindergartenData;
	}

	public UserDTO getMainGuardian() {
		return mainGuardian;
	}

	public void setMainGuardian(UserDTO mainGuardian) {
		this.mainGuardian = mainGuardian;
	}

	@Override
	public String toString() {
		return "CompensationApplicationDTO [birthdate=" + birthdate + ", childName=" + childName
				+ ", childPersonalCode=" + childPersonalCode + ", childSurname=" + childSurname + ", kindergartenData="
				+ kindergartenData + ", mainGuardian=" + mainGuardian + "]";
	}

	
}