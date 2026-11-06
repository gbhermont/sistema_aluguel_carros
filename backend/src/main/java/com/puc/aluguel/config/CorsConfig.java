package com.puc.aluguel.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/** Libera o front-end React (Vite) a chamar a API. */
@Configuration
public class CorsConfig {

    @Bean
    CorsConfigurationSource corsConfigurationSource(@Value("${app.cors.origens}") List<String> origens) {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(origens);
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", cfg);
        return source;
    }
}
