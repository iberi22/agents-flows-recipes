# agents-flows-recipes

![POML](https://img.shields.io/badge/Microsoft-POML-0078D4?logo=microsoft&logoColor=white)
![OpenAI GPT-5 Ready](https://img.shields.io/badge/OpenAI-GPT--5-black?logo=openai)
![Gemini 2.5](https://img.shields.io/badge/Google-Gemini%202.5-4285F4?logo=google)
![Qwen Code](https://img.shields.io/badge/Alibaba-Qwen%20Code-00A76F?logo=alibabadotcom)
[![BMAD-METHOD](https://img.shields.io/badge/BMAD--METHOD-Repo-6f42c1?logo=github)](https://github.com/bmad-code-org/BMAD-METHOD)

## Repository manifest (POML)

 The repo is organized for POML-first agent flows with multi-provider support and benchmarking. This manifest clarifies structure and conventions.

 ```poml
 <poml>
   <let name="repo">agents-flows-recipes</let>
   <let name="version">v0.1</let>
   <let name="providers">
     {
       "openai": { "model": "gpt-5", "temperature": 0.2 },
       "gemini": { "model": "gemini-2.5-pro", "temperature": 0.2 },
       "qwen":   { "model": "Qwen2.5-Coder", "temperature": 0.1 }
     }
   </let>
   <let name="layout">
     {
       "poml_recipes": "poml/**/{agent}.poml (canonical, multi-provider)",
       "docs": "docs/* (rules, providers, tools)",
       "bench": "bench/<task>/cases/*.json (micro-bench)",
       "scripts": "scripts/* (adapters, bench-run)"
     }
   </let>
   <let name="bench_harness">
     {
       "runner": "scripts/bench-run.py",
       "results_out": "bench/<task>/results/*.json",
       "lockfile": "recipes.lock.json (pin: sha, date, metrics)"
     }
   </let>
   <let name="prompt_variants">["base","conservative","creative"]</let>
   <let name="constraints">[
     "temperatures: 0.0–0.2 for tool-calling/codegen",
     "shell disabled by default; enable per-recipe",
     "web.search requires API key (off by default)"
   ]</let>
 </poml>
 ```

## Per-recipe structure (POML, canonical)

Place recipes under `poml/<department>/<agent>.poml`.

```poml
<poml>
  <let name="topology">solo</let>
  <let name="bench_id">ai-engineer</let>
  <let name="tool_mode">auto</let>
  <let name="variant">base</let>
  <let name="providers">
    {
      "openai": { "model": "gpt-5", "temperature": 0.2 },
      "gemini": { "model": "gemini-2.5-pro", "temperature": 0.2 },
      "qwen":   { "model": "Qwen2.5-Coder", "temperature": 0.1 }
    }
  </let>
  <let name="tools">["fs.read","fs.write","fs.replace","shell.run","fs.search"]</let>
  <let name="tool_aliases">{ "fs.read@qwen": "read_file", "shell.run@qwen": "run_shell_command" }</let>

  <role>
    You are an expert ...
  </role>
  <task>
    Steps / behaviors ...
  </task>
  <output-format>
    - Summary
    - Plan
    - Diffs / code
    - Validation notes
  </output-format>
</poml>
```

 POML is the source of truth. Legacy Markdown agents are optional and only for Claude Code compatibility.
Markdown content is considered legacy and is not linted nor enforced in CI/CD anymore; only POML recipes are validated.

## Quick Start (POML)

1) Clone the repo

```bash
git clone https://github.com/iberi22/agents-flows-recipes.git
```

1) Run a benchmark with a POML recipe

```bash
python scripts/bench-run.py \
  --task sample-task \
  --cases all \
  --recipe poml/engineering/ai-engineer.poml \
  --provider openai \
  --model gpt-5
```

1) Results are written to `bench/<task>/results/*.json`. Pin metrics in `recipes.lock.json` per release.

### Migration: Convert Markdown to POML

Use the helper script to migrate legacy Markdown recipes into canonical POML files under `poml/<department>/`.

```bash
python scripts/convert_md_to_poml.py \
  --departments design marketing product project-management studio-operations testing bonus \
  --src-root . \
  --dst-root poml
```

- Add `--force` to overwrite existing `.poml` files.
- After migration, update lists to reference `poml/**`. Benchmarks should point `--recipe` to the generated `.poml`.

## Directory Structure

POML-first layout:

```text
agents-flows-recipes/
├── poml/
│   └── engineering/
│       ├── ai-engineer.poml
│       ├── backend-architect.poml
│       ├── devops-automator.poml
│       ├── frontend-developer.poml
│       ├── mobile-app-builder.poml
│       ├── rapid-prototyper.poml
│       └── test-writer-fixer.poml
├── bench/
│   ├── ai-engineer/
│   │   └── cases/*.json
│   └── sample-task/
│       └── cases/*.json
├── scripts/
│   └── bench-run.py
├── docs/
│   └── qwen-rules.md
└── recipes.lock.json
```

## Complete Agent List

### Engineering Department (`poml/engineering/`)

- ai-engineer.poml
- backend-architect.poml
- devops-automator.poml
- frontend-developer.poml
- mobile-app-builder.poml
- rapid-prototyper.poml
- test-writer-fixer.poml

### Product Department (`poml/product/`)

- feedback-synthesizer.poml
- sprint-prioritizer.poml
- trend-researcher.poml

### Marketing Department (`poml/marketing/`)

- app-store-optimizer.poml
- content-creator.poml
- growth-hacker.poml
- instagram-curator.poml
- reddit-community-builder.poml
- tiktok-strategist.poml
- twitter-engager.poml

### Design Department (`poml/design/`)

- brand-guardian.poml
- ui-designer.poml
- ux-researcher.poml
- visual-storyteller.poml
- whimsy-injector.poml

### Project Management (`poml/project-management/`)

- experiment-tracker.poml
- project-shipper.poml
- studio-producer.poml

### Studio Operations (`poml/studio-operations/`)

- analytics-reporter.poml
- finance-tracker.poml
- infrastructure-maintainer.poml
- legal-compliance-checker.poml
- support-responder.poml

### Testing & Benchmarking (`poml/testing/`)

- api-tester.poml
- performance-benchmarker.poml
- test-results-analyzer.poml
- tool-evaluator.poml
- workflow-optimizer.poml

## Bonus Agents (`poml/bonus/`)

- studio-coach.poml
- joker.poml

## Proactive Agents

Some agents trigger automatically in specific contexts:

- **studio-coach** - When complex multi-agent tasks begin or agents need guidance
- **test-writer-fixer** - After implementing features, fixing bugs, or modifying code
- **whimsy-injector** - After UI/UX changes
- **experiment-tracker** - When feature flags are added

## Best Practices

1. **Let agents work together** - Many tasks benefit from multiple agents
2. **Be specific** - Clear task descriptions help agents perform better
3. **Trust the expertise** - Agents are designed for their specific domains
4. **Iterate quickly** - Agents support the 6-day sprint philosophy

## Technical Details

### Agent Structure (POML)

Each agent includes in `.poml`:

- **let: topology, bench_id, tool_mode, providers, tools, tool_aliases**
- **role**: expertise and identity
- **task**: steps/behaviors and constraints
- **output-format**: response structure
- **stylesheet** (optional): tone, verbosity, bullets

### Adding New Agents (POML)

1) Create `poml/<department>/<agent>.poml`
2) Define `<let>` blocks for providers/tools/topology/bench_id
3) Add `<role>`, `<task>`, `<output-format>`
4) Validate by running `bench-run.py` with a sample bench task
5) Optionally add provider-specific `tool_aliases` (e.g., Qwen)

