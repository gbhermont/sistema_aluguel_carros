# 🚗 Sistema de Aluguel de Carros 👨‍💻

> [!NOTE]
> Sistema web para apoio à gestão de aluguéis de automóveis, permitindo efetuar, cancelar e modificar pedidos pela Internet, com análise financeira realizada por agentes (empresas e bancos).

Projeto desenvolvido para o **Laboratório 02** da disciplina **DIAW — Desenvolvimento e Integração de Aplicações Web** do curso de **Engenharia de Software** (PUC Minas), sob orientação do **Prof. Dr. João Paulo Carneiro Aramuni**.

---

## 🚧 Status do Projeto

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-JDK%2025-007ec6?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.x-007ec6?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-007ec6?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-007ec6?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-007ec6?style=for-the-badge&logo=supabase&logoColor=white)

---

## 📚 Índice
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Modelagem (UML)](#-modelagem-uml)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Documentações Utilizadas](#-documentações-utilizadas)
- [Autores](#-autores)
- [Licença](#-licença)

---

## 📝 Sobre o Projeto

Pretende-se desenvolver um sistema para apoio à gestão de aluguéis de automóveis que permita **efetuar, cancelar e modificar pedidos** através da Internet.

O sistema só pode ser utilizado **após cadastro prévio e autenticação** (login com usuário e senha):

- **Clientes** podem introduzir, modificar, consultar e cancelar pedidos de aluguel.
- **Agentes** (empresas e bancos) podem modificar e avaliar pedidos.

Após a introdução no sistema, os pedidos são analisados do ponto de vista **financeiro** pelos agentes e, em caso de parecer positivo, são colocados à consideração para **execução do contrato**.

O sistema armazena dados dos contratantes (RG, CPF, nome, endereço), profissão, entidades empregadoras e rendimentos (máximo 3), além dos automóveis (matrícula, ano, marca, modelo, placa) e eventuais contratos de crédito concedidos por bancos.

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação Segura:** login obrigatório para clientes e agentes.
- 👤 **CRUD de Cliente:** cadastro, consulta, edição e remoção de clientes.
- 📝 **Gestão de Pedidos:** criar, modificar, consultar e cancelar pedidos de aluguel.
- 🧮 **Avaliação de Pedidos:** análise financeira e emissão de parecer pelos agentes.
- 📄 **Contratos:** execução de contratos e associação a contratos de crédito (bancos).
- 🚗 **Gestão de Automóveis:** cadastro e listagem de veículos disponíveis.

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end
* **Biblioteca:** React 19
* **Build Tool:** Vite 7
* **Linguagem:** JavaScript (ES6+)

### 🖥️ Back-end
* **Linguagem/Runtime:** Java (JDK 25)
* **Framework:** Spring Boot 4.0.x
* **Arquitetura:** MVC
* **Build e Dependências:** Apache Maven
* **Banco de Dados:** Supabase (PostgreSQL)
* **Autenticação:** login com usuário e senha (Spring Security)

---

## 🏗 Arquitetura

O sistema adota a arquitetura **MVC** no back-end (Spring Boot), dividido em dois subsistemas:
um para **gestão de pedidos e contratos** e outro para a **construção dinâmica das páginas web**
(delegada ao front-end React + Vite). O servidor central comunica-se com os clientes e agentes
através da Internet via **API REST**, tendo o **Supabase (PostgreSQL)** como banco de dados.

As camadas do back-end seguem o fluxo `controller → service → repository → model`, com `dto`
para transferência de dados, `security` para autenticação e `config` para integrações.

> 📎 Diagramas detalhados em [`docs/diagrama-de-pacotes.md`](docs/diagrama-de-pacotes.md).

---

## 📐 Modelagem (UML)

Toda a modelagem está versionada na pasta [`docs/`](docs/) em formato Mermaid
(renderizável diretamente no GitHub):

| Artefato | Arquivo |
| :--- | :--- |
| 📖 Histórias de Usuário | [`docs/historias-de-usuario.md`](docs/historias-de-usuario.md) |
| 🎭 Diagrama de Casos de Uso | [`docs/diagrama-casos-de-uso.md`](docs/diagrama-casos-de-uso.md) |
| 🧬 Diagrama de Classes | [`docs/diagrama-de-classes.md`](docs/diagrama-de-classes.md) |
| 📦 Diagrama de Pacotes (Visão Lógica) | [`docs/diagrama-de-pacotes.md`](docs/diagrama-de-pacotes.md) |

---

## 🔧 Instalação e Execução

### Pré-requisitos
* **Java JDK 25** ou superior (back-end Spring Boot)
* **Node.js** LTS (v18+) e **npm** (front-end React)
* **Apache Maven** (ou o Maven Wrapper `./mvnw`)
* Conta e projeto no **Supabase** (PostgreSQL)

### 🔑 Variáveis de Ambiente

**Back-end** (`backend/src/main/resources/application.properties` ou variáveis de sistema):

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `SERVER_PORT` | Porta do back-end | `8080` |
| `SPRING_DATASOURCE_URL` | URL JDBC do Supabase | `jdbc:postgresql://db.<ref>.supabase.co:5432/postgres` |
| `SPRING_DATASOURCE_USERNAME` | Usuário do banco | `postgres` |
| `SPRING_DATASOURCE_PASSWORD` | Senha do banco | `***` |
| `JWT_SECRET` | Chave de assinatura dos tokens | `chave_base64` |

**Front-end** (`frontend/.env.local`):

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL base da API | `http://localhost:8080/api` |

### ⚡ Como Executar

**Terminal 1 — Back-end:**
```bash
cd backend
./mvnw spring-boot:run
```
🚀 Disponível em `http://localhost:8080`.

**Terminal 2 — Front-end:**
```bash
cd frontend
npm install
npm run dev
```
🎨 Disponível em `http://localhost:5173`.

---

## 📂 Estrutura de Pastas

```
sistema_aluguel_carros/
├── README.md                 # 📘 Documentação principal
├── docs/                     # 📐 Modelagem UML (histórias, casos de uso, classes, pacotes)
│   ├── historias-de-usuario.md
│   ├── diagrama-casos-de-uso.md
│   ├── diagrama-de-classes.md
│   └── diagrama-de-pacotes.md
├── backend/                  # 🖥️ Aplicação Spring Boot (a ser criada)
│   └── src/main/java/com/puc/aluguel
│       ├── controller/       # 🎮 Endpoints REST
│       ├── service/          # ⚙️ Regras de negócio
│       ├── repository/       # 🗄️ Acesso a dados (JPA)
│       ├── model/            # 🧬 Entidades
│       ├── dto/              # ✉️ Transferência de dados
│       ├── security/         # 🛡️ Autenticação
│       └── config/           # 🔧 Configurações
└── frontend/                 # 💻 Aplicação React + Vite (a ser criada)
    └── src/
        ├── pages/
        ├── components/
        ├── services/
        └── hooks/
```

---

## 📖 Documentações Utilizadas

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring MVC](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
- [Apache Maven](https://maven.apache.org/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Supabase](https://supabase.com/docs)
- [Template de README (Prof. João Paulo Aramuni)](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md)

---

## 👥 Autores

| Nome | GitHub |
| :--- | :--- |
| Gabriel Hermont| [@gbhermont](https://github.com/gbhermont) |

> Disciplina: **DIAW** — Engenharia de Software (2º período) — Prof. Dr. João Paulo Carneiro Aramuni.

---

## 📄 Licença

Projeto acadêmico distribuído sob a **[Licença MIT](https://opensource.org/licenses/MIT)**.
