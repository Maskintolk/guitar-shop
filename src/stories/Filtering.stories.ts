import { Story, Meta } from '@storybook/web-components';
import { FilterSummary, FilterList, FilterProps } from './FilterSummary';

import { FilterType } from '../types/FilterType';

export default {
  title: 'guitar/Filtering',
} as Meta;

const FilterSummaryTemplate: Story<Partial<FilterProps>> = (args) => FilterSummary(args);
const filters = [
  {
    name: 'DAngelico',
    isActive: true
  },
  {
    name: 'Duesenberg',
    isActive: false
  },
  {
    name: 'Fender',
    isActive: false
  },
  {
    name: 'Gibson',
    isActive: true
  },
  {
    name: 'Ibanez',
    isActive: true
  }
] as FilterType[];

export const SingleSummaryFilter = FilterSummaryTemplate.bind({});
SingleSummaryFilter.args = {
  filters: [
    {
      name: 'Fender',
      isActive: true
    }
  ]
};

export const MultiSummaryFilter = FilterSummaryTemplate.bind({});
MultiSummaryFilter.args = {
  filters: filters
};

const FilterListTemplate: Story<Partial<FilterProps>> = (args) => FilterList(args);

export const MultiListFilterVertical = FilterListTemplate.bind({});
MultiListFilterVertical.args = {
  orientation: 'vertical',
  filters: filters
};

export const MultiListFilterHorizontal = FilterListTemplate.bind({});
MultiListFilterHorizontal.args = {
  orientation: 'horizontal',
  filters: filters
};
