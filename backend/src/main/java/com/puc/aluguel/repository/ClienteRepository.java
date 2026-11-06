package com.puc.aluguel.repository;

import com.puc.aluguel.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    boolean existsByCpf(String cpf);

    boolean existsByRg(String rg);
}
