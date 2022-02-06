package it.akademija.compensationApplication.kindergartenData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KindergartenDataService {
	
	@Autowired
	private KindergartenDataDAO kindergartenDataDAO;

	public KindergartenData creteNewKindergartenData(KindergartenDataDTO kindergartenDataDTO) {
		
		KindergartenData kindergartenData = new KindergartenData(
				kindergartenDataDTO.getEntityName(),
				kindergartenDataDTO.getCode(),
				kindergartenDataDTO.getPhone(),
				kindergartenDataDTO.getEmail(),
				kindergartenDataDTO.getAddress(),
				kindergartenDataDTO.getAccount(),
				kindergartenDataDTO.getBankCode(),
				kindergartenDataDTO.getBankName());
				
		kindergartenDataDAO.save(kindergartenData);
		
		return kindergartenData;
	}
}
