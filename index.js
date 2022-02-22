const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  const pr_path = core.getInput('pr_path');
  const rawPr = fs.readFileSync(pr_path + '/bundle_size.json');
  const pr = JSON.parse(rawPr);

  console.log(pr)

  const prInMb = pr.bytes / 1024 / 1024

  core.setOutput("pr_size_mb", prInMb);

  const base_path = core.getInput('base_path');
  const rawBase = fs.readFileSync(base_path + '/bundle_size.json');
  const base = JSON.parse(base);

  console.log(base)

  const baseInMb = base.bytes / 1024 / 1024
  const percentChange = (prInMb - baseInMb) / baseInMb * 100

  core.setOutput("base_size_mb", baseInMb);
  core.setOutput("percentDifference", percentChange);
  core.setOutput('diff', prInMb-baseInMb);
} catch (error) {
  core.setFailed(error.message);
}
