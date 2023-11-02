import axios from "axios";
import { LanguageConfig, UserBaiduApiConfig } from "../models/userConfig";
import * as vscode from "vscode";
import { log } from "console";
const errMap = new Map([["PARAM_FROM_TO_OR_Q_EMPTY", "请选择翻译内容"]]);


type RequestBaiduOptions = {
    selectText: string
    languageConfig: LanguageConfig,
    userBaiduApiConfig: UserBaiduApiConfig
};
export const translateWithBaidu = async ({
    selectText, languageConfig, userBaiduApiConfig
}: RequestBaiduOptions): Promise<any> => {
    log(userBaiduApiConfig.getSign(selectText));
    let url = `https://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(selectText ?? "")}&from=${languageConfig.from}&to=${languageConfig.to}&appid=${userBaiduApiConfig.appid}&salt=${userBaiduApiConfig.salt}&sign=${userBaiduApiConfig.getSign(selectText??"")}`;
    let res = await axios.get(url);
    if (res.status === 200) {
        console.log(res);
        
        if (res.data.error_code) {
            let { error_msg: errorMsg } = res.data;
            vscode.window.showErrorMessage(errMap.get(errorMsg) ?? errorMsg);
            return;
        }
        return res.data;
    }
};