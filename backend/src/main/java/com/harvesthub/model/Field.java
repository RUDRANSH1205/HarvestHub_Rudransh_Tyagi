package com.harvesthub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("fields")
public class Field extends OwnedDocument {

    @NotBlank(message = "Field name is required.")
    private String name;

    @NotBlank(message = "Please select a farm.")
    private String farmId;

    @PositiveOrZero(message = "Area cannot be negative.")
    private Double area;

    private String soilType;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFarmId() { return farmId; }
    public void setFarmId(String farmId) { this.farmId = farmId; }

    public Double getArea() { return area; }
    public void setArea(Double area) { this.area = area; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }
}
