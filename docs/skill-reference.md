# Skill Reference

## How Skills Work
Skills are markdown files installed at `~/.claude/skills/` (local) and `~/.agents/skills/` (symlinked). Claude Code automatically reads `SKILL.md` files from these directories. You don't need to "import" skills — they're available when present.

## Check Availability
```bash
ls ~/.claude/skills/<skill-name>/SKILL.md 2>/dev/null || ls ~/.agents/skills/<skill-name>/SKILL.md 2>/dev/null
```

---

## Required Skills (core experience)

| Skill | Check Paths | What It Does | Fallback |
|-------|-------------|-------------|----------|
| `frontend-design` | `~/.agents/skills/frontend-design/` | Design methodology, anti-AI-slop rules, typography/color/layout/motion guidelines | Use `docs/design-guide.md` |
| `shadcn-ui` | `~/.agents/skills/shadcn-ui/` | React component library with Tailwind CSS. Copy-paste accessible components. | Follow [shadcn docs](https://ui.shadcn.com) manually |
| `humanizer` | `~/.claude/skills/humanizer/` | Removes AI writing patterns from text. 24+ pattern detection. | Check AI patterns list in `docs/design-guide.md` |

## Recommended Skills (enhanced experience)

| Skill | Check Paths | What It Does | Fallback |
|-------|-------------|-------------|----------|
| `ui-ux-pro-max` | `~/.claude/skills/ui-ux-pro-max-repo/` | Searchable databases of UI styles, color palettes, font pairings. CLI: `python3 src/ui-ux-pro-max/scripts/search.py` | Manual color/font selection |
| `vercel-react-best-practices` | `~/.agents/skills/vercel-react-best-practices/` | 62 performance rules across 8 categories for React/Next.js | Standard Next.js defaults |
| `playwright-cli` | `~/.claude/skills/playwright-cli/` | Browser automation for screenshots and visual QA | User checks localhost manually |
| `seo-audit` | `~/.agents/skills/seo-audit/` | Technical SEO analysis, meta tags, heading structure | Basic meta tag setup only |

## Optional Skills (bonus features)

| Skill | Check Paths | What It Does |
|-------|-------------|-------------|
| `web-reader` | `~/.agents/skills/web-reader/` | Extract content from reference URLs the user provides |
| `deep-research` | `~/.agents/skills/deep-research/` | Systematic web research for industry-specific copy |
| `chrome-bridge-automation` | `~/.agents/skills/chrome-bridge-automation/` | Vision-driven browser automation via user's Chrome |

## Invocation Examples

### ui-ux-pro-max
```bash
# Color palette for a restaurant
python3 ~/.claude/skills/ui-ux-pro-max-repo/src/ui-ux-pro-max/scripts/search.py "restaurant warm" --domain color

# Font pairing for elegant vibe
python3 ~/.claude/skills/ui-ux-pro-max-repo/src/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography

# Landing page structure for SaaS
python3 ~/.claude/skills/ui-ux-pro-max-repo/src/ui-ux-pro-max/scripts/search.py "saas" --domain landing
```

### playwright-cli
```bash
playwright-cli open http://localhost:3000
playwright-cli screenshot --filename=preview.png
playwright-cli resize 375 812
playwright-cli screenshot --filename=preview-mobile.png
playwright-cli close
```
