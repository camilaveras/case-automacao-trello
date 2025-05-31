const apiKey = Cypress.env("apiKey");
const apiToken = Cypress.env("token");

describe('Testes da API do Trello', () => {
  let boardId;
  let listId;
  let cardId;

it('Verifica variáveis', () => {
  cy.log('API Key:', Cypress.env('apiKey'));
  cy.log('Token:', Cypress.env('token'));
});

  it('Cria um board', () => {
    cy.request({
      method: 'POST',
      url: `https://api.trello.com/1/boards/?name=MeuBoardTest&key=${apiKey}&token=${apiToken}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      boardId = response.body.id;
    });
  });

  it('Cria um card', () => {
    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`
    }).then((response) => {
      listId = response.body[0].id;
      cy.request({
        method: 'POST',
        url: `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,
        body: {
          name: 'MeuCardTest',
          idList: listId
        }
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        cardId = resp.body.id;
      });
    });
  });

  it('Exclui o card', () => {
    cy.request({
      method: 'DELETE',
      url: `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Exclui o board', () => {
    cy.request({
      method: 'DELETE',
      url: `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
