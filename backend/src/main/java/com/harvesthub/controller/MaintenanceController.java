package com.harvesthub.controller;

import com.harvesthub.model.Maintenance;
import com.harvesthub.repository.MaintenanceRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController extends CrudController<Maintenance> {

    public MaintenanceController(MaintenanceRepository repository) {
        super(repository);
    }
}
