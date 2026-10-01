package com.harvesthub.controller;

import com.harvesthub.model.Expense;
import com.harvesthub.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController extends CrudController<Expense> {

    public ExpenseController(ExpenseRepository repository) {
        super(repository);
    }
}
