package com.docker.compose.purchase.service;

import com.docker.compose.products.persistance.entity.Product;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class PurchaseDetailDto {

    private String id;
    private List<Product> products;
    private float finalPrice;
    private String time;

    private String email;
    private String name;
    private String address;

}
