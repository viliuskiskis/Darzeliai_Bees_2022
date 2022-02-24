package it.akademija.contracts;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;

import it.akademija.application.ApplicationDAO;

@Service
public class ContractsService {

    @Autowired
    private ApplicationDAO applicationDAO;

    @Transactional
    public ResponseEntity<String> generateContractPDF(Long applicationId) {
	String FONT = "times.ttf";
	String DOCUMENT = "Ikimokyklinio-ugdymo-sutartis.pdf";

	ContractDetails contractDetails = applicationDAO.getContractDetailsByApplicationId(applicationId);

	DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG)
							       .withLocale(Locale.forLanguageTag("lt-LT"));
	String approvalDate = contractDetails.getApprovalDate()
					     .format(dateTimeFormatter);
	System.out.println(approvalDate);
	String kindergartenName = contractDetails.getKindergartenName();
	String kindergartenManagerName = contractDetails.getKindergartenManagerName();
	String mainGuardianName = contractDetails.getMainGuardianName();
	String mainGuardianAddress = contractDetails.getAdditionalGuardianAddress();
	String mainGuardianPhone = contractDetails.getMainGuardianPhone();
	String mainGuardianEmail = contractDetails.getMainGuardianEmail();
	String additionalGuardianName = contractDetails.getAdditionalGuardianName();
	String additionalGuardianAddress = contractDetails.getAdditionalGuardianAddress();
	String additionalGuardianPhone = contractDetails.getAdditionalGuardianPhone();
	String additionalGuardianEmail = contractDetails.getAdditionalGuardianEmail();
	String childName = contractDetails.getChildName();

	try {
	    InputStream inputStream = getClass().getClassLoader()
						.getResourceAsStream(DOCUMENT);
	    PdfReader reader = new PdfReader(inputStream);
	    PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("uzpildyta sutartis.pdf"));
	    AcroFields form = stamper.getAcroFields();
	    BaseFont baseFont = BaseFont.createFont(FONT, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
	    form.addSubstitutionFont(baseFont);
	    form.setField("applicationId", applicationId.toString());
	    form.setField("approvalDate", approvalDate);
	    form.setField("kindergartenName", kindergartenName);
	    form.setField("kindergartenManagerName", kindergartenManagerName);
	    form.setField("mainGuardianName", mainGuardianName);
	    form.setField("mainGuardianAddress", mainGuardianAddress);
	    form.setField("mainGuardianPhone", mainGuardianPhone);
	    form.setField("mainGuardianEmail", mainGuardianEmail);
	    form.setField("additionalGuardianName", additionalGuardianName);
	    form.setField("additionalGuardianAddress", additionalGuardianAddress);
	    form.setField("additionalGuardianPhone", additionalGuardianPhone);
	    form.setField("additionalGuardianEmail", additionalGuardianEmail);
	    form.setField("childName", childName);
	    stamper.setFormFlattening(true);
	    stamper.close();

	    return new ResponseEntity<String>("Success", HttpStatus.OK);
	} catch (Exception e) {
	    return new ResponseEntity<String>("Error", HttpStatus.FAILED_DEPENDENCY);
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
