# Histórias de Usuário — Sistema de Aluguel de Carros

Documento de histórias de usuário (user stories) seguindo o formato:
**Como** `<ator>`, **quero** `<objetivo>`, **para** `<benefício>`.

Cada história possui critérios de aceite para orientar o desenvolvimento e os testes.

## Atores

| Ator | Descrição |
| :--- | :--- |
| **Cliente** | Usuário individual que solicita aluguéis de automóveis. |
| **Agente** | Empresa ou banco que avalia e executa pedidos (análise financeira e contratos). |
| **Administrador** | Responsável por gerenciar usuários e dados de base do sistema (perfil opcional/suporte). |

---

## Épico 1 — Autenticação e Acesso

### US01 — Cadastro de usuário
**Como** visitante, **quero** me cadastrar com usuário e senha, **para** poder acessar o sistema.

**Critérios de aceite:**
- O sistema exige nome, usuário (e-mail) e senha.
- A senha é armazenada de forma segura (hash).
- Não é permitido cadastrar usuário já existente.
- Ao se cadastrar, o usuário escolhe/recebe um perfil (Cliente ou Agente).

### US02 — Login
**Como** usuário cadastrado, **quero** autenticar com usuário e senha, **para** acessar as funcionalidades do sistema.

**Critérios de aceite:**
- Credenciais inválidas retornam mensagem de erro clara.
- Após login, o sistema gera um token de sessão (ex.: JWT).
- O acesso às telas internas é bloqueado sem autenticação.

### US03 — Logout
**Como** usuário autenticado, **quero** encerrar minha sessão, **para** proteger meus dados.

**Critérios de aceite:**
- Após o logout, o token deixa de ser aceito.
- O usuário é redirecionado para a tela de login.

### US04 — Controle de acesso por perfil
**Como** sistema, **quero** restringir funcionalidades conforme o perfil, **para** garantir que cada ator acesse apenas o que lhe compete.

**Critérios de aceite:**
- Cliente não acessa funções exclusivas de Agente (avaliar pedidos).
- Agente não cria pedidos em nome próprio como cliente.

---

## Épico 2 — Gestão de Clientes (CRUD)

### US05 — Cadastrar cliente
**Como** Cliente, **quero** registrar meus dados pessoais, **para** poder solicitar aluguéis.

**Critérios de aceite:**
- Armazena RG, CPF, nome, endereço e profissão.
- Permite registrar até 3 entidades empregadoras com os respectivos rendimentos.
- CPF e RG são validados quanto ao formato e unicidade.

### US06 — Consultar cliente
**Como** Cliente ou Agente, **quero** consultar os dados de um cliente, **para** conferir informações cadastrais.

**Critérios de aceite:**
- Cliente visualiza apenas os próprios dados.
- Agente pode consultar clientes vinculados aos pedidos que avalia.

### US07 — Atualizar cliente
**Como** Cliente, **quero** editar meus dados cadastrais, **para** mantê-los atualizados.

**Critérios de aceite:**
- Alterações são validadas antes de salvar.
- Histórico de rendimentos respeita o limite de 3 entidades.

### US08 — Remover cliente
**Como** Cliente, **quero** remover meu cadastro, **para** encerrar meu vínculo com o sistema.

**Critérios de aceite:**
- Não é permitido remover cliente com pedidos ativos.
- A remoção exige confirmação.

---

## Épico 3 — Gestão de Pedidos de Aluguel

### US09 — Criar pedido de aluguel
**Como** Cliente, **quero** criar um pedido de aluguel de automóvel, **para** solicitar o serviço.

**Critérios de aceite:**
- O pedido referencia um automóvel disponível.
- O pedido nasce com status **PENDENTE**.
- O pedido pode opcionalmente estar associado a um contrato de crédito.

### US10 — Consultar status do pedido
**Como** Cliente, **quero** visualizar o status dos meus pedidos, **para** acompanhar o andamento.

**Critérios de aceite:**
- Status possíveis: PENDENTE, EM_ANALISE, APROVADO, REPROVADO, CANCELADO, EXECUTADO.
- A tela lista data, automóvel e status atual.

### US11 — Modificar pedido
**Como** Cliente, **quero** alterar um pedido ainda não executado, **para** ajustar as condições.

**Critérios de aceite:**
- Só é possível modificar pedidos em status PENDENTE ou EM_ANALISE.
- Alterações registram data de atualização.

### US12 — Cancelar pedido
**Como** Cliente, **quero** cancelar um pedido, **para** desistir do aluguel.

**Critérios de aceite:**
- Só é possível cancelar pedidos não executados.
- O status passa para CANCELADO.

---

## Épico 4 — Avaliação de Pedidos (Agente)

### US13 — Analisar pedido financeiramente
**Como** Agente, **quero** analisar um pedido do ponto de vista financeiro, **para** emitir um parecer.

**Critérios de aceite:**
- Ao iniciar a análise, o status passa para EM_ANALISE.
- O agente registra parecer positivo (APROVADO) ou negativo (REPROVADO).

### US14 — Avaliar e executar contrato
**Como** Agente, **quero** executar o contrato de um pedido aprovado, **para** concretizar o aluguel.

**Critérios de aceite:**
- Só pedidos APROVADOS podem ser executados.
- A execução gera o registro do contrato e muda o status para EXECUTADO.
- Define a propriedade do automóvel (cliente, empresa ou banco) conforme o tipo de contrato.

### US15 — Associar contrato de crédito
**Como** Agente (banco), **quero** associar um contrato de crédito ao aluguel, **para** financiar a operação.

**Critérios de aceite:**
- O contrato de crédito é concedido por um banco agente.
- O crédito fica vinculado ao pedido/contrato de aluguel.

---

## Épico 5 — Gestão de Automóveis

### US16 — Cadastrar automóvel
**Como** Agente, **quero** cadastrar automóveis, **para** disponibilizá-los para aluguel.

**Critérios de aceite:**
- Armazena matrícula, ano, marca, modelo e placa.
- Placa é única no sistema.

### US17 — Listar automóveis disponíveis
**Como** Cliente, **quero** listar os automóveis disponíveis, **para** escolher qual alugar.

**Critérios de aceite:**
- A listagem exibe apenas automóveis não comprometidos em contratos executados.
