import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js';
import { customElement, property } from 'lit/decorators.js';

import { FilterType } from '../types/FilterType';

const styles = css`
  :host {
    display: flex;
  }
  :host([orientation="horizontal"]) {
    flex-direction: row;
  }
  :host([orientation="vertical"]) {
    flex-direction: column;
  }
  sl-tooltip {
    display: flex;
    align-content: center;
    flex-direction: row;
    align-items: center;
    border: 1px solid #888;
    padding: 2px 10px 0 0;
    border-radius: 15px;
    margin: 0 5px;
  }
  div {
    padding-top: 10px;
  }
`;

@customElement('vtech-filter-summary')
class FilterSummaryElement extends LitElement {
  static styles = styles;

  @property({type: Array})
  filters: FilterType[] = [];

  @property({type: String, reflect: true})
  orientation: 'vertical' | 'horizontal' = 'horizontal';

  protected summaryClicked(filter: FilterType) {
    filter.isActive = false;

    // Use event dispatching to alert other components of changes
    this.notifyListeners();
  }

  private notifyListeners() {
    const event = new CustomEvent(
      'vtech-filtering-changed',
      {
        detail: {
          id: this.id,
          filters: this.filters,
        }
      }
    );
    document.dispatchEvent(event);
  }

  protected update(changedProperties: Map<string | number | symbol, unknown>): void {
    if (this.filters === null || this.filters === undefined || !Array.isArray(this.filters)) {
      this.filters = [];
    }
    super.update(changedProperties);
  }

  render() {
    const activeFilters = this.filters.filter((filter) => filter.isActive);

    if (activeFilters.length === 0) {
      return html`<div>No active filters</div>`;
    }

    return html`
      ${map(activeFilters, (filter) => html`
        <sl-tooltip content="Remove filter">
          <sl-icon-button name="x-circle" @click=${() => this.summaryClicked(filter)}></sl-icon-button>${filter.name}
        </sl-tooltip>
      `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vtech-filter-summary': FilterSummaryElement;
  }
}