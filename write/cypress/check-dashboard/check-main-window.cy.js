// Check open/close "Screen Options"

describe('Check Screen elements', () => {
  beforeEach(() => {
    cy.login()
  });

  it('Open Screen Elements', () => {
    cy.visit('/wp-admin/index.php')

	cy.contains("Screen Options")
	  .click({force: true})
  })

  it('Site Health Status', () => {
    cy.visit('/wp-admin/index.php')
  
	cy.get("input#dashboard_site_health-hide.hide-postbox-tog")
	  .should('be.checked')
	  .click({force: true})
	  .should('not.be.checked')
	  .click({force: true})
	  .should('be.checked')
  });

  it('At a Glance', () => {
    cy.visit('/wp-admin/index.php')
  
	cy.get("input#dashboard_right_now-hide.hide-postbox-tog")
	  .should('be.checked')
	  .click({force: true})
	  .should('not.be.checked')
	  .click({force: true})
	  .should('be.checked')
  });

  it('Activity', () => {
    cy.visit('/wp-admin/index.php')
  
	cy.get("input#dashboard_activity-hide.hide-postbox-tog")
	  .should('be.checked')
	  .click({force: true})
	  .should('not.be.checked')
	  .click({force: true})
	  .should('be.checked')
  });

  it('Quick Draft', () => {
    cy.visit('/wp-admin/index.php')
  
	cy.get("input#dashboard_quick_press-hide.hide-postbox-tog")
	  .should('be.checked')
	  .click({force: true})
	  .should('not.be.checked')
	  .click({force: true})
	  .should('be.checked')
  });

  it('WordPress Events and News', () => {
    cy.visit('/wp-admin/index.php')
  
	cy.get("input#dashboard_primary-hide.hide-postbox-tog")
	  .should('be.checked')
	  .click({force: true})
	  .should('not.be.checked')
	  .click({force: true})
	  .should('be.checked')
  });

  it('Welcome', () => {
    cy.visit('/wp-admin/index.php')
  
	cy.get("input#wp_welcome_panel-hide")
	  .should('be.checked')
	  .click({force: true})
	  .should('not.be.checked')
	  .click({force: true})
	  .should('be.checked')
  });

  it('Close Screen Elements', () => {
    cy.visit('/wp-admin/index.php')

	cy.contains("Screen Options")
	  .click({force: true})
  })

});

