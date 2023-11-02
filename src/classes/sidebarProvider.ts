import { CancellationToken, WebviewView, WebviewViewProvider, WebviewViewResolveContext, ExtensionContext,Uri } from "vscode";
import { getHtmlForWebView } from "../utils/teml";
import { Message } from "@/models/communicationMessage";
export class SidebarProvider implements WebviewViewProvider {
    constructor(protected context: ExtensionContext) { }
    
    
    async resolveWebviewView(webviewView: WebviewView, context: WebviewViewResolveContext<unknown>, token: CancellationToken) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.context.extensionUri],
        };
        
        let html = await getHtmlForWebView(this.context, webviewView, "main");
        webviewView.webview.html = html;
       
        webviewView.webview.onDidReceiveMessage((message:string) => {
            console.log(message);
            let m: Message<any> = JSON.parse(message);
            m.data.message = `我是vscode传递过来的信息${m.type}`;
            webviewView.webview.postMessage(JSON.stringify(m));
        });
    }

}