const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  const pr_path = core.getInput('pr_path');
  const rawPr = fs.readFileSync(pr_path);
  const pr = JSON.parse(rawPr);

  console.log(pr)

  const prInMb = pr.bytes / 1024 / 1024

  core.setOutput("pr_size_mb", prInMb);

  const base_path = core.getInput('base_path');
  const rawBase = fs.readFileSync(base_path);
  const base = JSON.parse(base);

  console.log(base)

  const baseInMb = base.bytes / 1024 / 1024

  core.setOutput("base_size_mb", baseInMb);

} catch (error) {
  core.setFailed(error.message);
}
