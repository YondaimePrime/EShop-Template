package com.docker.compose.products.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductRequestDTO {

    @NotNull
    private String id;
    @NotBlank(message = "Product name must not be empty!")
    private String name;
    @NotBlank(message = "Product type must not be empty!")
    private String type;
    @NotBlank(message = "Product price must not be empty!")
    private float price;
    @NotBlank(message = "Product count must not be empty!")
    private long count;
    @NotBlank(message = "Product description must not be empty!")
    private String description;
    @NotBlank(message = "Product image must not be empty!")
    private String img;
}
