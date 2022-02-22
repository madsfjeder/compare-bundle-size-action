const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  const pr_path = core.getInput('pr_path');
  const rawPr = fs.readFileSync(pr_path + '/bundle_size.json');
  const pr = JSON.parse(rawPr);

  console.log(pr)

  const prInMb = pr.bytes / 1024 / 1024



  const base_path = core.getInput('base_path');
  const rawBase = fs.readFileSync(base_path + '/bundle_size.json');
  const base = JSON.parse(rawBase);

  console.log(base)

  const baseInMb = base.bytes / 1024 / 1024
  console.log(baseInMb)
  const percentChange = (prInMb - baseInMb) / baseInMb * 100
  core.setOutput("pr_size", prInMb.toString());
  core.setOutput("base_size", baseInMb.toString());
  core.setOutput("percentDifference", percentChange.toString());
  core.setOutput('diff', (prInMb-baseInMb).toString());
} catch (error) {
  core.setFailed(error.message);
}
