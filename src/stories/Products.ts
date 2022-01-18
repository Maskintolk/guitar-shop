import { html } from 'lit-html';

import { ProductType } from '../types/ProductType';

import '../components/vtech-product-list';
import '../components/vtech-product-card';

export interface ProductListProps {
  products: ProductType[]
}

export const ProductList = ({products}) => html`
  <vtech-product-list .products=${products}></vtech-product-list>
`;

export interface ProductProps {
  product: ProductType
}

export const ProductCard = ({product}) => html`
  <vtech-product-card .product=${product}></vtech-product-card>
`;