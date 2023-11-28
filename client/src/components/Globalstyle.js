import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body { 
    overflow-y: hidden;
    height: 100vh;
    background-color: #080708;
}

::-webkit-scrollbar {
  width: 0.4rem;
  height: 1rem;

}
::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
  /* border-color: rgba(255,255,255);
  border-width: 1px; */
}

::-webkit-scrollbar-thumb:hover {
  border-radius: 1rem;
    background-color: rgba(217,217,227,.9);

}


`;

export default GlobalStyle;
