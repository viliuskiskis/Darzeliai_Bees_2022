package it.akademija.compensationApplication;

import static org.junit.Assert.assertTrue;

import java.time.LocalDate;


import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.jupiter.api.Order;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.compensationApplication.kindergartenData.KindergartenDataDTO;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;

@RunWith(MockitoJUnitRunner.class)
public class CompensationApplicationServiceTest {
	
	@InjectMocks
	private CompensationApplicationService compensationApplicationService;

	@Mock
	private UserService userService;

	@Mock
	private CompensationApplicationDAO compensationApplicationDAO;
	
	@Test
	void testCreateNewCompensationApplication() {
		
		UserDTO newUser = new UserDTO(
				"USER", 
				"Test", 
				"Tester", 
				"22345678989", 
				"Address 1", 
				"+37061398876",
				"test@user.lt", 
				"test@user.lt", 
				"test@user.lt");
		userService.createUser(newUser);
		
		KindergartenDataDTO kindergartenDataDTO = new KindergartenDataDTO(
				"Test kindergarten", 
				"123456789", 
				"+37061398876", 
				"testKindergarten@email.com", 
				"Test Address", 
				"AB123456789123456789", 
				"AZSAZS235", 
				"TestBank");
		
		CompensationApplicationDTO compensationApplicationDTO = new CompensationApplicationDTO(
				LocalDate.of(2019, 5, 5), 
				"Tomas", 
				"51913245685", 
				"Tomulis", 
				kindergartenDataDTO, 
				newUser);
		
		compensationApplicationService
				.createNewCompensationApplication(compensationApplicationDTO);
	
		assertTrue(compensationApplicationService
					.childExistsByPersonalCode("51913245685"));
	}
	
//	@Test
//	@Order(2)
//	@Transactional
//	void testGetAllUserCompensationApplications() {
//		assertNotNull(compensationApplicationService
//				.getAllUserCompensationApplications("test@user.lt"));
//	}
//	
//	@Test
//	@Order(3)
//	@Transactional
//	void testGetUserCompensationApplicationInfo() {
//		 
//		UserDTO newUser = new UserDTO(
//				"USER", 
//				"Test", 
//				"Tester", 
//				"22345678989", 
//				"Address 1", 
//				"+37061398876",
//				"test@user.lt", 
//				"test@user.lt", 
//				"test@user.lt");
//		userService.createUser(newUser);
//		
//		KindergartenDataDTO kindergartenDataDTO = new KindergartenDataDTO(
//				"Test kindergarten", 
//				"123456789", 
//				"+37061398876", 
//				"testKindergarten@email.com", 
//				"Test Address", 
//				"AB123456789123456789", 
//				"AZSAZS235", 
//				"TestBank");
//		
//		CompensationApplicationDTO compensationApplicationDTO = new CompensationApplicationDTO(
//				LocalDate.of(2019, 5, 5), 
//				"Tomas", 
//				"51913245685", 
//				"Tomulis", 
//				kindergartenDataDTO, 
//				newUser);
//		
//		CompensationApplication compensationApplication = 
//				compensationApplicationService
//					.createNewCompensationApplication(compensationApplicationDTO);
//	
//		assertNotNull(compensationApplicationService
//					.getCompensationApplicationInfo(compensationApplication.getId()));
//	}
//	
//	@Test
//	@Order(4)
//	@Transactional
//	void testDeleteUserCompensationApplicationById() {
//		Long id = 1L;
//	
//		compensationApplicationService
//				.deleteUserCompensationApplicationById(id);
//		
//		verify(compensationApplicationDAO, times(1)).deleteById(eq(id));
//	}
}
