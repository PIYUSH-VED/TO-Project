let CartItem = [];
const cartItemElements = document.querySelector(".cart-items");
const btncartel = document.querySelectorAll(".secure-checkout")
const summary = document.getElementById("subtotal")
const itemadd1 = JSON.parse(localStorage.getItem("cart"))
const ordercount = document.getElementById("item-count")
const subtotal = document.getElementById("subtotal")
const tax = document.getElementById("tax")
const delivery = document.getElementById("delivery")
const finamt = document.getElementById("total")


function updatetotal() {
    const total = CartItem.map(item => parseInt(item.price) * item.quantity)
    const sum = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    subtotal.innerText=`₹${sum}`

    tax.innerText=`₹${(sum * 0.18).toFixed(2)}`

    delivery.innerText=`₹${(sum * 0.02).toFixed(2)}`

    finamt.innerText=`₹${(sum + (sum * 0.18) + (sum * 0.02)).toFixed(2)}`
}
function updatecount() {
    ordercount.innerText = `${CartItem.length}`
}
function updateOrderSummary() {

    //     //     // `${}`ementById("subtotal
}

function saveCartAndUpdateUI(CartItem) {
    localStorage.setItem("cart", JSON.stringify(CartItem));
    updateCartDisplay();
    updatecount()
    updatetotal()
}

function decreaseQuantity(id) {
    const decval = CartItem.find(item => item.id === id)
    if (decval && decval.quantity > 1) {
        decval.quantity -= 1;
    } else {
        CartItem = CartItem.filter(item => item.id !== id)
    }
    saveCartAndUpdateUI(CartItem);
}

function increaseQuantity(id) {
    const decval = CartItem.find(item => item.id === id)
    if (decval) {
        decval.quantity += 1;
        saveCartAndUpdateUI(CartItem);
    } else {
        alert("no item found")
    }
}

function removeFromCart(id) {
    CartItem = CartItem.filter((item) => item.id !== id)
    saveCartAndUpdateUI(CartItem);
}

for (let i = 0; i < itemadd1.length; i++) {
    CartItem.push({
        id: itemadd1[i].id,
        name: itemadd1[i].name,
        icon: itemadd1[i].icon,
        price: itemadd1[i].price,
        quantity: itemadd1[i].quantity

    });
}

function updateCartDisplay() {
    if (!cartItemElements) return;
    cartItemElements.innerHTML = "";
    if (CartItem.length === 0) {
        cartItemElements.innerHTML = "<p>Your cart is empty</p>";
        return;
    } else {
        CartItem.forEach(cartItem => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <img src="${cartItem.icon}" alt="${cartItem.name}" class="item-image">
                <div class="item-details">
                    <div class="item-name">${cartItem.name}</div>
                    <div class="item-price">₹${cartItem.price * cartItem.quantity}</div>
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${cartItem.id}">-</button>
                        <input type="text" class="quantity-input" value="${cartItem.quantity}" readonly>
                        <button class="quantity-btn increase" data-id="${cartItem.id}">+</button>
                    </div>
                </div>
                <button class="remove-btn" data-id="${cartItem.id}">🗑️</button>
            `;

            cartItemElements.appendChild(itemElement);
        });
    }

    // Add event listeners to the buttons
    const decreaseButtons = document.querySelectorAll(".decrease");
    const increaseButtons = document.querySelectorAll(".increase");
    const removeButtons = document.querySelectorAll(".remove-btn");

    decreaseButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const id = parseInt(this.getAttribute("data-id"));
            decreaseQuantity(id);
            // console.log(id)
        });
    });

    increaseButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const id = parseInt(this.getAttribute("data-id"));
            increaseQuantity(id);
        });
    });

    removeButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const id = parseInt(this.getAttribute("data-id"));
            removeFromCart(id);
        });
    });

    updateOrderSummary();
    updatecount()
    updatetotal()
}
updateCartDisplay()
updatetotal()