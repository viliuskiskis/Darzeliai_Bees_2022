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
import org.testng.annotations.BeforeSuite;

public class BaseTest {

    protected static WebDriver driver;

    @BeforeSuite(alwaysRun = true)
    public  void setUp() {
        WebDriverManager.chromedriver().setup();
//        WebDriverManager.firefoxdriver().setup();
//        WebDriverManager.edgedriver().setup();
//        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
//        System.setProperty("webdriver.gecko.driver",  "src/test/resources/geckodriver.exe");
//        System.setProperty("webdriver.edge.driver", "src/test/resources/msedgedriver.exe");

    }

    @BeforeClass(alwaysRun = true)
    public  void openHomePage(){
//        driver = new FirefoxDriver();
        driver = new ChromeDriver();
//        driver = new EdgeDriver();
        driver.manage().window().maximize();
        driver.get("https://bees.akademijait.vtmc.lt/darzelis");
//        driver.get("http://localhost:3000/darzelis");
    }

//    @AfterClass(alwaysRun = true)
//    public  void closeBrowser() {
//        driver.manage().deleteAllCookies();
////        driver.close();
////        driver.quit();
//    }
//
//    @AfterSuite(alwaysRun = true)
//    protected  void tearDown() {
//        driver.quit();
//    }
}