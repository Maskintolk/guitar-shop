import { html } from 'lit-html';

import { ProductType } from '../types/ProductType';

import '../components/guitar-product-list';
import '../components/guitar-product-card';

export interface ProductListProps {
  products: ProductType[]
}

export const ProductList = ({products}) => html`
  <guitar-product-list .products=${products}></guitar-product-list>
`;

export interface ProductProps {
  product: ProductType
}

export const ProductCard = ({product}) => html`
  <guitar-product-card .product=${product}></guitar-product-card>
`;