import { state } from "../state";

function initFormChatComp() {
  class FormChat extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    addListerner() {
      const form = this.querySelector(".formContainer");
      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const target = e.target as any;

        const emailField = form.querySelector('x-textfield-el[name="mensaje"]');

        const mensaje = emailField?.querySelector(".field")?.value;

        form.reset();
        state.pushMensaje(mensaje);
      });
    }
    render() {
      const container = document.createElement("div");
      const style = document.createElement("style");
      container.innerHTML = `
            <form class="formContainer">
            <x-textfield-el class="form__input" name="mensaje"> </x-textfield-el>
            <button is="boton-el" texto="Enviar"></button>
            </form>
            `;
      style.innerText = `
            *{
              box-sizing: border-box;
            }
            .formContainer{
              display: grid;
              gap: 5px;
              
            }
            .form__input{
              
            }
            `;
      this.appendChild(container);
      this.appendChild(style);
      this.addListerner();
    }
  }
  customElements.define("x-formchat-el", FormChat);
}

export { initFormChatComp };
