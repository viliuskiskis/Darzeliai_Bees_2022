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

import it.akademija.application.ApplicationDAO;
import it.akademija.application.ApplicationDTO;
import it.akademija.application.ApplicationService;
import it.akademija.application.priorities.PrioritiesDTO;
import it.akademija.kindergarten.KindergartenInit;
import it.akademija.kindergartenchoise.KindergartenChoiseDTO;
import it.akademija.user.ParentDetailsDTO;
import it.akademija.user.UserDTO;

@Component
@DependsOn({ "usersInit", "kindergartenInit" })
public class ApplicationsInit {

    @Autowired
    UsersInit usersInit;

    @Autowired
    KindergartenInit kindergartenInit;

    @Autowired
    ApplicationService applicationService;

    @Autowired
    ApplicationDAO applicationDAO;

    /**
     * Initialize applications data
     * 
     * @throws IOException
     */
    @PostConstruct
    public void uploadApplicationsData() throws IOException {

	if (applicationDAO.findAll().size() < 10) {
	    ClassLoader classLoader = getClass().getClassLoader();
	    InputStream inputStream = classLoader.getResourceAsStream("applications_data.txt");

	    try (BufferedReader reader = new BufferedReader(
		    new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
		String line;
		line = reader.readLine(); // Skip first line

		while ((line = reader.readLine()) != null) {
		    String[] data = line.split(";");
		    ApplicationDTO applicationDTO = new ApplicationDTO();
		    String username = data[6];
		    applicationDTO.setChildName(data[0]);
		    applicationDTO.setChildSurname(data[1]);
		    applicationDTO.setChildPersonalCode(data[2]);
		    applicationDTO.setBirthdate(LocalDate.parse(data[3]));
		    PrioritiesDTO prioritiesDTO = new PrioritiesDTO(
			    Boolean.parseBoolean(data[19]), 
			    Boolean.parseBoolean(data[20]), 
			    Boolean.parseBoolean(data[21]), 
			    Boolean.parseBoolean(data[22]), 
			    Boolean.parseBoolean(data[23]), 
			    Boolean.parseBoolean(data[24]));		
		    applicationDTO.setPriorities(prioritiesDTO);
		    UserDTO userDTO = new UserDTO();
		    userDTO.setRole("USER");
		    userDTO.setName(data[4]);
		    userDTO.setSurname(data[1]);
		    userDTO.setPersonalCode(data[5]);
		    userDTO.setAddress(data[13]);
		    userDTO.setPhone(data[7]);
		    userDTO.setEmail(data[6]);
		    userDTO.setUsername(data[6]);
		    applicationDTO.setMainGuardian(userDTO);
		    ParentDetailsDTO parentDetailsDTO = new ParentDetailsDTO();
		    parentDetailsDTO.setPersonalCode(data[10]);
		    parentDetailsDTO.setName(data[9]);
		    parentDetailsDTO.setSurname(data[8]);
		    parentDetailsDTO.setEmail(data[12]);
		    parentDetailsDTO.setAddress(data[13]);
		    parentDetailsDTO.setPhone(data[11]);
		    applicationDTO.setAdditionalGuardian(parentDetailsDTO);
		    KindergartenChoiseDTO kindergartenChoiseDTO = new KindergartenChoiseDTO(
			    data[14], data[15], data[16], data[17], data[18]);
		    applicationDTO.setKindergartenChoises(kindergartenChoiseDTO);		    

		    applicationService.createNewApplication(username, applicationDTO);
		}
	    }
	}
    }
}
