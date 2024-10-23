/*
 * vidhub
[rewrite_local]

http://api.7littlemen.com/path/to/vidhub/api/modifySettings url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/vidhub.js

/*
var body = $response.body;
let obj = JSON.parse(body);
obj.data["IsOneTimePayment"] = true; // 将 IsOneTimePayment 设置为 true
body = JSON.stringify(obj);
$done({body});
