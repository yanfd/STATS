# Repository Guidelines

## Project Structure & Module Organization
- Frontend apps:
  - `globe/` and `globe2/`: Next.js (App Router). Source in `src/app` (some legacy assets in `app/`). Components in `src/components/`, static assets in `public/`.
  - `project2/nextjs_testing/`: Next.js playground. Code in `src/`, assets in `public/`.
- Backend:
  - `project2/nextjs_fastapi/`: FastAPI service. Entry `main.py`; routes in `routes/`; schemas in `schemas/`; helpers in `utils/`; runtime dirs `uploads/` and `processed/`.

## Build, Test, and Development Commands
- Frontend (any app)
  - `cd globe && npm install && npm run dev` — start dev server on port 3000.
  - `npm run build` — production build. `npm run start` — serve build.
  - `npm run lint` — ESLint (Next config).
- Backend (FastAPI)
  - `cd project2/nextjs_fastapi && ./run.sh` — create venv, install deps, run dev.
  - Or `uvicorn main:app --reload` — start API; docs at `/docs`. Health: `/health`.

## Coding Style & Naming Conventions
- TypeScript/React: 2‑space indent; components PascalCase; hooks/utilities camelCase; colocate files by feature. Prefer functional components; avoid default exports for shared components.
- Styling: Tailwind CSS v4; group utility classes by layout → spacing → color for readability.
- Python: PEP 8, 4‑space indent, snake_case modules; add type hints and concise docstrings.

## Testing Guidelines
- No formal test runner is configured. For frontends, use `npm run lint` and ensure pages build (`npm run build`). For API smoke tests: `curl http://localhost:8000/health`.
- When adding tests, prefer `*.test.tsx` under `src/` (Vitest/Jest) and `tests/test_*.py` with pytest.

## Commit & Pull Request Guidelines
- Use Conventional Commits seen in history: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
- PRs include: purpose/scope, steps to validate, screenshots or recordings for UI changes, sample requests/responses for API changes, and linked issues (e.g., “Closes #123”).

## Security & Configuration Tips
- Update CORS origins before deployment in `project2/nextjs_fastapi/main.py:58`.
- Do not commit secrets; prefer environment variables. Token helpers live in `project2/nextjs_fastapi/scripts/`.

## Agent‑Specific Instructions
- This guide applies to the entire repository tree. Keep changes minimal, align with existing structure, and avoid unrelated refactors.

