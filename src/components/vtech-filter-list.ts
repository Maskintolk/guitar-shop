import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js';
import { classMap } from 'lit/directives/class-map.js';
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
  sl-checkbox {
    padding: 5px 0;
  }
  sl-checkbox::part(label) {
    font-weight: var(--selected-font, normal);
  }
  .selected {
    --selected-font: 600;
  }
`;

@customElement('vtech-filter-list')
class FilterListElement extends LitElement {
  static styles = styles;

  @property({type: Array})
  filters: FilterType[] = [];

  @property({type: String, reflect: true})
  orientation: 'vertical' | 'horizontal' = 'vertical';

  protected filterClicked(e: Event) {
    if (e.target) {
      const filter = this.filters.find(filter => filter.name === e.target.id);
      if (filter) {
        filter.isActive = e.target.checked;
        this.notifyListeners();
      }    
    }
  }

  private notifyListeners() {
    const event = new CustomEvent(
      'vtech-filtering-changed',
      {
        composed: true,
        detail: {
          id: this.id,
          filters: this.filters,
        }
      }
    );
    this.dispatchEvent(event);
  }

  protected update(changedProperties: Map<string | number | symbol, unknown>): void {
    if (this.filters === null || this.filters === undefined || !Array.isArray(this.filters)) {
      this.filters = [];
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      ${map(this.filters, (filter) => html`
        <sl-tooltip content="Add or remove filter">
          <sl-checkbox class=${classMap({ selected: filter.isActive })}
            @sl-change="${this.filterClicked}"
            id="${filter.name}"
            ?checked=${filter.isActive}>
            ${filter.name} (${filter.count})
          </sl-checkbox>
        </sl-tooltip>
      `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vtech-filter-list': FilterListElement;
  }
}