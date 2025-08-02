const mongoose = require('mongoose');
const Project = require('../models/Project');
const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config();

const checkAndSeed = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
    
    const projectCount = await Project.countDocuments();
    console.log(`Found ${projectCount} projects in database`);
    
    if (projectCount === 0) {
      console.log('Database is empty, running seed script...');
      
      // Execute the seed script as a separate process
      const seedScriptPath = path.join(__dirname, 'seedDatabase.js');
      execSync(`node "${seedScriptPath}"`, { stdio: 'inherit' });
      
      console.log('Seed script completed successfully');
    } else {
      console.log('Database already has data, skipping seed');
    }
    
  } catch (error) {
    console.error('Error checking database:', error);
    // Don't exit the process, just log the error
    console.log('Continuing with server startup...');
  } finally {
    // Don't close the connection here as the main server will use it
    console.log('Database check completed');
  }
};

// Execute the function
checkAndSeed().then(() => {
  console.log('Check and seed process finished');
}).catch((error) => {
  console.error('Error in check and seed:', error);
});