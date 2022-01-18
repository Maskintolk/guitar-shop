import { Story, Meta } from '@storybook/web-components';
import { Pagination, PaginationProps } from './Pagination';

export default {
  title: 'Valtech/Pagination',
} as Meta;

const Template: Story<Partial<PaginationProps>> = (args) => Pagination(args);

export const FirstPage = Template.bind({});
FirstPage.args = {
  page: 1,
  pageCount: 10
};

export const LastPage = Template.bind({});
LastPage.args = {
  page: 10,
  pageCount: 10
};

// This should not be allowed. The component should set the page to 1
export const PastFirstPage = Template.bind({});
PastFirstPage.args = {
  page: 0,
  pageCount: 10
};

// This should not be allowed. The component should set the page to 10
export const PastLastPage = Template.bind({});
PastLastPage.args = {
  page: 20,
  pageCount: 10
};
