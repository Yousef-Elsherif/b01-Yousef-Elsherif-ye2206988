'use server';
import { getHotel } from '../hotelRepo';

export async function getHotelById(id) {
  return await getHotel(id);
}
