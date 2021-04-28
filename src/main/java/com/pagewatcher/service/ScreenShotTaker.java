package com.pagewatcher.service;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.File;
import java.io.IOException;

public class ScreenShotTaker {
    static int screenshotNum=0;
    static WebDriver driver=null;
    static JavascriptExecutor js = null;

    public static void main(String[] args) throws IOException {
        initDriver();
        ScreenShotTaker ws=new ScreenShotTaker();
        ws.capture("https://en.wikipedia.org/wiki/Portal:Current_events");
        //ws.capture("https://facebook.com");
        destroy();
    }
    public static void initDriver()
    {
        System.setProperty("webdriver.chrome.driver",
                "./driver/chromedriver.exe");

        driver=new ChromeDriver();



        //driver.manage().window().setPosition(new Point(-2000, 0));
       // driver.manage().window().setPosition(new Point(385,96));
    }
    public void capture(String site) throws IOException
    {
        screenshotNum++;
        js = (JavascriptExecutor) driver;
        driver.get(site);
        driver.manage().window().maximize();

        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");

        File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("site"+screenshotNum+".png"));
        System.out.println("Took Screenshot for "+site+" and saved as "+"site"+screenshotNum+".png");
    }
    public static void destroy()
    {
        driver.quit();
    }

}
