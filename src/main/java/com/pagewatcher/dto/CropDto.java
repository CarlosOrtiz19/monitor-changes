package com.pagewatcher.dto;

import com.pagewatcher.model.Details;
import com.pagewatcher.model.ImageCrop;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CropDto {
    private Long id;
    private String title;
    private LocalDate createDate;
    private String url;
    private String email;
    private ImageCrop imageCrop;
    private List<Details> detailsList;
}
