import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProductListController } from '../controllers/product-list-controller';

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
export class CaseElement extends LitElement {
  static styles = styles;

  constructor() {
    super();
    this.addEventListener('guitar-filtering-changed', this.filterChanged.bind(this));
    this.addEventListener('guitar-pagination-changed', this.paginationChanged.bind(this));
  }

  private productController = new ProductListController(this);

  /**
   * Current page being shown
   */
  @property({type: Number, reflect: true})
  public page: number = 1;

  /**
   * Number of products to show on each page
   */
  @property({type: Number, reflect: true})
  public pageSize: number = 12;
  
  protected filterChanged(e: Event) {
    // TODO: Only show product list if filters actually changed...
    this.page = 1
    this.productController.loadProductList(this.page, this.pageSize, e.detail.filters);
  }

  protected paginationChanged(e: Event) {
    this.page = e.detail.page;
    this.productController.loadProductList(this.page, this.pageSize, this.productController.filters);
  }

  render() {
    return html`
    <div class="grid">
      <div class="filter-list">
        <h3>Filters</h3>
        <guitar-filter-list .filters=${[...this.productController.filters]}></guitar-filter-list>
      </div>
      <div class="filter-summary">
        <guitar-filter-summary .filters=${[...this.productController.filters]}></guitar-filter-summary>
        <div>Found ${this.productController.productCount} guitars</div>
      </div>
      <div class="product-list">
        <guitar-product-list .products=${this.productController.products}></guitar-product-list>
      </div>
    </div>
    <div class="pagination">
      <guitar-pagination page="${this.page}" pagecount="${this.productController.pageCount}"></guitar-pagination>
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