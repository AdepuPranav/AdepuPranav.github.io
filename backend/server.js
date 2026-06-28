import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Project from './models/Project.js';
import { defaultProjects } from './defaults.js';
import projectRoutes from './routes/projectRoutes.js';
import githubRoutes from './routes/githubRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// Initialize environment configurations
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable secure CORS targeting the React/Vite development container (and fallback client origins)
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://localhost:8085',
  'http://127.0.0.1:8085'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
}));

// Parse JSON stream payloads
app.use(express.json());

// Establish connection protocols to MongoDB using mongoose
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://pranavadepu17_db_user:L4ftfFYZKbi7rdAt@cluster0.mjcrnem.mongodb.net/portfolio?appName=Cluster0';
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('DATABASE: MongoDB server connection: ESTABLISHED // OK');
    try {
      const count = await Project.countDocuments();
      if (count === 0) {
        console.log('DATABASE: Projects collection is empty. Auto-seeding default repositories...');
        await Project.insertMany(defaultProjects);
        console.log('DATABASE: Seeding default repositories completed successfully // OK');
      } else {
        console.log(`DATABASE: Projects count is ${count}. Skipping auto-seeding.`);
      }
    } catch (err) {
      console.error('DATABASE: Auto-seeding failed // ERROR:', err);
    }
  })
  .catch((err) => console.error('DATABASE: MongoDB server connection: FAILED // ERROR:', err));

// Register routes
app.use('/api/projects', projectRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/messages', messageRoutes);

// Diagnostics/Status endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'SYSTEM_READY', db: mongoose.connection.readyState === 1 ? 'OK' : 'DISCONNECTED' });
});

// Run server instance
app.listen(PORT, () => {
  console.log(`Express server backend initialized on port: ${PORT}`);
  
  // Generate developer testing admin JWT token
  const secret = process.env.JWT_SECRET || 'super_secret_retro_key_95';
  const devToken = jwt.sign({ user: 'admin', role: 'developer' }, secret, { expiresIn: '365d' });
  console.log('\n========================================================================');
  console.log('DEV_ADMIN_TOKEN (Copy/paste to log in via terminal drawer command):');
  console.log(`login ${devToken}`);
  console.log('========================================================================\n');
});
