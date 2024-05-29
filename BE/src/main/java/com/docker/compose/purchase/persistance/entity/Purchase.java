package com.docker.compose.purchase.persistance.entity;

import com.docker.compose.products.persistance.entity.Product;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Purchase {

    @Id
    private String id;
    private List<Product> products;
    private float finalPrice;
    private String time;

    private String email;
    private String name;
    private String address;

}
