package com.puc.aluguel.repository;

import com.puc.aluguel.model.Pedido;
import com.puc.aluguel.model.StatusPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByClienteLoginOrderByDataCriacaoDesc(String login);

    List<Pedido> findByStatusOrderByDataCriacaoDesc(StatusPedido status);

    List<Pedido> findAllByOrderByDataCriacaoDesc();

    Optional<Pedido> findByIdAndClienteLogin(Long id, String login);

    boolean existsByClienteIdAndStatusIn(Long clienteId, java.util.Collection<StatusPedido> status);
}
