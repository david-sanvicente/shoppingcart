
// Array of objects (items for sale)
let items = [
    {
        name: 'Batman Briefs',
        price: 8,
        image: 'https://i.imgur.com/Qh0DtSN.jpg'
    },
    {
        name: 'Lego Mug',
        price: 12,
        image: 'https://i.imgur.com/7lZhxj6.jpg'
    },
    {
        name: 'Green Rubber Duck',
        price: 6,
        image: 'https://i.imgur.com/b2MFIj2.jpg'
    },
    {
        name: 'Pokemon Bikini',
        price: 14,
        image: 'https://i.imgur.com/xQz20kX.jpg'
    },
    {
        name: 'Cookie Monster Hat',
        price: 19,
        image: 'https://i.imgur.com/3c66oMo.jpg'
    },
    {
        name: 'Mazinger Z Action Figure',
        price: 32,
        image: "https://i.imgur.com/z19zU8m.jpg"
    }
];

// Array of objects (items in cart)
let cart = [

];

// readyState EventListener, 'DOMContentLoaded', ready
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    renderShop();
    renderCart();
}

// Render shop items on HTML page
function renderShop() {
    // parent node
    let shopItems = document.getElementById('items');

    // Loop through items[]
    for (let i = 0; i < items.length; i++) {
        // target each object
        let item = items[i];

        // adds line items to the unordered list parent #items
        shopItems.innerHTML += `
            <li>
                <div>${item.name}</div>
                <div>$${item.price}</div>
                <image src="${item.image}"/>
                <input id="quantity" type="number" placeholder="quantity"/>
                <button
                    id="button-add"
                    onClick='addToCart(${i}, "${item.name}")'>
                    Add
                </button>
            </li>`;
    }
}

// same logic as renderShop method
function renderCart() {
    // Total for items in cart
    let total = 0;

    // parent node
    let cartItems = document.getElementById('cart');

    // clear old child nodes
    cartItems.innerHTML = '';

    // Loop through cart[]
    for (let i = 0; i < cart.length; i++) {
        // target each item
        let cartItem = cart[i];

        // update Total
        total += cartItem.price * cartItem.quantity;

        // add HTML to parent node
        cartItems.innerHTML += `
            <li>
                <div>${cartItem.name}</div>
                <div>$${cartItem.price}</div>
                <image src="${cartItem.image}"/>
                <div>Quantity: ${cartItem.quantity}</div>
                <div>Sub Total: $${cartItem.price * cartItem.quantity}</div>
                <button
                    id="button-remove"
                    onClick='removeFromCart(${i})'
                > Remove
                </button>
            </li>`;
    }
    // update HTML for Total
    document.getElementById("amount").innerHTML = '$' + total;

    // add event listener to checkout button
    document.getElementById("checkout").addEventListener("click", checkout);

}

// checkout onclick method
function checkout() {

    // set total quantity 0
    let totalQuantity = 0;

    // loop through cart
    for (let i = 0; i < cart.length; i++) {
        totalQuantity += cart[i].quantity;
    }

    // reference "amount"
    let amount = document.getElementById("amount").innerHTML;

    // create alert message
    let alertMessage = `Thank you for your purchase of ${totalQuantity} items and ${amount}!`;

    // message user
    alert(alertMessage);

    // clear cart
    cart = [];
    renderCart();
}

// add button action
function addToCart(i, name) {
    // instantiate variable 'selection' for algorithm
    let selection = name;

    // use given index to target clicked line item
    let listItem = document.getElementsByTagName('li')[i];

    // save value of input as a numeric quantity
    let input = listItem.querySelector('input');
    let quantity = parseInt(input.value) || 1; // or as 1, if NaN

    // prevent negative numbers
    if (quantity < 0) { quantity = 1 };

    // lets check our cart first
    // if empty
    if (cart.length == 0) {
        // Loop through items[]
        for (let i = 0; i < items.length; i++) {
            // target each item
            let item = items[i];

            // find item name matching selection
            if (item.name == selection) {
                // create cart item
                let cartItem = items[i];
                // add quantity property
                cartItem.quantity = quantity;
                // push to cart
                cart.push(cartItem);
                renderCart();
            }
        }
    } else { // if cart is not empty
        // create flag for match
        let matchFlag = false;

        // check cart for existing selection
        for (let i = 0; i < cart.length; i++) {
            // find cart item matching selection
            let inCartItem = cart[i];

            if (inCartItem.name == selection && quantity) {
                inCartItem.quantity += quantity;
                matchFlag = true; // change flag
                renderCart();
            } else if (inCartItem.name == selection) {
                inCartItem.quantity++;
                matchFlag = true;
                renderCart();
            }
        }
        // no match - create cart item and push to cart
        if (matchFlag === false) { // if false, no quantities were increased
            // find matching item in items Array
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                if (item.name == selection) {
                    let cartItem = item;
                    cartItem.quantity = quantity;
                    cart.push(cartItem);
                    renderCart();
                }
            }
        }
    }
    renderCart();
}

// remove from cart method
function removeFromCart(i) {
    // splice out the element at the given index
    if (cart[i].quantity == 1) {
        cart.splice(i, 1);
    } else {
        cart[i].quantity--;
    }

    renderCart();
}
