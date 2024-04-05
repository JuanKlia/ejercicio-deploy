function initHomePage() {
  class HomePage extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    render() {
      const container = document.createElement("div");
      container.classList.add("home-page")

      container.innerHTML = `
          
          <x-header-el> </x-header-el>
          <div class="home-page__container">
          
          <x-text-el tipo="title"> Bienvenidos </x-text-el>
          <x-form-el></x-form-el>
          
          </div>
          
          `;
      this.appendChild(container);
    }
  }
  customElements.define("x-homepage-el", HomePage);
}

export { initHomePage };
