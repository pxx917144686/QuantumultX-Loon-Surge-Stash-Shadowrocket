/*
# 芒果tv //*.mgtv.com
# 会员解锁 (国区,美区,平板端,mac端)
^https:\/\/mobile-stream\.api\.mgtv\.com\/v1\/video\/source\? url script-request-header https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/MG.js
^https:\/\/(mobile|pad|pcc)\.api\.mgtv\.com\/v8\/video\/getSource\? url script-request-header https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/MG.js
^https:\/\/(mobile|pad|pcc|mac)\.api\.mgtv\.com\/v8\/video\/getSource\? url script-request-header https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/MG.js
# 无用请求
^http:\/\/[\d\.]+:\d{5}\/\?cmd=indexes url reject
# 首页左上角推广
^http:\/\/[\d\.]+\/odin\/c1\/(channel\/ads|skin\/config)\? url reject-dict
# 底部tab红点
^https:\/\/damang\.api\.mgtv\.com\/station\/album\/red\/dot\? url reject-dict
# 播放器界面
^https:\/\/hb-boom\.api\.mgtv\.com\/release\/pullReleaseInfo url reject-dict
# 我的页面
^https:\/\/me\.bz\.mgtv\.com\/v3\/module\/list\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/cnftp.js
# 首页信息流,顶部tab
^http:\/\/mob-st\.bz\.mgtv\.com\/odin\/c1\/channel\/index\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/cnftp.js
^https?:\/\/dc2?\.bz\.mgtv\.com\/dynamic\/v1\/channel\/(index|vrsList)\/\w url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/cnftp.js
# 底部tab
^https:\/\/mobile\.api\.mgtv\.com\/mobile\/config\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/cnftp.js
# 升级弹窗
^https:\/\/mobile\.api\.mgtv\.com\/v2\/mobile\/checkUpdate\? url reject-dict
# 播放详情页
^http:\/\/mobile-thor\.api\.mgtv\.com\/v1\/vod\/cms\/list\? url reject-dict
^https:\/\/mobile\.api\.mgtv\.com\/v10\/video\/info\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/cnftp.js
^https:\/\/mobile-thor\.api\.mgtv\.com\/v1\/vod\/info\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/cnftp.js
# 搜索框填充词
^http:\/\/mobileso\.bz\.mgtv\.com\/spotlight\/search\/v1\? url reject-dict
^https?:\/\/mobileso\.bz\.mgtv\.com\/mobile\/recommend\/v2\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/cnftp.js
hostname = *.mgtv.com
*/

var url = $request.url,
  updatedUrl = url;
if (url.includes("video/getSource")) {
  updatedUrl = url.replace(/([?&]ticket=)\w{32}/, "$12F393DE6A7D230B9987EAB1A16ADE6FD");
} else if (url.includes("video/source")) {
  updatedUrl = url.replace(/([?&]ticket=)\w{32}/, "$12F393DE6A7D230B9987EAB1A16ADE6FD");
} else if (url.includes("mac-specific-endpoint")) { 
  updatedUrl = url.replace(/([?&]ticket=)\w{32}/, "$12F393DE6A7D230B9987EAB1A16ADE6FD");
}
$done({
  "url": updatedUrl
});
