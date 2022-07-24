describe('write blog', () => {
  beforeEach(() => {
    cy.login()
  })
  
  it('go to blog post', () => {
    cy.visit('/wp-admin')
	cy.contains("Howdy")
  })
  it('go to blog post2', () => {
    cy.visit('/wp-admin')
	cy.contains("Howdy")
  })
})