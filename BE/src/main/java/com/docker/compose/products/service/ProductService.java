package com.docker.compose.products.service;

import com.docker.compose.exception.ResourceNotFoundException;
import com.docker.compose.products.persistance.entity.Product;
import com.docker.compose.products.persistance.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }


    public Product createProduct(Product product) {
        return productRepository.save(product);
    }


    public Product updateProduct(Product product) {
        Optional< Product > productDb = this.productRepository.findById(product.getId());

        if (productDb.isPresent()){
            Product productUpdate = productDb.get();
            productUpdate.setId(product.getId());
            productUpdate.setName(product.getName());
            productUpdate.setType(product.getType());
            productUpdate.setPrice(product.getPrice());
            productUpdate.setCount(product.getCount());
            productUpdate.setDescription(product.getDescription());
            productUpdate.setImg(product.getImg());

            productRepository.save(productUpdate);
            return productUpdate;
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + product.getId());
        }
    }



    public List < Product > getAllProduct() {
        return this.productRepository.findAll();
    }



    public List<Product> getProductByType(String type) {
        return productRepository.findProductsByType(type);
    }


    public List<Product> getProductsByAdditionalAndType(String type, String additional) {
        return productRepository.findProductsByTypeAndAdditional(type, additional);
        //processors - Intel, AMD
        //motherboards - Asus, Msi
        //disks - HDD, SDD
        //PSU - do 600. 600 -800, 800 +

    }



    public Product getProductById(String productId) {

        Optional < Product > productDb = this.productRepository.findById(productId);

        if (productDb.isPresent()) {
            return productDb.get();
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + productId);
        }
    }


    public void deleteProduct(String productId) {
        Optional < Product > productDb = this.productRepository.findById(productId);

        if (productDb.isPresent()) {
            this.productRepository.delete(productDb.get());
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + productId);
        }

    }


    public void deleteCollection() {
        this.productRepository.deleteAll();
    }
}
