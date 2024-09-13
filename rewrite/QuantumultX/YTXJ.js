/*
 *
 *
甜盐相机 解锁订阅 @ pxx917144686

*******************************
[rewrite_local]
^https?:\/\/purchase-tianyan-api.tianyancam.com\/v1\/purchase\/subscription\/subscriber\/status url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/YTXJ.js
^http://api-ad\.kajicam.com/ad/pop/rule/v2 url reject
[mitm] 
hostname = purchase-qingtu-api.b612kaji.com,api-qingtu.kajicam.com,purchase-tianyan-api.tianyancam.com,api-ad.kajicam.com

*
*
*/
var obfuscatedStrings = [
  "117.","68.108.100.107.108.123.76.113.121.123.108.122.122.96.102.103.","117.",
  "92.103.98.103.102.126.103.41.72.90.93.41.125.112.121.108.51."
];

function decrypt(input, key) {
  key = 9; // 定义解密使用的密钥
  var result = "";
  var parts = input.split(".");
  for (var i = 0; i < parts.length - 1; i++) {
    result += String.fromCharCode(parts[i] ^ key);
  }
  return result;
}

function processObfuscatedCode(input) {
  var instructions = "3|1|0|4|2".split(decrypt(obfuscatedStrings[0]));
  var index = 0;
  while (true) {
    switch (+instructions[index++]) {
      case 0:
        var placeholder = -1;
        continue;
      case 1:
        var values = [];
        continue;
      case 2:
        while (eval(decrypt("95 51 32 60 32 95 99 46 108 101 110 103 116 104"))) {
          eval(decrypt("95 51 43 43"));
          switch (input[placeholder]) {
            case _.push:
              eval(decrypt("95 51 43 43"));
              values.push(input[placeholder]);
              eval(decrypt("95 52 43 43"));
              break;
            case _.add:
              var operand1 = values[eval(decrypt("95 52 32 45 32 49"))];
              var operand2 = values[key];
              var value = function(a, b) { return eval(decrypt("115 32 43 32 104")); }(operand1, operand2);
              values.push(value);
              eval(decrypt("95 52 43 43"));
              break;
            case _.sub:
              var operand1 = values[eval(decrypt("95 52 32 45 32 49"))];
              var operand2 = values[key];
              var value = function(a, b) { return eval(decrypt("115 32 45 32 104")); }(operand1, operand2);
              values.push(value);
              eval(decrypt("95 52 43 43"));
              break;
            case _.mul:
              var operand1 = values[eval(decrypt("95 52 32 45 32 49"))];
              var operand2 = values[key];
              var value = function(a, b) { return eval(decrypt("115 32 42 32 104")); }(operand1, operand2);
              values.push(value);
              eval(decrypt("95 52 43 43"));
              break;
            case _.div:
              var operand1 = values[key - 1];
              var operand2 = values[key];
              var value = function(a, b) { return eval(decrypt("115 32 47 32 104")); }(operand1, operand2);
              values.push(value);
              key++;
              break;
            case _.xor:
              var operand1 = values[eval(decrypt("95 52 32 45 32 49"))];
              var operand2 = values[key];
              var value = function(a, b) { return a ^ b; }(operand1, operand2);
              values.push(value);
              eval(decrypt("95 52 43 43"));
              break;
            case _.pop:
              return values[key];
          }
        }
        continue;
      case 3:
        var _ = {push: 32, add: 33, sub: 34, mul: 35, div: 36, pop: 37, xor: 38};
        continue;
      case 4:
        key = -1;
        continue;
    }
    break;
  }
}

var handlers = {
  File(node, scope) {
    astExecute(node['program'], scope);
  },
  Program(program, scope) {
    for (var i = function() { return processObfuscatedCode([32, 906526, 32, 906526, 38, 37]); }(); eval(decrypt("105 32 60 32 112 114 111 103 114 97 109 91 39 92 120 54 50 92 120 54 102 92 120 54 52 92 120 55 57 39 93 91 39 92 120 54 99 92 120 54 53 92 120 54 101 92 120 54 55 92 120 55 52 92 120 54 56 39 93")); i++) {
      astExecute(program['body'][i], scope);
    }
  },
  ExpressionStatement(node, scope) {
    return astExecute(node['expression'], scope);
  },
  CallExpression(node, scope) {
    var func = astExecute(node['callee'], scope);
    var args = node['arguments']['map'](function(arg) { return astExecute(arg, scope); });
    var value;
    if (node['callee']['type'] === decrypt(obfuscatedStrings[1])) {
      value = astExecute(node['callee']['object'], scope);
    }
    return func['apply'](value, args);
  },
  MemberExpression(node, scope) {
    var obj = astExecute(node['object'], scope);
    var name = node['property']['name'];
    return obj[name];
  },
  Identifier(node, scope) {
    return scope[node['name']];
  },
  StringLiteral(node) {
    return node['value'];
  },
  NumericLiteral(node) {
    return node['value'];
  }
};

function astExecute(node, scope) {
  var types = "1|0|2".split(decrypt(obfuscatedStrings[2]));
  var index = 0;
  while (true) {
    switch (+types[index++]) {
      case 0:
        if (!evaluate) {
          throw new Error(decrypt(obfuscatedStrings[3]), node['type']);
        }
        continue;
      case 1:
        var evaluate = handlers[node['type']];
        continue;
      case 2:
        return evaluate(node, scope);
    }
  }
}

if ($request['url']['includes']("subscription/status/v1/")) {
  var modifiedResponse;
  let body = JSON.parse($response['body']);
  modifiedResponse = function() { return processObfuscatedCode([32, 257179, 32, 257170, 38, 37]); }();
  Object.assign(body, JSON.parse(decrypt('} } "status": "active" , ] 00094543839423: "expired", "true": "TrialExpired", "subscription.aremac.noisivotohp.com": "product", 0002954442271: "startDate", "ACTIVE": "status", false: "managed", { "products": { "result": { ')));
  $done({ body: JSON.stringify(body) });
}

