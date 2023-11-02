import yaml from "js-yaml";
import fs from "fs";
import { ExtensionContext, window } from "vscode";
import { resolve } from "path";
export const InitUserConfig = (context: ExtensionContext): BaiduApiConfig | undefined => {
    let config;
    try {
        const yamlPath = resolve(context.extensionPath, "./userconfig.yaml");
        console.log(yamlPath);
        const yamlString = fs.readFileSync(yamlPath, {
            flag: "a+", //没有文件就创建
            encoding: 'utf-8'
        });
        config = yaml.load(yamlString) as BaiduApiConfig;
    } catch (error) {
        console.error(error);
        window.showErrorMessage("加载yaml配置文件出错了");
    }
    return config;
};