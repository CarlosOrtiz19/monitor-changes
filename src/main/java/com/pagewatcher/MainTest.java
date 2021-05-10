package com.pagewatcher;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class MainTest {

    public static void main(String[] args) throws IOException, InterruptedException {
        //verificar cantidad span, div, links, href.
        double counter = 0;

        Document previous = Jsoup.connect("https://ndeb-na.brighttrac.com/apply/apply2?exam_type_id=43")
                .cookie("session_id", "9d4e0ea576e53905d732aa2a92dbbd237e7bf532")
                .cookie("brighttrac_NDEB_NA", "6fcc50083e94b713bdbed6f184a3061d0bb34d88")
                .get();

        while (true) {
            Document current = Jsoup.connect("https://ndeb-na.brighttrac.com/apply/apply2?exam_type_id=43")
                    .cookie("session_id", "9d4e0ea576e53905d732aa2a92dbbd237e7bf532")
                    .cookie("brighttrac_NDEB_NA", "6fcc50083e94b713bdbed6f184a3061d0bb34d88")
                    .get();

            if (!previous.getElementsByClass("error-msg").text()
                    .equals(current.getElementsByClass("error-msg").text()) ||
                    previous.getElementsByTag("div").size() != current.getElementsByTag("div").size() ||
                    previous.getElementsByTag("span") != current.getElementsByTag("span") ||
                    !previous.body().equals(current.body())
            ) {
                //send email
            }
            previous = current;
            System.out.println("comparation");
            System.out.println(!previous.body().equals(current.body()));
            Thread.sleep(5000);
            counter += 5;
        }


    }
}
