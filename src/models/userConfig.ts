import md5 from "md5";

interface ApiConfig {
    getSign(options: string): string
};


type Params = {
    [K in string]: any
};
// OXrFkoWM58VzRCku_v9l
/**
 * @class UserBaiduApiConfig 用户百度api配置
 */
export class UserBaiduApiConfig implements ApiConfig {

    constructor({ appid, secretKey, salt = "longli" }: BaiduApiConfig) {
        this.appid = appid;
        this.secretKey = secretKey;
        this.salt = salt;
    }
    appid: string | undefined;
    salt: string;
    secretKey: string | undefined;
    /**
     * 
     * @param {selectText} 查询的字符串
     * @returns {string} 返回md5加密后的sign 
     */
    getSign(selectText :string): string {
        if (this.appid && this.secretKey) {
            return md5(`${this.appid}${selectText}${this.salt}${this.secretKey}`).toLowerCase(); 
        }
        return "";
    }
}

export class LanguageConfig {
    /**
     * 
     * @param from 输入的语言类型 默认 "en"
     * @param to 翻译成的语言类型 默认 "zh"
     */
    constructor(from: string = "en", to: string = "zh") {
        this.from = from;
        this.to = to;
    }
    from: string;
    to: string;
    /**
     * @func [switchLanguage] 交换当前输入和翻译的语言类型
     */
    switchLanguage() {
        let l = this.from;
        this.from = this.to;
        this.to = l;
    }
}