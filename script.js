// script.js

class Smoothie {
    constructor(name, size, base, ingredients) {
        this.name = name;
        this.size = size;
        this.base = base;
        this.ingredients = ingredients;
        this.prices = {
            small: 3.00,
            medium: 4.00,
            large: 5.00,
            banana: 1.00,
            strawberry: 1.50,
            blueberry: 2.00,
            pineapple: 1.00,
            mango: 1.50
        };
    }

    calculatePrice() {
        let price = this.prices[this.size];
        for (let ingredient of this.ingredients) {
            price += this.prices[ingredient];
        }
        return price.toFixed(2);
    }

    getDescription() {
        return `
            <p>Name: ${this.name}</p>
            <p>Size: ${this.size}</p>
            <p>Base: ${this.base}</p>
            <p>Ingredients: ${this.ingredients.join(', ')}</p>
            <p>Total Price: $${this.calculatePrice()}</p>
        `;
    }

    getImage() {
        const ingredientImages = {
            banana: 'banana.png',
            strawberry: 'strawberry.png',
            blueberry: 'blueberry.png',
            pineapple: 'pineapple.png',
            mango: 'mango.png'
        };

        let imageHTML = '<div class="smoothie-composite">';
        for (let ingredient of this.ingredients) {
            imageHTML += `<img src="images/${ingredientImages[ingredient]}" alt="${ingredient}">`;
        }
        imageHTML += '</div>';

        return imageHTML;
    }
}

function orderSmoothie() {
    const form = document.getElementById('smoothie-form');
    const name = form.name.value;
    const size = form.size.value;
    const base = form.base.value;
    const ingredients = Array.from(form.ingredients)
                            .filter(ingredient => ingredient.checked)
                            .map(ingredient => ingredient.value);

    if (ingredients.length > 5) {
        alert('Please select up to 5 ingredients only.');
        return;
    }

    const smoothie = new Smoothie(name, size, base, ingredients);
    document.getElementById('order-summary').innerHTML = smoothie.getDescription();
    document.getElementById('smoothie-image').innerHTML = smoothie.getImage();
}
