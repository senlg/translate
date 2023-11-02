import { resolve } from "path";
import { ExtensionContext, Uri, WebviewView } from "vscode";
import Handlebars from 'handlebars';
import { readHtml } from "./readFile";
import { log } from "console";

const makeUriAsWebviewUri = (
    context: ExtensionContext,
    webviewView: WebviewView,
    uri: string
) => {
    return webviewView!.webview
        .asWebviewUri(Uri.file(resolve(context.extensionPath, uri)))
        .toString();
};
export const getHtmlForWebView = async(context: ExtensionContext, webviewView: WebviewView, bundleName: string) => {
    const htmlTemplateUri = resolve(context.extensionPath, "./index.html");
    const content = await readHtml(htmlTemplateUri);
    const template = Handlebars.compile(content);
    // inject params to template
    const sidebarBundleWebViewUri = makeUriAsWebviewUri(
        context,
        webviewView,
        `./dist/assets/${bundleName}.js`
    );
    
    const html = template({
        scriptUris: [sidebarBundleWebViewUri],
    });
    return html;
};