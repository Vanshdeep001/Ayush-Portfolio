import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

// Load projects from JSON data file
const loadProjects = () => {
  const raw = readFileSync(join(__dirname, '..', 'data', 'projects.json'), 'utf-8');
  return JSON.parse(raw);
};

// ── GET /api/projects ───────────────────────────────────────
// Returns all projects
router.get('/', (_req, res) => {
  try {
    const projects = loadProjects();
    res.json(projects);
  } catch (err) {
    console.error('Error loading projects:', err);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// ── GET /api/projects/:id ───────────────────────────────────
// Returns a single project by id
router.get('/:id', (req, res) => {
  try {
    const projects = loadProjects();
    const project = projects.find((p) => p.id === Number(req.params.id));
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Error loading project:', err);
    res.status(500).json({ error: 'Failed to load project' });
  }
});

export default router;
