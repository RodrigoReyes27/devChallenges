<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout Page</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
</head>
<body>
    <div class="content-container">
        <h1>Checkout</h1>
        <div class="checkout-information-container">
            <div class="checkout-item-container">
                <img src="photo1.png" alt="Vintage-Backbag" class="item-image">
                <p class="item-name">Vintage Backbag</p>
                <div class="item-price-container">
                    <p class="item-current-price">$54.99</p>
                    <p class="item-real-price">$94.99</p>
                </div>
                <div class="amount-controller-container">
                    <span class="material-symbols-outlined">remove</span>
                    <p>1</p>
                    <span class="material-symbols-outlined">add</span>
                </div>
            </div>
            <div class="checkout-item-container">
                <img src="photo2.png" alt="Levi Shoes" class="item-image">
                <p class="item-name">Levi Shoes</p>
                <div class="item-price-container">
                    <p class="item-current-price">$74.99</p>
                    <p class="item-real-price">$124.99</p>
                </div>
                <div class="amount-controller-container">
                    <span class="material-symbols-outlined">remove</span>
                    <p>1</p>
                    <span class="material-symbols-outlined">add</span>
                </div>
            </div>
            <div class="checkout-cost-container">
                <div class="shipping-container">
                    <p class="cost-type">Shipping</p>
                    <p class="cost">$19</p>
                </div>
                <div class="total-cost">
                    <p class="cost-type">Total</p>
                    <p class="cost">$148.98</p>
                </div>
            </div>
        </div>
        <div class="user-checkout-information-container">
            <div class="contact-information-container">
                <h2>Contact information</h2>
                <div class="contact-information email">
                    <label for="e-mail">E-mail</label>
                    <div class="input-container">
                        <i class="material-symbols-outlined">mail</i>
                        <input type="text" placeholder="Enter your email...">
                    </div>
                </div>
                <div class="contact-information phone">
                    <label for="phone">Phone</label>
                    <div class="input-container">
                        <i class="material-symbols-outlined">phone</i>
                        <input type="tel" placeholder="Enter your phone...">
                    </div>
                </div>
            </div>
            <div class="shipping-information-container">
                <h2>Shipping Address</h2>
                <div class="shipping-information name">
                    <label for="full-name">Full name</label>
                    <div class="input-container">
                        <i class="material-symbols-outlined">account_circle</i>
                        <input type="text" placeholder="Your full name...">
                    </div>
                </div>
                <div class="shipping-information address">
                    <label for="address">Address</label>
                    <div class="input-container">
                        <i class="material-symbols-outlined">home</i>
                        <input type="text" placeholder="Your address...">
                    </div>
                </div>
                <div class="shipping-information city">
                    <label for="city">City</label>
                    <div class="input-container">
                        <i class="material-symbols-outlined">location_city</i>
                        <input type="text" placeholder="Your city...">
                    </div>
                </div>
                <div class="shipping-information country half">
                    <label for="country">Country</label>
                    <div class="input-container">
                        <i class="material-symbols-outlined">public</i>
                        <input type="text" placeholder="Your country...">
                    </div>
                </div>
                <div class="shipping-information postalcode half">
                    <label for="postalcode">Postal code</label>
                    <div class="input-container">
                        <i class="material-symbols-outlined">markunread_mailbox</i>
                        <input type="text" placeholder="Your postalcode...">
                    </div>
                </div>
                <div class="save-information-container">
                    <label class="checkbox-container">
                        <input type="checkbox">
                        <span class="checkmark"></span>
                    </label class="checkbox-container">
                    <p>Save this information for next time</p>
                </div>
            </div>
            <div class="continue-checkout-container">
                <p class="continue">Continue</p>
            </div>
        </div>
    </div>
</body>
</html>