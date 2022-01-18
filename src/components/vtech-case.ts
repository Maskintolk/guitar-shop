import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ProductType } from "../types/ProductType";
import { FilterType } from '../types/FilterType';
import { GuitarService } from '../services/guitar-service';

import './vtech-filter-list';
import './vtech-product-list';
import './vtech-filter-summary';
import './vtech-pagination';

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
    text-align: center;
  }
`;

@customElement('vtech-case')
class CaseElement extends LitElement {
  static styles = styles;

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
    const products = this.service.getProducts(this.filters);
    const pageCount = Math.floor(products.length / this.pageSize);
    
    // Set page and page counts
    this.page = page;
    this.pageCount = products.length % this.pageSize === 0 ? pageCount : pageCount + 1;
    this.productCount = products.length;

    // Set list of products for current page
    const startPos = (page - 1) * this.pageSize;
    this.products = products.slice(startPos, startPos + this.pageSize);
  }

  protected async firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    document.addEventListener('vtech-filtering-changed', this.filterChanged.bind(this));
    document.addEventListener('vtech-pagination-changed', this.paginationChanged.bind(this));
    
    if (this.filters === null || this.filters === undefined || (Array.isArray(this.filters) && this.filters.length === 0)) {
      // Load list of manufacturers for filtering
      this.filters = this.service.getManufacturers()
      .map(manufacturer => {
        return {
          name: manufacturer.name,
          isActive: false,
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
        <vtech-filter-list .filters=${[...this.filters]}></vtech-filter-list>
      </div>
      <div class="filter-summary">
        <vtech-filter-summary .filters=${[...this.filters]}></vtech-filter-summary>
        <div>Found ${this.productCount} guitars</div>
      </div>
      <div class="product-list">
        <vtech-product-list .products=${this.products}></vtech-product-list>
      </div>
    </div>
    <div class="pagination">
      <vtech-pagination page="${this.page}" pagecount="${this.pageCount}"></vtech-pagination>
    </div>
    `;
  }

  disconnectedCallback() {
    document.removeEventListener('vtech-filtering-changed', this.filterChanged.bind(this));
    document.removeEventListener('vtech-pagination-changed', this.paginationChanged.bind(this));
  }  
}

declare global {
  interface HTMLElementTagNameMap {
    'vtech-case': CaseElement;
  }
}