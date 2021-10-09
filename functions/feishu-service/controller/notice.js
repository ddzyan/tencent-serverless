const noticeService = require("../service/notice");
const { URL_TYPE } = require("../enum");
class CallBackController {
  async callback(req, res, next) {
    console.log(JSON.stringify(req.body));
    const params = req.body;
    const { type, challenge } = params;
    if (type === URL_TYPE.URL_VERIFICATION) {
      return res.send({
        challenge,
      });
    } else if (type === URL_TYPE.EVENT_CALLBACK) {
      await noticeService.eventCallback(params);
      return res.send({
        state: true,
        msg: "发送成功",
      });
    }

    throw new Error("没有匹配的事件");
  }

  async addContent(req, res, next) {
    const { keyword, content } = req.body;
    if (!keyword || !content)
      return res.status(400).send({
        state: false,
        msg: "缺少必要参数 keyword or content",
      });

    if (keyword.length < 2 || keyword.length > 10)
      return res.status(400).send({
        state: false,
        msg: "关键字长度必须大于2小于10",
      });
    await noticeService.addContent(keyword, content);
    return res.send({
      state: true,
      msg: "添加成功",
    });
  }
}

module.exports = new CallBackController();
