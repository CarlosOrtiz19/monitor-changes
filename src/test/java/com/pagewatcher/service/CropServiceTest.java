package com.pagewatcher.service;

import com.pagewatcher.model.Crop;
import com.pagewatcher.repository.CropRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class CropServiceTest {

    @Autowired
    private CropService cropService;

    @MockBean
    CropRepository cropRepository;

    private Crop crop;

    @BeforeEach
    public void setUp() {
        crop = new Crop();
    }

    @Test
    public void saveInitialCrop() {

    }


    @Test
    public void saveCrop() {
        when(cropRepository.save(any())).thenReturn(crop);
        Crop response = cropService.saveCrop(crop);
        Assertions.assertEquals(crop, crop);
    }

    @Test
    public void compareCrops() {
    }
}