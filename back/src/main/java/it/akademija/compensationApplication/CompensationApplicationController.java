package it.akademija.compensationApplication;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;

@RestController
@Api(value = "Compensation application")
@RequestMapping(path = "/api/kompensacijos")
public class CompensationApplicationController {
	
	//private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);

	@Autowired
	private JournalService journalService;
	
	@Autowired
	private CompensationApplicationService compensationApplicationService;
	
	
	
	@Secured({ "ROLE_USER" })
	@PostMapping("/user/new")
	@ApiOperation(value = "Create new compensation application")
	public ResponseEntity<String> createNewCompensationApplication(
			@ApiParam(value = "Application", required = true) 
			@Valid 
			@RequestBody CompensationApplicationDTO compensationApplicationDTO) {

		if (compensationApplicationDTO != null) {
			
			if(compensationApplicationService.childExistsByPersonalCode(compensationApplicationDTO.getChildPersonalCode())) {
				
			}
			CompensationApplication compensationApplication = compensationApplicationService.createNewCompensationApplication(compensationApplicationDTO);
			
			String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
			
			
			
			journalService.newJournalEntry(OperationType.APPLICATION_SUBMITED, 123L, ObjectType.COMPENSATIOAPPLICATION,
				"Sukurtas naujas prašymas");
			return new ResponseEntity<String>( "Kompensacijos prašymas sukuras sėkmingai", HttpStatus.OK);
		}
			
		return new ResponseEntity<String>("Prašymo sukurti nepavyko", HttpStatus.BAD_REQUEST);
		
	}

}
