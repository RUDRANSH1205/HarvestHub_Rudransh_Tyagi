package com.harvesthub.controller;

import com.harvesthub.model.Farm;
import com.harvesthub.repository.FarmRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/farms")
public class FarmController extends CrudController<Farm> {

    public FarmController(FarmRepository repository) {
        super(repository);
    }
}
