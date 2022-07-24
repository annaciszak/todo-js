describe("Tests", () => {
  it("Add new task", () => {
    cy.visit("http://localhost:3000");

    cy.get(".todo__input").type("Meet with Amy");
    cy.get(".add-task__button").click();

    cy.get(".task-text").should("have.value", "Meet with Amy");
  });

  it("Delete task", () => {
    cy.visit("http://localhost:3000");

    cy.get(".todo__input").type("Finish presentation");
    cy.get(".add-task__button").click();

    cy.get(".trash:first").click();
    cy.get("todo__list-item").should("not.exist");
  });

  it("Set task as done", () => {
    cy.visit("http://localhost:3000");

    cy.get(".todo__input").type("Finish presentation");
    cy.get(".add-task__button").click();

    cy.get(".todo__list-item").eq(0).click();

    cy.get(".todo__list-item").eq(0).should("have.class", "done-item");
  });
});
