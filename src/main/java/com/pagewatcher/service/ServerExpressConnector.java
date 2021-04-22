package com.pagewatcher.service;





import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.Socket;
import java.net.URL;
import java.net.UnknownHostException;
import java.net.URI;
import java.net.http.*;


public class ServerExpressConnector {



    /*public static void main(String[] args) {
        int bottom = 200;
        int top = 100;
        int width = 400;
        int height = 300;

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:4000/cropImageSize?url=http://mrbool.com/communicating-node-js-and-java-via-sockets/33819&top="+top+"&left="+bottom+"&width="+width+"&height="+height))
                .build();
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenAccept(ScreenShotMapper::mapper)
                .join();


        //Post data to server
       /* HttpURLConnection conn = null;




            try {
                //Thread.sleep(DELAY_BETWEEN_POSTS);

                URL url = new URL("http://localhost:4000/cropImageSize?url=http://mrbool.com/communicating-node-js-and-java-via-sockets/33819&top="+top+"&left="+left+"&width="+width+"&height="+height);
                conn = (HttpURLConnection)url.openConnection();

                if ( conn != null ) {
                    //Whatever you wants to post...
                    String strPostData = "https://en.wikipedia.org/wiki/Portal:Current_events";

                    conn.setRequestMethod("GET");
                    conn.setRequestProperty("User-Agent", "User-Agent");
                    conn.setRequestProperty("Accept-Language", "en-GB,en;q=0.5");
                    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                    conn.setRequestProperty("Content-length", Integer.toString(strPostData.length()));
                    conn.setRequestProperty("Content-Language", "en-GB");
                    conn.setRequestProperty("charset", "utf-8");
                    conn.setUseCaches(false);
                    conn.setDoOutput(true);

                    //ScreenShot screenShot =

                   /* DataOutputStream dos = new DataOutputStream(conn.getOutputStream());
                    dos.writeBytes(strPostData);
                    dos.flush();
                    dos.close();
                    System.out.println("response");
                    System.out.println(conn.getContent().toString());
                    int intResponse = conn.getResponseCode();
                    System.out.println("\nSending 'GET' to " + url.toString() +
                            ", data: " + strPostData + ", rc: " + intResponse);;
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            } finally {
                if ( conn != null ) {
                    conn.disconnect();
                    conn = null;
                }
            }*/




}
