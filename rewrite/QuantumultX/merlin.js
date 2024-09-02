/*
 * Merlin - Chat with 4.0 AI  破解  @ pxx917144686
 * Unlocks PRO features
 */

[rewrite_local]
https://apps.apple.com/us/app/merlin-chat-with-4o-ai/id6453692447 url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/merlin.js

// Begin the script to unlock PRO features
var body = $response.body;
let obj = JSON.parse(body);

// Modify the user object to unlock PRO features
obj.data.user["isProUser"] = true; // Assuming a flag that denotes PRO status
obj.data.user["proEndTime"] = "2029-11-16"; // Extend PRO membership

// Additional potential replacements if needed
body = JSON.stringify(obj);
body = body.replace(/"userPlan":"FREE"/g, '"userPlan":"PRO"'); // Change plan to PRO
body = body.replace(/"type":"FREE"/g, '"type":"PRO"'); // Change type to PRO

$done({body});
