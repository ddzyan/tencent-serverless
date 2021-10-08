const cloudbase = require("@cloudbase/node-sdk");

const { SECRET_ID, SECRET_KEY } = process.env;

const cloudClient = cloudbase.init({
  env: "ddz-7g7dmadt19e29120",
  secretId: SECRET_ID,
  secretKey: SECRET_KEY,
});

const COLLECTION = "service";

const db = cloudClient.database();

class NoticeService {
  async addContent(keyword, content) {
    const _ = db.command;

    const res = await db
      .collection(COLLECTION)
      .where({
        keyword: _.eq(keyword),
      })
      .get();

    if (res) {
      throw new Error("关键字已经存在");
    }

    await db.collection(COLLECTION).add({
      keyword: [keyword],
      content,
    });
  }
}

module.exports = new NoticeService();
