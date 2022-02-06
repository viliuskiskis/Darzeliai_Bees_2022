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
	
	private UserService userService;

	public void createNewCompensationApplication(CompensationApplicationDTO compensationApplicationDTO) {
		CompensationApplication compensationApplication = new CompensationApplication();
		
		User user = userService.getUserByUsername(compensationApplicationDTO.getUserDTO().getUsername());
		compensationApplication.setMainGuardian(user);
		compensationApplication.setSubmitedAt(LocalDate.now());
		compensationApplication.setAplicationStatus(ApplicationStatus.Pateiktas);
		compensationApplication.setChildPersonalCode(compensationApplicationDTO.getChildPersonalCode());
		compensationApplication.setChildName(compensationApplication.getChildName());
		compensationApplication.setChildSurname(compensationApplication.getChildSurname());
		compensationApplication.setBirthdate(compensationApplication.getBirthdate());
		compensationApplication.setKindergardenName(compensationApplicationDTO.getKindergartenData().getBankName());
		compensationApplication.setKindergardenCode(compensationApplicationDTO.getKindergartenData().getCode());
		compensationApplication.setKindergardenPhone(compensationApplicationDTO.getKindergartenData().getPhone());
		compensationApplication.setKindergardenEmail(compensationApplicationDTO.getKindergartenData().getEmail());
		compensationApplication.setKindergadenBankName(compensationApplicationDTO.getKindergartenData().getBankName());
		compensationApplication.setKindergardenBankAccount(compensationApplicationDTO.getKindergartenData().getAccount());
		compensationApplication.setKindergardenBankCode(compensationApplicationDTO.getKindergartenData().getBankCode());
		
		compensationApplicationDAO.save(compensationApplication);
	}
}
