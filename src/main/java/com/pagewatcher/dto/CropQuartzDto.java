package com.pagewatcher.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CropQuartzDto {
    private String message;
    private LocalDateTime created;
    private Boolean changed;

}
