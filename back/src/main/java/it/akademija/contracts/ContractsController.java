package it.akademija.contracts;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.management.RegistrationStatusService;
import it.akademija.journal.JournalService;

@RestController
@Api(value = "contractsBlah")
@RequestMapping(path = "/api/contract")
public class ContractsController {
    
    private static final Logger LOG = LoggerFactory.getLogger(ContractsController.class);

    @Autowired
    private ContractsService contractsService;

    @Autowired
    private RegistrationStatusService registrationStatusService;
    
    @Autowired
    private JournalService journalService;
    
    /**
     * Get contract for logged user by application id
     * @param id
     * @return contract PDF
     */
    @Secured({"ROLE_USER"})
    @GetMapping("/user/{id}")
    @ApiOperation(value = "Get contract by application id and username")
    public ResponseEntity<byte[]> getUserContract(
	    @ApiParam(value = "Application id", required = true) @PathVariable Long id) {
	
		if(id != null) {
		    return contractsService.generateContractPDF(id);
		}
		return new ResponseEntity<byte[]>(new byte[0], HttpStatus.BAD_REQUEST);
	    }
    
    /**
     * Get contract for logged manager by application id
     * @param id
     * @return contract PDF
     */
    @Secured({"ROLE_MANAGER"})
    @GetMapping("/manager/{id}")
    @ApiOperation(value = "Get contract by application id")
    public String getManagerContract(
	    @ApiParam(value = "Application id", required = true) @PathVariable Long id) {
		if(id != null) {
		    return "Čia gausi kontraktą (PDF)";
		}
		return "Čia gausi klaidą, nes neatsiuntei id";
	    }
    
}
