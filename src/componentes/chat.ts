import { state } from "../state";
type Mensaje = { mensaje: string; from: string; userId: string };
function initChatComp() {
  class ChatComp extends HTMLElement {
    mensajes: Mensaje[] = [];
    nombre: string;

    connectedCallback() {
      this.syncInfo();
      this.render();

      state.suscribe(() => {
        this.syncInfo();
        this.showMessages();
      });
    }
    syncInfo() {
      const cs = state.getState();
      this.mensajes = cs.mensajes;
      this.nombre = cs.userId;
    }
    showMessages() {
      const template: any = this.querySelector(".template");

      const container: any = this.querySelector(".chat__seccion");
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      for (const mensaje of this.mensajes) {
        const nombre = template.content.querySelector(".template__nombre");
        const box = template.content.querySelector(".mensaje__container");

        if (this.nombre != mensaje.userId) {
          nombre.textContent = mensaje.from;
          box.children[0].textContent = mensaje.mensaje;
        } else {
          nombre.textContent = "";
          box.children[0].textContent = mensaje.mensaje;
        }
        const clon = document.importNode(template.content, true);
        if (this.nombre == mensaje.userId) {
          clon
            .querySelector(".mensaje__container")
            .classList.add("mensajepropio");

          clon.querySelector(".template__card").classList.add("mensajepropio");
        }
        container?.appendChild(clon);
        container.scrollTop = container.scrollHeight;
        container.scroll;
      }
    }
    render() {
      const container = document.createElement("div");
      container.innerHTML = `
      
     
      <div class="seccion__chat"> 
      
      <template class="template">
        <div class="template__card">
            <x-text-el class="template__nombre" tipo="name"></x-text-el>

            <div class="mensaje__container">           
            <x-text-el class="template__mensaje" tipo="chatText"></x-text-el>
            </div>        
        </div>
      </template>
      <div class ="chat__seccion"></div>
      
      </div>
      

      `;
      this.appendChild(container);
      this.showMessages();
    }
  }
  customElements.define("x-chatcomp-el", ChatComp);
}

export { initChatComp };
