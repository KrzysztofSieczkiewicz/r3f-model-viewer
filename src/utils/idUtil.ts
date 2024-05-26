import { nanoid } from 'nanoid';

export function generateNewID() {
    return nanoid(7)
}