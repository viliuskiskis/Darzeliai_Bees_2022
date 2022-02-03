package basetest;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chromium.ChromiumDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeClass;

public class BaseTest {

    protected WebDriver driver;

    @BeforeClass(alwaysRun = true)
    protected void setUp() {
        WebDriverManager.chromedriver().setup();
//        WebDriverManager.firefoxdriver().setup();
//        WebDriverManager.edgedriver().setup();
//        driver = new FirefoxDriver();
        driver = new ChromeDriver();
//        driver = new EdgeDriver();
        driver.manage().window().maximize();
//        driver.get("https://sextet.akademijait.vtmc.lt/darzelis/");
//        driver.get("https://darzelis.akademijait.vtmc.lt/darzelis/");
        driver.get("https://bees.akademijait.vtmc.lt/darzelis");
    }

    @AfterClass(alwaysRun = true)
    protected void closeBrowser() {
        driver.manage().deleteAllCookies();
        driver.close();
        driver.quit();
    }

    @AfterSuite(alwaysRun = true)
    protected void tearDown() {
        driver.quit();
    }

}