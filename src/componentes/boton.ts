function initButtonComp() {
  class ButtonComp extends HTMLButtonElement {
    connectedCallback() {
      this.render();
    }
    render() {
      const style = document.createElement("style");

      this.innerHTML = `<x-text-el tipo="middle">${this.getAttribute(
        "texto"
      )} </x-text-el>`;
      this.classList.add("boton-form");
      style.innerText = `
      *{
        box-sizing: border-box;
    
    }
             
             .boton-form{
                  
                  height: 55px;
                  width: 100%;
                  background-color: #9CBBE9;
                  border: none;
                  padding: 15px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-weight: 500;
              }
            `;
      this.appendChild(style);
    }
  }
  customElements.define("boton-el", ButtonComp, { extends: "button" });
}

export { initButtonComp };
