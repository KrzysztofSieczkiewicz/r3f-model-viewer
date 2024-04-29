import React from 'react';
import { ReactComponent as LockLocked } from './../../../icons/sidebar/lock_locked.svg';
import { ReactComponent as LockUnlocked } from './../../../icons/sidebar/lock_unlocked.svg';

export const AxisLockButton = () => {

    const handleIcon = () => {
        return <LockUnlocked />
    }

    return (
        <button>
            {handleIcon()}
        </button>
    );
}