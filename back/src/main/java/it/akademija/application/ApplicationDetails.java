package it.akademija.application;

import java.time.LocalDate;

import it.akademija.kindergartenchoise.KindergartenChoicesDTO;
import it.akademija.user.ParentDetailsDTO;
import it.akademija.user.UserInfo;

public class ApplicationDetails {

    private Long id;
    private LocalDate submitedAt;
    private ApplicationStatus status;
    private String childName;
    private String childSurname;
    private String childPersonalCode;
    private LocalDate approvalDate;
    private LocalDate birthdate;
    private Integer numberInWaitingList;
    private UserInfo mainGuardian;
    private ParentDetailsDTO additionalGuardian;
    private String approvedKindergaren;
    private KindergartenChoicesDTO kindergartenChoices;

    public ApplicationDetails() {
	super();
    }

    public ApplicationDetails(Long id, LocalDate submitedAt, ApplicationStatus status, String childName,
	    String childSurname, String childPersonalCode, LocalDate approvalDate, LocalDate birthdate,
	    Integer numberInWaitingList, String approvedKindergarten) {
	super();
	this.id = id;
	this.submitedAt = submitedAt;
	this.status = status;
	this.childName = childName;
	this.childSurname = childSurname;
	this.childPersonalCode = childPersonalCode;
	this.approvalDate = approvalDate;
	this.birthdate = birthdate;
	this.numberInWaitingList = numberInWaitingList;
	this.approvedKindergaren = approvedKindergarten;
    }

    public Long getId() {
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

    public ApplicationStatus getStatus() {
	return status;
    }

    public void setStatus(ApplicationStatus status) {
	this.status = status;
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

    public String getChildPersonalCode() {
	return childPersonalCode;
    }

    public void setChildPersonalCode(String childPersonalCode) {
	this.childPersonalCode = childPersonalCode;
    }

    public LocalDate getApprovalDate() {
	return approvalDate;
    }

    public void setApprovalDate(LocalDate approvalDate) {
	this.approvalDate = approvalDate;
    }

    public LocalDate getBirthdate() {
	return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
	this.birthdate = birthdate;
    }

    public Integer getNumberInWaitingList() {
	return numberInWaitingList;
    }

    public void setNumberInWaitingList(Integer numberInWaitingList) {
	this.numberInWaitingList = numberInWaitingList;
    }

    public UserInfo getMainGuardian() {
	return mainGuardian;
    }

    public void setMainGuardian(UserInfo mainGuardian) {
	this.mainGuardian = mainGuardian;
    }

    public ParentDetailsDTO getAdditionalGuardian() {
	return additionalGuardian;
    }

    public void setAdditionalGuardian(ParentDetailsDTO additionalGuardian) {
	this.additionalGuardian = additionalGuardian;
    }

    public String getApprovedKindergaren() {
	return approvedKindergaren;
    }

    public void setApprovedKindergaren(String approvedKindergaren) {
	this.approvedKindergaren = approvedKindergaren;
    }

    public KindergartenChoicesDTO getKindergartenChoices() {
	return kindergartenChoices;
    }

    public void setKindergartenChoices(KindergartenChoicesDTO kindergartenChoices) {
	this.kindergartenChoices = kindergartenChoices;
    }

}
