package com.puc.aluguel.service;

import com.puc.aluguel.dto.AtualizarClienteRequest;
import com.puc.aluguel.dto.ClienteResponse;
import com.puc.aluguel.dto.RendimentoRequest;
import com.puc.aluguel.exception.RecursoNaoEncontradoException;
import com.puc.aluguel.exception.RegraNegocioException;
import com.puc.aluguel.model.Cliente;
import com.puc.aluguel.model.Rendimento;
import com.puc.aluguel.model.StatusPedido;
import com.puc.aluguel.repository.ClienteRepository;
import com.puc.aluguel.repository.PedidoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * CRUD de cliente (UC04 / US06, US07, US08). Cada cliente só acessa os próprios
 * dados: as operações partem sempre do login autenticado, nunca de um id arbitrário.
 */
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PedidoRepository pedidoRepository;

    public ClienteService(ClienteRepository clienteRepository, PedidoRepository pedidoRepository) {
        this.clienteRepository = clienteRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Transactional(readOnly = true)
    public ClienteResponse consultarPorLogin(String login) {
        return ClienteResponse.de(buscar(login));
    }

    @Transactional
    public ClienteResponse atualizar(String login, AtualizarClienteRequest req) {
        Cliente cliente = buscar(login);
        cliente.atualizarDados(req.nome().trim(), req.endereco().trim(), req.profissao().trim());

        List<RendimentoRequest> reqs = req.rendimentos() == null ? List.of() : req.rendimentos();
        List<Rendimento> rendimentos = reqs.stream()
                .map(r -> new Rendimento(r.entidadeEmpregadora().trim(), r.valor()))
                .toList();
        cliente.substituirRendimentos(rendimentos);

        return ClienteResponse.de(clienteRepository.save(cliente));
    }

    @Transactional
    public void remover(String login) {
        Cliente cliente = buscar(login);
        // US08: não é permitido remover cliente com pedidos ativos.
        if (pedidoRepository.existsByClienteIdAndStatusIn(cliente.getId(), StatusPedido.ATIVOS)) {
            throw new RegraNegocioException(HttpStatus.CONFLICT,
                    "Não é possível remover: há pedidos ativos (Pendente, Em análise ou Aprovado).");
        }
        clienteRepository.delete(cliente);
    }

    private Cliente buscar(String login) {
        return clienteRepository.findByLogin(login)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado."));
    }
}
