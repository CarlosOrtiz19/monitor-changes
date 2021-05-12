package com.pagewatcher.repository;

import com.pagewatcher.model.Crop;
import com.pagewatcher.model.Details;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailsRepository extends JpaRepository<Details, Long> {

    List<Details> findByCrop(Crop crop);
}
