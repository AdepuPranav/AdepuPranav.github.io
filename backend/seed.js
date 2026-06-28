import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Message from './models/Message.js';

dotenv.config();

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

const seedDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://pranavadepu17_db_user:L4ftfFYZKbi7rdAt@cluster0.mjcrnem.mongodb.net/portfolio?appName=Cluster0';
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding.');
    
    await Project.deleteMany({});
    console.log('Cleared existing projects from database collection.');

    await Project.insertMany(defaultProjects);
    console.log('Database seeded with standard portfolio projects successfully!');

    // Seed contact details
    await Message.deleteMany({});
    console.log('Cleared existing messages from database collection.');

    await new Message({
      name: "Pranav Adepu",
      email: "pranavadepu17@gmail.com",
      text: "Developer Contact: GitHub - https://github.com/AdepuPranav | LinkedIn - https://www.linkedin.com/in/adepu-pranav-183618284/"
    }).save();
    console.log('Database seeded with contact details successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding database failed:', error);
    process.exit(1);
  }
};

seedDB();
