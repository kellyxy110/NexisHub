import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const workflows = readFileSync("src/lib/workflows.ts", "utf8");

test("workflow primitives define truthful publication and pilot gates", () => {
  assert.match(workflows, /INTERNAL_REVIEW/);
  assert.match(workflows, /METHODOLOGY_REVIEW/);
  assert.match(workflows, /ETHICS_REVIEW/);
  assert.match(workflows, /REVISION_REQUIRED/);
  assert.match(workflows, /DATA_COLLECTION_COMPLETE/);
});

test("workflow primitives include server-side permission vocabulary", () => {
  assert.match(workflows, /publication:publish/);
  assert.match(workflows, /publication:adjudicate/);
  assert.match(workflows, /consent:revoke/);
  assert.match(workflows, /studio:sow-approve/);
});
