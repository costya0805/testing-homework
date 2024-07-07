import React from "react";
import { render, screen } from "@testing-library/react";
import events from "@testing-library/user-event";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore, addToCart, clearCart } from "../../src/client/store";
import { productData1, productData2 } from "../helpers";

describe("Проверка карточки товара", () => {
    const basename = "/";
    const store = initStore(new ExampleApi("/hw/store"), new CartApi());
    const application = (
        <MemoryRouter initialEntries={["/cart"]} basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it("По адресу '/cart' открывается страница корзины", async () => {
        const { container } = render(application);
        const title = container.querySelector(".Cart");
        expect(title).toBeTruthy();
    });
    it("Если товаров нет отображается текст со ссылкой на каталог", () => {
        const { container } = render(application);
        const text = container.querySelector(".Cart .col");
        expect(text?.textContent).toBe("Shopping cartCart is empty. Please select products in the catalog.");
        const link = text?.querySelector("a");
        expect(link?.getAttribute("href")).toBe("/catalog");
    });
    it("Если в корзине есть товары, то отображается таблица товаров", () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { getByRole } = render(application);
        const table = getByRole("table");
        expect(table).toBeTruthy();
    });
    it("Если в корзине есть товары, то отображается информация кнопка для очистки корзины", () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { getByRole } = render(application);
        const clearButton = getByRole("button", {
            name: /clear shopping cart/i,
        });
        expect(clearButton).toBeTruthy();
    });
    it("Если в корзине есть товары, то отображается форма для заполнения", () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { container } = render(application);
        const form = container.querySelector(".Form");
        expect(form).toBeTruthy();
    });
    it("Если в корзине есть один товар в нескольких экземплярах, то он отображается в одной строке", () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { container } = render(application);
        const stroki = container.querySelectorAll("tbody tr");

        expect(stroki.length).toBe(1);
        const count = stroki[0].querySelector(".Cart-Count");
        expect(count?.textContent).toBe("2");
    });
    it("Если в корзине есть один товар в 2 экземплярах, то его кол-во отображается в колонке 'Count'", () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { getByTestId } = render(application);
        const tovar = getByTestId("0");
        const count = tovar.querySelector(".Cart-Count");
        expect(count?.textContent).toBe("2");
    });
    it("Если в корзине есть один товар в нескольких экземплярах, то информация о цене за штуку отображается в Price, цена за все экземпляры в колонке total", () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { getByTestId } = render(application);
        const tovar = getByTestId("0");
        const price = tovar.querySelector(".Cart-Price");
        expect(price?.textContent).toBe("$500");
        const totalPrice = tovar.querySelector(".Cart-Total");
        expect(totalPrice?.textContent).toBe("$1000");
    });
    it("Если в корзине есть 2 товара, то информация отображается информация о каждом из них", () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        store.dispatch(addToCart(productData2));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { getByTestId } = render(application);
        const tovar1 = getByTestId("0");
        expect(tovar1).toBeTruthy();
        const tovar1Name = tovar1.querySelector(".Cart-Name");
        expect(tovar1Name?.textContent).toBe("Pizza");
        const tovar2 = getByTestId("1");
        expect(tovar2).toBeTruthy();
        const tovar2Name = tovar2.querySelector(".Cart-Name");
        expect(tovar2Name?.textContent).toBe("Burger");
    });
    it("Если в корзине есть 2 товара, то в строках у каждого будет информация о их цене, под товарами будет сумма этих товаров", () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        store.dispatch(addToCart(productData2));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { container, getByTestId } = render(application);
        const tovar1 = getByTestId("0");
        const tovar1Price = tovar1.querySelector(".Cart-Price");
        expect(tovar1Price?.textContent).toBe("$500");
        const tovar2 = getByTestId("1");
        const tovar2Price = tovar2.querySelector(".Cart-Price");
        expect(tovar2Price?.textContent).toBe("$600");
        const totalPrice = container.querySelector(".Cart-OrderPrice");
        expect(totalPrice?.textContent).toBe("$1100");
    });
    it("По нажатию на кнопку очистки корзины отображаетя информация со ссылкой на страницу каталога", async () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        store.dispatch(addToCart(productData2));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { container, getByRole } = render(application);
        const table = getByRole("table");
        expect(table).toBeTruthy();
        const clearButton = getByRole("button", {
            name: /clear shopping cart/i,
        });
        await events.click(clearButton);
        const text = container.querySelector(".Cart .col");
        expect(text?.textContent).toBe("Shopping cartCart is empty. Please select products in the catalog.");
        const link = text?.querySelector("a");
        expect(link?.getAttribute("href")).toBe("/catalog");
    });
    it("По нажатию на кнопку отправки заказа с незаполненными полями будут подсвечены ошибки у полей", async () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { container } = render(application);
        const form = container.querySelector(".Form");
        const makeOrder = form?.querySelector("button");
        const inputName = form?.querySelector("#f-name");
        const inputPhone = form?.querySelector("#f-phone");
        const inputAddress = form?.querySelector("#f-address");
        if (!makeOrder || !inputName || !inputPhone || !inputAddress) {
            throw new Error("Не удалось найти необходимые элементы для теста");
        }
        expect(inputName.classList).not.toContain("is-invalid");
        expect(inputPhone.classList).not.toContain("is-invalid");
        expect(inputAddress.classList).not.toContain("is-invalid");
        await events.click(makeOrder);
        expect(inputName.classList).toContain("is-invalid");
        expect(inputPhone.classList).toContain("is-invalid");
        expect(inputAddress.classList).toContain("is-invalid");
    });
    it("По нажатию на кнопку отправки заказа с неправильно заполненным телефоном будут поле будет подсвечено как ошибочное", async () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { container } = render(application);
        const form = container.querySelector(".Form");
        const makeOrder = form?.querySelector("button");
        const inputPhone = form?.querySelector("#f-phone");
        if (!makeOrder || !inputPhone) {
            throw new Error("Не удалось найти необходимые элементы для теста");
        }
        expect(inputPhone.classList).not.toContain("is-invalid");
        await events.type(inputPhone, "123");
        await events.click(makeOrder);
        expect(inputPhone.classList).toContain("is-invalid");
    });
    it("По нажатию на кнопку отправки заказа с правильно заполненным телефоном, но остальными не заполненными полями, поле телефона не будет подсвечено как ошибочное", async () => {
        store.dispatch(clearCart());
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter initialEntries={["/cart"]} basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { container } = render(application);
        const form = container.querySelector(".Form");
        const makeOrder = form?.querySelector("button");
        const inputPhone = form?.querySelector("#f-phone");
        if (!makeOrder || !inputPhone) {
            throw new Error("Не удалось найти необходимые элементы для теста");
        }
        expect(inputPhone.classList).not.toContain("is-invalid");
        await events.type(inputPhone, "+79961775580");
        await events.click(makeOrder);
        expect(inputPhone.classList).not.toContain("is-invalid");
    });
});
