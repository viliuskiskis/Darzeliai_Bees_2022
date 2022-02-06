package it.akademija.compensationApplication.childData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildDataDAO extends JpaRepository<ChildData, Long> {

}
