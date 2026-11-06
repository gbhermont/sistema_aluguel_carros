package com.puc.aluguel.service;

import com.puc.aluguel.dto.CadastroClienteRequest;
import com.puc.aluguel.dto.LoginRequest;
import com.puc.aluguel.dto.RendimentoRequest;
import com.puc.aluguel.dto.TokenResponse;
import com.puc.aluguel.dto.UsuarioResponse;
import com.puc.aluguel.exception.RegraNegocioException;
import com.puc.aluguel.model.Cliente;
import com.puc.aluguel.model.Rendimento;
import com.puc.aluguel.model.Usuario;
import com.puc.aluguel.repository.ClienteRepository;
import com.puc.aluguel.repository.UsuarioRepository;
import com.puc.aluguel.security.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

/** Regras de autenticação e cadastro público de clientes (US01, US02). */
@Service
public class AuthService {

    private static final String CREDENCIAIS_INVALIDAS = "Usuário ou senha inválidos.";

    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UsuarioRepository usuarioRepository, ClienteRepository clienteRepository,
                       PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @Transactional(readOnly = true)
    public TokenResponse login(LoginRequest req) {
        Usuario usuario = usuarioRepository.findByLogin(normalizarLogin(req.login()))
                .filter(u -> u.autenticar(req.senha(), passwordEncoder))
                // Mesma mensagem para usuário inexistente e senha errada: não revela quais logins existem.
                .orElseThrow(() -> new RegraNegocioException(HttpStatus.UNAUTHORIZED, CREDENCIAIS_INVALIDAS));
        TokenService.TokenEmitido token = tokenService.gerar(usuario);
        return new TokenResponse(token.valor(), token.expiraEm(), UsuarioResponse.de(usuario));
    }

    @Transactional
    public UsuarioResponse cadastrarCliente(CadastroClienteRequest req) {
        String login = normalizarLogin(req.login());
        String cpf = req.cpf().replaceAll("\\D", "");
        String rg = req.rg().trim().toUpperCase(Locale.ROOT);

        if (usuarioRepository.existsByLogin(login)) {
            throw new RegraNegocioException(HttpStatus.CONFLICT, "Já existe um usuário com este login.");
        }
        if (clienteRepository.existsByCpf(cpf)) {
            throw new RegraNegocioException(HttpStatus.CONFLICT, "Já existe um cliente com este CPF.");
        }
        if (clienteRepository.existsByRg(rg)) {
            throw new RegraNegocioException(HttpStatus.CONFLICT, "Já existe um cliente com este RG.");
        }

        Cliente cliente = new Cliente(req.nome().trim(), login, passwordEncoder.encode(req.senha()),
                rg, cpf, req.endereco().trim(), req.profissao().trim());
        List<RendimentoRequest> rendimentos = req.rendimentos() == null ? List.of() : req.rendimentos();
        rendimentos.forEach(r -> cliente.adicionarRendimento(
                new Rendimento(r.entidadeEmpregadora().trim(), r.valor())));

        return UsuarioResponse.de(clienteRepository.save(cliente));
    }

    @Transactional(readOnly = true)
    public UsuarioResponse buscarPorLogin(String login) {
        return usuarioRepository.findByLogin(login)
                .map(UsuarioResponse::de)
                .orElseThrow(() -> new RegraNegocioException(HttpStatus.UNAUTHORIZED, "Usuário não encontrado."));
    }

    private static String normalizarLogin(String login) {
        return login.trim().toLowerCase(Locale.ROOT);
    }
}
