const core = require('@actions/core');
const fs = require('fs');

try {
  const pr_path = core.getInput('pr_path');
  const rawPr = fs.readFileSync(pr_path + '/bundle_size.json');
  const pr = JSON.parse(rawPr);
  const prInMb = pr.bytes / 1024 / 1024

  const base_path = core.getInput('base_path');
  const rawBase = fs.readFileSync(base_path + '/bundle_size.json');
  const base = JSON.parse(rawBase);
  const baseInMb = base.bytes / 1024 / 1024

  const diff = prInMb - baseInMb;
  const percentChange = (diff) / baseInMb * 100

  core.setOutput("pr_size", prInMb.toPrecision(2)+'MB');
  core.setOutput("base_size", baseInMb.toPrecision(2)+'MB');
  core.setOutput("percentDifference", percentChange.toPrecision(2));
  core.setOutput('diff', (diff).toPrecision(2)+'MB');
} catch (error) {
  core.setFailed(error.message);
}
