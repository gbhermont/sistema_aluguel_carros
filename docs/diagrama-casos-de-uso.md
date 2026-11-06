# Diagrama de Casos de Uso — Sistema de Aluguel de Carros

Representa os atores do sistema e suas interações com os casos de uso.
O diagrama é escrito em **Mermaid**, que o GitHub renderiza automaticamente.

## Atores
- **Cliente** — usuário individual que gerencia seus pedidos de aluguel.
- **Agente** — empresas e bancos que avaliam, modificam e executam pedidos.
- **Agente Banco** — Agente com `tipo = BANCO`, especializado na concessão de crédito (especialização no diagrama; no modelo de classes é o atributo `TipoAgente`).

## Diagrama

```mermaid
flowchart LR
    %% Atores
    cliente(("👤 Cliente"))
    agente(("🏢 Agente"))
    banco(("🏦 Agente Banco"))

    %% Casos de uso
    subgraph Sistema de Aluguel de Carros
        UC01["Cadastrar-se"]
        UC02["Fazer Login"]
        UC03["Fazer Logout"]

        UC04["Gerenciar dados de Cliente<br/>(CRUD)"]

        UC05["Criar pedido de aluguel"]
        UC06["Consultar status do pedido"]
        UC07["Modificar pedido"]
        UC08["Cancelar pedido"]

        UC14["Modificar pedido<br/>(como Agente)"]
        UC09["Analisar pedido<br/>(financeiramente)"]
        UC10["Avaliar / Executar contrato"]
        UC11["Associar contrato de crédito"]

        UC12["Gerenciar automóveis<br/>(CRUD)"]
        UC13["Listar automóveis disponíveis"]
    end

    %% Relações do Cliente
    cliente --> UC01
    cliente --> UC02
    cliente --> UC03
    cliente --> UC04
    cliente --> UC05
    cliente --> UC06
    cliente --> UC07
    cliente --> UC08
    cliente --> UC13

    %% Relações do Agente
    agente --> UC02
    agente --> UC03
    agente --> UC09
    agente --> UC14
    agente --> UC10
    agente --> UC12

    %% Relações do Banco (agente especializado)
    banco --> UC11

    %% Herança: Banco é um tipo de Agente
    banco -. "é um" .-> agente
```

## Relações de dependência (`<<include>>` / `<<extend>>`)

```mermaid
flowchart TB
    UC05["Criar pedido de aluguel"]
    UC02["Fazer Login"]
    UC11["Associar contrato de crédito"]
    UC10["Executar contrato"]
    UC09["Analisar pedido"]

    UC05 -. "«include»" .-> UC02
    UC09 -. "«include»" .-> UC02
    UC10 -. "«include»" .-> UC09
    UC05 -. "«extend»" .-> UC11
```

## Descrição resumida dos casos de uso

| ID | Caso de Uso | Ator principal | Pré-condição |
| :-- | :--- | :--- | :--- |
| UC01 | Cadastrar-se | Cliente | — (Agentes são pré-cadastrados) |
| UC02 | Fazer Login | Todos | Estar cadastrado |
| UC03 | Fazer Logout | Todos | Estar autenticado |
| UC04 | Gerenciar dados de Cliente | Cliente | Autenticado |
| UC05 | Criar pedido de aluguel | Cliente | Autenticado, automóvel disponível |
| UC06 | Consultar status do pedido | Cliente | Autenticado, possuir pedido |
| UC07 | Modificar pedido | Cliente | Pedido em PENDENTE/EM_ANALISE |
| UC08 | Cancelar pedido | Cliente | Pedido não executado |
| UC09 | Analisar pedido | Agente | Pedido PENDENTE |
| UC10 | Avaliar / Executar contrato | Agente | Pedido APROVADO |
| UC11 | Associar contrato de crédito | Agente Banco | Pedido em análise/aprovado |
| UC12 | Gerenciar automóveis | Agente | Autenticado |
| UC13 | Listar automóveis disponíveis | Cliente | Autenticado |
| UC14 | Modificar pedido (como Agente) | Agente | Autenticado, pedido não executado |
