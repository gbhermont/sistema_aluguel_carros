# Diagrama de Classes — Sistema de Aluguel de Carros

Modelo de domínio do sistema, representando entidades, atributos, métodos e relacionamentos.
Escrito em **Mermaid** (`classDiagram`).

## Diagrama

```mermaid
classDiagram
    direction TB

    class Usuario {
        <<abstract>>
        +Long id
        +String nome
        +String login
        +String senhaHash
        +Perfil perfil
        +autenticar(senha) boolean
    }

    class Cliente {
        +String rg
        +String cpf
        +String endereco
        +String profissao
        +criarPedido(auto) Pedido
        +cancelarPedido(pedido) void
    }

    class Agente {
        +String nomeFantasia
        +String cnpj
        +TipoAgente tipo
        +analisarPedido(pedido) void
        +executarContrato(pedido) Contrato
    }

    class Rendimento {
        +Long id
        +String entidadeEmpregadora
        +BigDecimal valor
    }

    class Automovel {
        +Long id
        +String matricula
        +int ano
        +String marca
        +String modelo
        +String placa
        +boolean disponivel
    }

    class Pedido {
        +Long id
        +LocalDateTime dataCriacao
        +LocalDateTime dataAtualizacao
        +StatusPedido status
        +atualizarStatus(novo) void
    }

    class Contrato {
        +Long id
        +LocalDate dataExecucao
        +TipoPropriedade propriedade
        +BigDecimal valorTotal
    }

    class ContratoCredito {
        +Long id
        +BigDecimal valorFinanciado
        +int parcelas
        +BigDecimal taxaJuros
    }

    class Banco {
        +String codigoBanco
        +concederCredito(contrato) ContratoCredito
    }

    %% Enums
    class Perfil {
        <<enumeration>>
        CLIENTE
        AGENTE
    }
    class StatusPedido {
        <<enumeration>>
        PENDENTE
        EM_ANALISE
        APROVADO
        REPROVADO
        CANCELADO
        EXECUTADO
    }
    class TipoAgente {
        <<enumeration>>
        EMPRESA
        BANCO
    }
    class TipoPropriedade {
        <<enumeration>>
        CLIENTE
        EMPRESA
        BANCO
    }

    %% Herança
    Usuario <|-- Cliente
    Usuario <|-- Agente
    Agente <|-- Banco

    %% Associações
    Cliente "1" o-- "0..3" Rendimento : possui
    Cliente "1" --> "*" Pedido : solicita
    Pedido "*" --> "1" Automovel : refere
    Pedido "1" --> "0..1" Contrato : gera
    Pedido "1" --> "0..1" ContratoCredito : pode ter
    Agente "1" --> "*" Pedido : avalia
    Banco "1" --> "*" ContratoCredito : concede
    Contrato "1" --> "1" Automovel : envolve
```

## Descrição das entidades

| Entidade | Responsabilidade |
| :--- | :--- |
| **Usuario** (abstrata) | Classe base com dados de autenticação comuns a Cliente e Agente. |
| **Cliente** | Contratante do aluguel. Guarda RG, CPF, endereço, profissão e até 3 rendimentos. |
| **Agente** | Empresa ou banco que avalia e executa pedidos. |
| **Banco** | Agente especializado que concede contratos de crédito. |
| **Rendimento** | Entidade empregadora e valor auferido pelo cliente (máx. 3 por cliente). |
| **Automovel** | Veículo disponível para aluguel (matrícula, ano, marca, modelo, placa). |
| **Pedido** | Solicitação de aluguel feita pelo cliente, com ciclo de status. |
| **Contrato** | Formaliza a execução do aluguel e define a propriedade do automóvel. |
| **ContratoCredito** | Financiamento concedido por um banco, associado a um pedido/contrato. |

## Regras de negócio refletidas no modelo
- Um **Cliente** possui no máximo **3 Rendimentos** (`0..3`).
- Um **Pedido** sempre referencia **1 Automóvel** e pertence a **1 Cliente**.
- Um **Pedido** pode (opcionalmente) ter **1 ContratoCredito** e gerar **1 Contrato** ao ser executado.
- A **propriedade** do automóvel no contrato pode ser do cliente, empresa ou banco.
- Apenas **Agentes** avaliam pedidos; apenas **Bancos** concedem crédito.
