package com.pagewatcher.config.proxi;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "node-server", url = "localhost:4000")
public interface PageWatcherProxy {

    @GetMapping("/screenshot")
    ResponseEntity<byte[]> getScreenShot(@RequestParam String url);
}
