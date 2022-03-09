package parentPages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import pages.AbstractObjectPage;

import java.time.Duration;

public class ReviewCompensationApplicationParentPage extends AbstractObjectPage {

    @FindBy(id = "btnReviewCompensationUser")
    WebElement buttonReviewCompensationApplication;

    @FindBy(id = "CompensationReviewReturn")
    WebElement buttonCompensationReviewReturn;

    public ReviewCompensationApplicationParentPage(WebDriver driver) {
        super(driver);
    }

    public void clickButtonCompensationReviewReturn() {
        buttonCompensationReviewReturn.click();
    }
}

//    public Boolean assertThatCompensationApplicationStatusIsNotActual() {
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
//        return wait.until(ExpectedConditions.textToBe(By.xpath("//*[@id=\"root\"]/div/div/div/div/div/div/div/div/div/table/tbody/tr/td[5]/span"), "Neaktualus"));
//    }

//    public Boolean assertThatCompensationApplicationStatusIsConfirmed() {
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
//        return wait.until(ExpectedConditions.textToBe(By.xpath("//*[@id=\"root\"]/div/div/div/div/div/div/div/div/div/table/tbody/tr/td[5]/span"), "Patvirtintas"));
//    }