## Roadmap

- **Headers per recipe (POML `<let>`):**
  - `topology` (`solo` | `multi`), `bench_id`, `variant`/`variants`, `tools`, `tool_aliases`, `providers`.
  - Recommended extras: `constraints` (list), `prompt_variants` (map of variant → brief intent).
- **Micro-bench layout:**
  - `bench/<task>/cases/*.json` with fields: `id`, `input`, `checks.contains`.
  - Results: `bench/<task>/results/results_<timestamp>.json`.
- **Bench harness (`scripts/bench-run.py`):**
  - Dry-run friendly. Parses `.poml` `<let>` and legacy `.md` frontmatter.
  - Example: `python scripts/bench-run.py --task sample-task --cases all --recipe poml/engineering/ai-engineer.poml --provider openai --model gpt-5`.
- **Lockfile (`recipes.lock.json`):**
  - Pin `release.sha` and `release.date` plus `metrics[bench_id][provider][model].variants[*]`
    with `accuracy`, `avg_latency_ms`, `tool_calls`.
  - Update flow: run bench → copy metrics → bump date (local: 2025-08-24) and current `git rev-parse HEAD`.
- **Multi-provider variants:**
  - OpenAI: `gpt-5`
  - Gemini: `gemini-2.5-pro`, `gemini-2.5-flash` (planned)
  - Qwen: `Qwen2.5-Coder`
  - Use `<let name="providers">{ ... }</let>` to override per provider (e.g., temperature, model).
