package it.akademija.compensationApplication.kindergartenData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KindergartenDataDAO extends JpaRepository<KindergartenData, Long> {

}
