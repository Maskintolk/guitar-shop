import { Story, Meta } from '@storybook/web-components';
import { ProductCard, ProductProps, ProductList, ProductListProps } from './Products';

import { ProductType } from '../types/ProductType';
import { allData } from './productsdata';

export default {
  title: 'Valtech/Products',
} as Meta;

const ProductListTemplate: Story<Partial<ProductListProps>> = (args) => ProductList(args);
const data = allData['articles'];
const products = data.map(
  (article) => {
    return {
      id: article.id,
      name: article.name,
      description: article.text.featuresClean[0],
      priceFormatted: article.price.primary.formatted,
      manufacturer: {
        name: article.manufacturer
      }
    } as ProductType;
  }
);

export const GuitarList = ProductListTemplate.bind({});
GuitarList.args = {
  products: products.slice(0, 10)
};


const ProductTemplate: Story<Partial<ProductProps>> = (args) => ProductCard(args);
const product: ProductType = products[0];

export const SingleProduct = ProductTemplate.bind({});
SingleProduct.args = {
  product: product
};

