import { state } from "../state";

function initChatPage() {
  class ChatPage extends HTMLElement {
    roomID;
    connectedCallback() {
      this.syncData();
      this.render();
      state.suscribe(() => {
        this.syncData();
      });
    }
    syncData() {
      const cs = state.getState();
      this.roomID = cs.roomId;
    }
    render() {
      const container = document.createElement("div");
      container.classList.add("chat-page");
      container.innerHTML = `
          
          <x-header-el> </x-header-el>
          <div class="chat-page__section">
          
          <x-text-el class="chat-page__section-title" tipo="title"> Chat </x-text-el>

          <x-text-el tipo="middle"> room id: ${this.roomID} </x-text-el>
          <x-chatcomp-el class="chat-page__section-chat"></x-chatcomp-el>
          <x-formchat-el></x-formchat-el>
          
          

          </div>
         
          
          `;
      this.appendChild(container);
    }
  }
  customElements.define("x-chatpage-el", ChatPage);
}

export { initChatPage };
