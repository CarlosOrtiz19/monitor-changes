package com.pagewatcher.repository;

import com.pagewatcher.model.MonitoringJob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropQuartzRepository extends JpaRepository<MonitoringJob, Long> {
}
