package com.pagewatcher.service;

import com.pagewatcher.model.Crop;
import com.pagewatcher.model.Details;
import com.pagewatcher.repository.CropRepository;
import com.pagewatcher.repository.DetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class DetailsService {

    @Autowired
    private DetailsRepository detailsRepository;

    @Autowired
    private CropRepository cropRepository;

    public Details saveDetails(Details details){
        return detailsRepository.save(details);
    }

    public List<Details> detailsByCropId(Long id){
        Optional<Crop> crop = cropRepository.findById(id);
        if(crop.isEmpty()){
            return Collections.emptyList();
        }
        return detailsRepository.findByCrop(crop.get());
    }
}
