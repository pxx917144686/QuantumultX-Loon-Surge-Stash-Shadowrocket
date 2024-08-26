/******************************************
 * DreamFacePro
 * pxx917144686
 * apple商店：https://apps.apple.com/us/app/dreamface-ai-video-generator/id1624172324
 ******************************************
[rewrite_local]
^https?:\/\/dreamfaceapp\.com\/df-server\/user\/save_user_login$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/DreamFacePro.js
[mitm] 
hostname = dreamfaceapp.com
******************************************/

var r,x,n=["dmlwX3Byb2R1Y3RfaWQ=","c3RyaW5naWZ5","cGFyc2U=","Ym9keQ==","ZGF0YQ==","cmlnaHRz","cmVuZXdhbA==","dmlwX3R5cGU=","dmlwX2xhYmVs","dmlwX3JlbWFpbmRlcl9kYXk=","ZXhwaXJlc19kYXRl","aGF2ZV90cmlhbA==","ZXhwaXJlc19kYXRlX2Zvcm1hdA==","Mjk5OS0xMi0yOCAwOTowMDowMC4wMDA="];r=n,x=296,function(x){for(;--x;)r.push(r.shift())}(++x);var t,o=function(r,x){r-=0;var t=n[r];void 0===o.ysZNba&&(!function(){var r;try{var x=Function('return (function() {}.constructor("return this")( ));');r=x()}catch(x){r=window}r.atob||(r.atob=function(r){for(var x,n,t=String(r).replace(/=+$/,""),o=0,c=0,a="";n=t.charAt(c++);~n&&(x=o%4?64*x+n:n,o++%4)?a+=String.fromCharCode(255&x>>(-2*o&6)):0)n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n);return a})}(),o.TddQMO=function(r){for(var x=atob(r),n=[],t=0,o=x.length;t<o;t++)n+="%"+("00"+x.charCodeAt(t).toString(16)).slice(-2);return decodeURIComponent(n)},o.eLythI={},o.ysZNba=!0);var c=o.eLythI[r];return void 0===c?(t=o.TddQMO(t),o.eLythI[r]=t):t=c,t};t=JSON[o("0x0")]($response[o("0x1")]),t[o("0x2")][o("0x3")]={},t[o("0x2")][o("0x3")][o("0x4")]=!1,t[o("0x2")][o("0x3")][o("0x5")]="TRY_YEAR_PACKAGE",t[o("0x2")][o("0x3")][o("0x6")]=!0,t[o("0x2")][o("0x3")][o("0x7")]=999999,t[o("0x2")][o("0x3")][o("0x8")]=32503338e6,t[o("0x2")][o("0x3")][o("0x9")]=!1,t[o("0x2")][o("0x3")][o("0xa")]=o("0xb"),t[o("0x2")][o("0x3")][o("0xc")]="96",$done({body:JSON[o("0xd")](t)});
