package com.harvesthub.controller;

import com.harvesthub.model.Crop;
import com.harvesthub.repository.CropRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/crops")
public class CropController extends CrudController<Crop> {

    public CropController(CropRepository repository) {
        super(repository);
    }
}
