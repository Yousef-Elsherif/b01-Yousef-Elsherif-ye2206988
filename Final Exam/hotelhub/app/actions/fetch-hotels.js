'use server';
import { getHotelss } from '../hotelRepo';

export async function fetchHotels() {
  const data = await getHotelss();
  return data;
}
