package com.pagewatcher.controller;

import com.pagewatcher.config.QuartzConfig;
import com.pagewatcher.dto.CropDto;
import com.pagewatcher.model.Crop;
import com.pagewatcher.model.Details;
import com.pagewatcher.repository.CropQuartzRepository;
import com.pagewatcher.service.CropImageService;
import com.pagewatcher.service.CropService;
import com.pagewatcher.service.DetailsService;
import com.pagewatcher.service.ServerExpressConnector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/watch")
public class WatchPageController {

    private static Logger LOGGER = LoggerFactory.getLogger(WatchPageController.class);


    @Autowired
    private CropImageService cropImageService;

    @Autowired
    private CropService cropService;

    @Autowired
    private DetailsService detailsService;

    @Autowired
    private QuartzConfig quartzConfig;
    @Autowired
    private CropQuartzRepository cropQuartzRepository;

 
    @PostMapping("/saveCropInfo")
    public ResponseEntity<String> setCropImgae(@RequestBody Crop crop) throws IOException {
        System.out.println("crop = " + crop);

        cropService.saveInitialCrop(crop);


        //cropImageService.saveCropInformation(cropImage);
        return ResponseEntity.status(HttpStatus.OK)
                .body("succes");
    }

    @GetMapping("search/{email}")
    public List<CropDto> getMonitorByEmail(@PathVariable String email) {
        return cropService.getCropByEmail(email);
    }
    @GetMapping("getDetails/{id}")
    public List<Details> cropDetails(@PathVariable Long id) {
        return  detailsService.detailsByCropId(id);

    }

    @DeleteMapping("delete/{cropId}")
    public void deleteCrop(@PathVariable Long cropId){
        cropService.deleteCrop(cropId);
    }


}
