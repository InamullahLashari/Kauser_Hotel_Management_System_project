package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                                // ✅ Allow public access to signup and login
                                //.requestMatchers("/user/signup","/user/save" ).permitAll()

                                .anyRequest().permitAll()   // 🔓 All endpoints are open

                        // 🔒 Secure all other endpoints
                        // .requestMatchers("/user/fetch").authenticated()
                        // .requestMatchers("/user/fetchBynum").permitAll()
                        // .requestMatchers("/user/update/**").authenticated()
                        // .requestMatchers("/user/{id}").authenticated()
                        // .requestMatchers("/user/all").authenticated()

                        // .anyRequest().denyAll()
                )
                .httpBasic(withDefaults())          // Basic Auth enabled (not used)
                .formLogin(AbstractHttpConfigurer::disable); // Disable form login (API only)

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
