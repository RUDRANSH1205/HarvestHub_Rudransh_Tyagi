package com.harvesthub.repository;

import com.harvesthub.model.OwnedDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.Optional;

/** Shared queries for every record that belongs to a user. */
@NoRepositoryBean
public interface OwnedRepository<T extends OwnedDocument> extends MongoRepository<T, String> {

    List<T> findByUserId(String userId);

    Optional<T> findByIdAndUserId(String id, String userId);
}
