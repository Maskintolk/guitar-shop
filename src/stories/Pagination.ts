import { html } from 'lit-html';

import '../components/guitar-pagination';

export interface PaginationProps {
  page: number;
  pageCount: number
}

export const Pagination = ({page, pageCount}) => html`
  <guitar-pagination page="${page}" pagecount="${pageCount}"></guitar-pagination>
`;