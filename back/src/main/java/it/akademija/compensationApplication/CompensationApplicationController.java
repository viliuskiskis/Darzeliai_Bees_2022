package it.akademija.compensationApplication;

import java.util.Set;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	private static final Logger LOG = LoggerFactory.getLogger(CompensationApplicationController.class);

	@Autowired
	private JournalService journalService;
	
	@Autowired
	private CompensationApplicationService compensationApplicationService;
	
	
	/**
	 * 
	 * Create new compensation application for logged user
	 * 
	 * @param compensationApplicationDTO
	 * @return message
	 */
	@Secured({ "ROLE_USER" })
	@PostMapping("/user/new")
	@ApiOperation(value = "Create new compensation application")
	public ResponseEntity<String> createNewCompensationApplication(
			@ApiParam(value = "Application", required = true) 
			@Valid 
			@RequestBody CompensationApplicationDTO compensationApplicationDTO) {

		if(compensationApplicationDTO != null) {
			
			String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
			
			if(compensationApplicationService.childExistsByPersonalCode(compensationApplicationDTO.getChildPersonalCode())) {
				
				LOG.warn("Naudotojas [{}] bandė registruoti kompensacijos prašymą jau registruotam vaikui su asmens kodu [{}]",
						currentUsername, compensationApplicationDTO.getChildPersonalCode());
				
				return new ResponseEntity<String>("Kompensacijos prašymas vaikui su tokiu asmens kodu jau yra registruotas", HttpStatus.CONFLICT);
			}
			
			else {
				
				compensationApplicationService.createNewCompensationApplication(compensationApplicationDTO);
			
				journalService.newJournalEntry(OperationType.APPLICATION_SUBMITED, 123L, ObjectType.COMPENSATIOAPPLICATION,
					"Sukurtas naujas prašymas");
				
				return new ResponseEntity<String>( "Kompensacijos prašymas sukuras sėkmingai", HttpStatus.OK);
			}	
		}
		
		return new ResponseEntity<String>("Prašymo sukurti nepavyko", HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * Get list of all compensation applications for logged user
	 * 
	 * @return set compensation applications
	 */
	@Secured({ "ROLE_USER" })
	@GetMapping("/user")
	@ApiOperation(value = "Get all user applications")
	public Set<CompensationApplicationInfoUser> getAllUserCompensationApplications(){
		
		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		
		return compensationApplicationService.getAllUserCompensationApplications(currentUsername);
	}
	
	/**
	 * Get compensation application for logged user by id
	 * @param id
	 * @return compensation application
	 */
	@Secured({ "ROLE_USER" })
	@GetMapping("/user/{id}")
	@ApiOperation(value = "Get all user applications")
	public CompensationApplicationInfo getUserCompensationApplication(
			@ApiParam(value = "CompensationApplication id", required = true) @PathVariable Long id){
		if(id != null) {
			String currentUsername = SecurityContextHolder
				.getContext()
				.getAuthentication()
				.getName();
		
			return compensationApplicationService
					.getUserCompensationApplication(currentUsername, id);
		}
		return null;
	}
	
	/**
	 * 
	 * Delete user compensation application by id
	 * 
	 * @param id
	 * @return message
	 */

	@Secured({ "ROLE_USER" })
	@DeleteMapping("/user/delete/{id}")
	@ApiOperation("Delete user application by id")
	public ResponseEntity<String> deleteUserCompensationApplication(
			@ApiParam(value = "CompensationApplication id", required = true) @PathVariable Long id) {
		
		if(id != null) {
			
			boolean isCompensationApplicationPresentAndMatchesMainGuardian = 
					compensationApplicationService.deleteUserCompensationApplicationById(id);
			
			if(isCompensationApplicationPresentAndMatchesMainGuardian) {
				
				journalService.newJournalEntry(OperationType.APPLICATION_DELETED, id, ObjectType.COMPENSATIOAPPLICATION,
						"Ištrintas kompensacijos prašymas");
				
				return new ResponseEntity<String>("Ištrinta sėkmingai", HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<String>("Prašymas kompensacijai nerastas", HttpStatus.NOT_FOUND);
	}
	
}
