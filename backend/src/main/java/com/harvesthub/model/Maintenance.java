package com.harvesthub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("maintenance")
public class Maintenance extends OwnedDocument {

    @NotBlank(message = "Please select equipment.")
    private String equipmentId;

    @NotNull(message = "Maintenance date is required.")
    private LocalDate maintenanceDate;

    private LocalDate nextMaintenanceDate;

    @PositiveOrZero(message = "Cost cannot be negative.")
    private Double cost;

    private String description;

    public String getEquipmentId() { return equipmentId; }
    public void setEquipmentId(String equipmentId) { this.equipmentId = equipmentId; }

    public LocalDate getMaintenanceDate() { return maintenanceDate; }
    public void setMaintenanceDate(LocalDate maintenanceDate) { this.maintenanceDate = maintenanceDate; }

    public LocalDate getNextMaintenanceDate() { return nextMaintenanceDate; }
    public void setNextMaintenanceDate(LocalDate nextMaintenanceDate) { this.nextMaintenanceDate = nextMaintenanceDate; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
