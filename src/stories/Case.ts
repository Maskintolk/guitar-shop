import { html } from 'lit-html';

import '../components/vtech-case';
import { FilterType } from '../types/FilterType';

export interface CaseProps {
  filters: FilterType[];
}

export const Case = ({filters}) => html`
  <vtech-case .filters="${filters}"></vtech-case>
`;