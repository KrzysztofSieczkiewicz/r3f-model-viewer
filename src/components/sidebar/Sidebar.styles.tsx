import styled from 'styled-components';

/*  --------- VARIABLES --------- */
export const COLOR_RESIN_BLACK = '#212226';
export const COLOR_RESIN_BRIGHT = '#2a2b30';
export const COLOR_RESIN_BRIGHTER = '#35363a';
export const COLOR_DARK_GLASSS = '#1c1d22b0'

export const COLOR_PLATINUM = '#e7e0e0';
export const COLOR_GREY_DARK = '#454a4e';
export const COLOR_GREY = '#bfb9b9';

export const COLOR_SEA_GREEN = '#018E42';
export const COLOR_CELTIC_BLUE = '#276FBF';
export const COLOR_IMPERIAL_RED = '#F03A47';

export const NAV_SIZE = '3.5rem';
export const INPUT_HEUGHT = '1.5rem';
export const SLIDER_RADIUS = '0.25rem';

export const TRANSITION_DURATION = '300ms';



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

export const StyledSidebarItem = styled.li`
    width: calc(${NAV_SIZE} * 1);
    height: calc(${NAV_SIZE} * 1);
    margin: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledIconButton = styled.a`
    --button-size: calc(${NAV_SIZE} *  0.75);
    width: var(--button-size);
    height: var(--button-size);
    padding:  0;
    margin:  0.1rem;
    border-radius:  50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    text-decoration: none;

    transition: background-color ${TRANSITION_DURATION};

    &:hover {
    background-color: ${COLOR_PLATINUM};
    }

    &.active {
    background-color: ${COLOR_CELTIC_BLUE};
    }
`;

export const StyledSidebarMenuIcon = styled.svg`
    fill: ${COLOR_PLATINUM};
    width: 1.5rem;
    height: 1.5rem;
    transition: fill ${TRANSITION_DURATION};

  &:hover {
    fill: ${COLOR_RESIN_BLACK};
  }

  &:active {
    fill: ${COLOR_PLATINUM};
  }
`;


/*  ---------- DROPDOWNS ---------- */
export const StyledDropdown = styled.div`
    position: absolute;
    left: 3.5rem;
    transform: translateY(50%);
    overflow: visible;

    width: 300px;
    padding: 0 0.4rem;

    background-color: ${COLOR_DARK_GLASSS};
`;
export const StyledDropdownSection = styled.section`
    background-color: ${COLOR_RESIN_BRIGHTER};
    border: 1px solid black;

    margin: 0.5rem 0;
    transition: border ${TRANSITION_DURATION};

    &.active {
        border: 0.5px solid ${COLOR_CELTIC_BLUE};
    }
`;

// TODO: RENAME THIS AND THE REST OF 'DROPDOWNs' TO SUBMENU?
export const StyledDropdownSectionHeader = styled.h3`
    box-sizing: border-box;
    display: inline-grid;
    align-items: center;
    gap: 0.25rem;

    width: 100%;
    height: 2.5rem;
    padding: 0.25rem 0.5rem;

    background-color: ${COLOR_RESIN_BRIGHT};
`;


/*  ------ ICONS AND BUTTONS ------ */
export const StyledShowHideButton = styled.span`
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    margin: 0 auto;
    height: 1.5rem;
    width: 1.5rem;

    font-size: 1.15rem;
    border-radius: 50%;

    color: ${COLOR_PLATINUM};
    user-select: none;
`;

export const StyledToggleVisibleButton = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    user-select: none;

    height: 1.5rem;
    width: 1.5rem;
    line-height: 1.5rem;
    margin: auto;

    border-radius: 50%;
    color: ${COLOR_PLATINUM};
    background-color: ${COLOR_CELTIC_BLUE};
    border: 1px solid ${COLOR_RESIN_BLACK};

    transition: color ${TRANSITION_DURATION};
    background-color: ${TRANSITION_DURATION};

    ${StyledDropdownSectionHeader} &:hover,
    ${StyledDropdownSectionHeader} &.suppressed:hover {
        color: ${COLOR_RESIN_BLACK};
        background-color: ${COLOR_PLATINUM};
    }

    ${StyledDropdownSectionHeader} &.suppressed {
        color: ${COLOR_GREY_DARK};
        background-color: ${COLOR_RESIN_BRIGHT};
        border: 1px solid ${COLOR_GREY_DARK};
    }
`;