export class CivButton extends HTMLElement {
    
    private _text = 'Button';

    set text(value: string) {
        this._text = value;
        this.render();
    }
    get text(): string {
        return this._text;
    }

    static get observedAttributes() {
        return ['text'];
    }

    constructor() {
      super();
      this.render();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'text') {
            this.text = newValue;
        }
        this.render();
    }

    private render() {
        this.innerHTML = `
            <button>
                ${this.text}
            </button>
            <slot></slot>
        `;
    }

}