package it.akademija.journal;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JournalEntryDAO extends JpaRepository<JournalEntry, Long>{
	
	@Query("SELECT j FROM JournalEntry j")
	Page<JournalEntry> getAllJournalEntries(Pageable pageable);
	
	@Query("SELECT j FROM JournalEntry j WHERE j.userName LIKE(CONCAT('%', ?1, '%'))")
	Page<JournalEntry> getAllJournalEntriesByUsername(String filter, Pageable pageable);
	
	List<JournalEntry> findByUserName(String username);
}
