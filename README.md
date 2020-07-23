# Insomnia Core Repo Sync Plugin

This plugin was developed to make it easier to sync workspaces in a given repository.

To use it, just install in your Insomnia Core application and go to > `Repo Sync - Configure` and set at the folder where you want your workspace config files to be exported/imported from.

Then you can go to `Repo Sync - Export Workspace` to instantly export your current workspace to your repo and can use `Repo Sync - Import Workspace` to import any repository changes on the current workspace. Each workspace will generate a `<workspace-name>.yml` file inside your repository.

We suggest you to use it with a git repository where you can create versions of your workspaces configs.
