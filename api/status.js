export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'SYSTEM_READY',
    db: process.env.MONGODB_URI ? 'CONFIGURED' : 'NOT_CONFIGURED',
    runtime: 'vercel-serverless'
  });
}
