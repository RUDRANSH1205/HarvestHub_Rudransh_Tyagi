package com.harvesthub.controller;

import com.harvesthub.model.YieldRecord;
import com.harvesthub.repository.YieldRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/yields")
public class YieldController extends CrudController<YieldRecord> {

    public YieldController(YieldRepository repository) {
        super(repository);
    }
}
