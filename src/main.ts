
import * as vscode from 'vscode';
import * as vero from './veronica';

export function activate(context: vscode.ExtensionContext)
{
    console.log('Activated veronica');

    context.subscriptions.push(vscode.commands.registerCommand('extension.howMuchIsIt',       vero.howMuchIsIt));
    context.subscriptions.push(vscode.commands.registerCommand('extension.changeInputRadix',  vero.changeInputRadix));
    context.subscriptions.push(vscode.commands.registerCommand('extension.changeOutputRadix', vero.changeOutputRadix));
}

export function deactivate()
{
}
