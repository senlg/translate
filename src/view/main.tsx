
import { Message } from '@/models/communicationMessage';
import React,{ChangeEvent, useState, useEffect} from 'react';
import ReactDom from 'react-dom';
const vscode = (window as any).acquireVsCodeApi();
const App: React.FunctionComponent<any> = () => {
  const [value, setValue] = useState("");
  const [vscodeData, setData] = useState<Message<any>>();
  useEffect(() => {
    window.addEventListener("message", (e) => {
      try {
        let data: Message<any> = JSON.parse(e.data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    });
  },[]);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    return (type: 'appid' | 'secretKey') => {
      setValue(e.target.value);
      let m: Message<'appid' | 'secretKey'> = {
        type,
        data: {
          [type]: e.target.value
        }
      };
      vscode.postMessage(JSON.stringify(m));
    };
  };
  return <React.StrictMode>
    <input onChange={(e) => onInputChange(e)("appid")} value={value} placeholder='请输入您的appId' type="text" />
    <div style={{ textAlign: "center", fontSize: "18px" }}>
      Message:{vscodeData?.data.message}
    </div>
  </React.StrictMode>;
};

ReactDom.render(<App/>, document.getElementById('root'));