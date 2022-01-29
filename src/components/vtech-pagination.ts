import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  span {
    text-decoration: none;
    font-weight: 600;
  }
`;

@customElement('vtech-pagination')
class PaginationElement extends LitElement {
  static styles = styles;

  @property({type: Number, reflect: true})
  page: number = 1;

  @property({type: Number, reflect: true})
  pageCount: number = 1;

  protected forwardClicked() {
    this.page += 1;

    // Use event dispatching to alert other components of page changes
    this.notifyListeners();
  }

  protected backClicked() {
    this.page -= 1;

    // Use event dispatching to alert other components of page changes
    this.notifyListeners();
  }

  private notifyListeners() {
    // TODO: Make event detal type...
    const detail = {
      id: this.id,
      page: this.page,
      pageCount: this.pageCount
    };

    const event = new CustomEvent(
      'vtech-pagination-changed',
      {
        composed: true,
        detail: detail
      }
    );
    this.dispatchEvent(event);
  }

  protected update(changedProperties: Map<string | number | symbol, unknown>): void {
    // Make sure the current page isn't "before" the first page
    if (this.page <= 0) {
      this.page = 1;
    }
    // Make sure the current page isn't "past" the last page
    if (this.page > this.pageCount) {
      this.page = this.pageCount;
    }

    super.update(changedProperties);
  }

  render() {
    if (this.page === 0 || this.pageCount === 0) {  
      return html``;
    }

    // Don't allow going back when on the first page
    const backButtonHtml = this.page > 1 
      ? html`<sl-icon-button name="arrow-left" @click=${this.backClicked}></sl-icon-button>
    ` : html`<sl-icon-button name="arrow-left" disabled=""></sl-icon-button>`;

    // Don't allow going forward when on the last page
    const forwardButtonHtml = this.page < this.pageCount 
      ? html`<sl-icon-button name="arrow-right" @click=${this.forwardClicked}></sl-icon-button>`
      : html`<sl-icon-button name="arrow-right" disabled=""></sl-icon-button>`;
    
    return html`<div>
      ${backButtonHtml}
      Page <span>${this.page}</span> of ${this.pageCount}
      ${forwardButtonHtml}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vtech-pagination': PaginationElement;
  }
}