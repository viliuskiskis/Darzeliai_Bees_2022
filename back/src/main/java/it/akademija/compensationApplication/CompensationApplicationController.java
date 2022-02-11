package it.akademija.compensationApplication;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.ApplicationStatus;
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
	public ResponseEntity<Set<CompensationApplicationInfoUser>>  getAllUserCompensationApplications(){
		
		String currentUsername = SecurityContextHolder
				.getContext()
				.getAuthentication()
				.getName();
		
		Set<CompensationApplicationInfoUser> compensationApplicationInfoUser = 
				new HashSet<CompensationApplicationInfoUser>();
			
		if (currentUsername != null) {
			
			compensationApplicationInfoUser = 
				compensationApplicationService
				.getAllUserCompensationApplications(currentUsername);
		
		return new ResponseEntity<Set<CompensationApplicationInfoUser>>(
				compensationApplicationInfoUser, HttpStatus.OK);
		}
		
		return new ResponseEntity<Set<CompensationApplicationInfoUser>>(
				compensationApplicationInfoUser, HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * Get compensation application for logged user by id
	 * @param id
	 * @return compensation application
	 */
	@Secured({ "ROLE_USER" })
	@GetMapping("/user/{id}")
	@ApiOperation(value = "Get compensation application by id")
	public ResponseEntity<CompensationApplicationInfo> getUserCompensationApplication(
			@ApiParam(value = "CompensationApplication id", required = true) 
			@PathVariable Long id){
		
		String currentUsername = SecurityContextHolder
				.getContext()
				.getAuthentication()
				.getName();
		
		if(id != null && compensationApplicationService
				.isCompensationApplicationPresentAndMatchesMainGuardian(id)) {
			
			CompensationApplicationInfo compensationApplicationInfo = 
					compensationApplicationService
					.getUserCompensationApplicationInfo(currentUsername, id);
			
			return new ResponseEntity<CompensationApplicationInfo>
					(compensationApplicationInfo, HttpStatus.OK );
		}
		return new ResponseEntity<CompensationApplicationInfo>
					(new CompensationApplicationInfo(), HttpStatus.BAD_REQUEST);
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
			@ApiParam(value = "CompensationApplication id", required = true) 
			@PathVariable Long id) {
		
		if(id != null && compensationApplicationService
					.isCompensationApplicationPresentAndMatchesMainGuardian(id)) {
			
				journalService.newJournalEntry(
						OperationType.APPLICATION_DELETED, 
						id, 
						ObjectType.COMPENSATIOAPPLICATION,
						"Ištrintas kompensacijos prašymas");
				
				compensationApplicationService
						.deleteUserCompensationApplicationById(id);
				
				return new ResponseEntity<String>
						("Ištrinta sėkmingai", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>
				("Prašymas kompensacijai nerastas", HttpStatus.NOT_FOUND);
	}
	
	/**
	 * 
	 * Update user compensation application by id
	 * 
	 * @param id
	 * @return message
	 */
	@Secured({ "ROLE_USER" })
	@PutMapping("/user/edit/{id}")
	@ApiOperation("Edit user application by id")
	public ResponseEntity<String> editUserCompensationApplication(
			@RequestBody CompensationApplicationDTO compensationApplicationdDTO, 
			@PathVariable Long id){
		
		if(id != null && compensationApplicationdDTO != null) {
			
			if(compensationApplicationService
					.isCompensationApplicationPresentAndMatchesMainGuardian(id)) {
				
				compensationApplicationService
						.editCompesationApplication(compensationApplicationdDTO, id);
				
				return new ResponseEntity<String>
					("Prašymas redaguotas sėkmingai", HttpStatus.OK);
			}
			
		}
	
		return new ResponseEntity<String>
				("Toks prašymas nerastas", HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * 
	 * Get information about compensation application by id
	 * 
	 * @param id
	 * @return CompensationApplication Info
	 */
	@Secured({ "ROLE_MANAGER" })
	@GetMapping("/manager/{id}")
	@ApiOperation("Get compensation application by id")
	public ResponseEntity<CompensationApplicationInfo> getCompensationApplication(
			@ApiParam(value = "CompensationApplication id", required = true) 
			@PathVariable Long id) {
		
		if(id != null) {
			CompensationApplicationInfo compensationApplicationInfo = 
					compensationApplicationService.getCompensationApplicationInfo(id);
			
			return new ResponseEntity<CompensationApplicationInfo>
					(compensationApplicationInfo, HttpStatus.OK);
		}
		
		return new ResponseEntity<CompensationApplicationInfo>
				(new CompensationApplicationInfo(), HttpStatus.BAD_REQUEST);

	}
	
	/**
	 * Get list of all compensation applications for manager
	 * 
	 * @return set compensation applications info
	 */
	@Secured({ "ROLE_MANAGER" })
	@GetMapping("/manager")
	@ApiOperation(value = "Get all compensations applications list")
	public Page<CompensationApplicationInfoUser>  getAllUserCompensationApplicationsInfoUser(
			@RequestParam(defaultValue = "0") Integer pageNumber, 
            @RequestParam(defaultValue = "20") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy) {
		
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
		
		return compensationApplicationService.getPageFromCompensationApplications(pageable);
	}
	
	/**
	 * Get list of all compensation applications for manager
	 * 
	 * @return set compensation applications info
	 */
	@Secured({ "ROLE_MANAGER" })
	@PostMapping("/manager/deactivate/{id}")
	@ApiOperation(value = "Deactivate compensation application")
	public ResponseEntity<String> deactivateCompensationApplication(
			@ApiParam(value = "CompensationApplication id", required = true)
			@PathVariable Long id) {
		
		if(id != null && compensationApplicationService
				.existsCompensationApplicationById(id)) {
			
			CompensationApplication compensationApplication = 
					compensationApplicationService.getCompensationApplicationById(id);
			
			if(compensationApplication.getApplicationStatus()
					.equals(ApplicationStatus.Patvirtintas)) {
				
				return new ResponseEntity<String>
						("Veiksmas negalimas. Prašymas jau patvirtintas.",
						HttpStatus.METHOD_NOT_ALLOWED);
				
			}
			
			LOG.info("**CompensationApplicationController: deaktyvuojamas prasymas [{}] **", id);
			
			compensationApplicationService
					.deactivateCompensationApplication(compensationApplication);
			
			return new ResponseEntity<String>
					("Kompensacijos prašymas deaktyvuotas", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>
				("Kompensacijos prašymas nerastas", HttpStatus.BAD_REQUEST);
	}
	
}
