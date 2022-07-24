/// <reference types="Cypress" />

describe("Tests", () => {
  it("Add new task", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="add__task-input"]').type("Meet with Amy");
    cy.get('[data-cy="add__task-submit"]').click();

    cy.get('[data-cy="task__text"]').should("have.value", "Meet with Amy");
  });

  it("Delete task", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="add__task-input"]').type("Finish presentation");
    cy.get('[data-cy="add__task-submit"]').click();

    cy.get('[data-cy="trash__icon"]').first().click();
    cy.get('[data-cy="todo__list-item"]').should("not.exist");
  });

  it("Set task as done", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="add__task-input"]').type("Finish presentation");
    cy.get('[data-cy="add__task-submit"]').click();

    cy.get('[data-cy="todo__list-item"]').first().click();

    cy.get('[data-cy="todo__list-item"]')
      .first()
      .should("have.class", "done-item");
  });
});
