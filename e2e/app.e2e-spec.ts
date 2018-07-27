import { ShopItPage } from './app.po';

describe('shop-it App', function() {
  let page: ShopItPage;

  beforeEach(() => {
    page = new ShopItPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
