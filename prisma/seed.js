const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedUsers() {
  try {
    const users = [
      {
        first_name: "Joko",
        last_name: "Widodo",
        username: "Jokwid",
        email: "jokwid@example.com",
        password: "password098",
        user_address: "Jalan Bahagia",
        user_role: "Admin",
      },
      {
        first_name: "Kaesang",
        last_name: "Pangarep",
        username: "Sangpisang",
        email: "Kapang@example.com",
        password: "password189",
        user_address: "Jalan Tidak Bahagia",
        user_role: "User",
      },
    ];

    for (const user of users) {
      await prisma.user.create({
        data: user,
      });
    }

    console.log("Seeding User berhasil!");
  } catch (error) {
    console.error("Gagal seeding User:", error);
  }
}

async function seedProducts() {
  try {
    const products = [
      {
        product_code: 1001,
        product_name: "Mesin Cuci",
        category_id: 1,
        product_stock: 10,
        warehouse_id: 8,
        product_image: "Mesin Cuci",
        product_status: "Available",
        arrival_at: new Date("2023-11-22T08:30:00Z"),
      },
      {
        product_code: 1002,
        product_name: "Baju Metal",
        category_id: 2,
        product_stock: 20,
        warehouse_id: 9,
        product_image: "Baju Metal",
        product_status: "Available",
        arrival_at: new Date("2023-11-22T08:30:00Z"),
      },
    ];

    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
    }

    console.log("Seeding Product berhasil!");
  } catch (error) {
    console.error("Gagal seeding Product:", error);
  }
}

async function seedWarehouses() {
  try {
    const warehouses = [
      {
        warehouse_name: "Warehouse A",
        location: "Location A",
        warehouse_category_id: 1,
      },
      {
        warehouse_name: "Warehouse B",
        location: "Location B",
        warehouse_category_id: 2,
      },
    ];

    for (const warehouse of warehouses) {
      await prisma.warehouse.create({
        data: warehouse,
      });
    }

    console.log("Seeding Warehouse berhasil!");
  } catch (error) {
    console.error("Gagal seeding Warehouse:", error);
  }
}

async function seedCategories() {
  try {
    // Seed Product Categories
    const productCategories = [
      {
        category_name: "Electronics",
        description: "Products related to electronics.",
      },
      {
        category_name: "Clothing",
        description: "Clothing products.",
      },
    ];

    await prisma.product_category.createMany({
      data: productCategories,
    });

    // Seed Warehouse Categories
    const warehouseCategories = [
      {
        category_name: "Warehouse Type A",
        description: "Description for Warehouse Type A.",
      },
      {
        category_name: "Warehouse Type B",
        description: "Description for Warehouse Type B.",
      },
    ];

    await prisma.warehouse_category.createMany({
      data: warehouseCategories,
    });

    console.log("Seeding categories successful.");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers();
seedProducts();
seedWarehouses();
seedCategories();
