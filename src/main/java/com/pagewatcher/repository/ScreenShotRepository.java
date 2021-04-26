package com.pagewatcher.repository;

import com.pagewatcher.model.ScreenShot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScreenShotRepository extends JpaRepository<ScreenShot,Long> {
}
