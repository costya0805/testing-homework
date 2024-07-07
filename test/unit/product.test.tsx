import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import events from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";

import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore, ApplicationState, productsLoad, productsLoaded } from "../../src/client/store";
import { ExampleApiMock, productsData } from "../helpers";

describe("Проверка карточки товара", () => {
    const basename = "/";
    const store = initStore(new ExampleApi("/hw/store"), new CartApi());
    store.dispatch(productsLoaded(productsData));
    const application = (
        <MemoryRouter initialEntries={["/catalog/0"]} basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it("По адресу '/catalog/0' открывается страница товара", async () => {
        const { container } = render(application);
        const title = container.querySelector(".Product");
        expect(title).toBeTruthy();
    });
});
