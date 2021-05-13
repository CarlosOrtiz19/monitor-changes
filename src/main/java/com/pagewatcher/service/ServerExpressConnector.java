package com.pagewatcher.service;


import com.pagewatcher.config.proxi.PageWatcherProxy;
import com.pagewatcher.model.Crop;
import com.pagewatcher.model.ScreenShot;


import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Logger;

@Service
public class ServerExpressConnector {
    private final Logger LOGGER = Logger.getLogger(ServerExpressConnector.class.getName());

    @Value("${com.pagewatcher.puppeteer}")
    private String urlServer;

    @Value("${com.pagewatcher.screenshot}")
    private String urlScreenShot;

    @Autowired
    private PageWatcherProxy pageWatcherProxy;



    public ScreenShot mapper(Crop crop) throws IOException, InterruptedException {

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(urlServer + crop.getUrl() +
                        "&top=" + crop.getX() +
                        "&left=" + crop.getY() +
                        "&width=" + crop.getWidth() +
                        "&height=" + crop.getHeight()))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        return Optional.ofNullable(ScreenShotMapper.mapperResponse(response.body())).orElse(new ScreenShot());
    }

    public CompletableFuture<String> getAsyncResponseBody(Crop crop) {
        LOGGER.info("Crop to proces" + crop);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(urlServer + crop.getUrl() +
                        "&top=" + crop.getX() + "&left=" +
                        crop.getY() +
                        "&width=" + crop.getWidth() +
                        "&height=" + crop.getHeight()))
                .build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body);
    }

    public BufferedImage getScreenShot(String url) throws IOException {
        LOGGER.info("getImage from Node");
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .header("content-type", "image/png")
                .uri(URI.create("http://localhost:4000/screenshot?url=" + url))
                .build();

        InputStream image = client.sendAsync(request, HttpResponse.BodyHandlers.ofInputStream())
                .thenApply(HttpResponse::body).join();

        return ImageIO.read(image);
    }

    public void saveImage(BufferedImage bufferedImage) throws IOException {
        File outputfile = new File( "D:\\Desktop\\imagefaing.png");
        ImageIO.write(bufferedImage, "png", outputfile);
    }

    public BufferedImage getScreenShotFeing(String url) throws IOException {

        ResponseEntity<byte[]> response = pageWatcherProxy.getScreenShot(url);



        InputStream im = new ByteArrayInputStream(response.getBody());

        LOGGER.info("screenShot in feing");

        return ImageIO.read(im);
    }
}
