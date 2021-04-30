package com.pagewatcher.controller;

import com.pagewatcher.model.Crop;
import com.pagewatcher.service.CropImageService;
import com.pagewatcher.service.CropService;
import com.pagewatcher.service.WatchPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/watch")
public class WatchPageController {
    @Autowired
    WatchPageService watchPageService;

    @Autowired
    private CropImageService cropImageService;

    @Autowired
    private CropService cropService;

    @GetMapping("/run")
    public ResponseEntity<String> getCandidatureById(@RequestParam String url,@RequestParam String session,
                                                     @RequestParam  String cookie) throws Exception {
            String response = watchPageService.runScript(url,session,cookie);
            return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/saveCropInfo")
    public ResponseEntity<String> setCropImgae(@RequestBody Crop crop) throws IOException {
        System.out.println("crop = " + crop);

        cropService.saveInitialCrop(crop);
        //cropImageService.saveCropInformation(cropImage);
        return ResponseEntity.status(HttpStatus.OK)
                .body("succes");
    }


}
