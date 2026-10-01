package com.harvesthub.controller;

import com.harvesthub.model.Rotation;
import com.harvesthub.repository.RotationRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rotations")
public class RotationController extends CrudController<Rotation> {

    public RotationController(RotationRepository repository) {
        super(repository);
    }
}
