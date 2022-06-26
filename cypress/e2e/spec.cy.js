describe("Add new task", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");

    cy.get(".todo__input").type("aaaa");
    cy.get(".add-task__button").click();

    cy.get(".todo__input").type("huhu");
    cy.get(".add-task__button").click();

    cy.get(".task-text").should("have.value", "huhu");
  });
});

describe("Delete task", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");

    cy.get(".todo__input").type("huhu");
    cy.get(".add-task__button").click();

    cy.get(".todo__input").type("aaaa");
    cy.get(".add-task__button").click();

    cy.get(".trash:first").click();
    cy.get("todo__list-item").should("not.exist");
  });
});

describe("Set task as done", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");

    cy.get(".todo__input").type("huhu");
    cy.get(".add-task__button").click();

    cy.get(".todo__input").type("aaaa");
    cy.get(".add-task__button").click();

    cy.get(".todo__input").type("huhu");
    cy.get(".add-task__button").click();

    cy.get(".todo__input").type("aaaa");
    cy.get(".add-task__button").click();

    cy.get(".todo__list-item").eq(2).click();

    cy.get(".todo__list-item").eq(2).should("have.class", "done-item");
  });
});
