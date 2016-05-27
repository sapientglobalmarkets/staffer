export class StafferNg2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('staffer-ng2-app h1')).getText();
  }
}
