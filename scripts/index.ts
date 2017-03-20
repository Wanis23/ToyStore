import $ from 'jquery';

import { ToyStore } from './shopping-cart';
import { DummyData } from './dummy-data';
import { Product } from './product';
import { Category } from './category';


$(function () {
    var cart: ToyStore.ShoppingCart;
    var selectedCategory: Category;
    var selectedProduct: Product;

    function init() {
        var i: number;
        var categories: Array<Category> = DummyData.categories;
        var catSelect: JQuery = $("#categories");

        for (i = 0; i < categories.length; i += 1) {
            $("<option>").text(categories[i].name)
                .val(categories[i].id.toString())
                .appendTo(catSelect);
        }

        cart = new ToyStore.ShoppingCart();
    }

    function renderCart() {
        var i: number,
            tr$: JQuery,
            td1$: JQuery,
            td2$: JQuery,
            tbody$: JQuery;

        tbody$ = $("#cartTable tbody");
        tbody$.empty();

        for (i = 0; i < cart.items.length; i += 1) {
            td1$ = $("<td>").text(cart.items[i].product.name);
            td2$ = $("<td>").text(cart.items[i].quantity);

            tr$ = $("<tr>").append(td1$).append(td2$);
            tbody$.append(tr$);
        }

    }

    $('#categories').change(() => {
        var i: number,
            products: Array<Product>,
            prodSelect: JQuery = $("#products"),
            catIndex: number = $("#categories").val();

        selectedCategory = DummyData.categories.filter((cat) => cat.id == catIndex )[0];
        products = selectedCategory.products;

        prodSelect.empty();
        for (i = 0; i < products.length; i += 1) {
            $("<option>").text(products[i].name)
                .val(products[i].id.toString())
                .appendTo(prodSelect);
        }

    });


    $("#add").click(() => {
        var quantity: number, prodIndex: number;

        quantity = $("#quantity").val();
        prodIndex = $("#products").val();
        selectedProduct = selectedCategory.products.filter((prod) => prod.id == prodIndex)[0];

        cart.addItem(selectedProduct, quantity);
        renderCart();
    });

    init();
});
