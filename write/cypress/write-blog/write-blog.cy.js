// Bold/Italics in normal text not possible because menu doesn't get visible. Also needed in List, Quote.
// Upload image: possible to check if upload succeeded?
// List: possible to test if type of list (bullet, numbered etc) is correct?

describe('write blog', () => {
  beforeEach(() => {
    cy.login()
  })
  
  it('Skip welcome', () => {
    cy.visit('/wp-admin/post-new.php')
	cy.focused()
	  .click()
  })
  
  it('Title', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()
	  
    cy.get('[aria-label="Add title"]')
      .type("MyTitle")
	cy.contains("MyTitle")
  })
  
  it('Add heading h2', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()
	  
    cy.get('[aria-label="Add block"]')
      .click()
	cy.contains("Heading")
	  .click()
	cy.get('[aria-label="Block: Heading"]')
	  .type("MyHeading")
	cy.contains("MyHeading")
  })
  
  it('Add normal text', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()

	cy.get('[aria-label="Add default block"]')
	  .type('MyText')
	cy.contains('MyText')
  })

  it('Add bold text', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()
	  
	cy.get('div.is-root-container.block-editor-block-list__layout')
	  .type(' ')
      .trigger('mousemove')
	  .click()
	cy.wait(100)
	cy.get('[aria-label="Block tools"]',{force:true})
      .trigger('mousemove')
    cy.get('[aria-label="Bold"]')
	  .click()

	cy.get('div.is-root-container.block-editor-block-list__layout')
	  .type('MyBoldText')
	cy.contains('MyBoldText')
	// Doesn't work: the context menu doesn't show
  })

  it('Add image (incl. block)', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()
	  
    cy.get('[aria-label="Add block"]')
      .click()
	cy.contains('Image')
	  .click()
	cy.contains('Insert from URL')
	  .click()
	cy.get('[aria-label="URL"]')
	  .type("https://www.pronamic.nl/wp-content/uploads/2019/10/Featured-image-WordPress.svg{enter}")
	cy.get('[aria-label="Image caption text"]')
	  .type('WordPress logo caption text{enter}')
	cy.contains('WordPress logo caption text')
	
	cy.get('[aria-label="Block: Image"]')
	  .click()

    // Caption in submenu	
	cy.get('[id="inspector-textarea-control-1"]')
	  .type('Caption-in-submenu')
	  .should('have.value', 'Caption-in-submenu')
	  
	// Size X 1540 -> 154
	cy.get('[id="inspector-text-control-2"]')
	  .clear()
	  .type('154')
	  .should("have.value", '154')

	// Size Y 800 -> 80
	cy.get('[id="inspector-text-control-3"]')
	  .clear()
	  .type('80')
	  .should("have.value", '80')

    // Button 25%	  
	 cy.contains('25%')
	   .click()
 	 cy.get('[id="inspector-text-control-3"]')
	  .should('have.value', '200')

    // Button 50%	  
	 cy.contains('50%')
	   .click()
 	 cy.get('[id="inspector-text-control-3"]')
	  .should('have.value', '400')

    // Button 75%	  
	 cy.contains('75%')
	   .click()
 	 cy.get('[id="inspector-text-control-3"]')
	  .should('have.value', '600')

    // Button 100%	  
	 cy.contains('100%')
	   .click()
 	 cy.get('[id="inspector-text-control-3"]')
	  .should('have.value', '800')


    // Radius
	cy.get('[aria-label="Border radius"]')
	  .clear()
	  .type('20{enter}')
	cy.get('[aria-label="Border radius"]')
	  .clear()
	  .type('40{enter}')
	cy.get('[aria-label="Border radius"]')
	  .clear()
	  .type('100{enter}')
	cy.get('[aria-label="Border radius"]')
	  .clear()
	  .type('1000{enter}')
	
  })

  it.skip('Add List', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()

    cy.get('[aria-label="Add block"]')
      .click()
	cy.contains("List")
	  .click()
	  
	// Default: bullet list
	cy.get('[aria-label="Block: List"]')
	  .type("MyList")
	cy.contains("MyList")

    //===========Doesn't work from here, see before: window not visible====
    // Change into numbered
	cy.get('[aria-label="Ordered"]')
	  .click()
	cy.contains("MyList")

    // Change back into bullet list
	cy.get('[aria-label="Unordered"]')
	  .click()
	cy.contains("MyList")
	
    // Make bold
	cy.get('[aria-label="Bold"]')
	  .click()
	cy.contains("MyList")
	
	
  })

  it.skip('Add Quote', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()

    cy.get('[aria-label="Add block"]')
      .click()
	cy.contains("Quote")
	  .click()
	  
	// Quote
	cy.get('[aria-label="Quote text"]')
	  .type("MyQuote")
	cy.contains("MyQuote")

	// Citation
	cy.get('[aria-label="Quote citation text"]')
	  .type("Quote citation")
	cy.contains("Quote citation")

    // =========Doesn't work===
    // Make bold
	cy.get('[aria-label="Bold"]')
	  .click()
	cy.contains("MyList")
	
  })
})

describe.skip("Browse All", () => {
  beforeEach(() => {
    cy.login()
  })

  it('Add Code', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()

    cy.get('[aria-label="Add block"]')
      .click()
	cy.contains("Browse all")
	  .click()
	cy.contains("Code")
	  .click()

    cy.get('[aria-label="Block: Code"]')	
	  .type('10 print "Cypress"{enter}20 goto 10')
	cy.contains('10 print "Cypress')
  })

  it('Add Pullquote', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()

    cy.get('[aria-label="Add block"]')
      .click()
	cy.contains("Browse all")
	  .click()
	cy.contains("Pullquote")
	  .click()

    cy.get('[aria-label="Pullquote text"]')	
	  .type('MyQuote')
	cy.contains('MyQuote')

    cy.get('[aria-label="Pullquote citation text"]')	
	  .type('MyCitation')
	cy.contains('MyCitation')
  })

})

describe.skip('Newest test', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Add bold text', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused()
	  .click()
	  
	cy.get('[aria-label="Add default block"]')
	  .type(' ')
	cy.get('[aria-label="Paragraph block"]')
	  .click()
	cy.wait(100)
	cy.get('div.components-popover__content',{force:true})
	  .invoke('show')
      .trigger('mousemove')
    cy.get('[aria-label="Bold"]')
	  .click({force:true})

	cy.get('div.is-root-container.block-editor-block-list__layout')
	  .type('MyBoldText')
	cy.contains('MyBoldText')
	// Doesn't work: the context menu doesn't show
  })

})



