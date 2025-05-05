import fs from 'fs-extra';
import path from 'path';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getHotelss = async () => {
  return await prisma.hotel.findMany({
     include: { rooms: true },
  });
};

export const getHotels = async (location) => {
  return await prisma.hotel.findMany({
    where: { location },
     include: { rooms: true },
  });
};

export const getHotel = async (id) => {
  return await prisma.hotel.findUnique({
    where: { id },
     include: { rooms: true },
  });
};

export const addHotel = async (newHotel) => {
  const { rooms, ...hotelData } = newHotel;

  return await prisma.hotel.create({
    data: {
      ...hotelData,
      rooms: {
        connectOrCreate: rooms.map((room) => ({
          where: { id: room.id },
          create: room
        }))
      }
    }
  });
};

export const deleteHotel = async (id) => {
  return await prisma.hotel.delete({
    where: { id }
  });
};

export const updateRoomStatus = async (roomId, status) => {
  return await prisma.room.update({
    where: { id: roomId },
    data: { available: status }
  });
};
