package com.pagewatcher.service;

import com.pagewatcher.model.Crop;
import com.pagewatcher.model.CropArea;
import com.pagewatcher.model.ImageCrop;
import com.pagewatcher.repository.CropRepository;
import com.pagewatcher.repository.ImageCropRepository;
import com.pagewatcher.repository.ScreenShotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageInputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.logging.Logger;

@Service
public class CropService {

    private final Logger LOGGER = Logger.getLogger(ServerExpressConnector.class.getName());

    @Autowired
    private ImageCropRepository imageCropRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private ServerExpressConnector serverExpressConnector;

    @Autowired
    private ScreenShotRepository screenShotRepository;

    public Crop saveCropinfo(Crop crop) throws IOException {
        //ScreenShot screenShot = serverExpressConnector.getAsyncResponseBody(crop).thenApply(ScreenShotMapper::mapperResponse).join();
        BufferedImage screenShot = null;
        try {
            screenShot = serverExpressConnector.getScreenShot(crop.getUrl());
            System.out.println("crop.getUrl() = " + crop.getUrl());
        } catch (IOException e) {
            LOGGER.info("problem getting the screenshot");
            e.printStackTrace();
        }
        LOGGER.info("ScreenShot saved ");

        BufferedImage cropImage = getCropImage(screenShot, crop);

        if (cropImage != null) {
            ByteArrayOutputStream pngContent = new ByteArrayOutputStream();

            ImageCrop imageCrop = new ImageCrop();
            imageCrop.setName("image" + crop.getId());
            ImageIO.write(cropImage, "png", pngContent);
            imageCrop.setData(pngContent.toByteArray());
            imageCropRepository.save(imageCrop);
            crop.setImageCrop(imageCrop);


            //test
           // ImageIO.read((ImageInputStream) screenShot);
            String filePath = "D:\\Desktop\\image15.png";
            ImageIO.write(cropImage, "png", new File(filePath));


            System.out.println("look desktop");
        }

        return cropRepository.save(crop);
    }

    private BufferedImage getCropImage(BufferedImage bufferedImage, Crop crop) {
        Integer top = crop.getX();
        System.out.println("top = " + validLimit(crop.getX(),bufferedImage.getHeight()));
        System.out.println("bottom = " + validLimit(crop.getY(),bufferedImage.getWidth()));
        System.out.println("width = " + crop.getWidth());
        System.out.println("height = " + crop.getHeight());

        LOGGER.info("create crop ");
        System.out.println("height " + bufferedImage.getHeight());
        System.out.println("width " + bufferedImage.getWidth());
        return bufferedImage.getSubimage(
                validLimit(crop.getX(),bufferedImage.getHeight()),
                validLimit(crop.getY(),bufferedImage.getWidth()),
                validLimit(crop.getWidth(),bufferedImage.getWidth()),
                validLimit(crop.getHeight(),bufferedImage.getHeight()));


    }

    private int validLimit(int axe, int limit) {
        int value = axe;
        if(axe < 0 ){
            value = 0;
        }
        if(axe > limit){
            value = limit;
        }
        return value;
    }

}
