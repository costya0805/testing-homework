import React from "react";

import { render, screen } from "@testing-library/react";

import events from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { addToCart, initStore } from "../../src/client/store";
import { productData1 } from "../helpers";

describe("Проверка шапки", () => {
    const basename = "/";
    const store = initStore(new ExampleApi("/hw/store"), new CartApi());
    const application = (
        <MemoryRouter basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it("В шапке есть ссылки на страницы сайта", () => {
        const { getAllByRole } = render(application);

        const link = getAllByRole("link");
        const hrefs = link.map((link) => link.getAttribute("href"));
        expect(hrefs).toContain("/");
        expect(hrefs).toContain("/catalog");
        expect(hrefs).toContain("/delivery");
        expect(hrefs).toContain("/contacts");
        expect(hrefs).toContain("/cart");
    });
    it("Название должно быть ссылкой на главную страницу", async () => {
        const { getByRole } = render(application);
        const main = getByRole("link", {
            name: /kogtetochka store/i,
        });
        expect(main.getAttribute("href")).toBe("/");
    });
    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
        const { container } = render(application);
        const burger = container.querySelector("button.Application-Toggler");
        const navBar = container.querySelector(".Application-Menu");
        const link = container.querySelectorAll(".nav-link")[0];
        if (!burger || !navBar || !link) {
            throw new Error("Не удалось найти необходимые элементы для теста");
        }
        await events.click(burger);
        await events.click(link);
        expect(navBar.classList).toContain("collapse");
    });
    it("Если в карзине есть продукты, то информация об их количестве отображается в шапке", async () => {
        store.dispatch(addToCart(productData1));
        const application = (
            <MemoryRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        const { getByRole } = render(application);
        const link = getByRole("link", {
            name: /cart/i,
        });
        expect(link.innerHTML).toBe("Cart (1)");
    });
});
