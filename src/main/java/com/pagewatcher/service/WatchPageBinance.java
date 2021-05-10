package com.pagewatcher.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalTime;

@Service
public class WatchPageBinance {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private EmailService emailService;


    public void runScript(String url, String session, String cookie2) throws Exception {
        Document previous = startWatchingWithCookiesDiana(url, session, cookie2);
        int counter = 0;

        while (true) {
            Document current = startWatchingWithCookiesDiana(url, session, cookie2);

            if (previous.getElementsByTag("ul").size() != current.getElementsByTag("ul").size() ||
                    previous.getElementsByTag("li").size() != current.getElementsByTag("li").size() ||
                    previous.getElementsByTag("a").size() != current.getElementsByTag("a").size() ||
                    previous.getElementsByTag("div").size() != current.getElementsByTag("div").size() ||
                    previous.getElementsByTag("span").size() != current.getElementsByTag("span").size() ||
                    !previous.getElementsByClass("error-msg").text().equals(current.getElementsByClass("error-msg").text())
            ) {
                System.out.println("inside");
                emailService.sendEmail("carlos.arturo.ortiz@hotmail.com");
                emailService.sendEmail("crisgnef@yahoo.es");
            }
            System.out.println("Hora de verificacion: " + LocalTime.now());
            previous = current;
            Thread.sleep(600000);


            counter += 5;
        }

    }

    private Document startWatchingWithCookiesDiana(String url, String session, String cookie2) throws IOException {
        return Jsoup.connect(url)
                .cookie("session_id", session)
                .cookie("brighttrac_NDEB_NA", cookie2)
                .get();
    }

    private Document scripTest(String url) throws IOException {
        return Jsoup.connect(url).get();
    }

    public void runTest(String url) throws Exception {
        Document previous = scripTest(url);

        // while(true){
        Document current = scripTest(url);
        System.out.println(current.body());

          /*  if (    previous.getElementsByTag("div").size() > current.getElementsByTag("div").size() ||
                    previous.getElementsByTag("div").size() < current.getElementsByTag("div").size() ||
                    previous.getElementsByTag("span").size() > current.getElementsByTag("span").size() ||
                    previous.getElementsByTag("span").size() < current.getElementsByTag("span").size() ||
                    previous.body().equals(current.body())
            ){
                System.out.println(" quelaue chose change  ");
            }
            previous = current;*/
        // Thread.sleep(5000);
        //System.out.println("divs");
        //System.out.println(  previous.body().equals(current.body()));          //counter += 5;
        // }

    }
}
