/*
 * Merlin - Chat with 4.0 AI  破解有效 @ pxx917144686
 * Unlocks PRO features
 */

var body = $response.body;
let obj = JSON.parse(body);

// Modify the user object to unlock PRO features
obj.data.user["isProUser"] = true; // Set PRO user flag
obj.data.user["proEndTime"] = "2029-11-16"; // Set PRO membership expiry date
obj.data.user["subscription"] = "PRO"; // Modify subscription plan

// Convert back to string
body = JSON.stringify(obj);

// Additional replacements if the above fields do not cover all cases
body = body.replace(/"userPlan":"FREE"/g, '"userPlan":"PRO"');
body = body.replace(/"type":"FREE"/g, '"type":"PRO"');

$done({ body });
