const cloudbase = require("@cloudbase/node-sdk");
const { MESSAGE_TYPE, SENDER_TYPE, RECEIVE_ID_TYPE } = require("../enum");
const feishu = require("../lib/feishu");

const { SECRET_ID, SECRET_KEY } = process.env;

const cloudClient = cloudbase.init({
  env: "ddz-7g7dmadt19e29120",
  secretId: SECRET_ID,
  secretKey: SECRET_KEY,
});

const COLLECTION = "service";

const db = cloudClient.database();
const _ = db.command;

class NoticeService {
  async addContent(keyword, content) {
    const res = await db
      .collection(COLLECTION)
      .where({
        keyword: _.eq(keyword),
      })
      .get();

    if (res.data.length > 0) {
      throw new Error("关键字已经存在");
    }

    await db.collection(COLLECTION).add({
      keyword: [keyword],
      content,
    });
  }

  async eventCallback(params) {
    const { uuid, event } = params;
    const { message_id, msg_type, text, open_chat_id } = event;
    let keyword;
    if (msg_type === MESSAGE_TYPE.TEXT) {
      keyword = text;
    }

    let answer = await db
      .collection(COLLECTION)
      .where({
        keyword: _.eq(keyword),
      })
      .get();

    console.log("collection", answer);
    answer = answer.data.length > 0 ? answer.data[0].content : "未找到匹配结果";

    await this.sendMsg(RECEIVE_ID_TYPE.CHAT_ID, open_chat_id, answer);
    return true;
  }

  async sendMsg(receiveIdType, receiveId, content) {
    const res = await feishu.sendMsg({
      receiveIdType,
      receiveId,
      content,
      msg_type: MESSAGE_TYPE.TEXT,
    });

    return res;
  }
}

module.exports = new NoticeService();
