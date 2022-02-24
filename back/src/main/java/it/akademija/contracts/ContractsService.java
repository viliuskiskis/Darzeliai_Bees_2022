package it.akademija.contracts;

import java.io.FileOutputStream;
import java.io.InputStream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;

@Service
public class ContractsService {

    @Transactional
    public void generateContractPDF(Long applicationId) {
	System.out.println(">>>>>>>>> Application id: " + applicationId);

	try {
	    InputStream inputStream = getClass().getClassLoader().getResourceAsStream("sutartis1.pdf");
	    PdfReader reader = new PdfReader(inputStream);
	    PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("uzpildyta sutartis.pdf"));
	    AcroFields form = stamper.getAcroFields();
	    form.setField("fill_1", "Vardenis Pavardenis");
	    form.setField("fill_2", "Vardenytė Pavardenytė");
	    stamper.setFormFlattening(true);
	    stamper.close();


	    System.out.println("something was done :)");
	} catch (Exception e) {
	    System.out.println("Exception: " + e);
	}
	
    }



}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
