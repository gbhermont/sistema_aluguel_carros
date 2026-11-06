# Diagrama de Pacotes (Visão Lógica) — Sistema de Aluguel de Carros

Organização lógica do sistema em pacotes/camadas, seguindo a arquitetura **MVC** no
back-end (Spring Boot) e a separação de responsabilidades no front-end (React + Vite).
Escrito em **Mermaid**.

## Visão geral (Back-end + Front-end + Banco)

```mermaid
flowchart TB
    subgraph FE["Front-end — React + Vite"]
        FE_pages["pages<br/>(telas/rotas)"]
        FE_comp["components<br/>(UI reutilizável)"]
        FE_services["services<br/>(chamadas HTTP à API)"]
        FE_hooks["hooks<br/>(estado e lógica)"]
        FE_pages --> FE_comp
        FE_pages --> FE_services
        FE_pages --> FE_hooks
    end

    subgraph BE["Back-end — Spring Boot (MVC)"]
        BE_controller["controller<br/>(camada Controller / REST)"]
        BE_service["service<br/>(regras de negócio)"]
        BE_repository["repository<br/>(acesso a dados / JPA)"]
        BE_model["model<br/>(entidades / Model)"]
        BE_dto["dto<br/>(transferência de dados)"]
        BE_security["security<br/>(autenticação/JWT)"]
        BE_config["config<br/>(CORS, Supabase, Swagger)"]

        BE_controller --> BE_service
        BE_controller --> BE_dto
        BE_service --> BE_repository
        BE_service --> BE_model
        BE_repository --> BE_model
        BE_security --> BE_controller
        BE_config --> BE_security
    end

    subgraph DB["Banco de Dados"]
        SUPA[("Supabase<br/>PostgreSQL")]
    end

    FE_services -- "HTTP/JSON (REST)" --> BE_controller
    BE_repository -- "JDBC/JPA" --> SUPA
```

## Detalhe das camadas do Back-end (MVC)

```mermaid
flowchart LR
    subgraph com.puc.aluguel
        direction TB
        controller["controller"]
        service["service"]
        repository["repository"]
        model["model"]
        dto["dto"]
        security["security"]
        config["config"]
        exception["exception"]
    end

    controller --> service
    service --> repository
    repository --> model
    controller --> dto
    service --> dto
    controller --> exception
    security --> config
```

## Responsabilidade de cada pacote (Back-end)

| Pacote | Camada MVC | Responsabilidade |
| :--- | :--- | :--- |
| `controller` | **Controller** | Expõe endpoints REST, recebe requisições e devolve respostas. |
| `service` | — (Service Layer) | Concentra as regras de negócio e orquestra repositórios. |
| `repository` | — (DAO) | Persistência via Spring Data JPA sobre o PostgreSQL (Supabase). |
| `model` | **Model** | Entidades de domínio mapeadas com JPA (`@Entity`). |
| `dto` | — | Objetos de transferência entre API e cliente, desacoplando o Model. |
| `security` | — | Autenticação/autorização (Spring Security + JWT). |
| `config` | — | Configurações de CORS, conexão Supabase, Swagger/OpenAPI. |
| `exception` | — | Tratamento global de erros e exceções customizadas. |

## Responsabilidade de cada pasta (Front-end)

| Pasta | Responsabilidade |
| :--- | :--- |
| `pages` | Telas e rotas da aplicação (Login, Clientes, Pedidos). |
| `components` | Componentes de UI reutilizáveis (formulários, tabelas, botões). |
| `services` | Camada de comunicação HTTP com a API Spring Boot. |
| `hooks` | Hooks personalizados para estado e lógica de autenticação. |

## Observações sobre a arquitetura
- O fluxo segue o padrão **MVC**: o `controller` recebe a requisição, delega ao `service`
  (regras de negócio), que usa o `repository` para persistir/consultar as entidades (`model`).
- Os **DTOs** evitam expor diretamente as entidades JPA na API.
- A autenticação é centralizada no pacote `security`, protegendo os endpoints.
- O front-end é desacoplado e se comunica exclusivamente via **API REST**.
