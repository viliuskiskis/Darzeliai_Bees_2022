package it.akademija.compensationApplication;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.compensationApplication.kindergartenData.KindergartenDataDTO;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;

//@RunWith(SpringRunner.class)
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
public class CompensationApplicationServiceTest {
	
	@InjectMocks
	@Autowired
	private CompensationApplicationService compensationApplicationService;

	@MockBean
	private UserService userService;

	@Test
	@Order(1)
	@Transactional
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
	
	@Test
	@Order(2)
	@Transactional
	void testGetAllUserCompensationApplications() {
		assertNotNull(compensationApplicationService
				.getAllUserCompensationApplications("Test"));
	}
	
}
