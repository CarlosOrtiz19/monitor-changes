package com.pagewatcher.service;

import com.pagewatcher.config.QuartzConfig;
import com.pagewatcher.dto.CropDto;
import com.pagewatcher.job.CropQuartzJob;
import com.pagewatcher.mapper.CropMapper;
import com.pagewatcher.model.Crop;
import com.pagewatcher.model.CropQuartz;
import com.pagewatcher.model.ImageCrop;
import com.pagewatcher.repository.CropQuartzRepository;
import com.pagewatcher.repository.CropRepository;
import com.pagewatcher.repository.ImageCropRepository;
import com.pagewatcher.repository.ScreenShotRepository;
import com.pagewatcher.service.utils.CompareImages;

import static org.quartz.CronScheduleBuilder.*;

import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Date;
import java.util.List;
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

    @Autowired
    private QuartzConfig quartzConfig;
    @Autowired
    private CropQuartzRepository cropQuartzRepository;

    @Autowired
    private CropMapper cropMapper;

    public Crop saveInitialCrop(Crop crop) {
        //ScreenShot screenShot = serverExpressConnector.getAsyncResponseBody(crop).thenApply(ScreenShotMapper::mapperResponse).join();
        BufferedImage screenShot = getScreenShot(crop);

        BufferedImage cropImage = getCropImage(screenShot, crop);

        if (cropImage != null) {
            ByteArrayOutputStream pngContent = new ByteArrayOutputStream();

            ImageCrop imageCrop = new ImageCrop();
            imageCrop.setName("image" + crop.getId());

            try {
                ImageIO.write(cropImage, "png", pngContent);
            } catch (IOException e) {
                e.printStackTrace();
            }
            imageCrop.setData(pngContent.toByteArray());

            imageCropRepository.save(imageCrop);
            LOGGER.info("Crop image saved ");
            crop.setImageCrop(imageCrop);

            //test
            // ImageIO.read((ImageInputStream) screenShot);
            String filePath = "D:\\Desktop\\image15.png";
            try {
                ImageIO.write(cropImage, "png", new File(filePath));
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("look desktop");
        }

        cropRepository.save(crop);

        /*CropQuartz cropQuartz = new CropQuartz();
        cropQuartz.setCrop(crop);

        cropQuartzRepository.save(cropQuartz);
        try {
            // Creating JobDetail instance
            String id = String.valueOf(cropQuartz.getId());
            JobDetail jobDetail = JobBuilder.newJob(CropQuartzJob.class).withIdentity(id).build();

            // Adding JobDataMap to jobDetail
            jobDetail.getJobDataMap().put("cropQuartzId", id);

            // Scheduling time to run job
            Date triggerJobAt = new Date();

            Trigger trigger = TriggerBuilder.newTrigger().withIdentity(id)
                    .withSchedule(cronSchedule("0 /1 * * * ?"))
                    .build();
            // Getting scheduler instance
            Scheduler scheduler = quartzConfig.schedulerFactoryBean().getScheduler();
            scheduler.scheduleJob(jobDetail, trigger);
            scheduler.start();

            LOGGER.info("Scheduler start");

        } catch (IOException | SchedulerException e) {
            e.printStackTrace();
        }*/

        return crop;
    }

    public void deleteCrop(Long cropId){
        cropRepository.deleteById(cropId);
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

        System.out.println("cropOrigin desde compare  = " + cropOrigin.get().getId());

        if (cropOrigin.isPresent()) {

            InputStream imageInBd = new ByteArrayInputStream(cropOrigin.get().getImageCrop().getData());
            try {
                cropInbd = ImageIO.read(imageInBd);
            } catch (IOException e) {
                e.printStackTrace();
            }
            areEquals = CompareImages.compare(cropImage, cropInbd);
        }
        return areEquals;
    }

    public List<CropDto> getCropByEmail(String email) {

        LOGGER.info("get all crops by email");
        List<Crop> crop = cropRepository.findByEmail(email);
        return cropMapper.toDtoList(crop);
    }

}
