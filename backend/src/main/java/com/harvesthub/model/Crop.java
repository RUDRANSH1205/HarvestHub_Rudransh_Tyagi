package com.harvesthub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("crops")
public class Crop extends OwnedDocument {

    @NotBlank(message = "Crop name is required.")
    private String name;

    /** Rabi, Kharif or Zaid */
    private String season;

    /** Growing duration in days */
    @PositiveOrZero(message = "Duration cannot be negative.")
    private Integer duration;

    /** Low, Medium or High */
    private String waterRequirement;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }

    public String getWaterRequirement() { return waterRequirement; }
    public void setWaterRequirement(String waterRequirement) { this.waterRequirement = waterRequirement; }
}
