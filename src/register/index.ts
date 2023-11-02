
import * as vscode from "vscode";
import { translateWithBaidu } from "../request/baiduApi";
import { languageConfig, userBaiduApiConfig } from "../extension";

let book: vscode.StatusBarItem;
const initBook = () => {
    book = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    book.show();
    book.text = `翻译`;
    book.tooltip = "选择内容后按 ctrl+left 进行翻译";
    return book;
};
export default function initCommand(): vscode.Disposable[] {
    let commandList: vscode.Disposable[] = [];
    initBook();
    commandList.push(vscode.commands.registerCommand('translate.left', async () => {
        const editer = vscode.window.activeTextEditor;
        const selection = editer?.selection;
        let selectText = editer?.document.getText(selection) ?? "";
        let data = await translateWithBaidu({ selectText, userBaiduApiConfig, languageConfig });
        if (data) {
            book.text = (data.trans_result as { dst: string }[]).reduce((pre, cur) => {
                return { dst: pre.dst + cur.dst };
            }).dst;
            book.show();
        }
    }));
    commandList.push(vscode.commands.registerCommand('lili.translate', () => {      
        let commands: string[] = [];
        vscode.commands.getCommands(true).then(r => {
            commands = r.filter(c => /translate\./.test(c));
            if (!commands.includes('translate.left')) {
                vscode.commands.registerCommand('translate.left', async () => {
                    const editer = vscode.window.activeTextEditor;
                    const selection = editer?.selection;
                    let selectText = editer?.document.getText(selection) ?? "";
                    let data = await translateWithBaidu({ selectText, userBaiduApiConfig, languageConfig });
                    if (data) {
                        book.text = (data.trans_result as { dst: string }[]).reduce((pre, cur) => {
                            return { dst: pre.dst + cur.dst };
                        }).dst;
                        book.show();
                    }
                });
                vscode.window.showInformationMessage('Translate(翻译) is running!');
                return;
            }
            vscode.window.showInformationMessage('Translate(翻译) is ran!');
        });
    }));
    return commandList;
}
