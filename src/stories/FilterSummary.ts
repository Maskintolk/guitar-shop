import { html } from 'lit-html';

import '../components/vtech-filter-summary';
import '../components/vtech-filter-list';

import { FilterType } from '../types/FilterType';

export interface FilterProps {
  filters: FilterType[];
  orientation?: 'horizontal' | 'vertical';
}

export const FilterSummary = ({filters}) => html`
  <vtech-filter-summary .filters="${filters}"></vtech-filter-summary>
`;

export const FilterList = ({filters, orientation}) => html`
  <vtech-filter-list orientation="${orientation}" .filters="${filters}"></vtech-filter-list>
`;

