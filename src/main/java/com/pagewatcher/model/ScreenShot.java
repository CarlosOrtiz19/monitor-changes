package com.pagewatcher.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class ScreenShot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] data;
    private String format;
    private String width;
    private String height;
    private String channels;
    private String premultiplied;
    private String size;
}
