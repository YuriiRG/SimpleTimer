describe("empty spec", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:5173/SimpleTimer/");
    expect(true).to.equal(true);
  });
});