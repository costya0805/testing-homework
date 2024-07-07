describe("Тест шапки", () => {
    it("Скриншотный тест десктоп версии", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store");
        const header = await browser.$("nav.navbar");
        await header.waitForDisplayed();
        await header.assertView("header-full");
    });
    it("Скриншотный тест в мобильной версии", async ({ browser }) => {
        await browser.setWindowSize(570, 1000);
        await browser.url("http://localhost:3000/hw/store");
        const header = await browser.$("nav.navbar");
        await header.waitForDisplayed();
        await header.assertView("header-mobile");
    });
    it("Скриншотный тест в мобильной версии после нажатия на бургер", async ({ browser }) => {
        await browser.setWindowSize(570, 1000);
        await browser.url("http://localhost:3000/hw/store");
        const header = await browser.$("nav.navbar");
        await header.waitForDisplayed();
        await browser.$("nav.navbar button").click();
        await header.waitForDisplayed();
        await header.assertView("header-mobile-active-burger");
    });
    it("Скриншотный тест в мобильной версии после нажатия на бургер и нажатия на один из элементов выпадающего списка", async ({
        browser,
    }) => {
        await browser.setWindowSize(570, 1000);
        await browser.url("http://localhost:3000/hw/store");
        const header = await browser.$("nav.navbar");
        await header.waitForDisplayed();
        await browser.$("nav.navbar button").click();
        await header.waitForDisplayed();
        await browser.$("nav.navbar .navbar-nav .nav-link").click();
        await header.waitForDisplayed();
        await header.assertView("header-mobile");
    });
});

describe("Тест главной страницы", () => {
    it("Скриншотный тест в десктоп версии", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store");
        const home = await browser.$(".Home");
        await home.waitForDisplayed();
        await home.assertView("home-full");
    });
    it("Скриншотный тест в мобильной версии", async ({ browser }) => {
        await browser.setWindowSize(570, 1000);
        await browser.url("http://localhost:3000/hw/store");
        const home = await browser.$(".Home");
        await home.waitForDisplayed();
        await home.assertView("home-mobile");
    });
});

describe("Тест страницы о доставке", () => {
    it("Скриншотный тест в десктоп версии", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/delivery");
        const delivery = await browser.$(".Delivery");
        await delivery.waitForDisplayed();
        await delivery.assertView("delivery-full");
    });
    it("Скриншотный тест в мобильной версии", async ({ browser }) => {
        await browser.setWindowSize(570, 1000);
        await browser.url("http://localhost:3000/hw/store/delivery");
        const delivery = await browser.$(".Delivery");
        await delivery.waitForDisplayed();
        await delivery.assertView("delivery-mobile");
    });
});

describe("Тест страницы о контактах", () => {
    it("Скриншотный тест в десктоп версии", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/contacts");
        const contacts = await browser.$(".Contacts");
        await contacts.waitForDisplayed();
        await contacts.assertView("сontacts-full");
    });
    it("Скриншотный тест в мобильной версии", async ({ browser }) => {
        await browser.setWindowSize(570, 1000);
        await browser.url("http://localhost:3000/hw/store/contacts");
        const contacts = await browser.$(".Contacts");
        await contacts.waitForDisplayed();
        await contacts.assertView("сontacts-mobile");
    });
});

describe("Тест страницы о товаре", async () => {
    it("Скриншотный тест в десктоп версии", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/catalog/0");
        const product = await browser.$(".Product");
        await product.waitForDisplayed();
        await product.assertView("product-full");
    });
    it("Скриншотный тест в десктоп версии после добавления в корзину", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/catalog/0");
        const product = await browser.$(".Product");
        await product.waitForDisplayed();
        await browser.$(".ProductDetails-AddToCart").click();
        await product.waitForDisplayed();
        await product.assertView("product-full-buy");
    });
    it("Скриншотный тест в десктоп версии после двойного нажатия на добавление в корзину", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/catalog/0");
        const product = await browser.$(".Product");
        await product.waitForDisplayed();
        await browser.$(".ProductDetails-AddToCart").click();
        await product.waitForDisplayed();
        await browser.$(".ProductDetails-AddToCart").click();
        await product.waitForDisplayed();
        await product.assertView("product-full-buy");
    });
    it("Скриншотный тест в мобильной версии", async ({ browser }) => {
        await browser.setWindowSize(570, 1000);
        await browser.url("http://localhost:3000/hw/store/catalog/0");
        const product = await browser.$(".Product");
        await product.waitForDisplayed();
        await product.assertView("product-mobile");
    });
    it("Скриншотный тест в мобильной версии после добавления в корзину", async ({ browser }) => {
        await browser.setWindowSize(570, 1000);
        await browser.url("http://localhost:3000/hw/store/catalog/0");
        const product = await browser.$(".Product");
        await product.waitForDisplayed();
        await browser.$(".ProductDetails-AddToCart").click();
        await product.waitForDisplayed();
        await product.assertView("product-full-buy");
    });
    it("Скриншотный тест в мобильной версии после двойного нажатия на добавление в корзину", async ({ browser }) => {
        await browser.setWindowSize(570, 1000);
        await browser.url("http://localhost:3000/hw/store/catalog/0");
        const product = await browser.$(".Product");
        await product.waitForDisplayed();
        await browser.$(".ProductDetails-AddToCart").click();
        await product.waitForDisplayed();
        await browser.$(".ProductDetails-AddToCart").click();
        await product.waitForDisplayed();
        await product.assertView("product-full-buy");
    });
});

describe("Тест страницы корзины десктоп", () => {
    it("Скриншотный тест в десктоп версии без товаров", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/cart");
        const cart = await browser.$(".Cart");
        await cart.waitForDisplayed();
        await cart.assertView("cart-full-zero");
    });
    it("Скриншотный тест в десктоп версии c товаром", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/catalog/0");
        const product = await browser.$(".Product");
        await product.waitForDisplayed();
        await browser.$(".ProductDetails-AddToCart").click();
        await product.waitForDisplayed();

        await browser.url("http://localhost:3000/hw/store/cart");
        const cart = await browser.$(".Cart");
        await cart.waitForDisplayed();
        await cart.assertView("cart-full-one");
    });
    it("Скриншотный тест в десктоп версии c заказом", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/catalog/0");
        const product = await browser.$(".Product");
        await product.waitForDisplayed();
        await browser.$(".ProductDetails-AddToCart").click();
        await product.waitForDisplayed();

        await browser.url("http://localhost:3000/hw/store/cart");
        const cart = await browser.$(".Cart");
        await cart.waitForDisplayed();
        await browser.$("#f-name").setValue("БОБ");
        await browser.$("#f-phone").setValue("+79961775580");
        await browser.$("#f-address").setValue("г. Бесов");
        await browser.$(".Form-Submit").click();
        const order = await browser.$(".Cart-SuccessMessage");
        await order.waitForDisplayed();
        await cart.assertView("cart-full-order");
    });
});
