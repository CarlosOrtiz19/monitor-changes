package com.pagewatcher.repository;

import com.pagewatcher.model.CropImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropImageRepository extends JpaRepository<CropImage,Long> {
}
