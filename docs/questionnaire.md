# Questionnaire Flow

Ask questions conversationally in rounds. Don't read this file out loud — use it as your guide. Adapt the phrasing to feel natural. After each round, summarize what you've heard back to the user before moving on.

---

## Round 1: The Basics (always ask)

1. **What's your business or project called?**
   - Required. No default.

2. **In one sentence, what do you do?**
   - Default: Infer from the name and context.

3. **Who are you trying to reach?**
   - Default: "General audience"
   - Follow up if vague: "Are these mostly young professionals, families, business owners...?"

After Round 1, summarize: "Got it — [business] helps [audience] with [service]. Let me ask about the look and feel."

---

## Round 2: Visual Direction

4. **Do you have any websites you like the look of?**
   - If yes: Use `web-reader` skill to analyze them. Note colors, layout, typography, vibe.
   - Default: Skip, choose based on industry.

5. **Any color preferences, or should I pick based on your industry?**
   - Default: Use `ui-ux-pro-max` to recommend. Run: `python3 ~/.claude/skills/ui-ux-pro-max-repo/src/ui-ux-pro-max/scripts/search.py "<industry>" --domain color`
   - If skill unavailable: Choose based on industry norms from `docs/design-guide.md`.

6. **Light or dark theme?**
   - Default: Light.

7. **What vibe should visitors get?**
   - Offer options: professional, playful, bold, elegant, minimal, warm, modern, edgy, luxurious.
   - Default: "Professional and approachable."

After Round 2, present the design direction: "Here's what I'm thinking — [color palette], [font pairing], [general layout approach]. Sound good?"

---

## Round 3: Content

8. **What's the one thing you want visitors to do?**
   - Examples: sign up, book a call, buy something, learn more, get a quote.
   - Default: "Learn more / get in touch."

9. **What are 3-4 key things to highlight?**
   - These become the features/services section.
   - Default: Generate from business description + industry norms.

10. **Got a tagline or slogan?**
    - Default: Write one. Run through humanizer.

11. **Any testimonials, reviews, or social proof?**
    - Default: Create a placeholder testimonials section. Use realistic but clearly placeholder names.

After Round 3, recap: "I have everything I need for content. A couple more technical questions."

---

## Round 4: Technical (keep brief)

12. **Do you have a logo?**
    - Accept: file path, URL, or "no"
    - Default: Text-only logo using the business name with the headline font.

13. **Any specific images to use?**
    - Accept: file paths, URLs, or "no"
    - Default: No stock photos. Use geometric patterns, gradients, or abstract decorative elements that match the design system.

14. **Want me to deploy it to a live URL when we're done?**
    - Explain: "I can deploy it to Vercel — you'll get a link you can share."
    - Default: Yes.

---

## Handling "I don't know" / "You decide"

When the user defers any decision:
- **Colors**: Run ui-ux-pro-max color search for their industry + vibe.
- **Fonts**: Run ui-ux-pro-max typography search for their vibe keyword.
- **Copy**: Generate based on their answers, run through humanizer.
- **Layout**: Use proven section order: Hero > Features > Social Proof > CTA > Footer.
- **Style**: Match to their industry: law firm = refined/serif, tech startup = clean/modern, restaurant = warm/organic, creative agency = bold/experimental.

Always tell the user what you chose and why, briefly: "I went with a warm palette — terracotta and off-white — because it fits the artisan food space well."

---

## After All Rounds

Summarize the full brief back to the user:
- Business name and description
- Target audience
- Design direction (colors, fonts, vibe)
- Main CTA
- Key sections/features
- Assets (logo, images, or defaults)
- Deploy: yes/no

Ask: "Does this capture everything? I'll start building once you give me the green light."

Then proceed to Phase 2 (Design System) in the CLAUDE.md workflow.
