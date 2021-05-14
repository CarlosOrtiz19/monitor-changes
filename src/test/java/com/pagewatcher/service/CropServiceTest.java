package com.pagewatcher.service;

import com.pagewatcher.dto.CropDto;
import com.pagewatcher.model.Crop;
import com.pagewatcher.model.ImageCrop;
import com.pagewatcher.repository.CropRepository;
import com.pagewatcher.service.utils.CompareImages;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
class CropServiceTest {

    @Autowired
    private CropService cropService;

    @MockBean
    CropRepository cropRepository;

    @MockBean
    ServerExpressConnector serverExpressConnector;

    @MockBean
    CompareImages compareImages;

    private Crop crop;
    private ImageCrop imageCrop;
    private byte [] file;
    private BufferedImage bufferedImage;

    @BeforeEach
    public void setUp() throws IOException {
        bufferedImage = new BufferedImage(200, 200,BufferedImage.TYPE_INT_RGB);
        file = new ByteArrayOutputStream().toByteArray();

        crop = new Crop();
        crop.setId(1L);
        crop.setWidth(200);
        crop.setHeight(200);
        crop.setX(0);
        crop.setY(0);
        imageCrop = new ImageCrop();

        imageCrop.setData(toByteArray(bufferedImage));
        crop.setImageCrop(imageCrop);
    }

    @Test
    public void saveCrop() {
        when(cropRepository.save(any())).thenReturn(crop);
        Crop response = cropService.setCropImage(crop);
        Assertions.assertEquals(crop, response);
    }

    @Test
    public void compareCrops() throws IOException {
        when(cropService.getScreenShot(crop)).thenReturn(bufferedImage);
        when(cropRepository.findById(any())).thenReturn(Optional.of(crop));

        boolean response = cropService.compareCrops(crop);

        Assertions.assertTrue(response);
        Mockito.verify(serverExpressConnector, Mockito.times(1)).getScreenShotFeing(any());
    }

    @Test
    void testSaveInitialCrop() {
        when(cropService.getScreenShot(crop)).thenReturn(bufferedImage);
        when(cropRepository.findById(any())).thenReturn(Optional.of(crop));

        Crop response = cropService.saveInitialCrop(crop);

        Assertions.assertNotNull(response);
    }

    @Test
    void getCropByEmail() {
        when(cropRepository.findByEmail(any())).thenReturn(Arrays.asList(crop));

        List<CropDto> cropList = cropService.getCropByEmail("test@emal.com");

        Assertions.assertNotNull(cropList);
        Assertions.assertEquals(1,cropList.size());

    }

    @Test
    void deleteCrop() {
        cropService.deleteCrop(crop.getId());
        Assertions.assertEquals(Optional.empty(), cropRepository.findById(1L));
    }

    public static byte[] toByteArray(BufferedImage bi)
            throws IOException {

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "png", baos);
        byte[] bytes = baos.toByteArray();
        return bytes;

    }
}