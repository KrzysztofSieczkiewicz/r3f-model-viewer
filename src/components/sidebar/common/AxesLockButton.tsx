import React from 'react';
import styles from './AxisLockButton.module.css';
import { ReactComponent as LockLocked } from './../../../icons/sidebar/lock_locked.svg';
import { ReactComponent as LockUnlocked } from './../../../icons/sidebar/lock_unlocked.svg';

type Props = {
    locked: boolean,
    setLocked: (value: boolean) => void
}
export const AxesLockButton = ( {locked, setLocked}: Props) => {

    const handleIcon = () => {
        if (locked) return <LockLocked className={styles.icon} />
        return <LockUnlocked className={styles.icon} />
    }

    return (
        <button 
            className={locked ? `${styles.button} ${styles.enabled}` : styles.button}
            onClick={() => setLocked(!locked)} >
            {handleIcon()}
        </button>
    );
}