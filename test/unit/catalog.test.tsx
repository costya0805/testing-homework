import React from "react";
import { act, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import events from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";

import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore, ApplicationState, productsLoad, productsLoaded } from "../../src/client/store";
import { ExampleApiMock, productsData } from "../helpers";

describe("Проверка карточки католога", () => {
    const basename = "/";
    const api = new ExampleApi('/hw/store');
    // const getProducts = jest.fn(async () => {
    //     await act(async () => {
    //         return await Promise.resolve( data: productsData);
    //     });
    // }) as any;
    // api.getProducts = getProducts;
    const store = initStore(api, new CartApi());
    store.dispatch(productsLoaded(productsData));
    const application = (
        <MemoryRouter initialEntries={["/catalog"]} basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it("По адресу '/catalog' открывается страница каталога", async () => {
        const { container } = render(application);
        const title = container.querySelector(".Catalog");
        expect(title).toBeTruthy();
    });
});
