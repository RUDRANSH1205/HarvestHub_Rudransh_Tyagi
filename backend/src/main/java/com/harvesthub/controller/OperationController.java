package com.harvesthub.controller;

import com.harvesthub.model.FieldOperation;
import com.harvesthub.repository.OperationRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/operations")
public class OperationController extends CrudController<FieldOperation> {

    public OperationController(OperationRepository repository) {
        super(repository);
    }
}
