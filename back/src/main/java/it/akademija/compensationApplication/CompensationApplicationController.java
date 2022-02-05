package it.akademija.compensationApplication;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import it.akademija.application.ApplicationController;
import it.akademija.application.management.RegistrationStatusService;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;

@RestController
@Api(value = "Compensation application")
@RequestMapping(path = "/api/kompensacijos")
public class CompensationApplicationController {
	
	private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);

	@Autowired
	private JournalService journalService;
	
	@Autowired
	private CompensationApplicationService compensationApplicationService;
	
	
	
	@Secured({ "ROLE_USER" })
	@PostMapping("/user/new")
	@ApiOperation(value = "Create new compensation application")
	public ResponseEntity<String> createNewCompensationApplication(
			@ApiParam(value = "Application", required = true) @Valid @RequestBody CompensationApplicationDTO compensationApplicationDTO) {
			
			String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
			
			CompensationApplication compensationApplication = compensationApplicationService.createNewCompensationApplication(compensationApplicationDTO);
			
			if (compensationApplication != null) {
				journalService.newJournalEntry(OperationType.APPLICATION_SUBMITED, 123L, ObjectType.COMPENSATIOAPPLICATION,
					"Sukurtas naujas prašymas");
				
				return new ResponseEntity<String>(compensationApplication.toString(), HttpStatus.OK);
			}
			else {
				return new ResponseEntity<String>( compensationApplicationDTO.toString(), HttpStatus.BAD_REQUEST);
			}
		
		
	}

}
