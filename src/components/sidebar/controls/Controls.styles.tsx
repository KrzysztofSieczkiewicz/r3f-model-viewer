import styled from 'styled-components';
import { COLOR_CELTIC_BLUE, COLOR_DARK_GLASSS, COLOR_PLATINUM, COLOR_RESIN_BLACK, COLOR_RESIN_BRIGHT, COLOR_RESIN_BRIGHTER, SLIDER_RADIUS, TRANSITION_DURATION } from '../Sidebar.styles';

/*  ---------- GENERAL ---------- */
export const StyledAttributeContainer = styled.div`
    display: flex;
    width: 100%;
    height: 2rem;

    align-items: center;
`;
export const StyledAttributeName = styled.label`
    width: 5rem;
    margin: 0 0.75rem 0 0;
    padding: 0;

    font-size: 0.9rem;
    user-select: none;
`;
export const StyledResetDefaultButton = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.5rem;
    font-size: 1rem;
    border-radius: 50%;
    border: none;
    background-color: transparent;

    transition-duration: ${TRANSITION_DURATION};
    cursor: pointer;
    user-select: none;

    &.active {
        transform: rotate(90deg);
        background-color: ${COLOR_CELTIC_BLUE};
        color: ${COLOR_PLATINUM};
    }

    &:hover {
        background-color: ${COLOR_PLATINUM};
        color: ${COLOR_RESIN_BLACK};
    }
`;

/*  ------- COLOR PICKERS ------- */
interface StyledPickerPopupProps {
    ref: React.RefObject<HTMLDivElement>;
    style: React.CSSProperties;
  }
export const StyledPickerPopup = styled.div<StyledPickerPopupProps>`
    position: fixed;
`

export const StyledColorPreview = styled.div`
    height: 1.25em;
    width: 2.5em;
    border-radius: ${SLIDER_RADIUS};
`;

/*  ---- LIGHT TYPE DROPDOWN ---- */
export const SyledDDWrapper = styled.div`
    width: 7rem;
    height: 1.75rem;
    margin: 0 auto;

    vertical-align: middle;
`;
export const StyledDDButton = styled.button`
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 7rem;
    border: 1px solid ${COLOR_RESIN_BLACK};

    color: ${COLOR_PLATINUM};
    background-color: ${COLOR_RESIN_BRIGHTER};

    transition: border ${TRANSITION_DURATION};

    &.active {
        border: 1px solid ${COLOR_CELTIC_BLUE};
    }

    &:hover {
        border:  1px solid ${COLOR_PLATINUM};
    }
`;
export const StyledDDDisplayedName = styled.div`
    align-self: flex-start;
    margin: auto 0;
    text-align: start;

    user-select: none;
`;
export const StyledDDArrow = styled.span`
    align-self: flex-end;
    margin: auto 0;

    user-select: none;
`;
export const StyledDDList = styled.div`
    box-sizing: border-box;
    position: fixed;

    width: 7rem;
    border: 1px solid ${COLOR_DARK_GLASSS};
    background-color: none;
    z-index: 1;
`;
export const StyledDDListItem = styled.button`
    width: 100%;
    height: 1.75rem;
    margin: 0;
    text-align: start;

    color: var(--color-grey);
    border: none;
    background-color: ${COLOR_RESIN_BRIGHT};

    user-select: none;
    transition: filter ${TRANSITION_DURATION};

    &:hover{
        filter: brightness(1.75);
        color: ${COLOR_PLATINUM};
    }
`;

/*  ---------- SLIDERS ---------- */