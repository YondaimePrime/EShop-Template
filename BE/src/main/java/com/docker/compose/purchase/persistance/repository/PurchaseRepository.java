package com.docker.compose.purchase.persistance.repository;

import com.docker.compose.purchase.persistance.entity.Purchase;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PurchaseRepository extends MongoRepository<Purchase, String> {
    List<Purchase> findPurchasesByEmail(String email);
}
