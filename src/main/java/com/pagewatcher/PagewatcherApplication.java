package com.pagewatcher;

import com.pagewatcher.service.WatchPageService;
import com.pagewatcher.service.WatchPageBinance;
import com.pagewatcher.service.WatchPageServiceTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PagewatcherApplication {

    @Autowired
    WatchPageService watchPageService;

    @Autowired
    WatchPageBinance watchPageBinance;

    @Autowired
    WatchPageServiceTest watchPageServicetest;

    public static void main(String[] args) {
        SpringApplication.run(PagewatcherApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(){return args -> {
        //watchPage.runScript("https://ndeb-na.brighttrac.com/apply/apply2?exam_type_id=43",
              //  "9d4e0ea576e53905d732aa2a92dbbd237e7bf532","6fcc50083e94b713bdbed6f184a3061d0bb34d88");

       // watchPageServicetest.runTest("http://localhost:3006/");
    };}

}
