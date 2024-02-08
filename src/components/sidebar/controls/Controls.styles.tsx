import styled from 'styled-components';
import { COLOR_CELTIC_BLUE, COLOR_PLATINUM, COLOR_RESIN_BLACK, COLOR_RESIN_BRIGHTER, SLIDER_RADIUS, TRANSITION_DURATION } from '../Sidebar.styles';

/*  ---------- GENERAL ---------- */
export const StyledAttributeContained = styled.div`
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