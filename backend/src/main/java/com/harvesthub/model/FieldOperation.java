package com.harvesthub.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("operations")
public class FieldOperation extends OwnedDocument {

    @NotBlank(message = "Please select a field.")
    private String fieldId;

    /** Ploughing, Sowing, Irrigation, Fertilization, Pesticide Application, Weeding, Harvesting */
    @NotBlank(message = "Please select an operation type.")
    private String type;

    @NotNull(message = "Please choose a date.")
    private LocalDate date;

    private String notes;

    public String getFieldId() { return fieldId; }
    public void setFieldId(String fieldId) { this.fieldId = fieldId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
