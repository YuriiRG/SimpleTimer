describe("Typical usage", () => {
  before(() => {
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/SimpleTimer/");
    cy.get(".locale-changer select").select("en");
  });

  it("Run, pause and reset", () => {
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

  it("Multiple runs", () => {
    cy.contains("00:00:00").click();
    cy.get(".time-input").last().clear().type("1");
    cy.contains("Close").click();
    for (let i = 0; i < 5; i++) {
      cy.contains("Start").click();
      cy.wait(1050);
      cy.contains("Reset").click();
    }
  });

  it("Presets", () => {
    cy.get(".timer .text").click();
    cy.get(".time-input").last().clear().type("1");
    cy.contains("Close").click();
    cy.contains("Save preset").click();
    cy.get(".timer .text").click();
    cy.get(".time-input").last().clear().type("2");
    cy.contains("Close").click();
    cy.contains("Save preset").click();
    cy.contains("00:00:01").click();
    cy.contains("Start").click();
    cy.wait(1050);
    cy.contains("Reset").click();
    cy.contains("00:00:02").click();
    cy.contains("Start").click();
    cy.wait(2050);
    cy.contains("Reset").click();
    cy.contains("00:00:01").click();
    cy.get(".delete-icon").first().click();
    cy.contains("00:00:02").click();
    cy.contains("Start").click();
    cy.wait(2050);
    cy.contains("Reset").click();
  });
});