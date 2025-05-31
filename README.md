# Projeto de Automação de Testes Cypress - Trello API

Este projeto contém scripts automatizados com Cypress para testar a API do Trello. Ele cobre:

- Criação de um Board
- Criação de um Card no Board
- Exclusão do Card
- Exclusão do Board

## Tecnologias

- Cypress
- Node.js

## Como executar os testes

### Instale as dependências

npm install
shell
Copiar
Editar

### Rode o Cypress em modo interativo

npx cypress open

kotlin
Copiar
Editar

### Ou rode todos os testes em modo headless (sem interface gráfica)

npx cypress run --spec "cypress/e2e/trelloAPI.cy.js"

perl
Copiar
Editar

## Autenticação

O projeto utiliza:

- API Key e Token do Trello

Esses valores estão configurados no arquivo `cypress/e2e/trelloAPI.cy.js` para facilitar a demonstração.  
Importante: Em projetos reais, recomenda-se utilizar variáveis de ambiente (não deixar expostos no código).

## Estrutura do projeto

cypress-trello/
├── cypress/
│ ├── e2e/
│ │ └── trelloAPI.cy.js
│ ├── fixtures/
│ └── support/
├── node_modules/
├── cypress.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

# Estratégia Geral de Automação

- Ferramenta: Cypress
- Abordagem: Testes de API (usando `cy.request()`)
- Objetivo: Testar os principais endpoints do Trello para as ações:
    1. Criar um board
    2. Criar um card
    3. Excluir um card
    4. Excluir um board

---

## Sequência de execução (passo a passo)

1. **Criar um board**
    - Endpoint: `POST /1/boards/`
    - Necessário enviar `name` e autenticação (chave e token).

2. **Criar um card**
    - Endpoint: `POST /1/cards`
    - Necessário enviar `idList`, `name` e autenticação.

   Importante:  
   Para criar um card, você precisa de um `idList` (lista de um board). Então:
    - Após criar o board, crie uma lista com `POST /1/boards/{id}/lists` (opcional).
    - Ou use uma lista padrão (caso o board tenha uma por padrão).

3. **Excluir um card**
    - Endpoint: `DELETE /1/cards/{id}`
    - Requer o `id` do card.

4. **Excluir um board**
    - Endpoint: `DELETE /1/boards/{id}`
    - Requer o `id` do board.

---

## Mapeamento dos endpoints e dependências

- `POST /1/boards/` → cria board → gera `boardId`
- `POST /1/cards` → cria card (usa `listId` do board) → gera `cardId`
- `DELETE /1/cards/{id}` → deleta o card (usa `cardId`)
- `DELETE /1/boards/{id}` → deleta o board (usa `boardId`)

--------

## Mapa mental da estratégia

Vou montar um mapa mental agora mostrando:

- Ações principais
- Dependências entre endpoints
- Sequência de testes

Mapa Mental – Estratégia de Testes para a API do Trello (Cypress)

![img](https://github.com/user-attachments/assets/63476420-4f69-48b9-a5d1-5fa4b8496a8a)

---

## Mapa Mental finalizado! Ele mostra:

- Início
- Criação de board
- (Opcional: criação de lista, se necessário)
- Criação de card
- Exclusão de card
- Exclusão de board
- Fim

---

## Resumo do projeto de automação com Cypress

- Ferramenta: Cypress (`cy.request` para testes de API)
- Endpoints mapeados:
    - `POST /1/boards`
    - `POST /1/cards`
    - `DELETE /1/cards/{id}`
    - `DELETE /1/boards/{id}`

- Ordem de execução:
    1. Cria board
    2. Cria lista (opcional)
    3. Cria card (usando lista do board)
    4. Exclui card
    5. Exclui board

- Benefício:  
  Fluxo encadeado → evita inconsistências e garante limpeza de dados no final.

Feito por Camila Veras - É Proibido qualquer copia ou compartilhamento. Todos os Direitos reservados a Camila Veras.