- **Temperature guidance:**
  - Deterministic/code: 0.1–0.3 (default `0.2`).
  - Ideation/creative: 0.6–0.8 (e.g., set `variant=creative`).
- **Hybrid template approach:**
  - Keep a unified base POML template with canonical tools and roles.
  - Layer provider-specific overrides in `providers` and `tool_aliases`.
  - For specialized behaviors, define `variants` (e.g., `base`, `creative`, `fast`) and select via CLI `--variants` or `<let name="variant">`.

## CI y Pre-commit

- **Husky + lint-staged (local):**
  - `npm install --no-fund --no-audit`
  - En cada commit se valida SOLO POML:
    - `scripts/check_poml_headers.py` sobre `poml/**/*.poml`
- **Pre-push (Husky):**
  - Valida headers POML en todos los `.poml` del repo.
- **CI (GitHub Actions):**
  - Validación de headers POML (Python 3.11)
  - Smoke benches (dry-run) con recetas POML:
    - `poml/engineering/ai-engineer.poml`
    - `poml/marketing/content-creator.poml`
- **Plantilla POML multi-proveedor:** `docs/poml-template.poml`

## Agent Performance

Track agent effectiveness through:

- Task completion time
- User satisfaction
- Error rates
- Feature adoption
- Development velocity

## Status

- **Active**: Fully functional and tested
- **Coming Soon**: In development
- **Beta**: Testing with limited functionality

## Customizing Agents for Your Studio

### Agent Customization Todo List

Use this checklist when creating or modifying agents for your specific needs:

#### Required Components

- **YAML Frontmatter**
  - **name**: Unique agent identifier (kebab-case)
  - **description**: When to use + 3-4 detailed examples with context/commentary
  - **color**: Visual identification (e.g., blue, green, purple, indigo)
  - **tools**: Specific tools the agent can access (Write, Read, MultiEdit, Bash, etc.)
- **tools**: Specific tools the agent can access (fs.read, fs.write, fs.replace, shell.run, fs.search, web.fetch)

#### System Prompt Requirements (500+ words)

- **Agent Identity**: Clear role definition and expertise area
- **Core Responsibilities**: 5-8 specific primary duties
- **Domain Expertise**: Technical skills and knowledge areas
- **Studio Integration**: How agent fits into 6-day sprint workflow
- **Best Practices**: Specific methodologies and approaches
- **Constraints**: What the agent should/shouldn't do
- **Success Metrics**: How to measure agent effectiveness

#### Required Examples by Agent Type

**Engineering Agents** need examples for:

- Feature implementation requests
- Bug fixing scenarios
- Code refactoring tasks
- Architecture decisions

**Design Agents** need examples for:

- New UI component creation
- Design system work
- User experience problems
- Visual identity tasks

**Marketing Agents** need examples for:

- Campaign creation requests
- Platform-specific content needs
- Growth opportunity identification
- Brand positioning tasks

**Product Agents** need examples for:

- Feature prioritization decisions
- User feedback analysis
- Market research requests
- Strategic planning needs

**Operations Agents** need examples for:

- Process optimization
- Tool evaluation
- Resource management
- Performance analysis

#### Testing & Validation Checklist

- **Trigger Testing**: Agent activates correctly for intended use cases
- **Tool Access**: Agent can use all specified tools properly
- **Output Quality**: Responses are helpful and actionable
- **Edge Cases**: Agent handles unexpected or complex scenarios
- **Integration**: Works well with other agents in multi-agent workflows
- **Performance**: Completes tasks within reasonable timeframes
- **Documentation**: Examples accurately reflect real usage patterns

