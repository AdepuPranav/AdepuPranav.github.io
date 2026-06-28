import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_retro_key_95';

// Enable secure CORS targeting the React/Vite development container and other origins
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
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
}));

// Parse JSON payloads
app.use(express.json());

// ── Models & Schemas ────────────────────────────────────────────────────────

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  repoUrl: { type: String, required: true },
  fileExtension: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  techStack: [{ type: String }],
  starCountFallback: { type: Number, default: 0 }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// ── Default Projects Data for Auto-Seeding ──────────────────────────────────

const defaultProjects = [
  {
    title: "Discord Chatbot // Rude Version",
    slug: "CS_ChatBotDiscord_-Rude-_VERSION-",
    description: "An interactive, personality-driven Discord bot built natively using C#. Implements robust async task processing, event-driven message state architectures, and customizable multi-threaded conversation logic.",
    repoUrl: "AdepuPranav/CS_ChatBotDiscord_-Rude-_VERSION-",
    fileExtension: ".cs",
    fileName: "ChatBot.cs",
    filePath: "src/Program.cs",
    techStack: ["C#", ".NET", "Discord.NET API", "Asynchronous Programming"],
    starCountFallback: 12
  },
  {
    title: "AI-Based Smart Traffic Optimization System",
    slug: "AI-based-Smart-Traffic-Optimization-System",
    description: "An advanced algorithmic framework designed to process real-time intersection telemetry and optimize traffic signal timings using computer vision vehicle tracking and dynamic queue optimization metrics.",
    repoUrl: "AdepuPranav/AI-based-Smart-Traffic-Optimization-System",
    fileExtension: ".py",
    fileName: "TrafficModel.py",
    filePath: "main.py",
    techStack: ["Python", "Machine Learning", "Computer Vision", "Intelligent Systems"],
    starCountFallback: 18
  },
  {
    title: "TorrentConsole // P2P Client",
    slug: "TorrentConsole",
    description: "A custom, lightweight BitTorrent protocol engine written from scratch. Features structural Bencode decoding, asynchronous peer discovery loops, pipelined TCP block transfers, and SHA-1 chunk verification.",
    repoUrl: "AdepuPranav/TorrentConsole",
    fileExtension: ".cs",
    fileName: "BitTorrentClient.cs",
    filePath: "Program.cs",
    techStack: ["C#", ".NET", "P2P Networking", "TCP/IP Sockets", "Cryptography"],
    starCountFallback: 24
  },
  {
    title: "Log Anomaly Detection System",
    slug: "ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection",
    description: "A low-level security pipeline that parses raw system logs using machine learning. Utilizes an Isolation Forest clustering model to automatically identify outlier operational anomalies and flag hidden security intrusions.",
    repoUrl: "AdepuPranav/ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection",
    fileExtension: ".py",
    fileName: "AnomalyDetector.py",
    filePath: "analyzer.py",
    techStack: ["Python", "Scikit-Learn", "Isolation Forest", "Data Engineering"],
    starCountFallback: 15
  },
  {
    title: "ChunkKeeper // Storage Manager",
    slug: "ChunkKeeper",
    description: "A performance-oriented data layout engine dedicated to segmenting, caching, and retrieving localized chunk arrays smoothly across continuous disk storage layouts.",
    repoUrl: "AdepuPranav/ChunkKeeper",
    fileExtension: ".go",
    fileName: "ChunkManager.go",
    filePath: "main.go",
    techStack: ["Systems Programming", "File I/O Optimization", "Custom Allocators"],
    starCountFallback: 20
  },
  {
    title: "Azure Healthcare Chatbot System",
    slug: "HealthCare",
    description: "An enterprise-ready digital assistant utilizing the Azure ecosystem. Connects NLP layers and healthcare data compliance standards to deliver real-time triage processing and dynamic informational logic streams.",
    repoUrl: "AdepuPranav/HealthCare",
    fileExtension: ".js",
    fileName: "HealthService.js",
    filePath: "index.js",
    techStack: ["Cloud Architecture", "Azure Bot Service", "Cognitive Services", "Node.js"],
    starCountFallback: 30
  }
];

// ── JWT Authentication Middleware ───────────────────────────────────────────

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ── Routes ──────────────────────────────────────────────────────────────────

// GET /api/projects: Fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ starCountFallback: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Server error retrieving projects' });
  }
});

// POST /api/projects: Create a new project (Protected)
app.post('/api/projects', authenticateJWT, async (req, res) => {
  const { title, slug, description, repoUrl, fileExtension, fileName, filePath, techStack, starCountFallback } = req.body;
  
  if (!title || !slug || !description || !repoUrl || !fileExtension || !fileName || !filePath) {
    return res.status(400).json({ error: 'Missing required repository fields' });
  }

  try {
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      return res.status(400).json({ error: 'Duplicate slug identifier already exists' });
    }

    const newProject = new Project({
      title,
      slug,
      description,
      repoUrl,
      fileExtension,
      fileName,
      filePath,
      techStack,
      starCountFallback
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error inserting project:', error);
    res.status(500).json({ error: 'Server error writing project record to database' });
  }
});

// DELETE /api/projects/slug/:slug: Delete a project (Protected)
app.delete('/api/projects/slug/:slug', authenticateJWT, async (req, res) => {
  const { slug } = req.params;

  try {
    const deletedProject = await Project.findOneAndDelete({ slug });
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found with the specified slug' });
    }
    res.json({ success: true, message: `Project '${slug}' deleted successfully`, project: deletedProject });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Server error removing project record from database' });
  }
});

// POST /api/messages: Public contact message submission
app.post('/api/messages', async (req, res) => {
  const { name, email, text } = req.body;
  if (!name || !email || !text) {
    return res.status(400).json({ error: 'Missing required fields in contact payload' });
  }

  try {
    const newMessage = new Message({ name, email, text });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message logged successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Server error processing contact transmission' });
  }
});

// GET /api/messages: Retrieve all logs (Admin only, Protected)
app.get('/api/messages', authenticateJWT, async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Server error retrieving contact database' });
  }
});

// GET /api/status: Diagnostics endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'SYSTEM_READY',
    db: mongoose.connection.readyState === 1 ? 'OK' : 'DISCONNECTED'
  });
});

// ── Database Connection & Server Start ──────────────────────────────────────

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

app.listen(PORT, () => {
  console.log(`Express server backend initialized on port: ${PORT}`);
  
  // Generate developer testing admin JWT token
  const devToken = jwt.sign({ user: 'admin', role: 'developer' }, JWT_SECRET, { expiresIn: '365d' });
  console.log('\n========================================================================');
  console.log('DEV_ADMIN_TOKEN (Copy/paste to log in via terminal drawer command):');
  console.log(`login ${devToken}`);
  console.log('========================================================================\n');
});

export default app;
