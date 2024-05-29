package com.docker.compose;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class SpringbootMongodbDockerApplication {

	public static void main(String[] args) {
		SpringApplication.run
				(SpringbootMongodbDockerApplication.class, args);

	}


}
