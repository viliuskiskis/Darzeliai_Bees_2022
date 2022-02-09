package it.akademija.compensationApplication;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CompensationApplicationDAO extends JpaRepository<CompensationApplication, Long> {
																																																																															
	@Query(value ="SELECT new it.akademija.compensationApplication.CompensationApplicationInfoUser("
			+ "ca.id, "
			+ "ca.applicationStatus, "
			+ "ca.submitedAt, "
			+ "cd.childName, "
			+ "cd.childSurname, "
			+ "kd.entityName) "
			+ "FROM CompensationApplication ca "
			+ "JOIN ChildData cd "
			+ "ON ca.id = cd.compensationApplication.id "
			+ "JOIN KindergartenData kd "
			+ "ON ca.id = kd.compensationApplication.id "
			+ "WHERE ca.mainGuardian.username=?1",
			nativeQuery = false)							
	Set<CompensationApplicationInfoUser> findAllUserCompensationApplications(String currentUsername);
	
	@Query(value="SELECT new it.akademija.compensationApplication.CompensationApplicationInfo("
			+ "ca.id, "
			+ "ca.submitedAt, "
			+ "ca.applicationStatus, "
			+ "ca.approvalDate) "
			+ "FROM CompensationApplication ca "
			+ "WHERE ca.mainGuardian.username=?1 AND ca.id = ?2", 
			nativeQuery = false)
	CompensationApplicationInfo findUserCompensationApplication(String currentUsername, Long id);

	
	
}
