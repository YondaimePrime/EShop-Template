package com.docker.compose.products.controller;

import com.docker.compose.products.persistance.entity.Product;
import com.docker.compose.products.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class ProductController {

    @Autowired
    private final ProductService productService;

    @GetMapping("/products")
    public ResponseEntity < List <Product>> getAllProduct() {
        return ResponseEntity.ok().body(productService.getAllProduct());
    }

    @GetMapping("/products/type:{type}")
    public ResponseEntity < List <Product>> findProductByType(@PathVariable String type) {
        return ResponseEntity.ok().body(productService.getProductByType(type));
    }

    @GetMapping("products/type:{type}/{additional}")
    public ResponseEntity< List<Product>> getProductsByParameters(@PathVariable("type") String type,
                                                                  @PathVariable("additional") String additional){
        return ResponseEntity.ok().body(productService.getProductsByAdditionalAndType(type, additional));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity < Product > getProductById(@PathVariable String id) {
        return ResponseEntity.ok().body(productService.getProductById(id));
    }

    @PostMapping("/products")
    public ResponseEntity < Product > createProduct(@RequestBody Product product) {
        System.out.println("\n" + product + "\n");
        return ResponseEntity.ok().body(this.productService.createProduct(product));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity < Product > updateProduct(@PathVariable String id, @RequestBody Product product) {
        product.setId(id);
        return ResponseEntity.ok().body(this.productService.updateProduct(product));
    }

    @DeleteMapping("/products/{id}")
    public HttpStatus deleteProduct(@PathVariable String id) {
        this.productService.deleteProduct(id);
        return HttpStatus.OK;
    }

    @DeleteMapping("/products")
    public HttpStatus deleteCollection() {
        this.productService.deleteCollection();
        return HttpStatus.OK;
    }
}
