package com.pagewatcher.config.proxi;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "notification-app", url = "localhost:8081")
public interface NotificationProxy {

    @GetMapping("/message/send/{email}")
    ResponseEntity<String> sendNotificationTo(@PathVariable String email);
}