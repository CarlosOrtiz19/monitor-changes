package com.pagewatcher.service;

import com.pagewatcher.config.QuartzConfig;
import com.pagewatcher.dto.CropDto;
import com.pagewatcher.job.CropQuartzJob;
import com.pagewatcher.mapper.CropMapper;
import com.pagewatcher.model.Crop;
import com.pagewatcher.model.ImageCrop;
import com.pagewatcher.model.MonitoringJob;
import com.pagewatcher.repository.MonitoringJobRepository;
import com.pagewatcher.repository.CropRepository;
import com.pagewatcher.repository.ImageCropRepository;
import com.pagewatcher.service.utils.CompareImages;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import static org.quartz.CronScheduleBuilder.cronSchedule;

@Service
public class CropService {

    private final Logger LOGGER = LoggerFactory.getLogger(CropService.class);

    @Autowired
    private ImageCropRepository imageCropRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private ServerExpressConnector serverExpressConnector;

    @Autowired
    private QuartzConfig quartzConfig;
    @Autowired
    private MonitoringJobRepository monitoringJobRepository;

    @Autowired
    private CropMapper cropMapper;

    public Crop saveInitialCrop(Crop crop) {

        BufferedImage cropImage = getCropImage(crop);

        setCropImage(crop, cropImage);

        configureMonitoringJob(crop);

        return crop;
    }

    public List<CropDto> getCropByEmail(String email) {

        LOGGER.info("get all crops by email");
        List<Crop> crop = cropRepository.findByEmail(email);
        return cropMapper.toDtoList(crop);
    }

    public void deleteCrop(Long cropId) {
        cropRepository.deleteById(cropId);
    }

    public Crop setCropImage(Crop crop) {
        return cropRepository.save(crop);
    }

    private void setCropImage(Crop crop, BufferedImage cropImage) {
        if (cropImage != null) {
            ByteArrayOutputStream pngContent = new ByteArrayOutputStream();

            ImageCrop imageCrop = new ImageCrop();
            imageCrop.setName("image_" + crop.getId());

            try {
                ImageIO.write(cropImage, "png", pngContent);
            } catch (IOException e) {
                e.printStackTrace();
            }
            imageCrop.setData(pngContent.toByteArray());

            imageCropRepository.save(imageCrop);
            LOGGER.info("Crop image saved ");
            crop.setImageCrop(imageCrop);

        }
    }

    public BufferedImage getScreenShot(Crop crop) {
        BufferedImage screenShot = null;
        try {
            //screenShot = serverExpressConnector.getScreenShot(crop.getUrl());
            screenShot = serverExpressConnector.getScreenShotFeing(crop.getUrl());
            LOGGER.info("screenshot taken");
        } catch (IOException e) {
            LOGGER.info("problem getting the screenshot");
            e.printStackTrace();
        }
        return screenShot;
    }

    public BufferedImage getCropImage(Crop crop) {
        BufferedImage screenShot = getScreenShot(crop);

        if (screenShot == null || crop == null) {
            LOGGER.info("image or crop  = null ");
            return null;
        }
        LOGGER.info("create crop image ");
        return screenShot.getSubimage(
                validLimit(crop.getX(), screenShot.getHeight()),
                validLimit(crop.getY(), screenShot.getWidth()),
                validLimit(crop.getWidth(), screenShot.getWidth()),
                validLimit(crop.getHeight(), screenShot.getHeight()));
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
        //current crop
        BufferedImage cropImage = getCropImage(crop);
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
            areEquals = CompareImages.compare(cropImage, cropInbd);
        }
        return areEquals;
    }

    private void configureMonitoringJob(Crop crop) {
        MonitoringJob monitoringJob = new MonitoringJob();
        monitoringJobRepository.save(monitoringJob);
        crop.setMonitoringJob(monitoringJob);
        cropRepository.save(crop);

        try {
            // Creating JobDetail instance
            String id = String.valueOf(monitoringJob.getId());
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
        }
    }
}
