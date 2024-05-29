package com.docker.compose.purchase.service;

import com.docker.compose.email.entity.EmailDetails;
import com.docker.compose.email.service.EmailService;
import com.docker.compose.exception.ResourceNotFoundException;
import com.docker.compose.purchase.persistance.entity.Purchase;
import com.docker.compose.purchase.persistance.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
@Service
public class PurchaseService {


    public PurchaseService(PurchaseRepository purchaseRepository){
        this.purchaseRepository = purchaseRepository;
    }

    @Autowired
    private final PurchaseRepository purchaseRepository;

    @Autowired
    private EmailService emailService;

    public Purchase createPurchase(Purchase purchase){
        return purchaseRepository.save(purchase);
    }

    public List<Purchase> getAllPurchases(){
        return purchaseRepository.findAll();
    }

    public Purchase getPurchaseById(String id){
        Optional<Purchase> cartById = this.purchaseRepository.findById(id);

        if(cartById.isPresent()){
            return cartById.get();
        }
        else{
            throw new ResourceNotFoundException("Cart with id: " + id + " does not exits");
        }
    }

    public List<Purchase> getPurchaseByEmail(String email){
        Optional< List<Purchase>> purchasesByUser = Optional.ofNullable(this.purchaseRepository.findPurchasesByEmail(email));

        if(purchasesByUser.isEmpty()){
            throw new ResourceNotFoundException("User doesn't exist or does not have any purchases");
        }else{
            return purchasesByUser.get();
        }
    }

    public Purchase updatePurchase(Purchase purchase){
        Optional<Purchase> purchaseById = this.purchaseRepository.findById(purchase.getId());

        if (purchaseById.isPresent()){
            Purchase purchaseUpdate = purchaseById.get();

            purchaseUpdate.setId(purchase.getId());
            purchaseUpdate.setEmail(purchase.getEmail());
            purchaseUpdate.setTime(purchase.getTime());
            purchaseUpdate.setProducts(purchase.getProducts());
            purchaseUpdate.setFinalPrice(purchase.getFinalPrice());

            purchaseRepository.save(purchaseUpdate);
            return purchaseUpdate;
        }
        else
        {
            throw new ResourceNotFoundException("Purchase by id: " + purchase.getId() + " does not exits");
        }
    }

    public void deletePurchase(String id){
        Optional<Purchase> purchaseById = this.purchaseRepository.findById(id);

        if(purchaseById.isPresent()){
            purchaseRepository.delete(purchaseById.get());
        }
        else
        {
            throw new ResourceNotFoundException("Purchase with id: " + id + " does not exist");
        }
    }

    public void deleteAllPurchase(){
        this.purchaseRepository.deleteAll();
    }
}
