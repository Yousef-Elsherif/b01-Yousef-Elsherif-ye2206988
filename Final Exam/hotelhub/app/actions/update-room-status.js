'use server';
import { updateRoomStatus } from '../hotelRepo';

export async function toggleRoomAvailability(roomId, status) {
  return await updateRoomStatus(roomId, status);
}
