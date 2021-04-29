package com.pagewatcher.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ImageCrop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Lob
    private byte[] data;

    @OneToOne(mappedBy = "imageCrop")
    private Crop crop;
}
