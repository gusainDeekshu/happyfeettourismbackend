// seeder.js
require('dotenv').config();
const mongoose = require('mongoose');

// MODELS
const ProductPage = require('./models/ProductPage');
const ServicePage = require('./models/ServicePage');
const Project = require('./models/Project');
const Admin = require('./models/Admin');

// DATA
const db = require('./data/db');

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // CLEAR OLD DATA
    await ProductPage.deleteMany();
    await ServicePage.deleteMany();
    await Project.deleteMany();
    await Admin.deleteMany();
    console.log('🧹 Old data cleared');

    // INSERT PRODUCT PAGES
    if (db.productPages?.length) {
      await ProductPage.insertMany(db.productPages);
      console.log(`📦 Product Pages Imported (${db.productPages.length})`);
    }

    // INSERT SERVICE PAGES
    if (db.servicePages?.length) {
      await ServicePage.insertMany(db.servicePages);
      console.log(`🛠 Service Pages Imported (${db.servicePages.length})`);
    }

    // INSERT PROJECTS
    if (db.projects?.length) {
      await Project.insertMany(db.projects);
      console.log(`🏗 Projects Imported (${db.projects.length})`);
    }

    // CREATE ADMIN
    await Admin.create({
      username: 'admin',
      password: 'password123',
    });

    console.log('🔐 Admin Created → admin / password123');
    console.log('🎉 Database Seeded Successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
};

importData();
