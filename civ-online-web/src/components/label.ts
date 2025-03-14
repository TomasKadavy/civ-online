export class CivLabel extends HTMLElement {
    
    private _text = 'Label';
    private _value = 'Value';

    set value(value: string) {
        this._value = value;
        this.render();
    }
    get value(): string {
        return this._value;
    }

    set text(value: string) {
        this._text = value;
        this.render();
    }
    get text(): string {
        return this._text;
    }

    static get observedAttributes() {
        return ['text', 'value'];
    }

    constructor() {
      super();
      this.render();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'text') {
            this.text = newValue;
        }
        if (name === 'value') {
            this.value = newValue;
        }
        this.render();
    }

    private render() {
        this.innerHTML = `
            <label>
                ${this.text}: ${this.value}
            </label>
            <slot></slot>
        `;
    }
}