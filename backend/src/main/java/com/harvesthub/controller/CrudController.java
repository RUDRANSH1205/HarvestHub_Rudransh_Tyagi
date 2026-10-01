package com.harvesthub.controller;

import com.harvesthub.exception.ApiException;
import com.harvesthub.model.OwnedDocument;
import com.harvesthub.repository.OwnedRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

/**
 * The five standard REST endpoints, shared by every module:
 *
 *   GET    /api/{resource}        list the logged-in user's records
 *   GET    /api/{resource}/{id}   get one record
 *   POST   /api/{resource}        create a record
 *   PUT    /api/{resource}/{id}   update a record
 *   DELETE /api/{resource}/{id}   delete a record
 *
 * Every query is filtered by the logged-in user's id, so users can never read or change another user's data.
 */
public abstract class CrudController<T extends OwnedDocument> {

    private final OwnedRepository<T> repository;

    protected CrudController(OwnedRepository<T> repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<T> getAll(@AuthenticationPrincipal String userId) {
        return repository.findByUserId(userId);
    }

    @GetMapping("/{id}")
    public T getById(@PathVariable("id") String id, @AuthenticationPrincipal String userId) {
        return findOwned(id, userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public T create(@Valid @RequestBody T item, @AuthenticationPrincipal String userId) {
        item.setId(null);
        item.setUserId(userId);
        return repository.save(item);
    }

    @PutMapping("/{id}")
    public T update(@PathVariable("id") String id,
                    @Valid @RequestBody T item,
                    @AuthenticationPrincipal String userId) {
        findOwned(id, userId);
        item.setId(id);
        item.setUserId(userId);
        return repository.save(item);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") String id, @AuthenticationPrincipal String userId) {
        repository.delete(findOwned(id, userId));
    }

    private T findOwned(String id, String userId) {
        return repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Record not found."));
    }
}
