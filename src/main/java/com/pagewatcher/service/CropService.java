package com.pagewatcher.service;

import com.pagewatcher.model.Crop;
import com.pagewatcher.model.ImageCrop;
import com.pagewatcher.repository.CropRepository;
import com.pagewatcher.repository.ImageCropRepository;
import com.pagewatcher.repository.ScreenShotRepository;
import com.pagewatcher.service.utils.CompareImages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Optional;
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

    public Crop saveInitialCrop(Crop crop) throws IOException {
        //ScreenShot screenShot = serverExpressConnector.getAsyncResponseBody(crop).thenApply(ScreenShotMapper::mapperResponse).join();
        BufferedImage screenShot = getScreenShot(crop);

        BufferedImage cropImage = getCropImage(screenShot, crop);

        if (cropImage != null) {
            ByteArrayOutputStream pngContent = new ByteArrayOutputStream();

            ImageCrop imageCrop = new ImageCrop();
            imageCrop.setName("image" + crop.getId());

            ImageIO.write(cropImage, "png", pngContent);
            imageCrop.setData(pngContent.toByteArray());

            imageCropRepository.save(imageCrop);
            LOGGER.info("Crop image saved ");
            crop.setImageCrop(imageCrop);

            //test
            // ImageIO.read((ImageInputStream) screenShot);
            String filePath = "D:\\Desktop\\image15.png";
            ImageIO.write(cropImage, "png", new File(filePath));
            System.out.println("look desktop");
        }
        return saveCrop(crop);
    }

    public Crop saveCrop(Crop crop) {
        return cropRepository.save(crop);
    }


    private BufferedImage getScreenShot(Crop crop) {
        BufferedImage screenShot = null;
        try {
            screenShot = serverExpressConnector.getScreenShot(crop.getUrl());
            LOGGER.info("screenshot taken");
        } catch (IOException e) {
            LOGGER.info("problem getting the screenshot");
            e.printStackTrace();
        }
        return screenShot;
    }

    private BufferedImage getCropImage(BufferedImage bufferedImage, Crop crop) {
        LOGGER.info("create crop image ");
        return bufferedImage.getSubimage(
                validLimit(crop.getX(), bufferedImage.getHeight()),
                validLimit(crop.getY(), bufferedImage.getWidth()),
                validLimit(crop.getWidth(), bufferedImage.getWidth()),
                validLimit(crop.getHeight(), bufferedImage.getHeight()));
    }

    private int validLimit(int axe, int limit) {
        int value = axe;
        if (axe < 0) {
            value = 0;
        }
        if (axe > limit) {
            value = limit;
        }
        return value;
    }

    public boolean compareCrops(Crop crop) {
        boolean areEquals = false;
        //from server Node
        BufferedImage screenShot = getScreenShot(crop);
        //actual crop
        BufferedImage cropImage = getCropImage(screenShot, crop);
        //crop in bd
        BufferedImage cropInbd = null;

        Optional<Crop> cropOrigin = cropRepository.findById(crop.getId());

        if (cropOrigin.isPresent()) {

            InputStream imageInBd = new ByteArrayInputStream(cropOrigin.get().getImageCrop().getData());
            try {
                cropInbd = ImageIO.read(imageInBd);
            } catch (IOException e) {
                e.printStackTrace();
            }
            areEquals = CompareImages.compare(cropImage,cropInbd);
        }
        return areEquals;
    }

}
