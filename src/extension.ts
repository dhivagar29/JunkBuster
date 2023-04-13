import * as vscode from 'vscode';

function countJunkCharacters(editor: vscode.TextEditor, junkCharacters: string[]) {
    let text = editor.document.getText();
    let count = 0;

    for (let i = 0; i < text.length; i++) {
        if (junkCharacters.includes(text.charAt(i))) {
            count++;
        }
    }

    vscode.window.showInformationMessage(`Number of Junk Characters: ${count}`);
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.countJunkCharacters', () => {
        let editor = vscode.window.activeTextEditor;

        if (editor) {
            let config = vscode.workspace.getConfiguration('countJunkCharacters');
            let junkCharacters = config.get<string[]>('junkCharacters', ['!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','{','}','|','\\',';',':','\'','"',',','.','<','>','/','?','~','`']);

            countJunkCharacters(editor, junkCharacters);
        }
    });

    context.subscriptions.push(disposable);

    let disposable2 = vscode.commands.registerCommand('extension.configureCountJunkCharacters', () => {
        vscode.window.showInputBox({
            placeHolder: 'Comma-separated list of junk characters'
        }).then(value => {
            if (value) {
                let config = vscode.workspace.getConfiguration('countJunkCharacters');
                config.update('junkCharacters', value.split(',').map(s => s.trim()), true);
            }
        });
    });

    context.subscriptions.push(disposable2);
}

export function deactivate() {}
