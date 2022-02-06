package it.akademija.compensationApplication.childData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.akademija.compensationApplication.CompensationApplicationDTO;

@Service
public class ChildDataService {
	
	@Autowired
	private ChildDataDAO childDataDAO;

	public ChildData createNewChildData(CompensationApplicationDTO compensationApplicationDTO) {
		
		ChildData childData = new ChildData();
		
		childData.setBirthdate(compensationApplicationDTO.getBirthdate());
		childData.setChildName(compensationApplicationDTO.getChildName());
		childData.setChildSurname(compensationApplicationDTO.getChildSurname());
		childData.setChildPersonalCode(compensationApplicationDTO.getChildPersonalCode());
		
		childDataDAO.save(childData);
		
		return childData;
	}
	
}
