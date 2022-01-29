import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js';
import { customElement, property } from 'lit/decorators.js';

import { ProductType } from '../types/ProductType';
import './guitar-product-card';

const styles = css`
  div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 5rem;
  }
  p {
    text-align: center;
  }
`;

@customElement('guitar-product-list')
class ProductListElement extends LitElement {
  static styles = styles;

  @property({type: Array})
  products: ProductType[] = [];

  protected update(changedProperties: Map<string | number | symbol, unknown>): void {
    if (this.products === null || this.products === undefined || !Array.isArray(this.products)) {
      this.products = [];
    }
    super.update(changedProperties);
  }

  render() {
    if (this.products.length === 0) {
      return html`<p>No products found</p>`;
    }

    return html`
    <div>
      ${map(this.products, (product) => html`
        <guitar-product-card .product=${product}>
        </guitar-product-card>
      `)}
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'guitar-product-list': ProductListElement;
  }
}