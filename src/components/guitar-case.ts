import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ProductType } from "../types/ProductType";
import { FilterType } from '../types/FilterType';
import { GuitarService } from '../services/guitar-service';

import './guitar-filter-list';
import './guitar-product-list';
import './guitar-filter-summary';
import './guitar-pagination';

const styles = css`
  .grid {
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-areas:
    "filter-list filter-summary"
    "filter-list product-list"
    "filter-list product-list";
    grid-gap: 1rem;
    width: 100%;
    height: 90vh;
  }
  
  .filter-list {
    grid-area: filter-list;
  }
  
  .filter-summary {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    grid-area: filter-summary;
    padding-top: 11px;
    height: 34px;
    width: 100%;
  }

  .filter-summary div {
    margin-right: 90px;
    margin-top: 10px;
    text-align: bottom;
  }

  .product-list {
    grid-area: product-list;
    padding-right: 100px;
    overflow: scroll;
    height: 100%;
  }

  .pagination {
    width: 100%;
    margin-top: 30px;
    text-align: right;
    padding-right: 1000px;
  }
`;

@customElement('guitar-case')
class CaseElement extends LitElement {
  static styles = styles;

  constructor() {
    super();

    this.addEventListener('guitar-filtering-changed', this.filterChanged.bind(this));
    this.addEventListener('guitar-pagination-changed', this.paginationChanged.bind(this));
  }

  private service: GuitarService = new GuitarService();

  @property({type: Array})
  products: ProductType[] = [];

  /**
   * List of filters
   */
  @property({type: Array})
  filters: FilterType[] = [];

  /**
   * Current page being shown
   */
  @property({type: Number, reflect: true})
  page: number = 1;

  /**
   * Number of pages in filtered result
   */
  @property({type: Number, reflect: true})
  pageCount: number = 1;

  /**
   * Number of products to show on each page
   */
  @property({type: Number, reflect: true})
  pageSize: number = 12;
  
  /**
   * Number of guitars found in filtered result
   */
   private productCount: number = 0;
 
   protected filterChanged(e: Event) {
    // This triggers a re-render which in turn updates the filter list and summary elements

    // TODO: Only show product list if filters actually changed...
    this.filters = e.detail.filters;    
    this.showProductList(1);
  }

  protected paginationChanged(e: Event) {
    this.showProductList(e.detail.page);
  }

  protected showProductList(page: number) {
    const [products, pageCount, productCount] = this.service.getProducts(this.filters, this.page, this.pageSize);
    
    // Set page and page counts
    this.page = page;
    this.pageCount = products.length % this.pageSize === 0 ? pageCount : pageCount + 1;
    this.productCount = productCount;

    // Set list of products for current page
    this.products = products;
  }

  protected async firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    if (this.filters === null || this.filters === undefined || (Array.isArray(this.filters) && this.filters.length === 0)) {
      // Load list of manufacturers for filtering
      this.filters = this.service.getManufacturers()
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
    }

    if (this.products === null || this.products === undefined || (Array.isArray(this.products) && this.products.length === 0)) {
      // Load initial list of products
      this.showProductList(this.page);
    }
  }

  render() {
    return html`
    <div class="grid">
      <div class="filter-list">
        <h3>Filters</h3>
        <guitar-filter-list .filters=${[...this.filters]}></guitar-filter-list>
      </div>
      <div class="filter-summary">
        <guitar-filter-summary .filters=${[...this.filters]}></guitar-filter-summary>
        <div>Found ${this.productCount} guitars</div>
      </div>
      <div class="product-list">
        <guitar-product-list .products=${this.products}></guitar-product-list>
      </div>
    </div>
    <div class="pagination">
      <guitar-pagination page="${this.page}" pagecount="${this.pageCount}"></guitar-pagination>
    </div>
    `;
  }

  disconnectedCallback() {
    this.removeEventListener('guitar-filtering-changed', this.filterChanged.bind(this));
    this.removeEventListener('guitar-pagination-changed', this.paginationChanged.bind(this));
    super.disconnectedCallback();
  }  
}

declare global {
  interface HTMLElementTagNameMap {
    'guitar-case': CaseElement;
  }
}