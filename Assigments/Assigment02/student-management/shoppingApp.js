import promptSync from "prompt-sync";
const prompt = promptSync();

const products = [
    { id: 1, name: 'Apple 14 Pro Max', price: 4500 },
    { id: 2, name: 'iPad Pro 12.9-inch', price: 5600 },
    { id: 3, name: 'Samsung Galaxy S14', price: 3900 },
    { id: 4, name: 'Microsoft Surface Book 3', price: 6700 },
    { id: 5, name: 'Sony PlayStation 5', price: 3500 },
    { id: 6, name: 'Dell XPS 13', price: 4500 },
    { id: 7, name: 'LG 65-inch OLED TV', price: 9800 },
    { id: 8, name: 'Bose QuietComfort 35 II', price: 1800 }
];

const cart = [];

export const getCart = () => {
    return cart;
};

export const menu = () => {
    const choice = prompt(`What would you like to do?
        1. Add Product
        2. Change Quantity
        3. Delete Product
        4. Display Invoice
        5. Exit
        Enter choice: `);

    switch (choice) {
        case "1":
            addProduct();
            break;
        case "2":
            changeQuantity();
            break;
        case "3":
            deleteProduct();
            break;
        case "4":
            displayInvoice();
            break;
        case "5":
            console.log("Thank you for shopping with us!");
            return;
        default:
            console.log("Invalid choice. Please enter a number between 1 and 5.");
    }
    menu();
};

export const addProduct = () => {

    console.log("Available Products: ");

    products.forEach(p => console.log(`${p.id} - ${p.name} - ${p.price}`));

    let productId = parseInt(prompt("Enter product ID to add: "));
    let product = products.find(p => p.id === productId);

    while (!product) {
        console.log("Please enter a valid product ID");
        productId = parseInt(prompt("Enter product ID to add: "));
        product = products.find(p => p.id === productId);
    }

    let quantity = parseInt(prompt("Enter quantity: "));
    while (isNaN(quantity) || quantity <= 0) {
        alert("Please valid quantity");
        quantity = parseInt(prompt("Enter quantity: "));
    }

    const cartItem = cart.find(item => item.id === productId && item.name === product.name);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }

    console.log(`${quantity} ${product.name} added to cart!`);
}

export const changeQuantity = () => {
    if (cart.length === 0) {
        console.log("Cart is empty");
        return;
    }

    console.log("Your Cart: ");

    cart.forEach(item => console.log(`${item.id} - ${item.name} - Quantity: ${item.quantity}`));

    let productId = parseInt(prompt("Enter product ID to update quantity: "));
    let cartItem = cart.find(item => item.id === productId);

    while (!cartItem) {
        console.log("Please enter a valid product ID");
        productId = parseInt(prompt("Enter product ID to update quantity: "));
        cartItem = cart.find(item => item.id === productId);
    }

    let newQuantity = parseInt(prompt("Enter new quantity:"));
    while (isNaN(newQuantity) || newQuantity <= 0) {
        console.log("Please enter a valid quantity");
        newQuantity = parseInt(prompt("Enter new quantity: "));
    }

    cartItem.quantity = newQuantity;
    console.log("Quantity updated!");
}

export const deleteProduct = () => {
    if (cart.length === 0) {
        console.log("Cart is empty");
        return;
    }

    console.log("Your Cart:");
    cart.forEach(item => console.log(`${item.id} - ${item.name} - Quantity: ${item.quantity}`));

    let productId = parseInt(prompt("Enter the product ID to remove:"));

    let index = -1;
    index = cart.findIndex(item => item.id === productId);

    while (index === -1) {
        console.log("Please enter a valid product ID");
        productId = parseInt(prompt("Enter the product ID to remove: "));
        index = cart.findIndex(item => item.id === productId);
    }

    let removedItem = cart.splice(index, 1);
    console.log(`${removedItem[0].name} has been removed from the cart.`);
}

export const displayInvoice = () => {
    if (cart.length === 0) {
        console.log("Your cart is empty");
        return;
    }

    console.log("Invoice:");
    let total = 0;

    let maxPriceItem = cart.reduce((max, item) => (item.price * item.quantity > max.price * max.quantity ? item : max), cart[0]);
    let minPriceItem = cart.reduce((min, item) => (item.price * item.quantity < min.price * min.quantity? item : min), cart[0]);

    cart.forEach(item => {
        let state = item === maxPriceItem ? "*" : item === minPriceItem ? "**" : "";
        console.log(`${state} ${item.name} - Quantity: ${item.quantity} - Price: ${item.price * item.quantity} ${state}`);
        total += item.price * item.quantity;
    });

    console.log(`Total Price: ${total} QAR`);
};

menu();