#### Agent File Structure Template (POML)

```poml
<poml>
  <let name="topology">solo</let>
  <let name="bench_id">your-task-id</let>
  <let name="tool_mode">auto</let>
  <let name="providers">{ "openai": {"model":"gpt-5","temperature":0.2} }</let>
  <let name="tools">["fs.read","fs.write","fs.replace","shell.run","fs.search"]</let>
  <let name="tool_aliases">{}</let>

  <role>
    You are a [role] who [primary function]...
  </role>
  <task>
    - Plan → Act → Verify
    - Prefer tool-first actions (fs.search/read before edits)
  </task>
  <output-format>
    - Summary
    - Plan
    - Diffs / code
    - Validation
  </output-format>
</poml>
```

#### Department-Specific Guidelines

**Engineering** (`engineering/`): Focus on implementation speed, code quality, testing
**Design** (`design/`): Emphasize user experience, visual consistency, rapid iteration
**Marketing** (`marketing/`): Target viral potential, platform expertise, growth metrics

### Script `bench-run`

- Ejecuta una receta POML sobre `bench/<task>` y escribe métricas: `bench/<task>/results/<timestamp>.json`.
- Parámetros: `--recipe poml/.../*.poml --provider <openai|gemini|qwen> --model <...> --variants v1,v2 --cases all|id`.
- Para recetas `.md` (legacy), se valida YAML contra esquema; para `.poml` se hace validación mínima de `<let>`.
- Salida resumida + detalle por caso.

### `recipes.lock.json`

- Por release, fijar:
  - **sha**: commit de recetas.
  - **date**: fecha de publicación.
  - **metrics**: resumen por receta/variante (aciertos, latencia media, costo aprox.).
- Permite reproducibilidad y comparación entre releases.

### Versiones por LLM con herramientas nativas

- **OpenAI (GPT‑5 / Responses API)**
  - Usar Function/Tool Calling con `tools` (JSON Schema) y `tool_choice`.
  - Recomendado: `tool_mode=auto` para orquestación general; `required` cuando se exige llamada a una función.
  - Docs: Function calling (OpenAI).
- **Gemini 2.5 Pro y 2.5 Flash**
  - Usar `function_calling_config: AUTO | ANY | NONE` y `allowed_function_names` cuando se quiera restringir.
  - Soporta uso combinado de herramientas nativas y funciones de usuario; evaluar `AUTO` por defecto.
  - Docs: Function calling con Gemini.
