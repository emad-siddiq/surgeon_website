# Claude Design Prompt — Dr. Ghulam Siddiq Practice Site

Run this in a fresh Claude chat (claude.ai) **before** handing off to Claude Code. The goal is to lock down the visual direction, typography, color, and component look so Claude Code has a concrete spec to implement against instead of making aesthetic choices on its own.

---

## THE PROMPT

You're acting as my senior product designer and art director. I'm polishing a production website for **Dr. Ghulam Siddiq**, a board-certified laparoscopic and bariatric surgeon. The current site is a React prototype with a warm, soft palette (cream → peach → lilac gradients) and a mix of ad-hoc typography and component styles. I want to **keep the current vibe** — warm, calm, premium boutique-practice feel — but tighten it into a real design system worthy of production. The site also has signature 3D/WebGL background visualizations (via three-fiber) that must remain as a visual hook.

Before I hand this to an implementation agent, I want you to help me resolve the design direction. Work through the following, asking me at most **3 clarifying questions up front** (batched into one message) if genuinely needed, then produce the deliverables.

### Context to work from

Sections that exist today (keep all of them): Hero, About (doctor bio + video), Consultation form, Distinctions / credentials, Service Offerings, Bariatric procedures, Before/After Transformations (image slider), Location, Gallery, Footer. Desktop has a HoverNavBar; mobile has a MobileLogo + MobileSidebar.

Three reusable primitive candidates: Button, Container, Section, Eyebrow, Card, Tag, IconButton.

Existing fonts file: Roboto Flex variable. I'm open to replacing it.

Existing palette seeds to refine (do not throw out): cream `#FDF8F6`, peach `#F9E4DA`, lilac `#E3E3FA`.

Voice: calm, reassuring, authoritative, warm — not clinical-sterile, not luxury-flashy.

Audience: prospective bariatric surgery patients (often anxious, researching, in their 30s–60s) and referring physicians.

### What I want from you

1. **Moodboard in words** — three tight paragraphs describing the visual direction: feel, metaphors, comparable references (e.g. "feels like the quieter pages of a Kinfolk issue crossed with a Mayo Clinic patient portal"), what to avoid. No bullet lists.

2. **Final color system** — a refined token set building on cream/peach/lilac. Include primary/secondary/tertiary surfaces, ink levels (primary/secondary/muted), one restrained accent for CTAs, one supporting accent, and subtle borders. Give hex values and a one-line rationale for each. Verify WCAG AA contrast for body text and headlines and list the pairings that pass.

3. **Typography system** — recommend one serif for display + one sans for body, both available as variable fonts. Give me a fluid type scale (display, h1–h3, body-lg, body, caption) using `clamp()` with explicit line-heights, letter-spacing, and weight pairings. Explain the serif/sans contrast in one sentence.

4. **Component look specs** — for each primitive (Button, Card, Section, Eyebrow, Tag, Input, NavBar, Footer) describe: resting state, hover, focus, disabled, radius, shadow, padding rhythm, and how it uses the tokens. Terse — bullets are fine here.

5. **Motion principles** — what moves, what doesn't, durations, easing, and how the 3D background integrates without competing with content. Reference `prefers-reduced-motion` behavior.

6. **Section-by-section art direction** — one short paragraph per section (Hero, About, Consultation, Distinctions, Services, Bariatric, Transformations, Location, Gallery, Footer, Nav) describing layout, hierarchy, imagery treatment, and the *one thing* that should make it feel premium.

7. **Interactive HTML artifact** — produce a single self-contained HTML file (Tailwind via CDN is fine) that renders a **style guide / design preview page** showing: the color swatches with hex + contrast labels, the full type scale with live samples, every component primitive in every state, a mock Hero, a mock Service card, a mock Testimonial, and a mock Consultation form. This is the visual north star I'll screenshot and hand to the implementation agent. Use placeholder images via `https://images.unsplash.com/...` or inline SVG. Include the 3D background only as a subtle CSS-gradient stand-in — don't pull in three.js.

8. **Open decisions for me** — a short list (≤ 5) of design calls that are genuinely judgment vs. reasonable-default, so I can weigh in before implementation. Example: "Serif for section headlines only, or also for eyebrow labels?"

### Ground rules

- Do **not** pivot the palette to clinical blue/teal. Do not go dark mode. Do not go luxury-gold.
- Do not suggest a full rebrand (no new logo, no new doctor name treatment beyond typography).
- Keep recommendations implementable in React + Tailwind. No exotic CSS that Tailwind can't express without a custom plugin.
- Be opinionated. I'm hiring your taste — don't give me three options for every choice. One recommendation, one sentence of reasoning.
- Keep prose tight. The artifact is the main deliverable; the writing around it is scaffolding.

When you're done, end with a one-line summary of the "design north star" I can paste into the implementation prompt as a guiding quote.

---

## How to use

1. Open a fresh chat at claude.ai (use Claude Opus/Sonnet, whichever is current).
2. Paste everything between the `---` markers above.
3. Answer the clarifying questions if any.
4. Review the artifact. Iterate until it feels right.
5. Screenshot the artifact + copy the final tokens/type scale into the Claude Code mega-prompt (`CLAUDE_CODE_PROMPT.md`) under §3 Design system, replacing my placeholder values.
6. Hand off to Claude Code.
