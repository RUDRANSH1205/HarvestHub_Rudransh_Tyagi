package com.harvesthub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

// Named YieldRecord because "yield" is a reserved word in Java.
@Document("yields")
public class YieldRecord extends OwnedDocument {

    @NotBlank(message = "Please select a field.")
    private String fieldId;

    @NotBlank(message = "Please select a crop.")
    private String cropId;

    private LocalDate harvestDate;

    @NotNull(message = "Quantity is required.")
    @PositiveOrZero(message = "Quantity cannot be negative.")
    private Double quantity;

    /** Quintal, Kg, Tonne ... */
    private String unit;

    public String getFieldId() { return fieldId; }
    public void setFieldId(String fieldId) { this.fieldId = fieldId; }

    public String getCropId() { return cropId; }
    public void setCropId(String cropId) { this.cropId = cropId; }

    public LocalDate getHarvestDate() { return harvestDate; }
    public void setHarvestDate(LocalDate harvestDate) { this.harvestDate = harvestDate; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
}
