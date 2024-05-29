package com.docker.compose.products.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.Map;

@Data
public class ProductDetailDTO {


    private String id;
    private String name;
    private String type;
    private float price;
    private long count;
    private String description;
    private String img;
    private String additional;
    private Map<String, String> parameters;
}
