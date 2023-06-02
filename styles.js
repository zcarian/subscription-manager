import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    /* padding-bottom: 56px // height of the bottom nav */
    /* margin-bottom: 40px; */
  }
`;
