package it.akademija.initData;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import it.akademija.user.UserDAO;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;

@Component
public class UsersInit {
   
    @Autowired
    UserService userService;
    
    @Autowired
    UserDAO userDao;
    
    /**
     * Initialize user data
     * 
     * @throws IOException
     */
    @PostConstruct
    public void uploadUserData() throws IOException {
	ClassLoader classLoader = getClass().getClassLoader();
	InputStream inputStream = classLoader.getResourceAsStream("user_data.txt");
	
	try (BufferedReader reader = new BufferedReader(
		new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
	    String line;
//	    System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
//	    System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
//	    line = reader.readLine();
//	    System.out.println(line);
//	    System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
//	    System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
	    while ((line = reader.readLine()) != null) {
		String[] data = line.split(";");
		UserDTO userDto = new UserDTO();
		userDto.setRole("USER");
		userDto.setName(data[4]);
		userDto.setSurname(data[1]);
		userDto.setPersonalCode(data[5]);
		userDto.setAddress("Bendrabučių g. 1, Vilnius");
		userDto.setPhone(data[7]);
		userDto.setEmail(data[6]);
		userDto.setUsername(data[6]);
		userDto.setPassword(data[6]);
		
		userService.createUser(userDto);
	    }
	}

	
    }

}
