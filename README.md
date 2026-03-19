# Claude Web Builder

Build a professional landing page in minutes. Clone this repo, open it with Claude Code, and answer a few questions. Claude handles the design, code, preview, and deployment.

## What You Get

- A custom Next.js landing page built to your specifications
- Professional design that passes the "AI slop test"
- Mobile-responsive layout
- SEO-optimized meta tags
- One-click Vercel deployment

## Quick Start

```bash
git clone https://github.com/Soyenriquerocha/calude-webbuilder.git
cd calude-webbuilder
claude
```

Claude will greet you and start asking about your project. Answer the questions, or say "you decide" for anything you're unsure about. Claude builds your page, previews it, and offers to deploy.

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed
- Node.js 18+ installed
- (Optional) Vercel account for deployment

## Recommended Skills

For the best experience, install these Claude Code skills:

| Skill | What It Does |
|-------|-------------|
| `frontend-design` | Design methodology and anti-AI-slop rules |
| `shadcn-ui` | Component library for polished UI |
| `humanizer` | Makes copy sound human, not AI-generated |
| `ui-ux-pro-max` | Color palette and font pairing recommendations |
| `playwright-cli` | Visual preview without leaving the terminal |
| `vercel-react-best-practices` | Next.js performance optimization |

The builder works without these skills but produces better results with them.

## How It Works

The `CLAUDE.md` file contains instructions that turn Claude Code into a guided web-building assistant. When Claude opens this project, it reads those instructions and walks you through:

1. **Discovery** — Questions about your business, audience, and design preferences
2. **Design** — Color palette, typography, and layout recommendations
3. **Build** — Scaffolds and codes your landing page with Next.js, Tailwind, and shadcn/ui
4. **Preview** — Launches localhost and takes screenshots for review
5. **Deploy** — Pushes to Vercel for a live URL you can share

## Tech Stack

- Next.js 15+ (App Router)
- Tailwind CSS 4
- shadcn/ui
- TypeScript
- Framer Motion

## Project Structure

```
calude-webbuilder/
├── CLAUDE.md              # Instructions for Claude Code (the brain)
├── docs/
│   ├── system-prompt.md   # Agent personality rules
│   ├── questionnaire.md   # Guided question flow
│   ├── design-guide.md    # Design principles
│   ├── deployment-guide.md
│   ├── skill-reference.md
│   └── examples/          # Example project briefs
├── LICENSE
└── README.md
```

When Claude builds your page, it creates a `site/` directory with the full Next.js project.

## License

MIT License - see [LICENSE](LICENSE)

---

Created by [@Soyenriquerocha](https://github.com/Soyenriquerocha) / [Tododeia](https://tododeia.com)
