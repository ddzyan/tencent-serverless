const axios = require("axios");
const dayjs = require("dayjs");
const config = require("../config");
let accessToken = { createdTime: null, token: "" };
module.exports = {
  async sendMsg({ receiveIdType, receiveId, content, msgType = "text" }) {
    try {
      const token = await this.getAccessToken();
      const res = await axios({
        url: `${config.feishu.url}/im/v1/messages?receive_id_type=${receiveIdType}`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          receive_id: receiveId,
          content: JSON.stringify({
            text: content,
          }),
          msg_type: msgType,
        },
      });

      const { code, msg, data } = res.data;
      if (code !== 0) {
        throw new Error(msg);
      }
      console.log("sendMsg", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async generateToken() {
    const res = await axios({
      url: `${config.feishu.url}/auth/v3/tenant_access_token/internal`,
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        app_id: config.feishu.appId,
        app_secret: config.feishu.appSecret,
      },
    });

    const { code, msg, tenant_access_token, expire } = res.data;
    if (code !== 0) {
      throw new Error(msg);
    }
    accessToken.token = tenant_access_token;
    accessToken.createdTime = new Date();
  },

  async getAccessToken() {
    if (
      !accessToken.createdTime ||
      dayjs(new Date()).diff(accessToken.createdTime, "hour" > 2)
    ) {
      await this.generateToken();
    }

    return accessToken.token;
  },
};
