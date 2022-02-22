const core = require('@actions/core');
const github = require('@actions/github');

try {
  const base_path = core.getInput('base_path');
  console.log(`base_path: ${base_path}!`);
  console.log(JSON.parse(base_path))

  const pr_path = core.getInput('pr_path');
  console.log(`pr_path: ${pr_path}!`);
  console.log(JSON.parse(pr_path))

} catch (error) {
  core.setFailed(error.message);
}
