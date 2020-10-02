const { dirname } = require('path');
class ScreenHelper {
  static async alertError(context, message) {
    return await context.app.alert('Erro!', message);
  }

  static async askRepoPath(context, options={}) {
    await context.app.alert(
      'Selecione Repositorio',
      `Escolha o repositorio para sincronizar workspaces\nWorkspace Atual: ${options.currentPath}`
    );
    const path = await context.app.showSaveDialog({defaultPath: options.workspaceName});

    return dirname(path);
  }
}

module.exports = ScreenHelper;
