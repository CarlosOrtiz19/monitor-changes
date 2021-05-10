package com.pagewatcher.repository;

import com.pagewatcher.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropImageRepository extends JpaRepository<Crop, Long> {
}
