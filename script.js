/* =========================================================
   MESSMATE JAVASCRIPT
========================================================= */


let cart = [];

let flexWalletBalance = 0;

let selectedFlexMess = null;

let selectedPauseDays = null;

let selectedDelivery = "now";

let selectedTime = "";


/* =========================================================
   PAGE MANAGEMENT
========================================================= */

const pages = [

    "home-page",
    "details-page",
    "meals-page",
    "cart-page",
    "checkout-page",
    "order-success-page",
    "subscription-page",
    "payment-page",
    "success-page",
    "my-plan-page",
    "pause-page",
    "compare-page",
    "flexi-wallet-page"

];


function hideAllPages() {

    pages.forEach(function(id) {

        const page = document.getElementById(id);

        if (page) {

            page.style.display = "none";

        }

    });

}


function showPage(id) {

    hideAllPages();

    const page = document.getElementById(id);

    if (page) {

        page.style.display = "block";

    }

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function goHome() {

    showPage("home-page");

    updateNavigation("home");

}


function showDetails() {

    showPage("details-page");

    updateNavigation("");

}


function showMeals() {

    showPage("meals-page");

    updateNavigation("");

}


function showCompare() {

    showPage("compare-page");

    updateNavigation("compare");

}


function showMyPlan() {

    showPage("my-plan-page");

    updateNavigation("plan");

}


function showFlexiWallet() {

    showPage("flexi-wallet-page");

    updateNavigation("flexi");

    updateFlexWalletUI();

}


function updateNavigation(active) {

    document
        .querySelectorAll(".nav-item")
        .forEach(function(item) {

            item.classList.remove("active");

        });


    const navItems =
        document.querySelectorAll(".nav-item");


    if (active === "home" && navItems[0]) {

        navItems[0].classList.add("active");

    }


    if (active === "compare" && navItems[1]) {

        navItems[1].classList.add("active");

    }


    if (active === "flexi" && navItems[2]) {

        navItems[2].classList.add("active");

    }


    if (active === "plan" && navItems[3]) {

        navItems[3].classList.add("active");

    }

}


/* =========================================================
   CART
========================================================= */

function addToCart(name, price) {

    const existing =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCartUI();


    alert(name + " added to your cart!");

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartUI();

}


function showCart() {

    updateCartUI();

    showPage("cart-page");

    updateNavigation("");

}


function updateCartUI() {

    let count = 0;

    let subtotal = 0;


    cart.forEach(function(item) {

        count += item.quantity;

        subtotal +=
            item.price * item.quantity;

    });


    const cartCount =
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.textContent = count;

    }


    const floating =
        document.getElementById("floating-cart-count");


    if (floating) {

        floating.textContent =
            count +
            (count === 1 ? " item" : " items");

    }


    const cartItems =
        document.getElementById("cart-items");


    const emptyCart =
        document.getElementById("empty-cart");


    const summary =
        document.getElementById("cart-summary");


    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        if (emptyCart)
            emptyCart.style.display = "block";

        if (summary)
            summary.style.display = "none";

        return;

    }


    if (emptyCart)
        emptyCart.style.display = "none";


    if (summary)
        summary.style.display = "block";


    cart.forEach(function(item, index) {

        const total =
            item.price * item.quantity;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <div class="cart-item-icon">
                🍱
            </div>

            <div class="cart-item-content">

                <strong>
                    ${item.name}
                </strong>

                <small>
                    ₹${item.price} × ${item.quantity}
                </small>

            </div>

            <strong>
                ₹${total}
            </strong>

            <button
                class="cart-remove"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartItems.appendChild(div);

    });


    const finalTotal =
        subtotal + 20;


    const subtotalElement =
        document.getElementById("cart-items-total");


    const totalElement =
        document.getElementById("cart-total");


    const checkoutTotal =
        document.getElementById("checkout-total");


    if (subtotalElement)
        subtotalElement.textContent =
            "₹" + subtotal;


    if (totalElement)
        totalElement.textContent =
            "₹" + finalTotal;


    if (checkoutTotal)
        checkoutTotal.textContent =
            "₹" + finalTotal;

}


