import { StafferNg2Page } from './app.po';

describe('staffer-ng2 App', function() {
  let page: StafferNg2Page;

  beforeEach(() => {
    page = new StafferNg2Page();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Staffer');
  });
});
