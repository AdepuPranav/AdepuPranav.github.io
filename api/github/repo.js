export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { repo } = req.query;
  if (!repo) {
    return res.status(400).json({ error: 'Missing required query parameter "repo"' });
  }

  const headers = { 'User-Agent': 'Pranav-Portfolio-App' };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // 1. Fetch repository metadata (stars, open issues)
    const metaRes = await fetch(`https://api.github.com/repos/${repo}`, { headers });
    if (!metaRes.ok) {
      return res.status(metaRes.status).json({ error: `GitHub API metadata fetch failed: ${metaRes.statusText}` });
    }
    const metaData = await metaRes.json();

    // 2. Fetch latest commit message
    const commitRes = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, { headers });
    let commitMessage = 'Local backup commit synchronized';
    if (commitRes.ok) {
      const commitData = await commitRes.json();
      if (commitData && commitData.length > 0) {
        commitMessage = commitData[0].commit.message;
      }
    }

    return res.status(200).json({
      stars: metaData.stargazers_count,
      issues: metaData.open_issues_count,
      commit: commitMessage
    });
  } catch (error) {
    console.error('GitHub proxy error:', error);
    return res.status(500).json({ error: 'Server proxy failed to resolve GitHub API host' });
  }
}
