---
description: "Create next story from sharded PRD/Architecture and validate via checklist"
---

1) Verify core config exists
- Ensure file `docs/core-config.yaml` exists.
- If missing, stop and create from `docs/core-config.yaml` template.

2) Determine next story id
- Read `docs/core-config.yaml` → `devStoryLocation`, `prd.*`.
- If stories exist under `docs/stories/`, find highest `{epic}.{story}.story.md`.
- If last story is not Done, ask whether to proceed with next draft.

3) Gather PRD and Architecture context (sharded)
- From `docs/prd/` and `docs/architecture/` read relevant shards based on story type (backend/frontend/full-stack).
- Cite sources in references.

4) Generate draft using template
- Create `docs/stories/{epic}.{story}.story.md` using `docs/templates/story-tmpl.yaml` fields:
  - meta(id,title,status), context(requirements,references), technical(data_models,api_endpoints,components,file_paths), testing(test_plan,acceptance_criteria), notes(structure_alignment,risks).

5) Validate with checklist
- Open `docs/checklists/story-draft-checklist.md` and ensure all items are satisfied.

// turbo
6) Optional: run smoke bench
- Run: `python scripts/bench-run.py --task sample-task --cases all --recipe poml/engineering/ai-engineer.poml --provider openai --model gpt-5`.

7) Commit
- Commit the new story and any doc updates.
