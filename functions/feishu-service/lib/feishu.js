const axios = require("axios");
// {
//   "schema": "2.0",
//   "header": {
//       "event_id": "5e3702a84e847582be8db7fb73283c02",
//       "event_type": "im.message.receive_v1",
//       "create_time": "1608725989000",
//       "token": "rvaYgkND1GOiu5MM0E1rncYC6PLtF7JV",
//       "app_id": "cli_9f5343c580712544",
//       "tenant_key": "2ca1d211f64f6438"
//   },
//   "event": {
//       "sender": {
//           "sender_id": {
//               "union_id": "on_8ed6aa67826108097d9ee143816345",
//               "user_id": "e33ggbyz",
//               "open_id": "ou_84aad35d084aa403a838cf73ee18467"
//           },
//           "sender_type": "user"
//       },
//       "message": {
//           "message_id": "om_5ce6d572455d361153b7cb51da133945",
//           "root_id": "om_5ce6d572455d361153b7cb5xxfsdfsdfdsf",
//           "parent_id": "om_5ce6d572455d361153b7cb5xxfsdfsdfdsf",
//           "create_time": "1609073151345",
//           "chat_id": "oc_5ce6d572455d361153b7xx51da133945",
//           "chat_type": "group",
//           "message_type": "text",
//           "content": "{"text":"hello"}",
//       }
//   }
// }
module.exports = {
  async sendMsg({
    accessToken,
    receiveIdType,
    receiveId,
    content,
    msgType = "text",
  }) {
    const res = await axios({
      url: `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=${receiveIdType}`,
      method: "post",
      headers: {
        Authorization: `Bearer t-${accessToken}}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        receive_id: receiveId,
        content,
        msgType,
      },
    });

    if (res.status !== 200) {
      throw new Error("错误");
    }

    return (res && res.data) || {};
  },
};
