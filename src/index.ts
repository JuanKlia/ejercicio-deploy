import { initTextComp } from "./componentes/text";
import { initHeaderComp } from "./componentes/header";
import { initTextieldComp } from "./componentes/textfiled";
import { initHomePage } from "./pages/homePage";
import { initButtonComp } from "./componentes/boton";
import { initFormComp } from "./componentes/form";
import { initChatPage } from "./pages/chatpage";
import { initChatComp } from "./componentes/chat";
import { initFormChatComp } from "./componentes/formchat";
import "./router";
import { state } from "./state";
import { Router } from "@vaadin/router";

function initComps() {
  initButtonComp();
  initTextComp();
  initHeaderComp();
  initTextieldComp();
  initHomePage();
  initFormComp();
  initChatComp();
  initChatPage();
  initFormChatComp();
}
(function () {
  initComps();
  
  /*
  //state.initState();
  // const cs = state.getState();

  //if (cs.rtdbId && cs.userId) {
  // Router.go("/chat");
  //  } else{autenticarse}

  state.setEmailAndName("juankliabaras@gmail.com", "Juan");
  state.signIn((err) => {
    if (err) {
      console.error("hubo un error en el sigIn");
    } else {
      state.asknewRoom(() => {
        state.accessToRoom();
      });
    }
  }); //Si tiene email trae el userId. Esta funcion es async
  */
})();
