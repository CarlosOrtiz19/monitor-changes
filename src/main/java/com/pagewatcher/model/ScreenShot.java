package com.pagewatcher.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Lob;

@Getter
@Setter
public class ScreenShot {
 @Lob
 @Column(columnDefinition = "BLOB")
    private byte[] data;
    private String  format;
    private String width;
    private String height;
    private String channels;
    private String premultiplied;
    private String size;
}
