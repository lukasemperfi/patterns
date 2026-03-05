//#region Flyweight
class IconFlyweight {
  private brandData: { name: string; logoUrl: string; color: string };

  constructor(brandData: any) {
    this.brandData = brandData;
  }

  public renderOnMap(uniqueState: {
    lat: number;
    lng: number;
    shopId: string;
  }): void {
    console.log(`Map: Rendering shop ${uniqueState.shopId} at [${uniqueState.lat}, ${uniqueState.lng}] 
                     using icon: ${this.brandData.logoUrl} (${this.brandData.name})`);
  }
}
//#endregion

//#region Icon Factory
class IconFactory {
  private flyweights: { [key: string]: IconFlyweight } = {};

  private getKey(brand: string, color: string): string {
    return `${brand}_${color}`.toLowerCase();
  }

  public getIcon(brand: string, logoUrl: string, color: string): IconFlyweight {
    const key = this.getKey(brand, color);

    if (!(key in this.flyweights)) {
      console.log(`Factory: Creating NEW icon for brand: ${brand}`);
      this.flyweights[key] = new IconFlyweight({ brand, logoUrl, color });
    } else {
      console.log(`Factory: Reusing EXISTING icon for brand: ${brand}`);
    }
    return this.flyweights[key];
  }
}
//#endregion

//#region Client Code
const shopsData = [
  { id: "s1", brand: "Starbucks", lat: 55.75, lng: 37.61 },
  { id: "s2", brand: "Starbucks", lat: 55.76, lng: 37.62 },
  { id: "s3", brand: "Starbucks", lat: 55.77, lng: 37.63 },
  { id: "m1", brand: "McDonalds", lat: 40.71, lng: -74.0 },
];

const factory = new IconFactory();

shopsData.forEach((data) => {
  const icon = factory.getIcon(
    data.brand,
    `${data.brand.toLowerCase()}.png`,
    "green",
  );

  icon.renderOnMap({ lat: data.lat, lng: data.lng, shopId: data.id });
});
//#endregion
