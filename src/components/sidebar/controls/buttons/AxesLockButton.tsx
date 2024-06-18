import React from 'react';
import styles from './ToggleButtons.module.css';
import { ReactComponent as LockedIcon } from './../../../../icons/sidebar/lock_locked.svg';
import { ReactComponent as UnlockedIcon } from './../../../../icons/sidebar/lock_unlocked.svg';

type Props = {
    locked: boolean,
    setLocked: (value: boolean) => void
}
export const AxesLockButton = ( {locked, setLocked}: Props) => {

    const handleIcon = () => {
        if (locked) return <LockedIcon className={styles.icon} />
        return <UnlockedIcon className={styles.icon} />
    }

    return (
        <button 
            className={locked ? `${styles.button} ${styles.enabled}` : styles.button}
            onClick={() => setLocked(!locked)} >
            {handleIcon()}
        </button>
    );
}