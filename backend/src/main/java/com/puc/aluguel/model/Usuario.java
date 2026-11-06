package com.puc.aluguel.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Classe base com os dados de autenticação comuns a Cliente e Agente
 * (docs/diagrama-de-classes.md).
 */
@Entity
@Table(name = "usuario")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String login;

    @Column(name = "senha_hash", nullable = false)
    private String senhaHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Perfil perfil;

    protected Usuario() {
    }

    protected Usuario(String nome, String login, String senhaHash, Perfil perfil) {
        this.nome = nome;
        this.login = login;
        this.senhaHash = senhaHash;
        this.perfil = perfil;
    }

    /** Verifica a senha informada contra o hash armazenado. */
    public boolean autenticar(String senha, PasswordEncoder encoder) {
        return encoder.matches(senha, senhaHash);
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getLogin() { return login; }
    public String getSenhaHash() { return senhaHash; }
    public void setSenhaHash(String senhaHash) { this.senhaHash = senhaHash; }
    public Perfil getPerfil() { return perfil; }
}