/* =========================================================
   CHECKOUT
========================================================= */

function showCheckout() {

    if (cart.length === 0) {

        alert("Please add a meal first.");

        return;

    }


    updateCartUI();

    showPage("checkout-page");

}


function selectDelivery(type) {

    selectedDelivery = type;


    const now =
        document.getElementById("now-option");


    const schedule =
        document.getElementById("schedule-option");


    const scheduleBox =
        document.getElementById("schedule-box");


    if (type === "now") {

        now.classList.add("selected");

        schedule.classList.remove("selected");

        scheduleBox.style.display = "none";

    }

    else {

        schedule.classList.add("selected");

        now.classList.remove("selected");

        scheduleBox.style.display = "block";

    }

}


function selectTime(button) {

    document
        .querySelectorAll(".time-slots button")
        .forEach(function(btn) {

            btn.classList.remove("selected");

        });


    button.classList.add("selected");


    selectedTime =
        button.textContent.trim();


    const input =
        document.getElementById("delivery-time");


    if (input) {

        input.value = selectedTime;

    }

}


function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    if (selectedDelivery === "schedule") {

        const date =
            document.getElementById("delivery-date").value;


        if (!date) {

            alert("Please select a delivery date.");

            return;

        }


        if (!selectedTime) {

            alert("Please select a delivery time.");

            return;

        }

    }


    let subtotal = 0;


    cart.forEach(function(item) {

        subtotal +=
            item.price * item.quantity;

    });


    const total =
        subtotal + 20;


    const amount =
        document.getElementById("success-amount");


    const delivery =
        document.getElementById("success-delivery");


    if (amount) {

        amount.textContent =
            "₹" + total;

    }


    if (delivery) {

        if (selectedDelivery === "now") {

            delivery.textContent =
                "Now • 15–20 mins";

        }

        else {

            const date =
                document.getElementById("delivery-date").value;


            delivery.textContent =
                date +
                " • " +
                selectedTime;

        }

    }


    cart = [];


    updateCartUI();


    showPage("order-success-page");

}


/* =========================================================
   SUBSCRIPTION
========================================================= */

function showSubscription() {

    showPage("subscription-page");

}


function showPayment() {

    showPage("payment-page");

}


function paymentSuccess() {

    showPage("success-page");

}


/* =========================================================
   PAUSE SUBSCRIPTION
========================================================= */

function showPause() {

    selectedPauseDays = null;


    document
        .querySelectorAll(".pause-options button")
        .forEach(function(btn) {

            btn.classList.remove("selected");

        });


    const selection =
        document.getElementById("pause-selection");


    if (selection) {

        selection.textContent =
            "Select a duration above.";

    }


    showPage("pause-page");

}


function selectPause(days) {

    selectedPauseDays = days;


    document
        .querySelectorAll(".pause-options button")
        .forEach(function(btn) {

            btn.classList.remove("selected");

        });


    const buttons =
        document.querySelectorAll(".pause-options button");


    buttons.forEach(function(btn) {

        const number =
            btn.querySelector("strong");


        if (
            number &&
            Number(number.textContent) === days
        ) {

            btn.classList.add("selected");

        }

    });


    const selection =
        document.getElementById("pause-selection");


    if (selection) {

        selection.textContent =
            "Your subscription will be paused for " +
            days +
            (days === 1 ? " day." : " days.");

    }

}


function confirmPause() {

    if (!selectedPauseDays) {

        alert("Please select a pause duration.");

        return;

    }


    alert(
        "Your subscription has been paused for " +
        selectedPauseDays +
        (selectedPauseDays === 1 ? " day." : " days.")
    );


    showMyPlan();

}


/* =========================================================
   FLEXI WALLET
========================================================= */

