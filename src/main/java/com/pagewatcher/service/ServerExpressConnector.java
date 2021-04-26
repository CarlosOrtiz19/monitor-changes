package com.pagewatcher.service;


import com.pagewatcher.model.Crop;
import com.pagewatcher.model.ScreenShot;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
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

    public ScreenShot mapper(Crop crop) throws IOException, InterruptedException {
        System.out.println(crop);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(urlServer+crop.getUrl()+
                        "&top="+crop.getTop()+
                        "&left="+ crop.getBottom()+
                        "&width="+crop.getWidth()+
                        "&height="+crop.getHeight()))
                .build();
        HttpResponse<String> response =  client.send(request, HttpResponse.BodyHandlers.ofString());

        return Optional.ofNullable(ScreenShotMapper.mapperResponse(response.body())).orElse(new ScreenShot());
    }

    public CompletableFuture<String> getAsyncResponseBody(Crop crop) {
        LOGGER.info("Crop to proces" +crop);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(urlServer+crop.getUrl()+
                        "&top="+crop.getTop()+"&left="+
                        crop.getBottom()+
                        "&width="+crop.getWidth()+
                        "&height="+crop.getHeight()))
                .build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body);
    }

}
