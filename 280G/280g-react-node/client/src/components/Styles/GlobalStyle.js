import { createGlobalStyle } from 'styled-components';

import { color } from './theme';

const GlobalStyle = createGlobalStyle`
  
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: ${color.lightGold};
    color: ${color.darkGreen};
    font-family: Verdana, Helvetica, Arial, sans-serif;
    line-height: 1.6
  }

`

export default GlobalStyle;