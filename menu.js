
const cart = JSON.parse(localStorage.getItem("cart")) || []

function updateBadge() {
     document.querySelector("#cart-badge-icon").innerHTML=`${cart.length}`
}
async function addToCart(num) {
    const response = await fetch('app.json');
    const data = await response.json();

    // console.log(data)
    const menuItems = data;
    const product = menuItems.find(item => item.id=== num);

    if (!product) {
        console.error("product not found", num);
        return;
    }
    const existingItem = cart.find(item => item.id === num);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: num,
            name: product.name,
            icon: product.icon,
            price: product.price,
            quantity: 1,
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log(num)
    updateBadge()
}
updateBadge()   