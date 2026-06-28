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

// ── Default projects (fallback) ─────────────────────────────────────────────
const defaultProjects = [
  { title: "Discord Chatbot // Rude Version", slug: "CS_ChatBotDiscord_-Rude-_VERSION-", repoUrl: "AdepuPranav/CS_ChatBotDiscord_-Rude-_VERSION-", starCountFallback: 12 },
  { title: "AI-Based Smart Traffic Optimization System", slug: "AI-based-Smart-Traffic-Optimization-System", repoUrl: "AdepuPranav/AI-based-Smart-Traffic-Optimization-System", starCountFallback: 18 },
  { title: "TorrentConsole // P2P Client", slug: "TorrentConsole", repoUrl: "AdepuPranav/TorrentConsole", starCountFallback: 24 },
  { title: "Log Anomaly Detection System", slug: "ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection", repoUrl: "AdepuPranav/ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection", starCountFallback: 15 },
  { title: "ChunkKeeper // Storage Manager", slug: "ChunkKeeper", repoUrl: "AdepuPranav/ChunkKeeper", starCountFallback: 20 },
  { title: "Azure Healthcare Chatbot System", slug: "HealthCare", repoUrl: "AdepuPranav/HealthCare", starCountFallback: 30 }
];

let cachedDb = null;
async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) return cachedDb;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  cachedDb = await mongoose.connect(uri);
  return cachedDb;
}

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const token = auth.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'super_secret_retro_key_95';
  try { return jwt.verify(token, secret); } catch { return null; }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Extract slug from URL: /api/projects/slug/[value]
  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'Missing slug parameter' });

  if (req.method === 'DELETE') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      await connectDB();
      const deleted = await Project.findOneAndDelete({ slug });
      if (!deleted) return res.status(404).json({ error: 'Project not found' });
      return res.status(200).json({ success: true, message: `Project '${slug}' deleted`, project: deleted });
    } catch {
      return res.status(503).json({ error: 'Database unavailable' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
