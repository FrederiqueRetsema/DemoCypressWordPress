// Upload image: possible to check if upload succeeded? (both from local file system and from URL)

// Yoast has a lot of elements with seemingly random names. Keep them here to make it easier to replace them in
// a future release where they might change this.
const SEO_tab_SEO_title_block = "sc-fXeWgy.hmFFGo"

describe('Yoast SEO (bottom of the page)', () => {
  beforeEach(() => {
    cy.login()
  })
  
  it('yoast - tab SEO', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()
	  
	cy.get('div.wpseo-metabox-content')
	  .within(()=> {
		  cy.get('input#focus-keyword-input-metabox')
		    .type('Focus Keyphrase')
			.should('have.value', 'Focus Keyphrase')
		  cy.contains('Get related keyphrases')

	      // Toggle between mobile and desktop result
	      cy.get('input#yoast-google-preview-mode-desktop-metabox')
	        .click()
	      cy.get('input#yoast-google-preview-mode-mobile-metabox')
	        .click()

	      cy.get('div.'+ SEO_tab_SEO_title_block)
		    .first()
	        .within(() => {
		        cy.contains('Insert variable')
		          .click()
		        cy.contains('Primary category')
		          .click()
     	    })

          cy.get('input#yoast-google-preview-slug-metabox')
            .type('MySlug')	
	        .should('have.value', 'MySlug')
			
		  cy.get('div#yoast-google-preview-description-metabox')
		    .type('MyDescription')
			.within(() => {
	          cy.contains('MyDescription')
			})
			
		  cy.get('button#yoast-seo-analysis-collapsible-metabox')
		    .click()
			
		  cy.get('button#yoast-cornerstone-collapsible-metabox')
		    .click()
		  cy.get('[aria-labelledby="yoast-cornerstone-metabox"]')
		    .click()
			
		  cy.get('button#collapsible-advanced-settings')
		    .click()
		  cy.get('select#yoast-meta-robots-noindex-metabox')
		    .select('No')
		  cy.get('select#yoast-meta-robots-noindex-metabox')
		    .select('Yes')
		  cy.get('select#yoast-meta-robots-noindex-metabox')
		    .select('Yes (current default for Posts)')
			
		  cy.get('input#yoast-meta-robots-nofollow-metabox_1')
		    .click()
		  cy.get('input#yoast-meta-robots-nofollow-metabox_0')
		    .click()
          cy.get('input#yoast-meta-robots-advanced-metabox-input')
		    .click({force:true})
		  cy.get('input#yoast-breadcrumbs-title-metabox')
		    .type('BreadcrumbsTitle', {force:true})
			.should('have.value', 'BreadcrumbsTitle')
		  cy.get('input#yoast-canonical-metabox')
		    .type('http://example.com', {force:true})
			.should('have.value', 'http://example.com')

          cy.get('button#yoast-insights-collapsible-metabox')
		    .click()			
  	  })
	  
  })
  
  
  it('yoast - tab Readability', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()

	cy.get('div.wpseo-metabox-content')
	  .within(()=> {
		  cy.get('[aria-controls="wpseo-meta-section-readability"]')
		    .click()
	  })
  })
  
  it('yoast - tab Schema', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()

	cy.get('div.wpseo-metabox-content')
	  .within(()=> {
		  cy.get('[aria-controls="wpseo-meta-section-schema"]')
		    .click()
	  })
	  
	  
  })

  it('yoast - tab Social', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()

	cy.get('div.wpseo-metabox-content')
	  .within(()=> {
		  cy.get('[aria-controls="wpseo-meta-section-social"]')
		    .click()
	  })
  })

})

