package com.pagewatcher.service;

import com.pagewatcher.model.CropImage;
import com.pagewatcher.repository.CropImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CropImageService {

    @Autowired
    CropImageRepository cropImageRepository;

    public CropImage saveCropInformation(CropImage cropImage) {
        System.out.println("info");
        System.out.println(cropImage);
        return  cropImageRepository.save(cropImage);

    }
}
