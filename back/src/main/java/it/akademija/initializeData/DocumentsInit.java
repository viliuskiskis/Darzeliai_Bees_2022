package it.akademija.initializeData;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import it.akademija.document.DocumentDAO;
import it.akademija.document.DocumentService;
import it.akademija.user.UserDAO;

@Component
@DependsOn("usersInit")
public class DocumentsInit {

    @Autowired
    UsersInit usersInit;

    @Autowired
    DocumentDAO documentDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    DocumentService documentService;

    /**
     * Initialize documents data
     * 
     * @throws IOException
     */
    @PostConstruct
    public void uploadDocumentsData() throws IOException {

	if (documentDAO.findAll().size() < 10) {

	    Path path = Paths.get("src/main/resources/Testas.pdf");
	    byte[] bytes = Files.readAllBytes(path);

	    MultipartFile multipartFile = new MockMultipartFile(
		    "Naujas Vardas.pdf", "Testas.pdf", "application/pdf", bytes);
	    
	    ClassLoader classLoader = getClass().getClassLoader();
	    InputStream inputStream = classLoader.getResourceAsStream("users_data.txt");
	    
	    try (BufferedReader reader = new BufferedReader(
		    new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
		String line;
		line = reader.readLine(); // Skip first line
		
		while ((line = reader.readLine()) != null) {
		    String[] data = line.split(";");
		    long uploaderId = userDAO.findByUsername(data[5]).getUserId();
		    String documentName = data[6] + " " + data[1] + ", pažyma.pdf";
		    documentService.uploadDocument(multipartFile, documentName, uploaderId);
		}
	    }
	}
    }
}
