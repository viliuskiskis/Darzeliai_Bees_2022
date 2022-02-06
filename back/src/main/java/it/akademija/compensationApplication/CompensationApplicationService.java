package it.akademija.compensationApplication;



import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.akademija.application.ApplicationStatus;
import it.akademija.user.User;
import it.akademija.user.UserService;

@Service
public class CompensationApplicationService {
	
	@Autowired
	private CompensationApplicationDAO compensationApplicationDAO;
	
	@Autowired
	private UserService userService;

	public CompensationApplication createNewCompensationApplication(CompensationApplicationDTO compensationApplicationDTO) {
		CompensationApplication compensationApplication = new CompensationApplication();
		
		
		
		User user = userService.getUserByUsername(compensationApplicationDTO.getMainGuardian().getUsername());
		compensationApplication.setMainGuardian(user);
		compensationApplication.setSubmitedAt(LocalDate.now());
		compensationApplication.setAplicationStatus(ApplicationStatus.Pateiktas);
		compensationApplication.setChildPersonalCode(compensationApplicationDTO.getChildPersonalCode());
		compensationApplication.setChildName(compensationApplicationDTO.getChildName());
		compensationApplication.setChildSurname(compensationApplicationDTO.getChildSurname());
		compensationApplication.setBirthdate(compensationApplicationDTO.getBirthdate());
		compensationApplication.setKindergartenName(compensationApplicationDTO.getKindergartenData().getEntityName());
		compensationApplication.setKindergartenCode(compensationApplicationDTO.getKindergartenData().getCode());
		compensationApplication.setKindergartenPhone(compensationApplicationDTO.getKindergartenData().getPhone());
		compensationApplication.setKindergartenEmail(compensationApplicationDTO.getKindergartenData().getEmail());
		compensationApplication.setKindergartenBankName(compensationApplicationDTO.getKindergartenData().getBankName());
		compensationApplication.setKindergartenBankAccount(compensationApplicationDTO.getKindergartenData().getAccount());
		compensationApplication.setKindergartenBankCode(compensationApplicationDTO.getKindergartenData().getBankCode());
		
		compensationApplicationDAO.save(compensationApplication);
		
		return compensationApplication;
	}
}
