import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }
  *:focus {
  outline: 0;
  outline: none;
  }
  html {
    height: 100%;
    width: 100%;
    font-size: 62.5%;
    box-sizing: border-box;
    --color-main: ${props => props.theme.colors.main}
    --color-mainDark: ${props => props.theme.colors.mainDark};
    --color-mainLight: ${props => props.theme.colors.mainLight};
    --color-text: ${props => props.theme.colors.textColor};
    --color-white: ${props => props.theme.colors.whiteColor};
    --color-errorRed: ${props => props.theme.colors.errorRed};
    --shadow: ${props => props.theme.colors.shadow};
    background-color: var(--color-mainLight);
    @media ${props => props.theme.mediaQueries.small} {
      font-size: 60%;
    }
    @media ${props => props.theme.mediaQueries.smallest} {
      font-size: 55%;
    }
  }
  body {
    font-family: 'Tahoma', sans-serif;
    font-weight: 400;
    line-height: 1.6;
  }
  a, button {
    cursor: pointer;
  }
  a, input, textarea, button {
    outline: none;
    text-decoration: none;
    font-family: inherit;
  }
`;