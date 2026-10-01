package com.harvesthub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("expenses")
public class Expense extends OwnedDocument {

    @NotBlank(message = "Please select a field.")
    private String fieldId;

    private String cropId;

    @NotBlank(message = "Please select a category.")
    private String category;

    @NotNull(message = "Amount is required.")
    @PositiveOrZero(message = "Amount cannot be negative.")
    private Double amount;

    private LocalDate date;

    private String description;

    public String getFieldId() { return fieldId; }
    public void setFieldId(String fieldId) { this.fieldId = fieldId; }

    public String getCropId() { return cropId; }
    public void setCropId(String cropId) { this.cropId = cropId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
