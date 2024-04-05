function initTextieldComp() {
  class TextFieldComp extends HTMLElement {
    label;
    placeholder;
    connectedCallback() {
      this.render();
    }

    verificarLabel() {
      if (this.hasAttribute("label")) {
        this.label = this.getAttribute("label");
      } else {
        this.label = false;
      }
    }

    render() {
      this.verificarLabel();

      const style = document.createElement("style");
      this.innerHTML = `
      
      <label for="field"> <x-text-el tipo="middle" class="textField">${
        this.label
      }</x-text-el> </label>
      <input type="text" name="${this.getAttribute(
        "name"
      )}" class="field" id="field">
      
      `;

      style.innerText = `
      *{
        box-sizing: border-box;
    
    }
      .field{
          height: 55px;
          border: solid 3px;
          padding: 8px;
          font-size:24px;
          font-family: "Roboto", sans-serif;
          font-style: normal;
          width: 100%;
        }
        
        .ocultar{
            display:none;
        }
        
        `;
      this.appendChild(style);
      if (this.label == false) {
        this.querySelector(".textField")?.classList.add("ocultar");
      }

      if (this.hasAttribute("placeholder")) {
        this.placeholder = this.getAttribute("placeholder");
        this.querySelector(".field")?.setAttribute(
          "placeholder",
          this.placeholder
        );
      }
    }
  }
  customElements.define("x-textfield-el", TextFieldComp);
}

export { initTextieldComp };
