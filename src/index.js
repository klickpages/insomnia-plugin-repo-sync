const fs = require('fs');
const WorkspaceRepo = require('./WorkspaceRepo.js');
const ScreenHelper = require('./ScreenHelper.js');

const verifyRepoConfig = async (repo, context) => {
  if (await repo.isConfigured(context)) return true;

  ScreenHelper.alertError(context, 'Workspace não foi setado!');
  return false;
};

module.exports.workspaceActions = [{
  label: 'Repo Sync - Export Workspace',
  icon: 'fa-download',
  action: async (context, models) => {
    const repo = new WorkspaceRepo(context);
    if (!verifyRepoConfig(repo, context)) return;

    const path = await repo.getPath();
    const ex = await context.data.export.insomnia({
      includePrivate: false,
      format: 'yaml',
      workspace: models.workspace,
    });

    fs.writeFileSync(`${path}/${models.workspace.name}.yml`, ex);
  },
},
{
  label: 'Repo Sync - Import Workspace',
  icon: 'fa-upload',
  action: async (context, models) => {
    const repo = new WorkspaceRepo(context);
    if (!verifyRepoConfig(repo, context)) return;

    const path = await repo.getPath();
    const imported = fs.readFileSync(`${path}/${models.workspace.name}.yml`, 'utf8');

    await context.data.import.raw(imported);
  },
},
{
  label: 'Repo Sync - Configure',
  icon: 'fa-cog',
  action: async (context, models) => {
    const repo = new WorkspaceRepo(context);

    const repoPath = await ScreenHelper.askRepoPath(context, {
      currentPath: await repo.getPath(),
      workspaceName: models.workspace.name,
    });
    if (repoPath == null) return;

    await repo.setPath(repoPath);
  },
}];
