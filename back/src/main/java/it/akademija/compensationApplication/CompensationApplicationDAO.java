package it.akademija.compensationApplication;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CompensationApplicationDAO extends JpaRepository<CompensationApplication, Long> {
	
	@Query("SELECT new it.akademija.compensationApplication.CompensationApplicationInfoUser("
			+ "a.id, "
			+ "c.childName, "
			+ "c.childSurname, "
			+ "k.name, "
			+ "a.status, "
			+ "a.submitedAt) "
			+ "FROM CompensationApplication a JOIN ChildData c ON"
			+ "a.compensationApplication.id=c.compensationApplication.id"
			+ "JOIN KindergartenData k ON"
			+ "a.compensationApplication.id=k.compensationApplication.id"
			+ "WHERE a.mainGuardian.username=?1")
	Set<CompensationApplicationInfoUser> findAllUserCompensationApplications(String currentUsername);
	
}
