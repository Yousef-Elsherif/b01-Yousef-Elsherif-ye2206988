import { expect } from "chai";
import { getCart, addProduct, changeQuantity, deleteProduct } from "../shoppingApp.js";

import promptSync from "prompt-sync";
const prompt = promptSync();

describe("Shopping Cart Functionality", () => {
    beforeEach(() => {
        global.cart = [];
    });

    // Test addProduct function
    it("Should add a product to the cart and increase its length by 1", () => {
        const startingCartLength = getCart().length;
        addProduct();
        expect(cart.length).to.equal(startingCartLength + 1);
    });

    // Test no dublication
    it("Should increase the quantity of an existing product instead of adding a new entry", () => {
        cart.push({ id: 1, name: "Apple 14 Pro Max", price: 4500, quantity: 1 });
        const startinglQuantity = cart[0].quantity;
        addProduct();
        expect(cart[0].quantity).to.be.greaterThan(startinglQuantity);
        expect(cart.length).to.equal(1);
    });

    // Test changeQuantity function
    it("Should update the quantity of an item in the cart", () => {
        cart.push({ id: 2, name: "iPad Pro 12.9-inch", price: 5600, quantity: 1 });
        const startinglQuantity = cart[0].quantity;
        changeQuantity();
        expect(cart[0].quantity).to.not.equal(startinglQuantity);
    });

    // Test deleteProduct function
    it("Should remove a product from the cart and decrease its length by 1", () => {
        cart.push({ id: 3, name: "Samsung Galaxy S14", price: 3900, quantity: 1 });
        const startingCartLength = cart.length;
        deleteProduct();
        expect(cart.length).to.equal(startingCartLength - 1);
    });
});