package it.akademija.compensationApplication;

import java.time.LocalDate;

import it.akademija.application.ApplicationStatus;

public class CompensationApplicationInfoUser {
	
	private Long id;
    private String childName;
    private String childSurname;
    private String kindergartenName;
    private ApplicationStatus status;
    private LocalDate submitedAt;
    
	public CompensationApplicationInfoUser(Long id, 
				String childName, 
				String childSurname, 
				String kindergartenName,
				ApplicationStatus status, LocalDate submitedAt) {
		super();
		this.id = id;
		this.childName = childName;
		this.childSurname = childSurname;
		this.kindergartenName = kindergartenName;
		this.status = status;
		this.submitedAt = submitedAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getKindergartenName() {
		return kindergartenName;
	}

	public void setKindergartenName(String kindergartenName) {
		this.kindergartenName = kindergartenName;
	}

	public ApplicationStatus getStatus() {
		return status;
	}

	public void setStatus(ApplicationStatus status) {
		this.status = status;
	}

	public LocalDate getSubmitedAt() {
		return submitedAt;
	}

	public void setSubmitedAt(LocalDate submitedAt) {
		this.submitedAt = submitedAt;
	}
    
    

}
