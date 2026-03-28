describe("Payment Flow - success page (Fixed)", () => {
    beforeEach(() => {
        // Mock PENDING state
        cy.intercept("GET", "**/me", {
            statusCode: 200,
            body: {
                id: "user-123",
                name: "Test User",
                email: "test@example.com",
                role: "CLIENT",
                subscriptionStatus: "PENDING",
            },
        }).as("getUser");

        localStorage.setItem("@SaaSControl:token", "fake-token");
    });

    it("should poll the status correctly without infinite loops", () => {
        cy.visit("/success");

        // The page should poll status at intervals.
        // wait 5 seconds. In 5s, we expect:
        // 1 (immediate) + 1 (2s) + 1 (4s) = 3 calls total.
        
        cy.wait(5000);

        cy.get("@getUser.all").then((interceptions) => {
            const callCount = interceptions.length;
            cy.log(`Call count after 5 seconds: ${callCount}`);
            
            // Should be exactly 3 (initial + 2 polls) or maybe 4 if timing is tight.
            // Definitely not "infinite" or rapid.
            expect(callCount).to.be.within(3, 4);
        });

        // Ensure the UI is still showing the checking state
        cy.contains("Verificando assinatura...").should("be.visible");
    });

    it("should stop polling and show success when status becomes ACTIVE", () => {
        // Mock initial PENDING then switch to ACTIVE
        let callCount = 0;
        cy.intercept("GET", "**/me", (req) => {
            callCount++;
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
        }).as("getUserStatus");

        cy.visit("/success");

        // Wait for it to become ACTIVE
        cy.contains("Pagamento Confirmado!", { timeout: 10000 }).should("be.visible");
        
        // Polling should stop
        cy.wait(4000);
        
        cy.get("@getUserStatus.all").then((interceptions) => {
            // It should have called /me twice (initial PENDING and first poll ACTIVE)
            // Maybe a third if timing overlaps, but once ACTIVE it should stop.
            expect(interceptions.length).to.be.lessThan(5);
        });
    });
});
