package com.puc.aluguel.service;

import com.puc.aluguel.dto.CriarPedidoRequest;
import com.puc.aluguel.dto.ModificarPedidoRequest;
import com.puc.aluguel.dto.ParecerRequest;
import com.puc.aluguel.dto.PedidoResponse;
import com.puc.aluguel.exception.RecursoNaoEncontradoException;
import com.puc.aluguel.model.Automovel;
import com.puc.aluguel.model.Cliente;
import com.puc.aluguel.model.Pedido;
import com.puc.aluguel.model.StatusPedido;
import com.puc.aluguel.repository.AutomovelRepository;
import com.puc.aluguel.repository.ClienteRepository;
import com.puc.aluguel.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Regras de pedido. Operações do cliente partem do login autenticado (um cliente
 * só vê e altera os próprios pedidos); operações do agente agem sobre qualquer pedido.
 */
@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final AutomovelRepository automovelRepository;

    public PedidoService(PedidoRepository pedidoRepository, ClienteRepository clienteRepository,
                         AutomovelRepository automovelRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.automovelRepository = automovelRepository;
    }

    // --- Cliente ---

    @Transactional
    public PedidoResponse criar(String login, CriarPedidoRequest req) {
        Cliente cliente = clienteRepository.findByLogin(login)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado."));
        Automovel automovel = buscarAutomovel(req.automovelId());
        Pedido pedido = pedidoRepository.save(new Pedido(cliente, automovel));
        return PedidoResponse.de(pedido);
    }

    @Transactional(readOnly = true)
    public List<PedidoResponse> listarDoCliente(String login) {
        return pedidoRepository.findByClienteLoginOrderByDataCriacaoDesc(login).stream()
                .map(PedidoResponse::de).toList();
    }

    @Transactional(readOnly = true)
    public PedidoResponse consultarDoCliente(String login, Long id) {
        return PedidoResponse.de(buscarDoCliente(login, id));
    }

    @Transactional
    public PedidoResponse modificar(String login, Long id, ModificarPedidoRequest req) {
        Pedido pedido = buscarDoCliente(login, id);
        pedido.trocarAutomovel(buscarAutomovel(req.automovelId()));
        return PedidoResponse.de(pedido);
    }

    @Transactional
    public PedidoResponse cancelar(String login, Long id) {
        Pedido pedido = buscarDoCliente(login, id);
        pedido.cancelar();
        return PedidoResponse.de(pedido);
    }

    // --- Agente ---

    @Transactional(readOnly = true)
    public List<PedidoResponse> listarParaAgente(StatusPedido status) {
        List<Pedido> pedidos = (status == null)
                ? pedidoRepository.findAllByOrderByDataCriacaoDesc()
                : pedidoRepository.findByStatusOrderByDataCriacaoDesc(status);
        return pedidos.stream().map(PedidoResponse::de).toList();
    }

    @Transactional(readOnly = true)
    public PedidoResponse consultar(Long id) {
        return PedidoResponse.de(buscar(id));
    }

    @Transactional
    public PedidoResponse iniciarAnalise(Long id) {
        Pedido pedido = buscar(id);
        pedido.iniciarAnalise();
        return PedidoResponse.de(pedido);
    }

    @Transactional
    public PedidoResponse registrarParecer(Long id, ParecerRequest req) {
        Pedido pedido = buscar(id);
        pedido.registrarParecer(req.aprovado(), req.parecer());
        return PedidoResponse.de(pedido);
    }

    @Transactional
    public PedidoResponse executar(Long id) {
        Pedido pedido = buscar(id);
        pedido.executar();
        return PedidoResponse.de(pedido);
    }

    // --- Helpers ---

    private Pedido buscar(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Pedido não encontrado."));
    }

    private Pedido buscarDoCliente(String login, Long id) {
        return pedidoRepository.findByIdAndClienteLogin(id, login)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Pedido não encontrado."));
    }

    private Automovel buscarAutomovel(Long id) {
        return automovelRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Automóvel não encontrado."));
    }
}
