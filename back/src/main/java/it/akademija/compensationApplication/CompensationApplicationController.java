package it.akademija.compensationApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@Api(value = "Compensation application")
@RequestMapping(path = "/api/kompensacijosPrasymai")
public class CompensationApplicationController {
	
	@Autowired
	private CompensationApplicationService compensationApplicationService;
	
	@PostMapping("/user/new")
	@ApiOperation(value = "Create new compensation application")
	public ResponseEntity<String> createNewCompensationApplicatio(
			@RequestBody CompensationApplicationDTO compensationApplicationDTO) {
		
		if (compensationApplicationDTO != null && 
			compensationApplicationDTO.getKindergartenData() != null &&
			compensationApplicationDTO.getUserDTO() != null) {
		
			compensationApplicationService.createNewCompensationApplication(compensationApplicationDTO);
			return new ResponseEntity<String>("Prasymas nuejo i servisa", HttpStatus.OK);
			
		}
		else {
			return new ResponseEntity<String>("Nu, seniukai, paduok gerų duomenų", HttpStatus.BAD_REQUEST);
		}
		
		
	}

}
