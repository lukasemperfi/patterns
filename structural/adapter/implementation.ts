interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
}

class ProductCard {
  public render(product: Product): void {
    console.log("product", product);
  }
}

interface NewProductResponse {
  product_id: string;
  product_title: string;
  pricing: {
    amount: number;
    currency: string;
  };
}

class NewProductAPI {
  public async fetchProduct(id: string): Promise<NewProductResponse> {
    return Promise.resolve({
      product_id: "p1",
      product_title: "MacBook Pro",
      pricing: {
        amount: 2500,
        currency: "USD",
      },
    });
  }
}

class ProductAdapter {
  public static toProduct(external: NewProductResponse): Product {
    return {
      id: external.product_id,
      name: external.product_title,
      price: external.pricing.amount,
      currency: external.pricing.currency,
    };
  }
}

async function clientCode(): Promise<void> {
  const api = new NewProductAPI();
  const productCard = new ProductCard();

  const externalData = await api.fetchProduct("p1");

  const product = ProductAdapter.toProduct(externalData);

  productCard.render(product);
}

clientCode();
