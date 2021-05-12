package com.pagewatcher.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@ToString(exclude = {"crop"})
public class Details {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String lastMonitoring;
    private boolean stateLastMonitoring;

    @ManyToOne
    @JoinColumn(name = "crop_id")
    private Crop crop;
}
