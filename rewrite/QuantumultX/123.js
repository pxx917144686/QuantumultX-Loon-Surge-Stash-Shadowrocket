[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Guding88/Script/main/APPheji_iTunes.js
[MITM]
hostname = buy.itunes.apple.com
