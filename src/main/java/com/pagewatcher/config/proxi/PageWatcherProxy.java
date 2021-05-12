package com.pagewatcher.config.proxi;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.awt.image.BufferedImage;
import java.io.InputStream;
import java.net.http.HttpResponse;

//@FeignClient(name="node-server",url="localhost:4000",configuration = FeignSimpleEncoderConfig.class)
public interface PageWatcherProxy {

   /* @GetMapping("/screenshot")
    ResponseEntity<byte[]> getScreenShot(@RequestParam String url);*/
}
