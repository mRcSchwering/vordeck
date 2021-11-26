import { P, H4, Link, Code, BlockCode, Ol, Img } from "./components";

const treeOut = `$ tree -L 1
.
├── app.py
├── environment.yml
├── events
├── README.md
├── samconfig.toml
├── SAM_README.md
├── src
├── template.yaml
├── tests
└── vscode.env`;

const vscodeSettings = `{
  "python.pythonPath": "/home/marc/anaconda3/envs/myenv/bin/python",
  "python.formatting.provider": "black",
  "python.linting.mypyEnabled": true,
  "editor.formatOnSave": true,
  "terminal.integrated.shellArgs.linux": ["-c", "export \`cat vscode.env\`; bash"]
}`;

const lintSettings = `{
  "python.linting.pylintArgs": [
    "--enable=W0614",
    "--ignored-classes=SQLObject,Registrant,scoped_session,Session",
    "--ignored-modules=alembic.*",
    "--extension-pkg-whitelist=pydantic"
  ],
  "python.linting.mypyEnabled": true,
  "python.linting.pylintEnabled": true,
  "python.linting.mypyArgs": [
    "--ignore-missing-imports",
    "--follow-imports=silent",
    "--show-column-numbers"
  ]
}`;

const formatSettings = `{
  "python.formatting.provider": "black",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "editor.formatOnSave": true,
}`;

const genericSettings = `{
  "editor.acceptSuggestionOnEnter": "off",
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  "workbench.tree.indent": 16,
  "git.enableSmartCommit": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "git.confirmSync": false
}`;

const jupyterSettings = `{
  "jupyter.sendSelectionToInteractiveWindow": false,
  "jupyter.askForKernelRestart": false,
  "workbench.editorAssociations": {
    "*.ipynb": "jupyter-notebook"
  },
  "jupyter.notebookFileRoot": "\${workspaceFolder}",
  "notebook.cellToolbarLocation": {
    "default": "right",
    "jupyter-notebook": "left"
  }
}`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/chosen_one_vscode.jpg"
        width="700px"
        height="300px"
      />
      <P>
        This is for all the times I have struggled finding any information on
        why my VSCode doesn't work properly anymore. First things first, I think{" "}
        <Link
          label="this SO thread"
          href="https://stackoverflow.com/questions/53653083/how-to-correctly-set-pythonpath-for-visual-studio-code/62581540"
        />{" "}
        is probably the best starting point for debugging VSCode settings. My
        regular problems typically fall into one of these categories:
      </P>
      <Ol>
        <li>linter can't find a module</li>
        <li>integrated terminal can't find a module</li>
        <li>files are not linted anymore</li>
        <li>auto-format doesn't work anymore</li>
      </Ol>
      <H4>Typical Backend Setup</H4>
      <P>
        Here is a typical backend setup for me when writing a serverless backend
        using <Link label="SAM" href="https://aws.amazon.com/serverless/sam/" />
        . It took me a while to correctly configure all aspects of it in VSCode.
        This might not help you directly but maybe you find some settings
        useful. The project root directory looks like this:
      </P>
      <BlockCode code={treeOut} lang="bash" />
      <P>
        <i>src/</i> contains the deployed source code, <i>tests/</i> the testing
        suite, and
        <i>app.py</i> is a small app for local development. When using
        developing for running tests the python working directory is{" "}
        <Code>./</Code>. In the deployed app however it's <Code>./src/</Code>
      </P>
      <P>
        I need to make sure that <Code>PYTHONPATH=./src</Code> is set for (1)
        syntax and intellisense, (2) the linters, and (3) in the integrated
        terminal. Furthermore, I need to make sure the correct conda
        environment, <i>mypy</i>, and <i>black</i> are used. My{" "}
        <b>.vscode/settings.json</b> looks like this:
      </P>
      <BlockCode code={vscodeSettings} lang="json" />
      <P>
        The <i>vscode.env</i> just contains <Code>PYTHONPATH=./src</Code>. Note
        that <b>python.pythonPath</b> will look different for you. It should be
        the path that points to your conda environment. If you first open the
        repository in VSCode, it's best to just use the python interpreter
        selection (in the bottom blue bar on the left). This will create the{" "}
        <i>.vscode/settings.json</i> with the correct <i>python.pythonPath</i>.
        You can then add the other keys to this file.
      </P>
      <H4>More Settings</H4>
      <P>
        Below are some additional seetings I usually need to set. I'm just going
        to paste them here for my future self. Otherwise I will keep looking up
        these settings over and over again.
      </P>
      <h5>Linting</h5>
      <BlockCode code={lintSettings} lang="json" />
      <h5>Formatting</h5>
      <BlockCode code={formatSettings} lang="json" />
      <h5>Jupyter Notebooks</h5>
      <BlockCode code={jupyterSettings} lang="json" />
      <h5>Other</h5>
      <BlockCode code={genericSettings} lang="json" />
    </>
  );
}
