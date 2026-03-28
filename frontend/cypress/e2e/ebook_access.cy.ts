describe("E2E Journey: Payment to Ebook Access", () => {
  beforeEach(() => {
    // Initial state: PENDING subscription
    cy.intercept("GET", "**/me", {
      statusCode: 200,
      body: {
        id: "user-123",
        name: "Test User",
        email: "test@example.com",
        role: "CLIENT",
        subscriptionStatus: "PENDING",
      },
    }).as("getUserPending");

    localStorage.setItem("@SaaSControl:token", "fake-token");
  });

  it("should block ebook access when pending and unlock after success", () => {
    // 1. Verify Paywall on Ebook Page
    cy.visit("/app/ebook");
    cy.contains("Conteúdo Premium").should("be.visible");
    cy.contains("Ver Planos Premium").should("be.visible");
    cy.contains("Capítulo 2").should("not.be.visible"); // Blurred/hidden content check

    // 2. Simulate Success Page - Polling to ACTIVE
    let callCount = 0;
    cy.intercept("GET", "**/me", (req) => {
      callCount++;
      // On the second call (first poll), we return ACTIVE
      if (callCount >= 2) {
        req.reply({
          body: {
            id: "user-123",
            name: "Test User",
            email: "test@example.com",
            role: "CLIENT",
            subscriptionStatus: "ACTIVE",
          },
        });
      } else {
        req.reply({
          body: {
            id: "user-123",
            name: "Test User",
            email: "test@example.com",
            role: "CLIENT",
            subscriptionStatus: "PENDING",
          },
        });
      }
    }).as("getUserStatusUpdate");

    cy.visit("/success");

    // Wait for polling to confirm payment
    cy.contains("Pagamento Confirmado!", { timeout: 10000 }).should("be.visible");
    cy.contains("Parabéns! Sua assinatura Premium já está ativa.").should("be.visible");

    // 3. Verify Access to Ebook
    // We can click the button or navigate directly
    cy.contains("Acessar meu Dashboard").click();
    
    // Now visit ebook page again
    cy.visit("/app/ebook");

    // Paywall should be gone
    cy.contains("Conteúdo Premium").should("not.exist");
    cy.contains("Conteúdo Completo Liberado! 🎉").should("be.visible");
    cy.contains("Baixar PDF").should("be.visible");
    cy.contains("Capítulo 2: Tópicos Avançados").should("be.visible");
    cy.contains("Capítulo 5: Tópicos Avançados").should("be.visible");
  });
});
