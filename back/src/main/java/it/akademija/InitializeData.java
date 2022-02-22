//package it.akademija;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.InputStreamReader;
//import java.nio.charset.StandardCharsets;
//import java.time.LocalDate;
//
//import javax.annotation.PostConstruct;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import it.akademija.compensationApplication.CompensationApplicationDAO;
//import it.akademija.compensationApplication.CompensationApplicationDTO;
//import it.akademija.compensationApplication.CompensationApplicationService;
//import it.akademija.compensationApplication.kindergartenData.KindergartenDataDAO;
//import it.akademija.compensationApplication.kindergartenData.KindergartenDataDTO;
//import it.akademija.compensationApplication.kindergartenData.KindergartenDataService;
//import it.akademija.kindergarten.Kindergarten;
//import it.akademija.kindergarten.KindergartenDAO;
//import it.akademija.kindergarten.KindergartenService;
//import it.akademija.user.UserDAO;
//import it.akademija.user.UserDTO;
//import it.akademija.user.UserService;
//
//@Component
//public class InitializeData {
//
//    @Autowired
//    KindergartenDAO gartenDao;
//
//    @Autowired
//    KindergartenService service;
//
//    @Autowired
//    UserService userService;
//
//    @Autowired
//    UserDAO userDao;
//
//    @Autowired
//    CompensationApplicationService compensationApplicationService;
//    
//    @Autowired
//    CompensationApplicationDAO compensationApplicationDAO;
//    
//    @Autowired
//    KindergartenDataDAO kindergartenDataDAO;
//    
//    @Autowired
//    KindergartenDataService kindergartenDataService;
//
//    /**
//     * Initialize database if no records are available. Saves info from txt file.
//     * 
//     * @throws IOException
//     */
//    @PostConstruct
//    public void uploadKindergartenData() throws IOException {
//
//	if (gartenDao.findAll().size() == 0) {
//	    Kindergarten obj = new Kindergarten();
//
//	    InputStream inputStream = obj.getClass()
//					 .getClassLoader()
//					 .getResourceAsStream("darzeliu_adresai.txt");
//
//	    try (BufferedReader kindergartenReader = new BufferedReader(
//		    new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
//		String kindergartenLine;
//		while ((kindergartenLine = kindergartenReader.readLine()) != null) {
//		    String[] data = kindergartenLine.split(";");
//		    Kindergarten kindergarten = new Kindergarten();
//		    kindergarten.setId(data[0].replaceFirst("[^\\d.]", ""));
//		    kindergarten.setName(data[1]);
//		    kindergarten.setAddress(data[2]);
//		    kindergarten.setElderate(data[3]);
//		    kindergarten.setCapacityAgeGroup2to3(3);
//		    kindergarten.setCapacityAgeGroup3to6(3);
//
//		    gartenDao.save(kindergarten);
//		}
//		// apėjimas: pirmą įrašą ištrinam dė duomenų bazės problemų
//		service.deleteByName("test");
//	    }
//	}
//
//	if (userDao.findAll().size() < 10) {
//	    ClassLoader usersLoader = getClass().getClassLoader();
//	    InputStream usersStream = usersLoader.getResourceAsStream("user_data.txt");
//
//	    try (BufferedReader usersReader = new BufferedReader(
//		    new InputStreamReader(usersStream, StandardCharsets.UTF_8))) {
//		String usersLine;
//
//		while ((usersLine = usersReader.readLine()) != null) {
//		    String[] data = usersLine.split(";");
//		    UserDTO userDto = new UserDTO();
//		    userDto.setRole("USER");
//		    userDto.setName(data[4]);
//		    userDto.setSurname(data[1]);
//		    userDto.setPersonalCode(data[5]);
//		    userDto.setAddress("Bendrabučių g. 1, Vilnius");
//		    userDto.setPhone(data[7]);
//		    userDto.setEmail(data[6]);
//		    userDto.setUsername(data[6]);
//		    userDto.setPassword(data[6]);
//
//		    userService.createUser(userDto);
//		}
//	    }
//	}
//	
//	if (compensationApplicationDAO.findAll().size() < 10) {
//	    ClassLoader applicationsLoader = getClass().getClassLoader();
//	    InputStream applicationsStream = applicationsLoader.getResourceAsStream("applications_data.txt");
//
//	    try (BufferedReader applicationsReader = new BufferedReader(
//		    new InputStreamReader(applicationsStream, StandardCharsets.UTF_8))) {
//		String applicationsLine;
//
//		while ((applicationsLine = applicationsReader.readLine()) != null) {
//		    String[] data = applicationsLine.split(";");
//		    CompensationApplicationDTO compensation = new CompensationApplicationDTO();
//		    compensation.setBirthdate(LocalDate.parse(data[3]));
//		    compensation.setChildName(data[0]);
//		    compensation.setChildPersonalCode(data[2]);
//		    compensation.setChildSurname(data[1]);
//		    KindergartenDataDTO kindergarten = new KindergartenDataDTO();
//		    kindergarten.setEntityName(data[8]);
//		    kindergarten.setCode(data[9]);
//		    kindergarten.setPhone(data[10]);
//		    kindergarten.setEmail(data[11]);
//		    kindergarten.setAddress("Infinity st. 1, Vilnius");
//		    kindergarten.setAccount(data[12]);
//		    kindergarten.setBankCode("PNGPNN01");
//		    kindergarten.setBankName("Pinigų Pieninė");
//		    compensation.setKindergartenData(kindergarten);
//		    UserDTO user = new UserDTO();
//		    user.setRole("USER");
//		    user.setName(data[4]);
//		    user.setSurname(data[1]);
//		    user.setPersonalCode(data[5]);
//		    user.setAddress("Bendrabučių g. 1, Vilnius");
//		    user.setPhone(data[7]);
//		    user.setEmail(data[6]);
//		    user.setUsername(data[6]);
//		    compensation.setMainGuardian(user);
//
//		    compensationApplicationService.createNewCompensationApplication(compensation);
//		}
//	    }
//	}
//
//    }
//
//}