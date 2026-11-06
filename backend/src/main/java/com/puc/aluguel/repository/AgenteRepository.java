package com.puc.aluguel.repository;

import com.puc.aluguel.model.Agente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgenteRepository extends JpaRepository<Agente, Long> {
}
