package it.akademija.compensationApplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompensationApplicationDAO extends JpaRepository<CompensationApplication, Long> {

}
