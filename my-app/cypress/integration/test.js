describe('Visit home page', () => {
    it("Visit correctly", () => {
        cy.visit('/')
    })

    it("Sort by team name", () => {
        cy.get("th:first").click()
    })

    it("Sort by city", () => {
        cy.get(`[aria-label="City sortable"]`).click()
    })

    it("Search data", () => {
        cy.get("#search-bar-0").type("hawks")
    })

    it("Click row", () => {
        cy.get("td:first").click()
    })

    it("Close side panel", () => {
        cy.get(".close-btn").click()
    })
})
