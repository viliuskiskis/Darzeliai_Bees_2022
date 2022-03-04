package it.akademija.journal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
public class JournalController {

    @Autowired
    private JournalService journalService;

    /**
     * Get page of journal entries filtered by part of username
     * 
     * @param page - page number
     * @param size - number of entries in a page
     * @param filter - part of username
     * @return page of journal entries
     */
    @Secured({ "ROLE_ADMIN" })
    @GetMapping(path = "/admin/getjournal/page")
    @ApiOperation(value = "Show all journal entries",
    		notes = "Showing all journal entries filtered by part of username")
    public ResponseEntity<Page<JournalEntry>> getJournalEntriesPage(
	    @RequestParam(value = "page", required = false, defaultValue = "0") int page,
	    @RequestParam(value = "size", required = false, defaultValue = "10") int size,
	    @RequestParam(value = "filter", required = false, defaultValue = "") String filter) {

	Sort.Order order = new Sort.Order(Sort.Direction.DESC, "eventTime");

	Pageable pageable = PageRequest.of(page, size, Sort.by(order));

	return new ResponseEntity<>(journalService.getAllJournalEntries(pageable, filter.trim()), HttpStatus.OK);
    }

    public JournalService getJournalService() {
	return journalService;
    }

    public void setJournalService(JournalService journalService) {
	this.journalService = journalService;
    }

}
