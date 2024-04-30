import React from 'react';
import { ReactComponent as LockLocked } from './../../../icons/sidebar/lock_locked.svg';
import { ReactComponent as LockUnlocked } from './../../../icons/sidebar/lock_unlocked.svg';

type Props = {
    locked: boolean,
    setLocked: (value: boolean) => void
}
export const AxisLockButton = ( {locked, setLocked}: Props) => {

    const handleIcon = () => {
        if (locked) return <LockLocked />
        return <LockUnlocked />
    }

    return (
        <button onClick={() => setLocked(!locked)}>
            {handleIcon()}
        </button>
    );
}