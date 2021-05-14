package com.pagewatcher.service;

import com.pagewatcher.config.proxi.PageWatcherProxy;
import com.pagewatcher.model.Crop;
import com.pagewatcher.model.ScreenShot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
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
        LOGGER.info("get Image from Node-server");
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .header("content-type", "image/png")
                .uri(URI.create(urlServer + url))
                .build();

        InputStream image = client.sendAsync(request, HttpResponse.BodyHandlers.ofInputStream())
                .thenApply(HttpResponse::body).join();

        return ImageIO.read(image);
    }

    public void saveImage(BufferedImage bufferedImage) throws IOException {
        File outputfile = new File("D:\\Desktop\\imagefeing.png");
        ImageIO.write(bufferedImage, "png", outputfile);
    }

    public BufferedImage getScreenShotFeing(String url) throws IOException {
        ResponseEntity<byte[]> response = pageWatcherProxy.getScreenShot(url);
        InputStream attachment = new ByteArrayInputStream(response.getBody());
        LOGGER.info("screenshot taken via feing");
        return ImageIO.read(attachment);
    }
}
