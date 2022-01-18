import { html } from 'lit-html';

import '../components/vtech-pagination';

export interface PaginationProps {
  page: number;
  pageCount: number
}

export const Pagination = ({page, pageCount}) => html`
  <vtech-pagination page="${page}" pagecount="${pageCount}"></vtech-pagination>
`;