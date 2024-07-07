import { ExampleApi } from "../src/client/api";
import { Product, ProductShortInfo } from "../src/common/types";

export const productsData: ProductShortInfo[] = [
    {
        id: 0,
        name: "Handmade Pizza",
        price: 509,
    },
    {
        id: 1,
        name: "Unbranded Chips",
        price: 35,
    },
    {
        id: 2,
        name: "Generic Pants",
        price: 106,
    },
];
export const productData1: Product = {
    id: 0,
    name: "Pizza",
    price: 500,
    description: "about",
    material: "iron",
    color: "brown",
};
export const productData2: Product = {
    id: 1,
    name: "Burger",
    price: 600,
    description: "about",
    material: "opilki",
    color: "gold",
};

export class ExampleApiMock extends ExampleApi {
    constructor() {
        super("/");
        this.getProducts = this.getProducts;
        this.getProductById = this.getProductById;
        this.checkout = this.checkout;
    }
}
