package com.pagewatcher.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer x;
    private Integer y;
    private Integer width;
    private Integer height;
    private String url;
    private String email;
    @OneToOne(mappedBy = "crop" )
    private CropQuartz cropQuartz;

    @OneToOne
    private ImageCrop imageCrop;

    @ManyToOne
    @JoinColumn(name="crop_id")
    private User user;
}
