// modify_response.js

// 获取请求的URL
let url = $request.url;

// 获取响应体
let body = $response.body;

try {
  // 解析JSON响应体
  let obj = JSON.parse(body);
  // $logger.log(`Parsed JSON: ${JSON.stringify(obj)}`);

  // 检查并删除 'events' 字段
  if (obj && obj.data && 'device' in obj.data) {
    obj.data.device.total_open_count = obj.data.device.open_count;
  }

  // 将修改后的对象转回字符串
  let modifiedBody = JSON.stringify(obj);
  // $notification.post(`Modified Body: ${modifiedBody}`);

  // 设置新的响应体
  $done({ body: modifiedBody });
} catch (e) {
  // 如果解析失败，记录错误并返回原始响应
  $notification.post(`Error parsing JSON: ${e}`);
  $done({});
}