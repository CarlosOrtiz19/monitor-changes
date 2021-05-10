package com.pagewatcher.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
public class Details {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate lastMonitoring;
    private boolean stateLastMonitoring;

    @ManyToOne
    @JoinColumn(name = "crop_id")
    private Crop crop;
}
