// Character Limit Property Editor — Umbraco 13 (Lit-based)
// Registered via umbraco-package.json, no build step required.

import {
  UmbLitElement,
} from "@umbraco-cms/backoffice/lit-element";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { html, css, customElement, property, state } from "@umbraco-cms/backoffice/external/lit";
import { UUIFormControlMixin } from "@umbraco-cms/backoffice/external/uui";

const elementName = "my-char-limit-editor";

class CharLimitEditor extends UUIFormControlMixin(UmbLitElement, "") {
  // ─── Properties injected by Umbraco ────────────────────────────────────────

  /** The current stored value */
  @property({ type: String })
  value = "";

  /** Data Type configuration — maxChars set in back-office */
  @property({ type: Object, attribute: false })
  config = {};

  // ─── Internal state ─────────────────────────────────────────────────────────

  @state()
  _remaining = null;

  // ─── Computed helpers ────────────────────────────────────────────────────────

  get _maxChars() {
    // config comes from the Data Type "settings" declared in umbraco-package.json
    const raw = this.config?.maxChars ?? this.config?.["maxChars"];
    const parsed = parseInt(raw, 10);
    return isNaN(parsed) || parsed <= 0 ? 100 : parsed;
  }

  get _currentLength() {
    return (this.value ?? "").length;
  }

  get _isOverLimit() {
    return this._currentLength > this._maxChars;
  }

  // ─── Events ──────────────────────────────────────────────────────────────────

  #onInput(e) {
    const newValue = e.target.value ?? "";
    this.value = newValue;
    // Tell Umbraco the value changed
    this.dispatchEvent(new UmbPropertyValueChangeEvent());
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._updateRemaining();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("value") || changedProps.has("config")) {
      this._updateRemaining();
    }
  }

  _updateRemaining() {
    this._remaining = this._maxChars - this._currentLength;
  }

  // ─── Required by UUIFormControlMixin ─────────────────────────────────────────

  getFormElement() {
    return this.shadowRoot?.querySelector("uui-input");
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  render() {
    const remaining = this._maxChars - this._currentLength;
    const isOver = this._isOverLimit;

    return html`
      <div class="char-limit-editor">
        <uui-input
          id="char-limit-input"
          type="text"
          .value=${this.value ?? ""}
          maxlength=${this._maxChars}
          @input=${this.#onInput}
          aria-describedby="char-count"
          ?invalid=${isOver}
        ></uui-input>

        <div
          id="char-count"
          class="char-counter ${isOver ? "char-counter--over" : remaining <= Math.ceil(this._maxChars * 0.1) ? "char-counter--warning" : ""}"
          aria-live="polite"
        >
          ${isOver
            ? html`<span>${Math.abs(remaining)} characters over limit</span>`
            : html`<span>${remaining} / ${this._maxChars} characters remaining</span>`}
        </div>
      </div>
    `;
  }

  // ─── Styles ──────────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
    }

    .char-limit-editor {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    uui-input {
      width: 100%;
    }

    .char-counter {
      font-size: 0.75rem;
      color: var(--uui-color-text-alt, #6b7280);
      text-align: right;
      transition: color 0.15s ease;
    }

    .char-counter--warning {
      color: var(--uui-color-warning-standalone, #d97706);
      font-weight: 500;
    }

    .char-counter--over {
      color: var(--uui-color-danger-standalone, #ef4444);
      font-weight: 600;
    }
  `;
}

customElements.define(elementName, CharLimitEditor);
