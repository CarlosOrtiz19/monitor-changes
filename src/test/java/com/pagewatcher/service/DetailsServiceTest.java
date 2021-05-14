package com.pagewatcher.service;

import com.pagewatcher.model.Crop;
import com.pagewatcher.model.Details;
import com.pagewatcher.repository.CropRepository;
import com.pagewatcher.repository.DetailsRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class DetailsServiceTest {

    @MockBean
    private DetailsRepository detailsRepository;

    @MockBean
    private CropRepository cropRepository;

    @Autowired
    private DetailsService detailsService;

    private Crop crop;
    private Details details;

    @BeforeEach
    public void setUp() throws IOException {
        crop = new Crop();
        crop.setId(1L);
        crop.setWidth(200);
        crop.setHeight(200);
        crop.setX(0);
        crop.setY(0);
        details = new Details();
        details.setCrop(crop);
    }

    @Test
    void saveDetails() {
        when(detailsRepository.save(any())).thenReturn(details);

        Details res = detailsService.saveDetails(details);

        Assertions.assertNotNull(res);
        Assertions.assertEquals(details,res);

    }

    @Test
    void detailsByCropId() {
        when(cropRepository.findById(any())).thenReturn(Optional.of(crop));
        when(detailsRepository.findByCrop(any())).thenReturn(Arrays.asList(details));

        List<Details> detailsList = detailsService.detailsByCropId(1L);

        Assertions.assertNotNull(detailsList);
        Assertions.assertEquals(1,detailsList.size());
    }
}