package com.puc.aluguel.repository;

import com.puc.aluguel.model.Automovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AutomovelRepository extends JpaRepository<Automovel, Long> {

    /** Disponível = sem pedido EXECUTADO associado (disponibilidade derivada). */
    @Query("""
            select a from Automovel a
            where a.id not in (
                select p.automovel.id from Pedido p where p.status = com.puc.aluguel.model.StatusPedido.EXECUTADO
            )
            order by a.marca, a.modelo
            """)
    List<Automovel> findDisponiveis();
}
