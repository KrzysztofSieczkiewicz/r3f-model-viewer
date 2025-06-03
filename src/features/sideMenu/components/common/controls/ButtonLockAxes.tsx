import React from 'react';
import styles from './ButtonLockAxes.module.css';
import { ReactComponent as LockedIcon } from './../../../../../icons/sidebar/lock_locked.svg';
import { ReactComponent as UnlockedIcon } from './../../../../../icons/sidebar/lock_unlocked.svg';

type Props = {
    locked: boolean,
    setLocked: (value: boolean) => void
}

export const ButtonLockAxes = ( {locked, setLocked}: Props) => {

    const handleIcon = () => {
        if (locked) return <LockedIcon className={styles.icon} />
        return <UnlockedIcon className={styles.icon} />
    }

    return (
        <button 
            className={`${styles.button} ${locked ? styles.enabled : ''}`}
            onClick={() => setLocked(!locked)} >
            {handleIcon()}
        </button>
    );
}