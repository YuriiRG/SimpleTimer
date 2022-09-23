describe("Typical usage", () => {
  before(() => {
    cy.clearLocalStorage();
  });
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/SimpleTimer/");
    cy.get(".locale-changer select").select("en");
  });
  it("Typical usage", () => {
    cy.contains("00:00:00").click();
    cy.get(".time-input").last().clear().type("1");
    cy.contains("Close").click();
    cy.contains("Start").click();
    cy.wait(100);
    cy.contains("Pause").click();
    cy.wait(500);
    cy.contains("Start").click();
    cy.wait(700);
    cy.contains("00:00:01");
    cy.contains("Pause");
    cy.wait(250);
    cy.contains("00:00:00");
    cy.contains("Reset").click();
    cy.contains("00:00:01");
  });
});