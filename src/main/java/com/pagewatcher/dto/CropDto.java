package com.pagewatcher.dto;

import com.pagewatcher.model.ImageCrop;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
public class CropDto {
    private LocalDate createDate;
    private String url;
    private String email;
    private ImageCrop imageCrop;
}
