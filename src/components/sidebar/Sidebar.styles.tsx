import styled from 'styled-components';

/*  --------- VARIABLES --------- */
const COLOR_RESIN_BLACK = '#212226';

const NAV_SIZE = '3.5rem';
/*
--color-resin-bright: #2a2b30;
--color-resin-brighter: #35363a;
--color-dark-glass: #1c1d22b0;

--color-platinum: #e7e0e0;
--color-grey-dark: #454a4e;
--color-grey: #bfb9b9;

--color-sea-green: #018E42;
--color-celtic-blue: #276FBF;
--color-imperial-red: #F03A47;

--input-height: 1.5rem;
--slider-radius: 0.25rem;

--transition-duration: 300ms;
*/

/*  ---------- SIDEBAR ---------- */
export const StyledSidebar = styled.nav`
    width: ${NAV_SIZE};
    height: 100%;
    padding-top: 3rem;
    background-color: ${COLOR_RESIN_BLACK};
    box-shadow: 0 10px 10px 5px black;

    position: absolute;
    top: 0;
    left: 0;
`;

export const StyledNavList = styled.ul`
    display: flex;
    flex-direction: column;
    max-height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    align-items: center;
    justify-content: flex-start;
`;