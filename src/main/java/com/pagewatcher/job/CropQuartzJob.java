package com.pagewatcher.job;

import com.pagewatcher.config.proxi.NotificationProxy;
import com.pagewatcher.model.Crop;
import com.pagewatcher.model.MonitoringJob;
import com.pagewatcher.model.Details;
import com.pagewatcher.repository.CropQuartzRepository;
import com.pagewatcher.repository.DetailsRepository;
import com.pagewatcher.service.CropService;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

public class CropQuartzJob implements Job {
    private static final Logger log = LoggerFactory.getLogger(CropQuartzJob.class);

    @Autowired
    private CropQuartzRepository cropQuartzRepository;

    @Autowired
    private CropService cropService;

    @Autowired
    private DetailsRepository detailsRepository;

    @Autowired
    private NotificationProxy notificationProxy;

    @Override
    public void execute(JobExecutionContext context) {
        /* Get message id recorded by scheduler during scheduling */
        JobDataMap dataMap = context.getJobDetail().getJobDataMap();

        String cropQuartzId = dataMap.getString("cropQuartzId");

        log.info("Executing job for cropQuartzId id {}", cropQuartzId);

        /* Get message from database by id */
        long id = Long.parseLong(cropQuartzId);
        Optional<MonitoringJob> cropQuartz = cropQuartzRepository.findById(id);

        if(cropQuartz.isPresent()){
            log.info("cropQuartz id {}", cropQuartz.get().getId());

            Crop crop = cropQuartz.get().getCrop();
            boolean isSimilar = cropService.compareCrops(crop);
            Details details = new Details();
            details.setLastMonitoring(getCurrentDate());
            details.setStateLastMonitoring(isSimilar);
            details.setCrop(crop);
            detailsRepository.save(details);

            if(!isSimilar){
                notificationProxy.sendNotificationTo(crop.getEmail());
                log.info("email send to  {}", crop.getEmail());
            }
            log.info("the images are similar {}", isSimilar);
        } else{
            try {
                context.getScheduler().deleteJob(new JobKey(cropQuartzId));
                TriggerKey triggerKey = new TriggerKey(cropQuartzId);
                context.getScheduler().unscheduleJob(triggerKey);
            } catch (SchedulerException e) {
                e.printStackTrace();
            }
        }
    }

    private String getCurrentDate() {
        LocalDateTime now = LocalDateTime.now();
        return now.atZone(ZoneId.of("GMT")).format(DateTimeFormatter.RFC_1123_DATE_TIME);
    }
}
