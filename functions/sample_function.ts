import { DefineFunction, SlackFunction } from "deno-slack-sdk/mod.ts";
// import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
// import { DOMParser } from "https://js.sabae.cc/DOMParser.js";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/future/functions/custom
 */
export const SampleFunctionDefinition = DefineFunction({
  callback_id: "sample_function",
  title: "Sample function",
  description: "A sample function",
  source_file: "functions/sample_function.ts",
});

// This function takes the input from the open form step, adds formatting, saves our
// updated object into the Slack hosted datastore, and returns the updated message.
export default SlackFunction(
  SampleFunctionDefinition,
  async ({ client }) => {
    const bbsFetch = await fetch(
      "https://phoebe.bbspink.com/test/read.cgi/mobpink/1676264391",
    );
    const status = bbsFetch.status;
    //文字化け対策
    const ab = await bbsFetch.arrayBuffer();
    const td = new TextDecoder("Shift_JIS");
    const text = td.decode(ab);
    //文字化け対策
    // const text = await bbsFetch.text();
    console.log(status);

    // DOMParserクラスを作成
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    if (!doc) {
      console.log("null doc");
      return { outputs: {} };
    }
    const elem = doc.querySelectorAll(
      ".thread div.post",
    );
    console.log(elem.length);

    // 取得した要素を反復処理
    for (let index = 780; index < 820; index += 1) {
      const num = index + 1;
      const date = doc.querySelector(
        `div[data-id='${num}'] div.meta span.date`,
      );

      // コンソールに要素のテキストを出力
      const message = doc.querySelector(
        `div[data-id='${num}'] div.message span`,
      );

      // コンソールに要素のテキストを出力
      console.log(message?.textContent);
      const sendBbsNotifier = await client.chat.postMessage({
        channel: "C049X4MRRDG",
        text: "`" + num + "@" + date?.textContent + "` " + message?.textContent,
      });
      if (!sendBbsNotifier.ok) {
        console.log(`sendBbsNotifier failed. in ${num}`);
        console.log(sendBbsNotifier.error);
        return { outputs: {} };
      }
    }
    return { outputs: {} };
  },
);
