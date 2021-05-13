package com.pagewatcher.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@ToString(exclude = {"detailsList","imageCrop"})
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
    private String title;
    private LocalDate createDate;

    @JsonIgnore
    @OneToMany(mappedBy = "crop",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Details> detailsList;

    @OneToOne(cascade = CascadeType.ALL)
    private MonitoringJob monitoringJob;

    @OneToOne( cascade = CascadeType.ALL)
    private ImageCrop imageCrop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id")
    private User user;

    public Crop (){
        createDate = LocalDate.now();
    }
}
