import React from "react"
import styles from "./ButtonBackRound.module.css"

import { ReactComponent as IconButtonBack } from '../../../icons/buttons/backButtonRound.svg';

type Props = {
    onClick: () => void
}

export const ButtonBackRound = ({onClick}: Props) => {

    return (
        <IconButtonBack 
            onClick={onClick}
            className={styles.button}
        />
    )
}