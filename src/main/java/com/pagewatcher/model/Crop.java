package com.pagewatcher.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String top;
    private String bottom;
    private String width;
    private String height;
    private String url;
    private String email;

    @OneToOne
    private ImageCrop imageCrop;

    @ManyToOne
    @JoinColumn(name="crop_id")
    private User user;
}
