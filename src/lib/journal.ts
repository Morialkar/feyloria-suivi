// Lit le journal de bord de Feyloria (journal/JOURNAL.md, recopié chaque
// jour depuis le dépôt du jeu) et en tire les jours, au moment du build.
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export interface Puce {
  heure?: string;
  html: string;
}

export interface Jour {
  date: string; // AAAA-MM-JJ
  titre: string;
  resumeHtml: string;
  resumeTexte: string;
  fait: Puce[];
  commence: Puce[];
  suivre: Puce[];
  commits: number;
  image?: string; // une image du jour (public/jours/AAAA-MM-JJ.*), sinon rien
}

const racine = process.cwd();
const sections: Record<string, keyof Pick<Jour, 'fait' | 'commence' | 'suivre'>> = {
  fait: 'fait',
  'commencé': 'commence',
  commence: 'commence',
  'à suivre': 'suivre',
  'a suivre': 'suivre',
};

function puce(ligne: string): Puce {
  const t = ligne.replace(/^\s*[-*]\s+/, '');
  const m = t.match(/^(\d{1,2}:\d{2})\s+[—–-]\s+(.*)$/);
  if (m) return { heure: m[1], html: marked.parseInline(m[2]) as string };
  return { html: marked.parseInline(t) as string };
}

function imageDu(date: string): string | undefined {
  const dir = path.join(racine, 'public', 'jours');
  for (const ext of ['webp', 'jpg', 'jpeg', 'png']) {
    if (fs.existsSync(path.join(dir, `${date}.${ext}`))) return `jours/${date}.${ext}`;
  }
  return undefined;
}

/** Les jours du journal, du plus ancien au plus récent. */
export function lireJournal(fichier = path.join(racine, 'journal', 'JOURNAL.md')): Jour[] {
  const md = fs.readFileSync(fichier, 'utf8');
  const parts = md.split(/^## (?=\d{4}-\d{2}-\d{2})/m).slice(1);
  const jours: Jour[] = [];
  for (const part of parts) {
    const lignes = part.split('\n');
    const tete = lignes.shift() ?? '';
    const m = tete.match(/^(\d{4}-\d{2}-\d{2})\s*(?:[—–-]\s*(.*))?$/);
    if (!m) continue;
    const jour: Jour = { date: m[1], titre: (m[2] ?? '').trim(), resumeHtml: '', resumeTexte: '', fait: [], commence: [], suivre: [], commits: 0 };
    let section: keyof typeof sections | '' = '';
    const resume: string[] = [];
    for (const l of lignes) {
      const s = l.match(/^###\s+(.*)$/);
      if (s) {
        section = (s[1].trim().toLowerCase() as keyof typeof sections) in sections ? (s[1].trim().toLowerCase() as keyof typeof sections) : '';
        continue;
      }
      const c = l.match(/^Commits\s*:\s*(\d+)/i);
      if (c) {
        jour.commits = Number(c[1]);
        continue;
      }
      if (section && /^\s*[-*]\s+/.test(l)) {
        jour[sections[section]].push(puce(l));
      } else if (!section) {
        resume.push(l);
      }
    }
    const texte = resume.join('\n').trim();
    jour.resumeHtml = marked.parse(texte) as string;
    jour.resumeTexte = texte.replace(/[`*_]/g, '').replace(/\n-\s+/g, ' · ').split('\n\n')[0];
    jour.image = imageDu(jour.date);
    jours.push(jour);
  }
  return jours.sort((a, b) => a.date.localeCompare(b.date));
}

/** "mardi 10 novembre 2026". */
export function dateLongue(date: string): string {
  const d = new Intl.DateTimeFormat('fr-CA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
  return d.charAt(0).toUpperCase() + d.slice(1);
}

/** "10 nov." */
export function dateCourte(date: string): string {
  return new Intl.DateTimeFormat('fr-CA', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}

/** Le chemin d'un fichier du site, sous la base GitHub Pages. */
export function lien(p: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
}
