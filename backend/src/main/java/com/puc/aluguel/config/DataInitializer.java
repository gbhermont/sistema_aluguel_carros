package com.puc.aluguel.config;

import com.puc.aluguel.model.Agente;
import com.puc.aluguel.model.TipoAgente;
import com.puc.aluguel.repository.AgenteRepository;
import com.puc.aluguel.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Carga inicial dos agentes. Agentes não se cadastram pela interface
 * (decisão de modelagem nº 9 em docs/diagrama-de-classes.md).
 */
@Component
public class DataInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UsuarioRepository usuarioRepository;
    private final AgenteRepository agenteRepository;
    private final PasswordEncoder passwordEncoder;
    private final String senhaInicial;

    public DataInitializer(UsuarioRepository usuarioRepository, AgenteRepository agenteRepository,
                           PasswordEncoder passwordEncoder, @Value("${app.seed.agentes-senha}") String senhaInicial) {
        this.usuarioRepository = usuarioRepository;
        this.agenteRepository = agenteRepository;
        this.passwordEncoder = passwordEncoder;
        this.senhaInicial = senhaInicial;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        criarSeNaoExistir("Locadora Alfa", "empresa@email.com", "Locadora Alfa Ltda", "11222333000181", TipoAgente.EMPRESA);
        criarSeNaoExistir("Banco Beta", "banco@email.com", "Banco Beta S.A.", "44555666000172", TipoAgente.BANCO);
    }

    private void criarSeNaoExistir(String nome, String login, String fantasia, String cnpj, TipoAgente tipo) {
        if (usuarioRepository.existsByLogin(login)) {
            return;
        }
        agenteRepository.save(new Agente(nome, login, passwordEncoder.encode(senhaInicial), fantasia, cnpj, tipo));
        log.info("Agente pré-cadastrado: {} ({})", login, tipo);
    }
}
