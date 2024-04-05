function initHeaderComp() {
  class HeaderComp extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      var shadow = this.attachShadow({ mode: "open" });

      const header = document.createElement("header");
      header.classList.add("header");
      const style = document.createElement("style");
      style.innerText = `
      .header{

          height: 60px;
         background-color: #FF8282;
      }
      
      `;

      shadow.appendChild(style);
      shadow.appendChild(header);
    }
  }

  customElements.define("x-header-el", HeaderComp);
}

export { initHeaderComp };
