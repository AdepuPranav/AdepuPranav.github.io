import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// ── Inline Project Schema ──────────────────────────────────────────────────
const projectSchema = new mongoose.Schema({
  title:            { type: String, required: true },
  slug:             { type: String, required: true, unique: true },
  description:      { type: String, required: true },
  repoUrl:          { type: String, required: true },
  fileExtension:    { type: String, required: true },
  fileName:         { type: String, required: true },
  filePath:         { type: String, required: true },
  techStack:        [String],
  starCountFallback:{ type: Number, default: 0 }
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

// ── Default seeded projects ─────────────────────────────────────────────────
const defaultProjects = [
  {
    title: "Discord Chatbot // Rude Version",
    slug: "CS_ChatBotDiscord_-Rude-_VERSION-",
    description: "An interactive, personality-driven Discord bot built natively using C#. Implements robust async task processing, event-driven message state architectures, and customizable multi-threaded conversation logic.",
    repoUrl: "AdepuPranav/CS_ChatBotDiscord_-Rude-_VERSION-",
    fileExtension: ".cs", fileName: "ChatBot.cs", filePath: "src/Program.cs",
    techStack: ["C#", ".NET", "Discord.NET API", "Asynchronous Programming"],
    starCountFallback: 12
  },
  {
    title: "AI-Based Smart Traffic Optimization System",
    slug: "AI-based-Smart-Traffic-Optimization-System",
    description: "An advanced algorithmic framework designed to process real-time intersection telemetry and optimize traffic signal timings using computer vision vehicle tracking and dynamic queue optimization metrics.",
    repoUrl: "AdepuPranav/AI-based-Smart-Traffic-Optimization-System",
    fileExtension: ".py", fileName: "TrafficModel.py", filePath: "main.py",
    techStack: ["Python", "Machine Learning", "Computer Vision", "Intelligent Systems"],
    starCountFallback: 18
  },
  {
    title: "TorrentConsole // P2P Client",
    slug: "TorrentConsole",
    description: "A custom, lightweight BitTorrent protocol engine written from scratch. Features structural Bencode decoding, asynchronous peer discovery loops, pipelined TCP block transfers, and SHA-1 chunk verification.",
    repoUrl: "AdepuPranav/TorrentConsole",
    fileExtension: ".cs", fileName: "BitTorrentClient.cs", filePath: "Program.cs",
    techStack: ["C#", ".NET", "P2P Networking", "TCP/IP Sockets", "Cryptography"],
    starCountFallback: 24
  },
  {
    title: "Log Anomaly Detection System",
    slug: "ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection",
    description: "A low-level security pipeline that parses raw system logs using machine learning. Utilizes an Isolation Forest clustering model to automatically identify outlier operational anomalies and flag hidden security intrusions.",
    repoUrl: "AdepuPranav/ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection",
    fileExtension: ".py", fileName: "AnomalyDetector.py", filePath: "analyzer.py",
    techStack: ["Python", "Scikit-Learn", "Isolation Forest", "Data Engineering"],
    starCountFallback: 15
  },
  {
    title: "ChunkKeeper // Storage Manager",
    slug: "ChunkKeeper",
    description: "A performance-oriented data layout engine dedicated to segmenting, caching, and retrieving localized chunk arrays smoothly across continuous disk storage layouts.",
    repoUrl: "AdepuPranav/ChunkKeeper",
    fileExtension: ".go", fileName: "ChunkManager.go", filePath: "main.go",
    techStack: ["Systems Programming", "File I/O Optimization", "Custom Allocators"],
    starCountFallback: 20
  },
  {
    title: "Azure Healthcare Chatbot System",
    slug: "HealthCare",
    description: "An enterprise-ready digital assistant utilizing the Azure ecosystem. Connects NLP layers and healthcare data compliance standards to deliver real-time triage processing and dynamic informational logic streams.",
    repoUrl: "AdepuPranav/HealthCare",
    fileExtension: ".js", fileName: "HealthService.js", filePath: "index.js",
    techStack: ["Cloud Architecture", "Azure Bot Service", "Cognitive Services", "Node.js"],
    starCountFallback: 30
  }
];

// ── DB connection helper (cached for serverless warm instances) ─────────────
let cachedDb = null;
async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) return cachedDb;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI env not set');
  cachedDb = await mongoose.connect(uri);
  // Auto-seed on first run
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(defaultProjects);
  }
  return cachedDb;
}

// ── JWT helper ─────────────────────────────────────────────────────────────
function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const token = auth.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'super_secret_retro_key_95';
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

// ── Handler ────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();
  } catch {
    // MongoDB offline – return embedded defaults
    if (req.method === 'GET') {
      return res.status(200).json(defaultProjects.sort((a, b) => b.starCountFallback - a.starCountFallback));
    }
    return res.status(503).json({ error: 'Database unavailable' });
  }

  // GET /api/projects
  if (req.method === 'GET') {
    const projects = await Project.find({}).sort({ starCountFallback: -1 });
    return res.status(200).json(projects);
  }

  // POST /api/projects  (admin only)
  if (req.method === 'POST') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { title, slug, description, repoUrl, fileExtension, fileName, filePath, techStack, starCountFallback } = req.body;
    if (!title || !slug || !description || !repoUrl || !fileExtension || !fileName || !filePath) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existing = await Project.findOne({ slug });
    if (existing) return res.status(400).json({ error: 'Duplicate slug' });

    const newProject = await new Project({ title, slug, description, repoUrl, fileExtension, fileName, filePath, techStack, starCountFallback }).save();
    return res.status(201).json(newProject);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
