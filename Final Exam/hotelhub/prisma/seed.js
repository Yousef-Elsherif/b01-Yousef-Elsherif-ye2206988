import { PrismaClient } from "@prisma/client";
import fs from "fs-extra";
import path from "path";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding Started...");

  const hotels = await fs.readJSON(path.join(process.cwd(), 'app/data/hotels.json'));
  const rooms = await fs.readJSON(path.join(process.cwd(), 'app/data/rooms.json'));

  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();

  for (const hotel of hotels) {
    const { id, ...hotelData } = hotel;
    const createdHotel = await prisma.hotel.create({ data: hotelData });

    const relatedRooms = rooms.filter(r => r.hotelId === id); 
    for (const room of relatedRooms) {
      const { id: roomId, ...roomData } = room;
      await prisma.room.create({
        data: {
          ...roomData,
          hotelId: createdHotel.id 
        },
      });
    }
  }

  await prisma.$disconnect();
  console.log("Seeding Completed!");
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
