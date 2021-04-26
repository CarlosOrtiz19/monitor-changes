package com.pagewatcher.service;

import com.pagewatcher.model.Crop;
import com.pagewatcher.model.ScreenShot;
import com.pagewatcher.repository.CropRepository;
import com.pagewatcher.repository.ScreenShotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class CropService {

    private final Logger LOGGER = Logger.getLogger(ServerExpressConnector.class.getName());

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private ServerExpressConnector serverExpressConnector;

    @Autowired
    private ScreenShotRepository screenShotRepository;

    public Crop saveCropinfo(Crop crop){
        ScreenShot screenShot = serverExpressConnector.getAsyncResponseBody(crop).thenApply(ScreenShotMapper::mapperResponse).join();

        LOGGER.info("ScreenShot saved "+ screenShot);
        screenShotRepository.save(screenShot);
        return cropRepository.save(crop);
    }
}
