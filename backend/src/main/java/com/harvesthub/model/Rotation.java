package com.harvesthub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("rotations")
public class Rotation extends OwnedDocument {

    @NotBlank(message = "Please select a field.")
    private String fieldId;

    @NotNull(message = "Please select a year.")
    private Integer year;

    @NotBlank(message = "Please select a season.")
    private String season;

    @NotBlank(message = "Please select a crop.")
    private String cropId;

    public String getFieldId() { return fieldId; }
    public void setFieldId(String fieldId) { this.fieldId = fieldId; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public String getCropId() { return cropId; }
    public void setCropId(String cropId) { this.cropId = cropId; }
}
