import { state } from "../state";


function initFormComp() {
  class FormComp extends HTMLElement {
    connectedCallback() {
      this.render();
      this.addListener();
    }

    addListener() {
      const form = this.shadowRoot?.querySelector(".form");

      const textfield: any = form?.children[3];
      textfield.classList.add("ocultar");

      const select = form?.children[2].children[1];
      const emailField = form?.children[0].children[1];
      const nombreField = form?.children[1].children[1];
      const idField = form?.children[3].children[1];
      const errorField = form?.children[4];

      select?.addEventListener("change", (e) => {
        var target = e.target as any;
        var seleccion = target.value;

        if (seleccion == "in") {
          textfield.classList.remove("ocultar");
        } else {
          textfield.classList.add("ocultar");
        }
      });

      form?.addEventListener("submit", (e) => {
        /***/
        e.preventDefault();
        const target = e.target as any;
        const email = target.email.value;
        const nombre = target.nombre.value;
        const select = target.select.value;
        const idRoom = target.room.value;

        state.setEmailAndName(email, nombre, () => {
          state.signIn((err?) => {
            if (err) {
              email
                ? emailField?.classList.remove("error")
                : emailField?.classList.add("error");
              nombre
                ? nombreField?.classList.remove("error")
                : nombreField?.classList.add("error");
            } else {
              if (select == "new") {
                //Nueva
                state.asknewRoom((err?) => {
                  err ? console.log("No hay userId") : state.accessToRoom();
                });
              } else {
                //Existente
                const idRoom = target.room.value.trim();
                if (idRoom) {
                  state.setRoomId(idRoom);
                  state.accessToRoom(() => {
                    console.log("No encontrado");
                    errorField?.classList.remove("ocultar");
                    errorField?.classList.add("form__error");
                    idField?.classList.add("error");
                    idField.value = "";
                  });
                } else {
                  idField?.classList.add("error");
                }
              }
            }
          });
        });

        /***/
      });
    }

    render() {
      var shadow = this.attachShadow({ mode: "open" });
      const container = document.createElement("div");
      const style = document.createElement("style");

      container.innerHTML = `
        
        <form class="form">
        <x-textfield-el name = "email" label = "email"> </x-textfield-el>
        <x-textfield-el name = "nombre" label = "nombre"> </x-textfield-el>
        <div class="">
            <label for="seleccion"> <x-text-el tipo="middle">room</x-text-el></label>
            <select class="form__seleccion" name="select" id="seleccion">
                <option value="new">Nuevo Room</option>
                <option value="in">Room Existente</option>
              
              </select>
        </div>
         <x-textfield-el  name="room" label = "room id" placeholder="Ej 1234" id="campoNuevo"> </x-textfield-el>
         <x-text-el class="ocultar" tipo="chatText">*ID INVALIDO</x-text-el>
         <button is="boton-el" texto="Comenzar"></button>
        </form>
        `;
      shadow.appendChild(container);

      style.innerText = `
        *{
          box-sizing: border-box;
      
      }
      .form{
        margin: 15px 0px;
        display: grid;
        gap: 25px;
        padding:10px;
     border :solid 0.5px;
        box-shadow: 0 10px 4px rgba(0,0,0,0.2), 0 4px 5px rgba(0,0,0,0.19);
        
    }
    .form button{
      margin: 20px 0px;
    }
    .form__error{
      display:block;
      color:red;
    }
    .form__seleccion{
        height: 55px;
        background-color: transparent;
        width: 100%;
        border: solid 3px;
        font-size:24px;
        font-family: "Roboto", sans-serif;
        font-style: normal;
        font-weight: 500;
    }
    .ocultar{
        display:none;
    }

    .error{
      border:solid red 2px;
    }
          
          `;
      shadow.appendChild(style);
    }
  }
  customElements.define("x-form-el", FormComp);
}

export { initFormComp };
