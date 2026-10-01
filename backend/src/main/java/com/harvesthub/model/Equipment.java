package com.harvesthub.model;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("equipment")
public class Equipment extends OwnedDocument {

    @NotBlank(message = "Equipment name is required.")
    private String name;

    /** Tractor, Water Pump, Harvester ... */
    private String type;

    /** Active, Under Maintenance, Inactive */
    private String status;

    private LocalDate purchaseDate;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }
}
