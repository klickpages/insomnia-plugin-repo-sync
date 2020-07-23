class ScreenHelper {
  static async alertError(context, message) {
    return await context.app.alert('Erro!', message);
  }

  static async askRepoPath(context, options={}) {
    await context.app.alert(
      'Selecione Repo',
      `Escolha o repositorio para sincronizar workspaces\nWorkspace Atual: ${options.currentPath}`
    );
    const path = await context.app.showSaveDialog({defaultPath: options.workspaceName});

    return normalizePath(path);
  }
}

const normalizePath = (path) => {
  if (path == null || path == 'undefined') return null;

  return path.substr(0, path.lastIndexOf('/'));
};

module.exports = ScreenHelper;
