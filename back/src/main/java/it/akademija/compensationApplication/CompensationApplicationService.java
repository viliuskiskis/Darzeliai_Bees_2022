package it.akademija.compensationApplication;



import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.akademija.application.ApplicationStatus;
import it.akademija.compensationApplication.childData.ChildData;
import it.akademija.compensationApplication.childData.ChildDataService;
import it.akademija.compensationApplication.kindergartenData.KindergartenData;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataService;
import it.akademija.user.User;
import it.akademija.user.UserService;

@Service
public class CompensationApplicationService {
	
	@Autowired
	private CompensationApplicationDAO compensationApplicationDAO;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private KindergartenDataService kindergartenDataService;
	
	@Autowired
	private ChildDataService childDataService;
	
	public CompensationApplication createNewCompensationApplication(CompensationApplicationDTO compensationApplicationDTO) {
		
		CompensationApplication compensationApplication = new CompensationApplication();
		
		User user = userService.getUserByUsername(compensationApplicationDTO.getMainGuardian().getUsername());
		compensationApplication.setMainGuardian(user);
		
		KindergartenData kindergartenData = kindergartenDataService.creteNewKindergartenData(compensationApplicationDTO.getKindergartenData());
		compensationApplication.setKindergartenData(kindergartenData);
		
		ChildData childData = childDataService.createNewChildData(compensationApplicationDTO);
		compensationApplication.setChildData(childData);

		compensationApplication.setSubmitedAt(LocalDate.now());
		compensationApplication.setAplicationStatus(ApplicationStatus.Pateiktas);
		
		compensationApplicationDAO.save(compensationApplication);
		
		childData.setCompensationApplication(compensationApplication);
		kindergartenData.setCompensationApplication(compensationApplication);
		
		return compensationApplication;
	}

	public boolean childExistsByPersonalCode(String childPersonalCode) {
		return childDataService.childExistsByPersonalCode(childPersonalCode);
	}
}
