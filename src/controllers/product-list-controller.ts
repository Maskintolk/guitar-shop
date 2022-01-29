import {ReactiveController, ReactiveControllerHost} from 'lit';
import { ProductService } from '../services/product-service';
import { FilterType } from '../types/FilterType';
import { ProductType } from "../types/ProductType";

export class ProductListController implements ReactiveController {
  private host: ReactiveControllerHost;

  private service: ProductService = new ProductService();

  public pageCount: number = 1;
  public productCount: number = 1;
  public filters: FilterType[] = [];
  public products: ProductType[] = [];
   
  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    // Load list of manufacturers for filtering
    const filters: FilterType[] = this.service.getManufacturers()
    .map(manufacturer => {
      return {
        name: manufacturer.name,

        // Start out with all filters de-selected
        isActive: false,

        // NB! This count doesn't match the actual count of products found in the dataset.
        // But keep it here for the purpose of showing it in the UI
        count: manufacturer.count
      };
    });

    // Load initial list of products
    this.loadProductList(1, this.host.pageSize, filters);
  }

  public loadProductList(page: number, pageSize: number, filters: FilterType[]) {
    const [products, pageCount, productCount] = this.service.getProducts(filters, page, pageSize);
    
    // Set page and page counts
    this.pageCount = products.length % pageSize === 0 ? pageCount : pageCount + 1;
    this.productCount = productCount;

    // Set list of products for current page
    this.products = products;
    this.filters = filters;

    this.host.requestUpdate();
  }  
}