package com.harvesthub.controller;

import com.harvesthub.model.Field;
import com.harvesthub.repository.FieldRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fields")
public class FieldController extends CrudController<Field> {

    public FieldController(FieldRepository repository) {
        super(repository);
    }
}
