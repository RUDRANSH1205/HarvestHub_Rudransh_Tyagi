package com.harvesthub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("farms")
public class Farm extends OwnedDocument {

    @NotBlank(message = "Farm name is required.")
    private String name;

    private String location;

    @PositiveOrZero(message = "Total area cannot be negative.")
    private Double totalArea;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Double getTotalArea() { return totalArea; }
    public void setTotalArea(Double totalArea) { this.totalArea = totalArea; }
}
