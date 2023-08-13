export function visitHoma(path = ''): Cypress.Chainable {
  return cy.visit(path);
}

export function getById(id: string): Cypress.Chainable {
  return cy.get(`#${id}`);
}

export function expectUrl(_url: string): Cypress.Chainable {
  return cy.url().should('eq', _url);
}

/*
  getLink() accepts a single string or an array of strings.
  single string => will retrieve all links containing this string.
  array of strings => will retrieve all links containing all the strings from the array.
*/
export function getLink(href: string | string[]): Cypress.Chainable {
  if (!Array.isArray(href)) return cy.get(`a[href*="${href}"]`);
  const compositeHref = href.map((part) => `[href*="${part}"]`).join('');
  return cy.get(`a${compositeHref}`);
}

/*
  Inspired by https://github.com/cypress-io/cypress/issues/877#issuecomment-982063460
  This function is used to know if an element is visible in the current display.
  "should('be.visible')" only checks if an element exists in the DOM, in actual display or not.
*/
export function isInViewport(window: Cypress.AUTWindow, $el: JQuery<HTMLElement>) {
  const { documentElement } = window.document;
  const bottom = documentElement.clientHeight;
  const right = documentElement.clientWidth;
  const rect = $el[0].getBoundingClientRect();
  const isInViewport = rect.top <= bottom && rect.left <= right && !!rect.bottom && !!rect.right;
  return isInViewport;
}
