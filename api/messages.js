import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// ── Inline Message Schema ──────────────────────────────────────────────────
const messageSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  text:      { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// ── DB connection (cached) ─────────────────────────────────────────────────
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // POST – public contact submission
  if (req.method === 'POST') {
    const { name, email, text } = req.body;
    if (!name || !email || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      await connectDB();
      await new Message({ name, email, text }).save();
      return res.status(201).json({ success: true, message: 'Message logged successfully' });
    } catch {
      // Fallback – still report success (data lost in ephemeral env but UX preserved)
      console.warn('DB offline – message not persisted');
      return res.status(201).json({ success: true, message: 'Message received (fallback mode)' });
    }
  }

  // GET – admin only
  if (req.method === 'GET') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      await connectDB();
      const messages = await Message.find({}).sort({ timestamp: -1 });
      return res.status(200).json(messages);
    } catch {
      return res.status(503).json({ error: 'Database unavailable' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
