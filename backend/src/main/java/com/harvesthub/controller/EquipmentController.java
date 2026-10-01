package com.harvesthub.controller;

import com.harvesthub.model.Equipment;
import com.harvesthub.repository.EquipmentRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController extends CrudController<Equipment> {

    public EquipmentController(EquipmentRepository repository) {
        super(repository);
    }
}
