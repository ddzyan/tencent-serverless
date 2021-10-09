const noticeService = require("../service/notice");

class CallBackController {
  async callback(req, res, next) {
    const params = req.body;
    const result = await noticeService.callback(params);
    return res.send(result);
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
