package com.puc.aluguel.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/** Contratante do aluguel. Possui no máximo 3 rendimentos. */
@Entity
@Table(name = "cliente")
public class Cliente extends Usuario {

    public static final int MAX_RENDIMENTOS = 3;

    @Column(nullable = false, unique = true)
    private String rg;

    @Column(nullable = false, unique = true, length = 11)
    private String cpf;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private String profissao;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rendimento> rendimentos = new ArrayList<>();

    protected Cliente() {
    }

    public Cliente(String nome, String login, String senhaHash,
                   String rg, String cpf, String endereco, String profissao) {
        super(nome, login, senhaHash, Perfil.CLIENTE);
        this.rg = rg;
        this.cpf = cpf;
        this.endereco = endereco;
        this.profissao = profissao;
    }

    public void adicionarRendimento(Rendimento rendimento) {
        if (rendimentos.size() >= MAX_RENDIMENTOS) {
            throw new IllegalStateException("Cliente pode ter no máximo " + MAX_RENDIMENTOS + " rendimentos.");
        }
        rendimento.setCliente(this);
        rendimentos.add(rendimento);
    }

    /** Atualiza os dados cadastrais editáveis (login, CPF e RG são imutáveis). */
    public void atualizarDados(String nome, String endereco, String profissao) {
        setNome(nome);
        this.endereco = endereco;
        this.profissao = profissao;
    }

    /** Substitui a lista de rendimentos, respeitando o limite máximo. */
    public void substituirRendimentos(List<Rendimento> novos) {
        if (novos.size() > MAX_RENDIMENTOS) {
            throw new IllegalStateException("Cliente pode ter no máximo " + MAX_RENDIMENTOS + " rendimentos.");
        }
        rendimentos.clear();
        novos.forEach(this::adicionarRendimento);
    }

    public String getRg() { return rg; }
    public String getCpf() { return cpf; }
    public String getEndereco() { return endereco; }
    public String getProfissao() { return profissao; }
    public List<Rendimento> getRendimentos() { return Collections.unmodifiableList(rendimentos); }
}
