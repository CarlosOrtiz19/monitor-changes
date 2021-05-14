package com.pagewatcher.repository;

import com.pagewatcher.model.MonitoringJob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonitoringJobRepository extends JpaRepository<MonitoringJob, Long> {
}
