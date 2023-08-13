import { expectUrl, getById, getLink, isInViewport, visitHoma } from '../support/helpers';
import { socialMediaLinks } from '../support/constants';

//* CYPRESS TESTS *//

describe('Homa games tech test', () => {
  it('I can see reviews', () => {
    visitHoma();
    getById('__next').should('be.visible'); // In the absence of E2E dedicated "data-cy" attributes in the html, going for the highest id.
  });

  it('I can see blog posts', () => {
    visitHoma('blog');
    getLink('/about').eq(0).click(); // two links have href="/about", using the first one
    expectUrl('https://www.homagames.com/about');
    cy.get('img').then((imgs) => {
      expect(imgs.length).to.be.at.least(1);
      const imgAlts = imgs.toArray().map((img) => img.alt);
      cy.log(`${imgs.length} image${imgs.length > 1 ? 's' : ''} were found, with the following alt text : ${imgAlts.join(', ')}`);
    });
  });

  it('I can go to Homa Lab', () => {
    visitHoma();
    getLink(['lab', 'login']) // getting "https://lab-v2.homagames.com/login" using the two words that should not change even in case of v3
      .eq(0) // when writing this test, the page had two links to go to lab's login, selecting the first one
      .invoke('removeAttr', 'target') // Cypress manages poorly multitab, hence we remove the target="_blank" to prevent opening the link in a new tab
      .click();
    expectUrl('https://lab-v2.homagames.com/login');
  });

  it('I can view Social Media Linksat the bootom of the page', () => {
    visitHoma();
    cy.scrollTo('bottom');
    checkSocialLinks();
  });
});

//* FUNCTIONS *//

function checkSocialLinks(): Cypress.Chainable {
  for (const [_media, _link] of Object.entries(socialMediaLinks)) {
    const getSocialLink = cy.get('footer').find(`a[href*="${_link}"]`);
    getSocialLink.should('be.visible'); // this only checks if the link is in the DOM
    cy.wait(1000); // I really don't like it...
    getSocialLink.then(($el) => {
      cy.window().then((window) => {
        const linkInViewport = isInViewport(window, $el);
        expect(linkInViewport).to.be.true; // this trully checks if the link is visible in the actual display
        cy.log(`${_media} link is visible.`)
      });
    });
  }
  return cy.log(`All ${Object.values(socialMediaLinks).length} links are visible when the footer is displayed.`);
}
