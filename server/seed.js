const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: "john_doe",
      password: "hashed_password1", // Remember to actually hash passwords in real scenarios
      email: "john.doe@example.com",
      investments: {
        create: [
          {
            assetName: "Apple",
            quantity: 5,
            purchaseDate: new Date("2020-01-01T10:00:00Z"),
            purchasePrice: 100.5,
          },
          {
            assetName: "Google",
            quantity: 2,
            purchaseDate: new Date("2021-05-15T10:00:00Z"),
            purchasePrice: 1200.5,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "jane_doe",
      password: "hashed_password2", // Remember to actually hash passwords in real scenarios
      email: "jane.doe@example.com",
      investments: {
        create: {
          assetName: "Microsoft",
          quantity: 10,
          purchaseDate: new Date("2019-08-10T10:00:00Z"),
          purchasePrice: 90.0,
        },
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
