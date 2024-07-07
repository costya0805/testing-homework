import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

describe("Проверка карточки католога", () => {
    const basename = "/";
    const store = initStore(new ExampleApi("/hw/store"), new CartApi());
    const application = (
        <MemoryRouter initialEntries={["/delivery"]} basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );
//прокидывать замокапленный метод в новый класс и от туда уже дожидаться его
    it("По адресу '/delivery' открывается страница о доставке", async () => {
        const { container } = render(application);
        const title = container.querySelector(".Delivery");
        expect(title).toBeTruthy();
    });
});
