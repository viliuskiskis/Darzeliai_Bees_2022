package it.akademija.compensationApplication;

import it.akademija.user.UserDTO;

public class CompensationApplicationDTO {
	
	private String birthdate;
	private String childName;
	private String childPersonalCode;
	private String childSurname;
	private KindergardenData kindergartenData;
	private UserDTO mainGuardian;
	
	public CompensationApplicationDTO() {
		super();
	}

	public CompensationApplicationDTO(String birthdate, String childName, String childPersonalCode, String childSurname,
			KindergardenData kindergartenData, UserDTO mainGuardian) {
		super();
		this.birthdate = birthdate;
		this.childName = childName;
		this.childPersonalCode = childPersonalCode;
		this.childSurname = childSurname;
		this.kindergartenData = kindergartenData;
		this.mainGuardian = mainGuardian;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
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

	public KindergardenData getKindergartenData() {
		return kindergartenData;
	}

	public void setKindergartenData(KindergardenData kindergartenData) {
		this.kindergartenData = kindergartenData;
	}

	@Override
	public String toString() {
		return "CompensationApplicationDTO [birthdate=" + birthdate + ", childName=" + childName
				+ ", childPersonalCode=" + childPersonalCode + ", childSurname=" + childSurname + ", kindergartenData="
				+ kindergartenData + ", userDTO=" + mainGuardian + "]";
	}

	public UserDTO getMainGuardian() {
		return mainGuardian;
	}

	public void setMainGuardian(UserDTO mainGuardian) {
		this.mainGuardian = mainGuardian;
	}

	
	
	
	
	
	
}