- **Qwen / QwenCoder**
  - Usar configuración de llamadas a herramientas/funciones análoga ("tool calling").
  - Mapeo sugerido: `tool_mode` -> { auto | required | none } (adapter `scripts/adapters/qwencoder.py`).
  - Alias de herramientas vía `tool_aliases` con sufijo `@qwen` cuando difiere el nombre.
  - Docs: [Qwen Code tools overview](https://github.com/QwenLM/qwen-code/blob/main/docs/tools/index.md)

### Temperaturas recomendadas

- **Planificación/razonamiento estructurado**: 0.0–0.3
- **Generación de código / tool‑calling estricto**: 0.0–0.2 (mejor adherencia a esquemas)
- **Ideación creativa / contenido largo**: 0.6–0.8 (subir si se busca diversidad)
- Referencia general: PromptingGuide – LLM Settings.

### Plantilla unificada vs. especializada por LLM

- **Unificada (recomendada)**:
  - Pros: menos archivos, portabilidad; se parametriza `provider`, `model`, `tool_mode`, `tool_aliases`.
  - Contras: cierta complejidad de mapeos por proveedor.
- **Especializada por LLM**:
  - Pros: ajustes finos y documentación dedicada.
  - Contras: duplicación de contenido y mantenimiento mayor.
- **Estrategia híbrida**: plantilla base + overrides por proveedor vía YAML (alias de herramientas, `tool_mode`, `temperature`).

### Roadmap (POML‑first)

- Migración completa a `.poml` para todas las carpetas (design, marketing, product, etc.).
- Extender benchmarks (`bench/<task>/cases/*.json`) por agente y departamento.
- Ejecutar `bench-run.py` y consolidar métricas en `recipes.lock.json` por release (sha, date, provider/model, variantes, accuracy, latencia).
- Añadir variantes multi‑proveedor (OpenAI/Gemini/Qwen) y alias de herramientas por proveedor donde aplique.
- Documentar adapters por proveedor si se agregan.

Referencias:

- OpenAI: [Function calling](https://platform.openai.com/docs/guides/function-calling?api-mode=responses)
- Gemini: [Function calling](https://ai.google.dev/gemini-api/docs/function-calling)
- LLM Settings (temperatura): [PromptingGuide – LLM Settings](https://www.promptingguide.ai/introduction/settings)
- Qwen/QwenCoder: [Tools and function calling](https://github.com/QwenLM/qwen-code/tree/main/docs/tools)
- Qwen (local): [Qwen tools (local)](docs/qwen-tools.md), [Qwen rules (local)](docs/qwen-rules.md)

## BMAD‑aligned: Lógicas extraídas e integradas

- Separación estricta de roles (`planificación` vs `desarrollo`):
  reflejada en recetas POML con `topology` y roles claros en `<role>` y
  pasos en `<task>`.
- Sharding de documentación (PRD/Arquitectura/Historias):
  - `docs/prd/` y `docs/architecture/` (p. ej.,
    `coding-standards.md`, `tech-stack.md`, `source-tree.md`).
  - `docs/stories/` con `docs/templates/story-tmpl.yaml` y checklist
    `docs/checklists/story-draft-checklist.md`.
- Flujos ejecutables y checklists: workflow
  `.windsurf/workflows/create-next-story.md` guía pasos secuenciales para
  crear la siguiente historia.
- Elicitación estructurada (iteración + validación): se fomenta en
  `<task>` y en el formato de salida con secciones de plan/validación.
- Configuración centralizada: `docs/core-config.yaml` como fuente común
  para reglas, providers y convenciones.
- Herramientas canónicas y mapeos por proveedor: uso de
  `fs.read/write/replace/search`, `shell.run`, `web.fetch` y `tool_aliases`
  por proveedor (p. ej., `@qwen`).
- Bench reproducible: harness `scripts/bench-run.py`, casos en
  `bench/<task>/cases/*.json` y pin de métricas en `recipes.lock.json`.
- Validación de headers POML: `scripts/check_poml_headers.py` exige
  `<let>` mínimos (`topology`, `bench_id`, `tools`, `providers`).

## Cambios recientes (2025-08-26)

- **Husky + lint-staged**
  - `.husky/pre-commit` ejecuta `npx lint-staged` (solo POML via `scripts/check_poml_headers.py`).
  - `.husky/pre-push` valida headers POML repo‑wide.
- **Markdownlint**
  - Deprecado. Configuración y checks eliminados del repo/CI.
- **Validador de headers POML**: `scripts/check_poml_headers.py` (revisa `<let>` requeridos).
- **CI (GitHub Actions)**: `.github/workflows/ci.yml`
  - Eliminado el job de lint de Markdown.
  - Se mantiene `validate-poml-headers` y `bench-smoke` para recetas POML.
- **Normalización de finales de línea**: `.gitattributes` mantiene `eol=lf` para textos y `.husky/*`.
- **Ignorar artefactos**: `.gitignore` cubre `node_modules/`, caches de Python y salidas de bench (`bench/**/results/*.json`, `bench/**/metrics/*.csv`).
- **Plantillas y técnicas avanzadas**
  - Plantilla POML multi‑proveedor: `docs/poml-template.poml`.
  - Técnicas avanzadas: `docs/advanced-techniques.md`.
- **Documentación BMAD**: PRD/Arquitectura/Historias y workflow `.windsurf/workflows/create-next-story.md`.

### Notas de entorno

- Windows: asegúrate de tener `python` en PATH para lint‑staged; si solo tienes `py`, puedes usar `py -3 scripts/check_poml_headers.py --`.
- Si cambiaste finales de línea a CRLF, ejecuta `git add --renormalize .` tras aplicar `.gitattributes`.

## Contributing

To improve existing agents or suggest new ones:

1. Use the customization checklist above
2. Test thoroughly with real projects
3. Document performance improvements
4. Share successful patterns with the community
