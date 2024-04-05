type TypeText = "title" | "middle" | "chatText" | "name";

function initTextComp() {
  class TextComp extends HTMLElement {
    tipo: TypeText;
    text;
    connectedCallback() {
      this.render();
    }

    render() {
      this.text = this.textContent;

      this.tipo = this.getAttribute("tipo");

      var shadow = this.attachShadow({ mode: "open" });

      const span = document.createElement("span");
      const style = document.createElement("style");

      span.innerHTML = `<span>${this.text}</span>`;
      span.classList.add(this.tipo);
      style.innerText = `
      
      *{
        font-family: "Roboto", sans-serif;
        font-style: normal;
        
      }

      .title{
        font-weight: 700;
        font-size: 52px ;
        display: block;
      }

      .middle{
        font-weight: 500;
        font-size: 24px ;
        display: block;
      }

      .chatText{
        font-weight: 400;
        font-size: 18px;
        display: block;
      }
      .name{
        font-weight: 400;
        font-size: 14px;
        display: block;
      }

      `;
      shadow.appendChild(span);
      shadow.appendChild(style);
    }
  }
  customElements.define("x-text-el", TextComp);
}

export { initTextComp };
