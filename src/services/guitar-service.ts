import { ProductType } from "../types/ProductType";
import { FilterType } from "../types/FilterType";
import { allData } from './productsdata';

export class GuitarService {
  private products: ProductType[] = [];

  constructor() {
    this.products = allData['articles'].map(
      (article) => {
        return {
          id: article.id,
          name: article.name,
          description: article.text.featuresClean[0],
          priceFormatted: article.price.primary.formatted,
          image: {
            file: article.image.file,
            height: parseInt(article.image.height, 10),
            width: parseInt(article.image.width, 10),
          },
          manufacturer: {
            name: article.manufacturer,
            image: {
              file: article.manufacturerData.image.file,
              height: parseInt(article.manufacturerData.image.height, 10),
              width: parseInt(article.manufacturerData.image.width, 10),
            }
          }
        };
      }
    );
    return this;
  }

  getManufacturers() {
    return allData['manufacturers'];
  }

  getProducts(filters: FilterType[]): ProductType[] {
    const selectedManufactorers = 
      filters
        .filter(filter => filter.isActive)
        .map(filter => filter.name.toLowerCase());
    
    if (selectedManufactorers.length > 0) {
      return this.products.filter(product => selectedManufactorers.includes(product.manufacturer.name.toLowerCase()));
    }

    return this.products;
  }
}