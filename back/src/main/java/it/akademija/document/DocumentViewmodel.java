package it.akademija.document;

import java.time.LocalDate;

public class DocumentViewmodel {

	private long documentId;
	private String name;
	private LocalDate uploadDate;
	private String userFirstName;
	private String userLastName;
	private String userPersonalCode;
	private Long userId;
	
	

	public DocumentViewmodel() {
		super();
	}

	public DocumentViewmodel(Long documentId, 
			String name, 
			LocalDate uploadDate) {
		super();
		this.documentId = documentId;
		this.name = name;
		this.uploadDate = uploadDate;
	}
	
	
	
	public DocumentViewmodel(long documentId, 
			String name, 
			LocalDate uploadDate, 
			String userFirstName,
			String userLastName, 
			String userPersonalCode, 
			Long userId) {
		super();
		this.documentId = documentId;
		this.name = name;
		this.uploadDate = uploadDate;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userPersonalCode = userPersonalCode;
		this.userId = userId;
	}

	
	public String getUserFirstName() {
		return userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
		return userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserPersonalCode() {
		return userPersonalCode;
	}

	public void setUserPersonalCode(String userPersonalCode) {
		this.userPersonalCode = userPersonalCode;
	}

	public long getDocumentId() {
		return documentId;
	}

	public void setDocumentId(long documentId) {
		this.documentId = documentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(LocalDate uploadDate) {
		this.uploadDate = uploadDate;
	}

	
}
