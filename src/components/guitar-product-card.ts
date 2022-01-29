import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML} from 'lit/directives/unsafe-html.js';

import { ProductType } from '../types/ProductType';

const styles = css`
  .card {
    border: 1px solid #aaa;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    height: 550px;
  }
  .card:hover {
    cursor: pointer;
    border: 1px solid #888;
    box-shadow: 2px 2px 22px -10px rgba(0,0,0,0.75);
  }
  img {
    width: 300px;
    height: 300px;
  }
  .img {
    padding: 10px 0;
    overflow: hidden;
  }
  .info {
    padding: 0 15px;
    text-align: center;
  }
  .img-logo {
    width: 48px;
    height: 32px;
    padding-right: 10px;
  }
  .logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

@customElement('guitar-product-card')
class ProductCardElement extends LitElement {
  static styles = styles;

  @property({type: Object})
  product?: ProductType;

  render() {
    // Set path to guitar image or placeholder image if not present
    let image = 'noimage.png';
    if (this.product?.image) {
      image = this.product.image.file;
    }
    let imagePathGuitar = `/assets/img/${image}`;

    // Set path to manufacturer image if present
    let imageManufacturer = html``;
    if (this.product?.manufacturer.image) {
      const imagePathManufacturer = `/assets/img/${this.product?.manufacturer.image.file}`;
      imageManufacturer = html`<img class="img-logo" src="${imagePathManufacturer}">`;
    }

    return html`
    <div class="card">
      <img class="img" src="${imagePathGuitar}">
      <div class="info">
        <div class="logo">${imageManufacturer} ${this.product?.manufacturer.name}</div>
        <h2>${this.product?.name}</h2>
        <p>${unsafeHTML(this.product?.description)}</p>
      </div>
      <div class="info">
        <h3>${unsafeHTML(this.product?.priceFormatted)}</h3>
      </div>
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'guitar-product-card': ProductCardElement;
  }
}