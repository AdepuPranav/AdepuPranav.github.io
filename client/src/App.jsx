import React, { useState, useEffect, useRef } from 'react';
import WindowFrame from './components/WindowFrame';

const FALLBACK_PROJECTS = [
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

export default function App() {
  // --- MERN Projects Data ---
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [gitStats, setGitStats] = useState({});
  const [loadingProjects, setLoadingProjects] = useState(true);

  // --- Window Depth / zIndex Focus Layers ---
  const [zIndices, setZIndices] = useState({
    "CS_ChatBotDiscord_-Rude-_VERSION-": 10,
    "AI-based-Smart-Traffic-Optimization-System": 11,
    TorrentConsole: 12,
    "ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection": 13,
    ChunkKeeper: 14,
    HealthCare: 15,
    TechnicalSkills: 16,
    AcademicPath: 17,
    CareerMissions: 18,
    ContactWindow: 19,
  });
  const [activeWindow, setActiveWindow] = useState('CS_ChatBotDiscord_-Rude-_VERSION-');
  const [visibleWindows, setVisibleWindows] = useState({
    "CS_ChatBotDiscord_-Rude-_VERSION-": true,
    "AI-based-Smart-Traffic-Optimization-System": true,
    TorrentConsole: true,
    "ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection": true,
    ChunkKeeper: true,
    HealthCare: true,
    ContactWindow: true,
  });

  // --- CRT Logger Status ---
  const [crtLogs, setCrtLogs] = useState([]);
  const [systemBadge, setSystemBadge] = useState("SYSTEM_READY // OK");
  const logContainerRef = useRef(null);

  // --- Classic Pop-up Alert Dialog modal ---
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");

  // --- Contact Form states ---
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactText, setContactText] = useState("");
  const [submittingContact, setSubmittingContact] = useState(false);

  // --- Mobile Dropdown Navigation ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Admin Console Terminal drawer state ---
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    "PRANAV CLASSIC OS TERMINAL V4.1.0",
    "Type 'help' to review directory controls. Press backtick (`) to close console.",
    "------------------------------------------------------------------------"
  ]);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('admin_token') || "");
  const terminalBottomRef = useRef(null);
  const terminalInputRef = useRef(null);

  const bringToFront = (id) => {
    setActiveWindow(id);
    setZIndices(prev => {
      const maxZ = Math.max(...Object.values(prev));
      return {
        ...prev,
        [id]: maxZ + 1
      };
    });
  };

  // --- Listeners for backtick keyboard drawer toggle ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus terminal input on open
  useEffect(() => {
    if (terminalOpen && terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  }, [terminalOpen]);

  // Auto-scroll terminal history
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  // --- Initial Setup and API Fetching ---
  const loadProjects = () => {
    setLoadingProjects(true);
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error("Backend server offline");
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          // Merge file paths mapping from local database fallback
          const mapped = data.map(p => {
            const fallbackItem = FALLBACK_PROJECTS.find(f => f.slug === p.slug);
            return {
              ...p,
              filePath: p.filePath || (fallbackItem ? fallbackItem.filePath : "main.py"),
              fileName: p.fileName || (fallbackItem ? fallbackItem.fileName : `${p.slug}${p.fileExtension}`)
            };
          });
          setProjects(mapped);

          // Seed window visibility if new slugs are retrieved
          const visibilityMap = {};
          mapped.forEach(p => {
            visibilityMap[p.slug] = true;
          });
          setVisibleWindows(prev => ({ ...prev, ...visibilityMap }));
        }
        setLoadingProjects(false);
      })
      .catch(err => {
        console.warn("Express backend API offline. Running local database fallback assets.", err);
        setProjects(FALLBACK_PROJECTS);
        setLoadingProjects(false);
      });
  };

  useEffect(() => {
    loadProjects();

    const bootLogs = [
      "LOADING SYSTEM FILE STRUCTS...",
      "INIT SYSTEM CONTROLLERS AT PORT 5000... OK",
      "MOUNTING DATABASE DRIVERS... OK",
      "DEV_TOKEN INITIALIZED ON HOST... OK",
      "PRESS BACKTICK (`) KEY TO TOGGLE ADMIN CONSOLE.",
      "SYSTEM_READY // STATUS: OK"
    ];

    let timer;
    let index = 0;
    const printLog = () => {
      if (index < bootLogs.length) {
        setCrtLogs(prev => [...prev, bootLogs[index]]);
        index++;
        timer = setTimeout(printLog, 600);
      } else {
        const interval = setInterval(() => {
          const time = new Date().toLocaleTimeString();
          setCrtLogs(prev => {
            const lines = [...prev, `[${time}] KEEPALIVE_PING // ACK`];
            if (lines.length > 12) lines.shift();
            return lines;
          });
        }, 6000);
        return () => clearInterval(interval);
      }
    };
    printLog();

    return () => clearTimeout(timer);
  }, []);

  // Fetch GitHub dynamic telemetry from BACKEND PROXY
  useEffect(() => {
    projects.forEach(async (proj) => {
      const repo = proj.repoUrl;
      const fallbackItem = FALLBACK_PROJECTS.find(f => f.repoUrl === repo);

      // Initialize fallback immediately
      setGitStats(prev => ({
        ...prev,
        [repo]: {
          stars: fallbackItem ? fallbackItem.starCountFallback : 10,
          issues: 0,
          commit: "Proxy offline, loading fallback cache"
        }
      }));

      try {
        const response = await fetch(`/api/github/repo?repo=${repo}`);
        if (!response.ok) throw new Error("Backend proxy rate-limited or offline");
        const proxyData = await response.json();

        setGitStats(prev => ({
          ...prev,
          [repo]: {
            stars: proxyData.stars,
            issues: proxyData.issues,
            commit: proxyData.commit
          }
        }));
      } catch (err) {
        console.warn(`GitHub proxy call failed for ${repo}. Falling back to default static records.`, err);
      }
    });
  }, [projects]);

  // Auto-scroll CRT monitor
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [crtLogs]);

  // --- Contact Form MERN POST Webhook handler ---
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmittingContact(true);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          text: contactText
        })
      });

      if (!response.ok) throw new Error("Contact post API failure");

      setAlertText("Message Queued Successfully");
      setAlertOpen(true);

      // Clear inputs
      setContactName("");
      setContactEmail("");
      setContactText("");
    } catch (err) {
      console.warn("Express backend message webhook offline. Mocking submission alert.", err);
      setAlertText("Connection error.\nMessage Mocked successfully locally.");
      setAlertOpen(true);
    } finally {
      setSubmittingContact(false);
    }
  };

  const closeProjectWindow = (slug) => {
    setVisibleWindows(prev => ({ ...prev, [slug]: false }));
    setSystemBadge("WINDOW_CLOSED // OK");
    setTimeout(() => {
      setSystemBadge("SYSTEM_READY // OK");
    }, 3000);
  };

  // --- JWT Admin Console Drawer Parser ---
  const handleTerminalSubmit = async (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const commandStr = terminalInput.trim();
    setTerminalHistory(prev => [...prev, `${adminToken ? 'root' : 'admin'}@pranav_os:${adminToken ? '#' : '$'} ${commandStr}`]);
    setTerminalInput("");

    const tokens = commandStr.split(" ");
    const primary = tokens[0].toLowerCase();

    switch (primary) {
      case 'clear':
        setTerminalHistory([]);
        break;

      case 'help':
        setTerminalHistory(prev => [
          ...prev,
          "SYSTEM INSTRUCTION COMMANDS:",
          "  help           - Review directory controls",
          "  clear          - Clear terminal interface console",
          "  cat info.txt   - Print developer bio overview file",
          "  login <token>  - Authenticate developer access token",
          "  ls projects    - Query all projects catalogued in MongoDB",
          "  mkdir project  - Create a new project record in DB (Auth required)",
          "                   Usage: mkdir project --title \"Name\" --slug \"slug\" --desc \"Desc\" --repo \"user/repo\" --ext \".ext\"",
          "  rm project     - Delete a project from MongoDB (Auth required)",
          "                   Usage: rm project --slug \"slug\"",
          "  cat messages   - Retrieve logged contact messages (Auth required)"
        ]);
        break;

      case 'cat':
        if (tokens[1] === 'info.txt') {
          setTerminalHistory(prev => [
            ...prev,
            "----------------------------------------------------------------",
            "PRANAV ADEPU | ECE SOFTWARE DEVELOPER",
            "Specializing in decoupled MERN environments, high-performance C# NIO,",
            "procedural game architecture in Unity, and cognitive Azure gateways.",
            "System build date: 2026 // Location: Hyderabad, India",
            "----------------------------------------------------------------"
          ]);
        } else if (tokens[1] === 'messages') {
          if (!adminToken) {
            setTerminalHistory(prev => [...prev, "ACCESS DENIED: Authentication JWT token required (Run login <token>)."]);
            break;
          }
          setTerminalHistory(prev => [...prev, "GET /api/messages // Retrieving payload..."]);
          try {
            const res = await fetch('/api/messages', {
              headers: { 'Authorization': `Bearer ${adminToken}` }
            });
            if (!res.ok) throw new Error(res.statusText);
            const messages = await res.json();
            if (messages.length === 0) {
              setTerminalHistory(prev => [...prev, "No contact messages logged in database."]);
            } else {
              const logs = messages.map(m => `[${new Date(m.timestamp).toLocaleDateString()}] ${m.name} (${m.email}): ${m.text}`);
              setTerminalHistory(prev => [...prev, ...logs]);
            }
          } catch (err) {
            setTerminalHistory(prev => [...prev, `API_ERROR: Connection failed: ${err.message}`]);
          }
        } else {
          setTerminalHistory(prev => [...prev, `cat: file not found: ${tokens[1] || ''}`]);
        }
        break;

      case 'login':
        const token = tokens[1];
        if (!token) {
          setTerminalHistory(prev => [...prev, "Usage: login <jwt_token_string>"]);
        } else {
          setTerminalHistory(prev => [...prev, "Verifying JWT credentials..."]);
          // We can try to test fetch to verify JWT validity
          try {
            const res = await fetch('/api/messages', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
              setAdminToken(token);
              localStorage.setItem('admin_token', token);
              setTerminalHistory(prev => [...prev, "AUTHENTICATION ESTABLISHED: Admin credentials verified. Prompt set to root."]);
            } else {
              if (token.length > 20) {
                setAdminToken(token);
                localStorage.setItem('admin_token', token);
                setTerminalHistory(prev => [...prev, `OFFLINE BYPASS (Server status: ${res.status}): Developer credentials cached. Admin mode unlocked.`]);
              } else {
                setTerminalHistory(prev => [...prev, `AUTHENTICATION FAILURE: Token verification failed: ${res.status}`]);
              }
            }
          } catch (err) {
            // Local bypass for offline mock testing (accept if token includes characters)
            if (token.length > 20) {
              setAdminToken(token);
              localStorage.setItem('admin_token', token);
              setTerminalHistory(prev => [...prev, "OFFLINE BYPASS: Developer credentials cached. Admin mode unlocked."]);
            } else {
              setTerminalHistory(prev => [...prev, "AUTHENTICATION FAILURE: Invalid token parameter size."]);
            }
          }
        }
        break;

      case 'ls':
        if (tokens[1] === 'projects') {
          setTerminalHistory(prev => [...prev, `INDEXING PROJECTS DATABASE (${projects.length} files found):`]);
          const projectList = projects.map(p => `  - slug: ${p.slug} | title: ${p.title} | extension: ${p.fileExtension}`);
          setTerminalHistory(prev => [...prev, ...projectList]);
        } else {
          setTerminalHistory(prev => [...prev, "Usage: ls projects"]);
        }
        break;

      case 'mkdir':
        if (tokens[1] === 'project') {
          if (!adminToken) {
            setTerminalHistory(prev => [...prev, "ACCESS DENIED: Authentication JWT token required."]);
            break;
          }

          // Simple parsing of parameters e.g. --title "Value"
          const cmdLine = commandStr;
          const getParam = (flag) => {
            const match = cmdLine.match(new RegExp(`${flag}\\s+["']([^"']+)["']`)) || cmdLine.match(new RegExp(`${flag}\\s+(\\S+)`));
            return match ? match[1] : null;
          };

          const title = getParam('--title');
          const slug = getParam('--slug');
          const desc = getParam('--desc');
          const repo = getParam('--repo');
          const ext = getParam('--ext') || '.cs';
          const file = getParam('--file') || `${slug}${ext}`;
          const path = getParam('--path') || `main${ext}`;

          if (!title || !slug || !desc || !repo) {
            setTerminalHistory(prev => [...prev, "ERROR: Missing attributes. Usage: mkdir project --title \"Name\" --slug \"slug\" --desc \"Description\" --repo \"user/repo\" [--ext \".ext\"] [--file \"file.ext\"] [--path \"path/to/file\"]"]);
            break;
          }

          setTerminalHistory(prev => [...prev, `POST /api/projects // Writing slug '${slug}'...`]);
          try {
            const res = await fetch('/api/projects', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
              },
              body: JSON.stringify({
                title,
                slug,
                description: desc,
                repoUrl: repo,
                fileExtension: ext,
                fileName: file,
                filePath: path,
                techStack: ["MERN_SHELL"],
                starCountFallback: 1
              })
            });

            const responseData = await res.json();
            if (res.ok) {
              setTerminalHistory(prev => [...prev, `DB_WRITE_SUCCESS: Project '${title}' saved.`]);
              loadProjects(); // Reload projects
            } else {
              setTerminalHistory(prev => [...prev, `DB_WRITE_ERROR: ${responseData.error}`]);
            }
          } catch (err) {
            setTerminalHistory(prev => [...prev, `API_ERROR: Connection failed: ${err.message}`]);
          }
        } else {
          setTerminalHistory(prev => [...prev, "Usage: mkdir project --title \"Name\" ..."]);
        }
        break;

      case 'rm':
        if (tokens[1] === 'project') {
          if (!adminToken) {
            setTerminalHistory(prev => [...prev, "ACCESS DENIED: Authentication JWT token required."]);
            break;
          }

          // Parse --slug
          const match = commandStr.match(/--slug\s+(\S+)/);
          const slug = match ? match[1] : null;
          if (!slug) {
            setTerminalHistory(prev => [...prev, "ERROR: Missing slug. Usage: rm project --slug \"slug-name\""]);
            break;
          }

          setTerminalHistory(prev => [...prev, `DELETE /api/projects/slug/${slug} // Removing record...`]);
          try {
            const res = await fetch(`/api/projects/slug/${slug}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${adminToken}` }
            });

            const responseData = await res.json();
            if (res.ok) {
              setTerminalHistory(prev => [...prev, `DB_DELETE_SUCCESS: Project '${slug}' removed.`]);
              loadProjects();
            } else {
              setTerminalHistory(prev => [...prev, `DB_DELETE_ERROR: ${responseData.error}`]);
            }
          } catch (err) {
            setTerminalHistory(prev => [...prev, `API_ERROR: Connection failed: ${err.message}`]);
          }
        } else {
          setTerminalHistory(prev => [...prev, "Usage: rm project --slug \"slug-name\""]);
        }
        break;

      default:
        setTerminalHistory(prev => [...prev, `command not found: ${primary}`]);
    }
  };

  return (
    <div className="bg-retro-light text-retro-black min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">

      {/* TOP NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-retro-light border-b-2 border-black flex items-center justify-between px-4 py-2 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center justify-center w-8 h-8 border-2 border-black bg-white font-mono font-bold text-lg retro-shadow-sm cursor-pointer"
          >
            P
          </button>
          <span className="font-bold text-sm tracking-wide hidden sm:inline-block font-mono">FILE: SYSTEM_CORE.SYS</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 font-bold text-sm">
          <a href="#about" className="hover:underline">About</a>
          <a href="#quick-links" className="hover:underline">Quick Links</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#technical-log" className="hover:underline">Technical Logs</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Toggles drawer */}
          <button
            onClick={() => setTerminalOpen(prev => !prev)}
            className="retro-btn text-xs px-3 py-1.5 cursor-pointer font-mono font-bold"
          >
            CONSOLE (`)
          </button>

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden w-8 h-8 border-2 border-black bg-white flex flex-col items-center justify-center gap-1 retro-shadow-sm cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <span className="w-4 h-0.5 bg-black"></span>
            <span className="w-4 h-0.5 bg-black"></span>
            <span className="w-4 h-0.5 bg-black"></span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-full right-4 mt-1 bg-white border-2 border-black w-48 retro-shadow flex flex-col text-left py-1 font-mono text-xs"
          >
            <a href="#about" className="px-4 py-2 hover:bg-black hover:text-white border-b border-gray-200">ABOUT_ME.TXT</a>
            <a href="#quick-links" className="px-4 py-2 hover:bg-black hover:text-white border-b border-gray-200">QUICK_LINKS.SYS</a>
            <a href="#projects" className="px-4 py-2 hover:bg-black hover:text-white border-b border-gray-200">PROJECTS_DIR/</a>
            <a href="#technical-log" className="px-4 py-2 hover:bg-black hover:text-white border-b border-gray-200">SYSTEM_LOGS/</a>
            <a href="#contact" className="px-4 py-2 hover:bg-black hover:text-white">CONTACT.SYS</a>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow pt-16">

        {/* HERO SECTION */}
        <section id="about" className="container mx-auto px-4 py-12 md:py-20 border-b-2 border-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 font-mono text-xs font-bold retro-shadow-sm select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-black blink"></span>
                API_GATEWAY // DYNAMIC_PROXY // OK
              </div>

              <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-black">
                Hello.<br />I'm Pranav.
              </h1>

              <p className="text-lg sm:text-xl text-retro-gray font-bold max-w-xl leading-relaxed">
                I am a Software Developer specializing in building robust backend architectures, AI-integrated workflows, and socket networking, with a parallel passion for Unity game engines. Hit the backtick key (\``) to trigger the floating secure admin JWT drawer.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 select-none">
                <a href="#projects" className="retro-btn-lg text-sm">
                  View Database
                </a>
                <a href="/assets/Pranavs_Resume.pdf" download className="retro-btn-lg bg-black text-white text-sm">
                  Download Resume
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm border-4 border-black bg-white retro-shadow p-3 relative select-none">
                <div className="window-title-bar bg-black text-white px-3 py-1.5 flex items-center justify-between border-b-2 border-black mb-3">
                  <span className="font-mono text-xs font-bold">CRT_TERMINAL // DYNAMIC_LOGS</span>
                  <div className="flex gap-1.5">
                    <span className="win-btn w-3 h-3 rounded-full border border-white bg-white"></span>
                    <span className="win-btn w-3 h-3 rounded-full border border-white bg-white"></span>
                  </div>
                </div>

                <div className="crt-screen bg-white p-4 h-64 flex flex-col justify-between">
                  <div ref={logContainerRef} className="overflow-y-auto pr-1 flex-grow scrollbar-none text-left">
                    {crtLogs.map((log, i) => (
                      <div key={i} className="font-mono text-xs mb-1 text-black">
                        <span className="text-retro-gray">&gt;</span> {log}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-black pt-2 flex items-center justify-between mt-2 font-mono text-[10px]">
                    <span className="text-retro-gray">ADMIN_SESSION: {adminToken ? "VERIFIED_ROOT" : "PUBLIC_USER"}</span>
                    <div className="bg-black text-white px-2 py-0.5 font-bold border border-black">
                      {systemBadge}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* QUICK LINKS MATRIX */}
        <section id="quick-links" className="border-b-2 border-black bg-white select-none">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-xs uppercase font-mono tracking-widest text-retro-gray mb-4 font-bold">
              [ QUICK_LINKS.SYS ] // CLICKS INVERT MATRIX
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 border-2 border-black">
              <a href="#about" className="matrix-link p-6 bg-white border-r-2 border-b-2 lg:border-b-0 border-black flex flex-col justify-between h-32 group">
                <span className="font-mono text-sm text-retro-gray group-hover:text-white">01 / ABOUT</span>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold tracking-tight">Know Me</span>
                  <span className="font-bold text-xl select-none">&rarr;</span>
                </div>
              </a>
              <a href="#projects" className="matrix-link p-6 bg-white border-b-2 lg:border-b-0 lg:border-r-2 border-black flex flex-col justify-between h-32 group">
                <span className="font-mono text-sm text-retro-gray group-hover:text-white">02 / PROJECTS</span>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold tracking-tight">Code Repos</span>
                  <span className="font-bold text-xl select-none">&rarr;</span>
                </div>
              </a>
              <a href="#technical-log" className="matrix-link p-6 bg-white border-r-2 border-black flex flex-col justify-between h-32 group">
                <span className="font-mono text-sm text-retro-gray group-hover:text-white">03 / SKILLS</span>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold tracking-tight">Sys Logs</span>
                  <span className="font-bold text-xl select-none">&rarr;</span>
                </div>
              </a>
              <a href="#contact" className="matrix-link p-6 bg-white flex flex-col justify-between h-32 group">
                <span className="font-mono text-sm text-retro-gray group-hover:text-white">04 / DIAL_OUT</span>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold tracking-tight">Contact</span>
                  <span className="font-bold text-xl select-none">&rarr;</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* PROJECTS GRID SECTION */}
        <section id="projects" className="retro-dot-bg py-16 md:py-24 border-b-2 border-black">
          <div className="container mx-auto px-4">

            <div className="mb-12 max-w-xl bg-white border-2 border-black p-6 retro-shadow select-none">
              <h2 className="text-3xl font-black tracking-tight mb-2">Projects Directory</h2>
              <p className="text-sm text-retro-gray font-bold font-mono">
                PROJECT_INDEX: REPOS.LIST_ALL()
              </p>
              <p className="text-sm mt-2 text-black font-semibold">
                Click any window title bar to pull its depth layer to the front. Launch remote files natively in the inline IDE terminal emulator.
              </p>
            </div>

            {loadingProjects ? (
              <div className="border-4 border-black bg-white p-8 max-w-sm mx-auto text-center retro-shadow font-mono">
                <div className="inline-block animate-spin w-6 h-6 border-4 border-black border-t-white rounded-full mb-3"></div>
                <div>CONNECTING TO DATABASE ROUTER...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {projects.map((proj) => {
                  if (!visibleWindows[proj.slug]) return null;
                  const stats = gitStats[proj.repoUrl] || { stars: '--', issues: '--', commit: 'Syncing live telemetry...' };

                  return (
                    <WindowFrame
                      key={proj.slug}
                      titleBarText={proj.fileName || `${proj.slug}${proj.fileExtension}`}
                      isActive={activeWindow === proj.slug}
                      onClick={() => bringToFront(proj.slug)}
                      onClose={() => closeProjectWindow(proj.slug)}
                      repoUrl={proj.repoUrl}
                      filePath={proj.filePath}
                      fileExtension={proj.fileExtension}
                      className="w-full"
                      style={{ zIndex: zIndices[proj.slug] }}
                    >
                      <div className="original-card-content space-y-4">
                        {/* SVGs inside projects grid */}
                        <div className="border-2 border-black bg-white p-2 select-none">
                          {proj.slug === "CS_ChatBotDiscord_-Rude-_VERSION-" && (
                            <svg viewBox="0 0 300 120" className="w-full h-auto bg-retro-light border border-black text-black" aria-label="Discord Chatbot illustration" role="img">
                              <rect x="15" y="15" width="165" height="70" fill="#FFFFFF" stroke="#000000" strokeWidth="2" rx="4" />
                              <polygon points="40,85 50,98 60,85" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <line x1="42" y1="85" x2="58" y2="85" stroke="#FFFFFF" strokeWidth="3" />
                              <text x="25" y="38" fontFamily="Courier New" fontSize="8" fontWeight="bold" fill="#000000">DISCORD_USER: Hello!</text>
                              <text x="25" y="58" fontFamily="Courier New" fontSize="8" fontWeight="bold" fill="#000000">BOT: System Busy (Go away)</text>

                              <rect x="205" y="25" width="65" height="55" fill="#FFFFFF" stroke="#000000" strokeWidth="2" rx="2" />
                              <rect x="197" y="45" width="8" height="15" fill="#000000" />
                              <rect x="270" y="45" width="8" height="15" fill="#000000" />
                              <line x1="237.5" y1="12" x2="237.5" y2="25" stroke="#000000" strokeWidth="2" />
                              <circle cx="237.5" cy="10" r="4" fill="#000000" />
                              <rect x="217" y="40" width="10" height="8" fill="#000000" />
                              <rect x="243" y="40" width="10" height="8" fill="#000000" />
                              <rect x="220" y="43" width="4" height="3" fill="#FFFFFF" />
                              <rect x="246" y="43" width="4" height="3" fill="#FFFFFF" />
                              <line x1="220" y1="65" x2="250" y2="65" stroke="#000000" strokeWidth="2" />
                              <path d="M185 50 L195 50" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
                            </svg>
                          )}
                          {proj.slug === "AI-based-Smart-Traffic-Optimization-System" && (
                            <svg viewBox="0 0 300 120" className="w-full h-auto bg-retro-light border border-black text-black" aria-label="Smart Traffic system illustration" role="img">
                              <line x1="100" y1="0" x2="100" y2="120" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
                              <line x1="180" y1="0" x2="180" y2="120" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
                              <line x1="0" y1="40" x2="300" y2="40" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
                              <line x1="0" y1="80" x2="300" y2="80" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />

                              <rect x="65" y="5" width="22" height="42" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <circle cx="76" cy="13" r="4" fill="#000000" />
                              <circle cx="76" cy="24" r="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
                              <circle cx="76" cy="35" r="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />

                              <rect x="200" y="72" width="22" height="42" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <circle cx="211" cy="80" r="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
                              <circle cx="211" cy="91" r="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
                              <circle cx="211" cy="102" r="4" fill="#000000" />

                              <rect x="120" y="15" width="24" height="14" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <circle cx="126" cy="22" r="2" fill="#000000" />
                              <circle cx="138" cy="22" r="2" fill="#000000" />

                              <rect x="40" y="50" width="24" height="14" fill="#000000" />
                              <circle cx="46" cy="62" r="2" fill="#FFFFFF" />
                              <circle cx="58" cy="62" r="2" fill="#FFFFFF" />

                              <text x="250" y="22" fontFamily="Courier New" fontSize="7" fontWeight="bold" fill="#000000">QUEUE: 0</text>
                              <text x="250" y="34" fontFamily="Courier New" fontSize="7" fontWeight="bold" fill="#000000">FLOW: 92%</text>
                            </svg>
                          )}
                          {proj.slug === "TorrentConsole" && (
                            <svg viewBox="0 0 300 120" className="w-full h-auto bg-retro-light border border-black text-black" aria-label="BitTorrent client illustration" role="img">
                              <rect x="120" y="40" width="60" height="40" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <line x1="120" y1="52" x2="180" y2="52" stroke="#000000" strokeWidth="1.5" />
                              <text x="150" y="48" fontFamily="Courier New" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#000000">TORRENT</text>
                              <text x="150" y="68" fontFamily="Courier New" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#000000">76%</text>

                              <circle cx="40" cy="25" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <text x="40" y="28" fontFamily="Courier New" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#000000">PEER</text>

                              <circle cx="260" cy="25" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <text x="260" y="28" fontFamily="Courier New" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#000000">PEER</text>

                              <circle cx="40" cy="95" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <text x="40" y="98" fontFamily="Courier New" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#000000">SEED</text>

                              <circle cx="260" cy="95" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <text x="260" y="98" fontFamily="Courier New" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#000000">SEED</text>

                              <path d="M60 35 L115 50" stroke="#000000" strokeWidth="1.5" strokeDasharray="3 3" />
                              <path d="M240 35 L185 50" stroke="#000000" strokeWidth="1.5" strokeDasharray="3 3" />
                              <path d="M60 85 L115 70" stroke="#000000" strokeWidth="1.5" />
                              <path d="M240 85 L185 70" stroke="#000000" strokeWidth="1.5" />

                              <polygon points="110,66 115,70 108,72" fill="#000000" />
                              <polygon points="190,66 185,70 192,72" fill="#000000" />
                            </svg>
                          )}
                          {proj.slug === "ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection" && (
                            <svg viewBox="0 0 300 120" className="w-full h-auto bg-retro-light border border-black text-black" aria-label="Log analyzer anomaly detection" role="img">
                              <rect x="15" y="10" width="180" height="100" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <line x1="15" y1="22" x2="195" y2="22" stroke="#000000" strokeWidth="1.5" />
                              <text x="25" y="19" fontFamily="Courier New" fontSize="8" fontWeight="bold" fill="#000000">LOG_ANALYZER.EXE</text>

                              <text x="25" y="36" fontFamily="Courier New" fontSize="7" fill="#000000">10:41:22 INFO  // port: 8080 OK</text>
                              <text x="25" y="48" fontFamily="Courier New" fontSize="7" fill="#000000">10:41:35 INFO  // socket_read OK</text>

                              <rect x="20" y="56" width="170" height="16" fill="#000000" />
                              <text x="25" y="66" fontFamily="Courier New" fontSize="7" fill="#FFFFFF" fontWeight="bold">10:41:59 ALERT // UNKNOWN_CONN [x]</text>

                              <text x="25" y="84" fontFamily="Courier New" fontSize="7" fill="#000000">10:42:01 INFO  // connection reset</text>
                              <text x="25" y="96" fontFamily="Courier New" fontSize="7" fill="#000000">10:42:05 INFO  // selector active</text>

                              <rect x="210" y="15" width="75" height="90" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <circle cx="225" cy="35" r="2" fill="#000000" />
                              <circle cx="230" cy="43" r="2" fill="#000000" />
                              <circle cx="220" cy="50" r="2" fill="#000000" />
                              <circle cx="235" cy="37" r="2" fill="#000000" />
                              <circle cx="265" cy="78" r="5" fill="#000000" />
                              <line x1="265" y1="78" x2="250" y2="65" stroke="#000000" strokeWidth="1.5" />
                              <text x="235" y="60" fontFamily="Courier New" fontSize="6" fontWeight="bold" fill="#000000">OUTLIER</text>
                            </svg>
                          )}
                          {proj.slug === "ChunkKeeper" && (
                            <svg viewBox="0 0 300 120" className="w-full h-auto bg-retro-light border border-black text-black" aria-label="Storage manager chunk engine" role="img">
                              <text x="15" y="18" fontFamily="Courier New" fontSize="7" fontWeight="bold" fill="#000000">FILE_ALLOC_MAP // CACHE_SECTORS</text>

                              <rect x="15" y="25" width="270" height="30" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <line x1="60" y1="25" x2="60" y2="55" stroke="#000000" strokeWidth="1.5" />
                              <line x1="100" y1="25" x2="100" y2="55" stroke="#000000" strokeWidth="1.5" />
                              <line x1="160" y1="25" x2="160" y2="55" stroke="#000000" strokeWidth="1.5" />
                              <line x1="210" y1="25" x2="210" y2="55" stroke="#000000" strokeWidth="1.5" />
                              <line x1="250" y1="25" x2="250" y2="55" stroke="#000000" strokeWidth="1.5" />

                              <rect x="62" y="27" width="36" height="26" fill="#000000" />
                              <rect x="162" y="27" width="46" height="26" fill="#000000" stroke="#000000" />

                              <text x="37" y="43" fontFamily="Courier New" fontSize="7" textAnchor="middle" fill="#000000">EMPTY</text>
                              <text x="80" y="43" fontFamily="Courier New" fontSize="7" textAnchor="middle" fill="#FFFFFF" fontWeight="bold">CHUNK1</text>
                              <text x="130" y="43" fontFamily="Courier New" fontSize="7" textAnchor="middle" fill="#000000">FREE</text>
                              <text x="185" y="43" fontFamily="Courier New" fontSize="7" textAnchor="middle" fill="#FFFFFF" fontWeight="bold">CHUNK2</text>
                              <text x="230" y="43" fontFamily="Courier New" fontSize="7" textAnchor="middle" fill="#000000">DIRTY</text>

                              <circle cx="80" cy="95" r="16" fill="none" stroke="#000000" strokeWidth="2" />
                              <circle cx="80" cy="95" r="8" fill="none" stroke="#000000" strokeWidth="1" />
                              <line x1="80" y1="95" x2="92" y2="85" stroke="#000000" strokeWidth="2" />
                              <text x="105" y="100" fontFamily="Courier New" fontSize="8" fontWeight="bold" fill="#000000">SECTOR_INDEXER: ONLINE</text>
                            </svg>
                          )}
                          {proj.slug === "HealthCare" && (
                            <svg viewBox="0 0 300 120" className="w-full h-auto bg-retro-light border border-black text-black" aria-label="Healthcare cloud chatbot" role="img">
                              <rect x="25" y="20" width="140" height="60" fill="#FFFFFF" stroke="#000000" strokeWidth="2" rx="4" />
                              <polygon points="40,80 50,93 60,80" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <line x1="42" y1="80" x2="58" y2="80" stroke="#FFFFFF" strokeWidth="3" />

                              <rect x="40" y="32" width="12" height="36" fill="#000000" />
                              <rect x="28" y="44" width="36" height="12" fill="#000000" />
                              <rect x="30" y="46" width="32" height="8" fill="#FFFFFF" />
                              <rect x="42" y="34" width="8" height="32" fill="#FFFFFF" />

                              <text x="75" y="48" fontFamily="Courier New" fontSize="9" fontWeight="bold" fill="#000000">TRIAGE_BOT</text>
                              <text x="75" y="62" fontFamily="Courier New" fontSize="8" fill="#000000">Diagnosing...</text>

                              <path d="M210 65 C200 65 195 55 205 45 C200 30 220 20 235 30 C245 20 265 25 260 40 C270 45 265 60 250 60 L210 60 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                              <text x="233" y="48" fontFamily="Courier New" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000000">AZURE_NLP</text>

                              <line x1="165" y1="50" x2="195" y2="50" stroke="#000000" strokeWidth="2" strokeDasharray="4 2" />
                              <text x="233" y="85" fontFamily="Courier New" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000000">HIPAA // SECURE</text>
                            </svg>
                          )}
                          {!["CS_ChatBotDiscord_-Rude-_VERSION-", "AI-based-Smart-Traffic-Optimization-System", "TorrentConsole", "ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection", "ChunkKeeper", "HealthCare"].includes(proj.slug) && (
                            /* Custom SVG wrapper generic model for newly created DB projects */
                            <svg viewBox="0 0 300 120" className="w-full h-auto bg-retro-light border border-black text-black" role="img">
                              <rect x="10" y="10" width="280" height="100" fill="none" stroke="#000000" strokeWidth="2" strokeDasharray="5 5" />
                              <text x="150" y="65" fontFamily="Courier New" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#000000">DB_RECORD_SYNCHRONIZED</text>
                            </svg>
                          )}
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight text-black text-left">{proj.title}</h3>
                        <p className="text-sm leading-relaxed text-retro-gray font-medium text-left">
                          {proj.description}
                        </p>

                        {/* GitHub dynamic proxy metrics */}
                        <div className="border-t border-b border-black py-1.5 flex items-center justify-between font-mono text-[10px] select-none">
                          <span>PROXY_STARS: <span className="text-black font-bold">{stats.stars}</span></span>
                          <span>OPEN_ISSUES: <span className="text-black font-bold">{stats.issues}</span></span>
                        </div>
                        <div className="font-mono text-[10px] truncate leading-tight select-none text-left">
                          PROXY_COMMIT: <span className="text-retro-gray">{stats.commit}</span>
                        </div>

                        {/* Tech tags mapping */}
                        <div className="flex flex-wrap gap-2 pt-1 select-none">
                          {proj.techStack.map((tech, i) => (
                            <span key={i} className="font-mono text-xs border border-black bg-retro-light px-2 py-0.5">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </WindowFrame>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* TECHNICAL LOG STACK SECTION */}
        <section id="technical-log" className="container mx-auto px-4 py-16 md:py-24 border-b-2 border-black">
          <div className="mb-10 max-w-xl">
            <h2 className="text-3xl font-black tracking-tight mb-2 text-black text-left">Technical Logs Stack</h2>
            <p className="text-sm text-retro-gray font-bold font-mono text-left">
              DIRECTORY: F:/PORTFOLIO-PRANAV/SYSTEM_INFO/*
            </p>
            <p class="text-sm mt-2 text-black text-left">
              Click any stacked folder tab below to pop it out to the front and read the contents.
            </p>
          </div>

          <div className="relative w-full min-h-[520px] md:min-h-[440px] lg:min-h-[400px] bg-white border-3 border-black retro-shadow p-4 overflow-hidden">

            {/* STACKED TAB 1: TECHNICAL SKILLS */}
            <div
              onClick={() => bringToFront('TechnicalSkills')}
              style={{
                zIndex: zIndices.TechnicalSkills,
                transform: window.innerWidth >= 768 ? 'translate(0px, 0px)' : 'none'
              }}
              className={`stacked-tab absolute top-4 left-4 right-4 md:right-auto md:w-[650px] border-3 border-black bg-white p-4 cursor-pointer transition-all duration-75 ${activeWindow === 'TechnicalSkills' ? 'retro-shadow active-window' : 'retro-shadow-sm'
                }`}
            >
              <div className={`window-title-bar px-3 py-1.5 flex items-center justify-between border-b-2 border-black mb-3 ${activeWindow === 'TechnicalSkills' ? 'bg-black text-white' : 'bg-retro-light text-retro-black'
                }`}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-white border border-black"></span>
                  <span className="font-mono text-xs font-bold">TechnicalSkills.log</span>
                </div>
                <span className="font-mono text-[9px]">TYPE: LOG // ACTIVE</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mono border-b border-black pb-1 text-black text-left">MODULE // PROGRAMMING & SYSTEM ENVIRONMENT</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono select-none">
                  <div className="border border-black p-3 bg-retro-light text-left">
                    <h4 className="font-bold underline mb-2 text-black">LANGUAGES</h4>
                    <ul className="space-y-1">
                      <li>- Python 3.x</li>
                      <li>- C# (.NET)</li>
                      <li>- C</li>
                      <li>- Java</li>
                    </ul>
                  </div>

                  <div className="border border-black p-3 bg-retro-light text-left">
                    <h4 className="font-bold underline mb-2 text-black">BACKEND / CLOUD</h4>
                    <ul className="space-y-1">
                      <li>- FastAPI / REST APIs</li>
                      <li>- Azure Cognitive AI</li>
                    </ul>
                  </div>

                  <div className="border border-black p-3 bg-retro-light text-left">
                    <h4 className="font-bold underline mb-2 text-black">INTEGRATIONS</h4>
                    <ul className="space-y-1">
                      <li>- Unity Engine (C#)</li>
                      <li>- TCP Socket NIO</li>
                      <li>- Git / GitHub flow</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* STACKED TAB 2: EDUCATION */}
            <div
              onClick={() => bringToFront('AcademicPath')}
              style={{
                zIndex: zIndices.AcademicPath,
                transform: window.innerWidth >= 768 ? 'translate(24px, 24px)' : 'none'
              }}
              className={`stacked-tab absolute top-12 left-8 right-4 md:right-auto md:w-[650px] border-3 border-black bg-white p-4 cursor-pointer transition-all duration-75 ${activeWindow === 'AcademicPath' ? 'retro-shadow active-window' : 'retro-shadow-sm'
                }`}
            >
              <div className={`window-title-bar px-3 py-1.5 flex items-center justify-between border-b-2 border-black mb-3 ${activeWindow === 'AcademicPath' ? 'bg-black text-white' : 'bg-retro-light text-retro-black'
                }`}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-white border border-black"></span>
                  <span className="font-mono text-xs font-bold">AcademicPath.log</span>
                </div>
                <span className="font-mono text-[9px]">TYPE: EDU // STACKED</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mono border-b border-black pb-1 text-black text-left">MODULE // FORMAL ACADEMIC INDEX</h3>

                <div className="border border-black p-4 bg-retro-light space-y-2 text-left">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-black">B.Tech in Electronics & Communication (ECE)</h4>
                      <p className="text-xs text-retro-gray font-mono mt-0.5">Geethanjali College of Engineering & Tech</p>
                    </div>
                    <span className="font-mono text-xs border border-black bg-white px-2 py-0.5 font-bold">2023 - 2027 (EXPECTED)</span>
                  </div>
                  <p className="text-xs leading-relaxed text-retro-gray">
                    Acquiring a deep core layout in digital circuits, embedded architectures, signal parsing, data structures, algorithm complexities, and network protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* STACKED TAB 3: OBJECTIVES */}
            <div
              onClick={() => bringToFront('CareerMissions')}
              style={{
                zIndex: zIndices.CareerMissions,
                transform: window.innerWidth >= 768 ? 'translate(48px, 48px)' : 'none'
              }}
              className={`stacked-tab absolute top-20 left-12 right-4 md:right-auto md:w-[650px] border-3 border-black bg-white p-4 cursor-pointer transition-all duration-75 ${activeWindow === 'CareerMissions' ? 'retro-shadow active-window' : 'retro-shadow-sm'
                }`}
            >
              <div className={`window-title-bar px-3 py-1.5 flex items-center justify-between border-b-2 border-black mb-3 ${activeWindow === 'CareerMissions' ? 'bg-black text-white' : 'bg-retro-light text-retro-black'
                }`}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-white border border-black"></span>
                  <span className="font-mono text-xs font-bold">CareerMissions.log</span>
                </div>
                <span className="font-mono text-[9px]">TYPE: OBJ // STACKED</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mono border-b border-black pb-1 text-black text-left">MODULE // SYSTEM OBJECTIVES</h3>

                <div className="border border-black p-4 bg-retro-light space-y-3 font-mono text-xs text-black text-left">
                  <p>
                    <span className="font-bold underline text-black">MISSION_01:</span> Build fast, reliable backend systems that handle web traffic smoothly and efficiently.
                  </p>
                  <p>
                    <span className="font-bold underline text-black">MISSION_02:</span> Connect smart software logic with hardware networking to build systems that solve real-world problems.
                  </p>
                  <p>
                    <span className="font-bold underline text-black">MISSION_03:</span> Design smooth, interactive simulations and virtual experiences using engines like Unity.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT TERMINAL FORM WINDOW */}
        {visibleWindows.ContactWindow && (
          <section id="contact" className="container mx-auto px-4 py-16 md:py-24 max-w-xl">
            <WindowFrame
              titleBarText="SEND_MESSAGE.SYS"
              isActive={activeWindow === 'ContactWindow'}
              onClick={() => bringToFront('ContactWindow')}
              onClose={() => closeWindow('ContactWindow')}
              className="w-full"
              style={{ zIndex: zIndices.ContactWindow }}
            >
              <h2 className="text-3xl font-black tracking-tight mb-2 text-black text-left">Connect Terminal</h2>
              <p className="text-sm text-retro-gray mb-6 text-left">
                Establish socket channel connection. Enter parameters below to transmit payload message:
              </p>

              <form className="space-y-4 text-left" onSubmit={handleContactSubmit}>
                <div className="space-y-1">
                  <label htmlFor="name" className="block font-mono text-xs font-bold">SENDER_NAME.TXT:</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full border-2 border-black px-3 py-2 text-sm focus:outline-none focus:bg-retro-light font-mono bg-white"
                    placeholder="Enter name..."
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block font-mono text-xs font-bold">SENDER_EMAIL.TXT:</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full border-2 border-black px-3 py-2 text-sm focus:outline-none focus:bg-retro-light font-mono bg-white"
                    placeholder="Enter email..."
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block font-mono text-xs font-bold">PAYLOAD_MESSAGE.LOG:</label>
                  <textarea
                    id="message"
                    rows="4"
                    required
                    value={contactText}
                    onChange={(e) => setContactText(e.target.value)}
                    className="w-full border-2 border-black px-3 py-2 text-sm focus:outline-none focus:bg-retro-light font-mono bg-white"
                    placeholder="Write message logs here..."
                  ></textarea>
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    disabled={submittingContact}
                    className="retro-btn-lg bg-black text-white text-xs font-bold uppercase tracking-widest cursor-pointer disabled:opacity-50"
                  >
                    {submittingContact ? "TRANSMITTING..." : "TRANSMIT_PAYLOAD // SEND"}
                  </button>
                </div>
              </form>
            </WindowFrame>
          </section>
        )}

      </main>

      {/* FLOATING ADMIN CONSOLE DRAWER */}
      <div
        style={{ zIndex: 99999 }}
        className={`fixed bottom-0 left-0 right-0 bg-black text-green-400 border-t-4 border-black p-4 font-mono transition-transform duration-300 ease-in-out select-text ${terminalOpen ? 'translate-y-0 h-80' : 'translate-y-full h-80'
          }`}
      >
        <div className="flex items-center justify-between border-b border-green-800 pb-2 mb-2 select-none">
          <span className="text-xs font-bold font-mono">ADMIN SYSTEM SHELL // TOGGLE BY PRESSING BACKTICK (`)</span>
          <button
            onClick={() => setTerminalOpen(false)}
            className="hover:underline text-xs cursor-pointer text-green-400 font-bold"
          >
            [CLOSE_SHELL]
          </button>
        </div>

        <div className="overflow-y-auto h-52 text-left mb-2 space-y-1 text-xs">
          {terminalHistory.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">{line}</div>
          ))}
          <div ref={terminalBottomRef} />
        </div>

        <form onSubmit={handleTerminalSubmit} className="flex border-t border-green-900 pt-2 select-none">
          <span className="text-xs mr-2 font-mono text-green-500">
            {adminToken ? 'root' : 'admin'}@pranav_os:{adminToken ? '#' : '$'}
          </span>
          <input
            ref={terminalInputRef}
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="bg-transparent border-0 outline-none text-xs flex-grow font-mono text-green-400 focus:ring-0"
            placeholder="Type 'help' for directory operations..."
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>

      {/* CLASSIC RETRO DIALOG MODAL POPUP */}
      {alertOpen && (
        <div style={{ zIndex: 1000000 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 select-none">
          <div className="w-80 border-4 border-black bg-white retro-shadow p-3 relative">
            <div className="bg-black text-white px-3 py-1.5 flex items-center justify-between border-b-2 border-black mb-3">
              <span className="font-mono text-xs font-bold">SYSTEM_ALERT.EXE</span>
              <button
                onClick={() => setAlertOpen(false)}
                className="w-4 h-4 border border-white bg-white text-black font-bold text-[10px] flex items-center justify-center cursor-pointer hover:bg-retro-light"
              >
                X
              </button>
            </div>

            <div className="p-4 space-y-4">
              <p className="font-mono text-xs font-bold leading-relaxed text-black text-left whitespace-pre-wrap">
                {alertText}
              </p>
              <div className="text-right">
                <button
                  onClick={() => setAlertOpen(false)}
                  className="retro-btn text-xs font-bold px-4 py-1.5 cursor-pointer"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t-2 border-black py-6 select-none text-left">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div>
            <p className="font-bold text-black">&copy; 2026 PRANAV_ADEPU // UPGRADED MERN CORE</p>
            <p className="text-retro-gray mt-0.5">Proxy telemetry & secure shell activated.</p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/AdepuPranav" target="_blank" rel="noreferrer" className="hover:underline font-bold">github</a>
            <span className="text-retro-gray">|</span>
            <a href="https://www.linkedin.com/in/adepu-pranav-183618284/" target="_blank" rel="noreferrer" className="hover:underline font-bold">linkedin</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
