// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { initWebviewContainer } from './viewContainer';
import { LanguageConfig, UserBaiduApiConfig } from "./models/userConfig";
import initCommand from './register';
import { InitUserConfig } from './config';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

export let userBaiduApiConfig: UserBaiduApiConfig;
export let languageConfig: LanguageConfig;
export function activate(context: vscode.ExtensionContext) {
	const config = InitUserConfig(context);
	console.log(config);
	
	userBaiduApiConfig = new UserBaiduApiConfig(config ?? {});
	languageConfig = new LanguageConfig();
	let { subscriptions } = context;
	try {
		console.log('Congratulations, your extension "translate(翻译)" is starting');
		initWebviewContainer(context);
		initCommand().forEach(item => {
			subscriptions.push(item);
		});
		vscode.window.showInformationMessage('Translate(翻译) is running!');
	} catch (error) {
		console.error(error);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
