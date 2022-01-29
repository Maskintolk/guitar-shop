import { html } from 'lit-html';

import '../components/guitar-filter-summary';
import '../components/guitar-filter-list';

import { FilterType } from '../types/FilterType';

export interface FilterProps {
  filters: FilterType[];
  orientation?: 'horizontal' | 'vertical';
}

export const FilterSummary = ({filters}) => html`
  <guitar-filter-summary .filters="${filters}"></guitar-filter-summary>
`;

export const FilterList = ({filters, orientation}) => html`
  <guitar-filter-list orientation="${orientation}" .filters="${filters}"></guitar-filter-list>
`;

