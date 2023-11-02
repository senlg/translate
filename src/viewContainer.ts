
import { window, ExtensionContext } from "vscode";
import { SidebarProvider  } from "./classes/sidebarProvider";
export function initWebviewContainer(context: ExtensionContext) {
    context.subscriptions.push(window.registerWebviewViewProvider("lili", new SidebarProvider(context) , {
        webviewOptions: {
            retainContextWhenHidden: true
        }
    }));
}
