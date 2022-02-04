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
		compensationApplication.setKindergardenName(compensationApplicationDTO.getKindergartenData().getEntityName());
		compensationApplication.setKindergardenCode(compensationApplicationDTO.getKindergartenData().getCode());
		compensationApplication.setKindergardenPhone(compensationApplicationDTO.getKindergartenData().getPhone());
		compensationApplication.setKindergardenEmail(compensationApplicationDTO.getKindergartenData().getEmail());
		compensationApplication.setKindergadenBankName(compensationApplicationDTO.getKindergartenData().getBankName());
		compensationApplication.setKindergardenBankAccount(compensationApplicationDTO.getKindergartenData().getAccount());
		compensationApplication.setKindergardenBankCode(compensationApplicationDTO.getKindergartenData().getBankCode());
		
		compensationApplicationDAO.save(compensationApplication);
		
		return compensationApplication;
	}
}
