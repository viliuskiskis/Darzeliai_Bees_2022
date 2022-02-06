package it.akademija.compensationApplication;

import java.time.LocalDate;

import it.akademija.compensationApplication.kindergartenData.KindergartenDataDTO;
import it.akademija.user.UserDTO;

public class CompensationApplicationDTO {
	
	private LocalDate birthdate;
	private String childName;
	private String childPersonalCode;
	private String childSurname;
	private KindergartenDataDTO kindergartenData;
	private UserDTO mainGuardian;
	
	public CompensationApplicationDTO() {
		super();
	}
	
	public CompensationApplicationDTO(LocalDate birthdate, String childName, 
										String childPersonalCode, 
										String childSurname,
										KindergartenDataDTO kindergartenData, 
										UserDTO mainGuardian) {
		super();
		this.kindergartenData = kindergartenData;
		this.mainGuardian = mainGuardian;
	}

	public UserDTO getMainGuardian() {
		return mainGuardian;
	}

	public void setMainGuardian(UserDTO mainGuardian) {
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

	public KindergartenDataDTO getKindergartenData() {
		return kindergartenData;
	}

	public void setKindergartenData(KindergartenDataDTO kindergartenData) {
		this.kindergartenData = kindergartenData;
	}

	@Override
	public String toString() {
		return "CompensationApplicationDTO [birthdate=" + birthdate + ", childName=" + childName
				+ ", childPersonalCode=" + childPersonalCode + ", childSurname=" + childSurname
				+ ", kindergartenDataDTO=" + kindergartenData + ", mainGuardian=" + mainGuardian + "]";
	}

	

	
}