function addFlexMoney(amount) {

    flexWalletBalance += amount;


    updateFlexWalletUI();


    alert(
        "₹" +
        amount +
        " added to your Flexi Wallet!"
    );

}


function addCustomFlexMoney() {

    const input =
        document.getElementById("customFlexAmount");


    const amount =
        Number(input.value);


    if (!amount || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }


    flexWalletBalance += amount;


    input.value = "";


    updateFlexWalletUI();


    alert(
        "₹" +
        amount +
        " added to your Flexi Wallet!"
    );

}


function updateFlexWalletUI() {

    const balance =
        document.getElementById("flexWalletBalance");


    const homeBalance =
        document.getElementById("homeWalletBalance");


    const progress =
        document.getElementById("flexWalletProgress");


    const message =
        document.getElementById("flexWalletMessage");


    if (balance) {

        balance.textContent =
            flexWalletBalance.toLocaleString("en-IN");

    }


    if (homeBalance) {

        homeBalance.textContent =
            flexWalletBalance.toLocaleString("en-IN");

    }


    if (progress) {

        const percentage =
            Math.min(
                (flexWalletBalance / 2500) * 100,
                100
            );


        progress.style.width =
            percentage + "%";

    }


    if (message) {

        if (flexWalletBalance === 0) {

            message.textContent =
                "Add money to start using Flexi Wallet.";

        }

        else if (flexWalletBalance < 100) {

            message.textContent =
                "Your balance is low. Add more for future meals.";

        }

        else {

            message.textContent =
                "You're ready to choose today's mess!";

        }

    }

}


/* =========================================================
   CHOOSE MESS
========================================================= */

function chooseFlexMess(
    messName,
    price,
    icon
) {

    if (flexWalletBalance < price) {

        alert(

            "Insufficient wallet balance.\n\n" +

            "Meal price: ₹" +
            price +

            "\nWallet balance: ₹" +
            flexWalletBalance +

            "\n\nPlease add money to your wallet."

        );

        return;

    }


    const confirmation =
        confirm(

            "Choose " +
            messName +
            " for today's meal for ₹" +
            price +
            "?"

        );


    if (!confirmation) {

        return;

    }


    flexWalletBalance -= price;


    selectedFlexMess = {

        name: messName,

        price: price,

        icon: icon

    };


    updateFlexWalletUI();


    const box =
        document.getElementById(
            "flexCurrentSelection"
        );


    const selectedIcon =
        document.getElementById(
            "flexSelectedIcon"
        );


    const selectedMess =
        document.getElementById(
            "flexSelectedMess"
        );


    const selectedPrice =
        document.getElementById(
            "flexSelectedPrice"
        );


    if (box)
        box.style.display = "block";


    if (selectedIcon)
        selectedIcon.textContent = icon;


    if (selectedMess)
        selectedMess.textContent = messName;


    if (selectedPrice)
        selectedPrice.textContent =
            "₹" +
            price +
            " deducted from wallet";


    alert(

        "Meal confirmed at " +
        messName +
        "!\n\n" +

        "₹" +
        price +
        " deducted from your Flexi Wallet."

    );

}


/* =========================================================
   SEARCH
========================================================= */

document
    .getElementById("searchInput")
    ?.addEventListener(
        "input",
        function() {

            const query =
                this.value.toLowerCase().trim();


            document
                .querySelectorAll(".mess-card")
                .forEach(function(card) {

                    const content =
                        card.textContent.toLowerCase();


                    if (
                        content.includes(query)
                    ) {

                        card.style.display =
                            "block";

                    }

                    else {

                        card.style.display =
                            "none";

                    }

                });

        }
    );


/* =========================================================
   OTHER ACTIONS
========================================================= */

function contactMess() {

    alert(
        "Maa's Kitchen\n\n" +
        "Demo contact feature."
    );

}


function manageSubscription() {

    alert(
        "Subscription management options\n\n" +
        "This is a demo feature."
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartUI();

        updateFlexWalletUI();

        goHome();

    }
);