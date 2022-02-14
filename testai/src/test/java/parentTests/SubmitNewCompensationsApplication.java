package parentTests;

import generalMethods.GeneralMethods;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;
import pages.LoginPage;
import parentPages.SubmitNewCompensationApplicationPage;
import specialistPages.CreateAndDeleteNewKindergartenPage;

import java.io.IOException;

import static org.openqa.selenium.support.ui.ExpectedConditions.*;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class SubmitNewCompensationsApplication extends GeneralMethods {

    /**
     * Test Scenario:
     * Fill in and submit application for a compensation.
     * Review and edit application for a compensation.
     * Delete the submitted application afterwards.
     * <p>
     * Test steps:
     * 1. Login as admin. New user (parent) is created for the test. Logout.
     * 2. Login as the newly created user.
     * 3. User fills in application. All information needed is stored in parentAndChildDetails.txt file
     * 4. Parent logs in again to review and edit the application.
     * 4. Parent logs in again to delete the application.
     * 5. The user that was used for this test is deleted.
     */

    @Test(groups = "regression", priority = 1)
    public void successfullySubmitNewCompensationsApplication() throws IOException {

        SubmitNewCompensationApplicationPage compensationApplication = new SubmitNewCompensationApplicationPage(driver);
        LoginPage loginPage = new LoginPage(driver);

        // wait for the login page to load
        waitForLoginToLoad();

        //login with admin details
        loginPage.enterUsername(adminLogins);
        loginPage.enterPassword(adminLogins);

//        userNotLoggedInPopUp();
        loginPage.clickLoginButton();

        // create a new user (parent) for this test
        createNewParent(2);
        doLogout();
        doLogin(createNewUserParentEmail, createNewUserParentEmail);

        // fill in the compensation's application and submit it
        clickNavButtonNewApplication();
        compensationApplication.fillInTheCompensationApplication();
        compensationApplication.compensationsApplicationSuccessful();
        clickOkButton();
        doLogout();
    }

    @Test(groups = "regression", priority = 2)
    public void reviewAndEditCompensationsApplication() throws InterruptedException {
        SubmitNewCompensationApplicationPage compensationApplication = new SubmitNewCompensationApplicationPage(driver);

        // parent logs in
        waitForLoginToLoad();
        doLogin(createNewUserParentEmail, createNewUserParentEmail);
//       assertTrue(textToBePresentInElement((WebElement) By.xpath("//h6[text()='Mano prašymai dėl " +
//               "kompensacijos'][@class='ps-2 pt-3']"),"Mano prašymai dėl kompensacijos").apply(driver));
//        assertEquals(compensationApplication.verifyCompensationsApplicationsListName(), "Mano prašymai dėl kompensacijos");

        //compensations application reviewed
        compensationApplication.clickButtonReviewCompensationApplication();
        compensationApplication.verifyIfApplicationIsShowen();

        // compensations application edited and saved
        compensationApplication.clickButtonEditCompenstaionsApplication();
        compensationApplication.clickButtonEditCompensationButton();
        clickOkButton();
        doLogout();

    }


    @Test(groups = "regression", priority = 3)
    public void deleteCompensationsApplication() {
        SubmitNewCompensationApplicationPage compensationApplication = new SubmitNewCompensationApplicationPage(driver);
        waitForLoginToLoad();
        doLogin(createNewUserParentEmail, createNewUserParentEmail);

        compensationApplication.clickDeleteCompensationsApplication();
        waitToAgreePopUp();
        clickOkButton();
        doLogout();

        // delete test user
        doLoginAsAdmin();
        verifyIfAdminIsLoggedIn();
        deleteNewUser();


    }
}
