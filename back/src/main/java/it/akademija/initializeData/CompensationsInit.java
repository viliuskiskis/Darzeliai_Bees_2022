package it.akademija.initializeData;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import it.akademija.compensationApplication.CompensationApplicationDAO;
import it.akademija.compensationApplication.CompensationApplicationDTO;
import it.akademija.compensationApplication.CompensationApplicationService;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataDTO;
import it.akademija.user.UserDTO;

@Component
@DependsOn("usersInit")
public class CompensationsInit {

    @Autowired
    UsersInit usersInit;

    @Autowired
    CompensationApplicationService compensationApplicationService;

    @Autowired
    CompensationApplicationDAO compensationApplicationDAO;

    /**
     * Initialize compensations data
     * 
     * @throws IOException
     */
    @PostConstruct
    public void uploadCompensationsData() throws IOException {

	if (compensationApplicationDAO.findAll().size() < 10) {
	    ClassLoader classLoader = getClass().getClassLoader();
	    InputStream inputStream = classLoader.getResourceAsStream("compensations_data.txt");

	    try (BufferedReader reader = new BufferedReader(
		    new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
		String line;
		line = reader.readLine(); // Skip first line

		while ((line = reader.readLine()) != null) {
		    String[] data = line.split(";");
		    CompensationApplicationDTO compensation = new CompensationApplicationDTO();
		    compensation.setBirthdate(LocalDate.parse(data[3]));
		    compensation.setChildName(data[0]);
		    compensation.setChildPersonalCode(data[2]);
		    compensation.setChildSurname(data[1]);
		    KindergartenDataDTO kindergarten = new KindergartenDataDTO();
		    kindergarten.setEntityName(data[8]);
		    kindergarten.setCode(data[9]);
		    kindergarten.setPhone(data[10]);
		    kindergarten.setEmail(data[11]);
		    kindergarten.setAddress(data[13]);
		    kindergarten.setAccount(data[12]);
		    kindergarten.setBankCode(data[16]);
		    kindergarten.setBankName(data[15]);
		    compensation.setKindergartenData(kindergarten);
		    UserDTO user = new UserDTO();
		    user.setRole("USER");
		    user.setName(data[4]);
		    user.setSurname(data[1]);
		    user.setPersonalCode(data[5]);
		    user.setAddress(data[14]);
		    user.setPhone(data[7]);
		    user.setEmail(data[6]);
		    user.setUsername(data[6]);
		    compensation.setMainGuardian(user);

		    compensationApplicationService.createNewCompensationApplication(compensation);
		}
	    }
	}
    }
}
