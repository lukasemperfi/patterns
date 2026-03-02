var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ProductFactory = /** @class */ (function () {
    function ProductFactory() {
    }
    ProductFactory.prototype.getProductHtml = function () {
        var product = this.createProduct();
        return "<div>".concat(product.render(), "</div>");
    };
    return ProductFactory;
}());
//#endregion
//#region Concrete Products
var LaptopProduct = /** @class */ (function () {
    function LaptopProduct() {
    }
    LaptopProduct.prototype.render = function () {
        return "\n      <h2>Laptop</h2>\n      <p>Powerful laptop for all your needs.</p>\n      <button>Add Laptop to Cart</button>\n    ";
    };
    return LaptopProduct;
}());
var SmartphoneProduct = /** @class */ (function () {
    function SmartphoneProduct() {
    }
    SmartphoneProduct.prototype.render = function () {
        return "\n      <h2>Smartphone</h2>\n      <p>Latest model smartphone with amazing features.</p>\n      <button>Add Smartphone to Cart</button>\n    ";
    };
    return SmartphoneProduct;
}());
var HeadphoneProduct = /** @class */ (function () {
    function HeadphoneProduct() {
    }
    HeadphoneProduct.prototype.render = function () {
        return "\n      <h2>Headphones</h2>\n      <p>High-quality headphones for immersive audio.</p>\n      <button>Add Headphones to Cart</button>\n    ";
    };
    return HeadphoneProduct;
}());
//#endregion
//#region Concrete Product Factories
var LaptopFactory = /** @class */ (function (_super) {
    __extends(LaptopFactory, _super);
    function LaptopFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LaptopFactory.prototype.createProduct = function () {
        return new LaptopProduct();
    };
    return LaptopFactory;
}(ProductFactory));
var SmartphoneFactory = /** @class */ (function (_super) {
    __extends(SmartphoneFactory, _super);
    function SmartphoneFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartphoneFactory.prototype.createProduct = function () {
        return new SmartphoneProduct();
    };
    return SmartphoneFactory;
}(ProductFactory));
var HeadphoneFactory = /** @class */ (function (_super) {
    __extends(HeadphoneFactory, _super);
    function HeadphoneFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeadphoneFactory.prototype.createProduct = function () {
        return new HeadphoneProduct();
    };
    return HeadphoneFactory;
}(ProductFactory));
//#endregion
//#region Client Code (Console Output)
function displayProductsInConsole(factory, sectionName) {
    console.log("--- ".concat(sectionName, " ---"));
    console.log(factory.getProductHtml());
    console.log("\n");
}
// Simulate displaying products in different sections (console output)
console.log("App: Displaying products in the console.");
displayProductsInConsole(new LaptopFactory(), "Featured Products");
displayProductsInConsole(new SmartphoneFactory(), "New Arrivals");
displayProductsInConsole(new HeadphoneFactory(), "Accessories");
//#endregion
