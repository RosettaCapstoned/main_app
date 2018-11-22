import { AnyAction } from 'redux';
import { Room } from '../Definitions';
export interface RoomState {
    [key: string]: Room;
}
export default function (state: RoomState | undefined, action: AnyAction): RoomState;
