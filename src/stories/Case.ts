import { html } from 'lit-html';

import '../components/guitar-case';
import { FilterType } from '../types/FilterType';

export interface CaseProps {
  filters: FilterType[];
}

export const Case = ({filters}) => html`
  <guitar-case .filters="${filters}"></guitar-case>
`;