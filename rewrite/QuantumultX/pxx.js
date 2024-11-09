/*
App Store 链接:https://apps.apple.com/app/id6450694828

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/pxx.js
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-request-header https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/pxx.js

[MITM]
hostname = api.revenuecat.com

*/
let obj = {};

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  obj.headers = $request.headers;
} else {
  let body = JSON.parse($response.body || "{}");
  if (body && body.subscriber) {
    let date = {
      "expires_date": "2025-12-31T00:00:00Z",
      "original_purchase_date": "2021-01-01T00:00:00Z",
      "purchase_date": "2021-01-01T00:00:00Z",
      "ownership_type": "PURCHASED",
      "store": "app_store"
    };
    
    let subscriber = body.subscriber;
    let bundle_id = $request.headers["X-Client-Bundle-ID"]
      ? $request.headers["X-Client-Bundle-ID"]
      : $request.headers["User-Agent"].match(/^[%a-zA-Z0-9]+/)[0];
    
    const list = [
    { "app_name": "Ereasy", "bundle_id": "background.remover.bg.eraser", "product_id": "app.pxx917144686", "entitlements": ["premium", "Full_access_app"], "version": "2.0.0" },
    { "app_name": "ScreenRecord", "bundle_id": "screen.record.bundle", "product_id": "pxx123456789", "entitlements": ["recording", "premium_features"], "version": "1.0.0" },
    { "app_name": "bazaart", "bundle_id": "com.bazaart.app", "product_id": "Bazaart_Premium_Monthly_v9", "entitlements": ["premium", "full_access"], "version": "9.2.0" },
    { "app_name": "Patternator", "bundle_id": "com.patternator.app", "product_id": "Patternator_Lock_Screen_Monthly", "entitlements": ["lock_screen", "premium_features"], "version": "3.1.0" },
    { "app_name": "Revive", "bundle_id": "com.revive.app", "product_id": "revive.inapp.pro.lt_wotrial_42.99", "entitlements": ["premium", "advanced_features"], "version": "4.0.0" },
    { "app_name": "Picsew", "bundle_id": "com.sugarmo.ScrollClip", "product_id": "com.sugarmo.ScrollClip.pro", "entitlements": ["premium"], "version": "5.0.0" },
    { "app_name": "Air", "bundle_id": "com.airapps.calculator", "product_id": "co.airapps.calculator.yearly", "entitlements": ["premium"], "version": "6.0.0" },
    { "app_name": "HashPhotos", "bundle_id": "com.kobaltlab.HashPhotos", "product_id": "com.kobaltlab.HashPhotos.iap.allinone.free", "entitlements": ["all_access"], "version": "7.1.0" },
    { "app_name": "ProxyFi", "bundle_id": "com.proxyfi.app", "product_id": "week.proxyfi.sub", "entitlements": ["vpn", "premium_access"], "version": "2.0.1" },
    { "app_name": "Side", "bundle_id": "com.johnil.side", "product_id": "com.johnil.side.year", "entitlements": ["premium_features"], "version": "4.3.0" },
    { "app_name": "MyMemoryDebris", "bundle_id": "com.chenxi.shannian", "product_id": "com.chenxi.shannian.superNian", "entitlements": ["premium", "full_access"], "version": "3.5.2" },
    { "app_name": "FileArtifact", "bundle_id": "com.shengzhou.fileartifact", "product_id": "com.shengzhou.fileartifact.year", "entitlements": ["premium_features"], "version": "1.9.0" },
    { "app_name": "ChickAlarmClock", "bundle_id": "com.chickalarm.clock", "product_id": "Pro_M01", "entitlements": ["premium_access"], "version": "2.0.0" },
    { "app_name": "TWWeatherMajor", "bundle_id": "com.highonemob.weather.base", "product_id": "com.highonemob.weather.base.w", "entitlements": ["weather_updates", "premium"], "version": "4.0.1" },
    { "app_name": "ProKnockOut", "bundle_id": "com.knockout.1monthplus", "product_id": "com.knockout.1monthplus.2weektrail", "entitlements": ["full_access", "premium"], "version": "5.0.0" },
    { "app_name": "PutApp", "bundle_id": "com.maliquankai.appdesign", "product_id": "com.maliquankai.appdesign", "entitlements": ["premium_design", "full_access"], "version": "3.0.0" },
    { "app_name": "CCD_Camera", "bundle_id": "com.ccd.camera", "product_id": "pxx", "entitlements": ["camera_pro_features"], "version": "1.8.0" },
    { "app_name": "CHAT AI", "bundle_id": "com.chat.ai", "product_id": "pxx", "entitlements": ["premium_chat", "unlimited_access"], "version": "2.0.0" },
    { "app_name": "Koloro", "bundle_id": "com.koloro.app", "product_id": "pxx", "entitlements": ["premium", "photo_editor"], "version": "5.5.0" },
    { "app_name": "AllMyBatteries", "bundle_id": "com.allmybatteries.app", "product_id": "pxx", "entitlements": ["battery_management"], "version": "3.2.1" },
    { "app_name": "ReLens", "bundle_id": "com.risingcabbage.pro", "product_id": "com.risingcabbage.pro.camera.yearlysubscription", "entitlements": ["lens_features", "premium"], "version": "4.2.0" },
    { "app_name": "Fashion Design Sketches", "bundle_id": "com.pocketartstudio.fashiondesign", "product_id": "com.pocketartstudio.fashiondesign.twomonths", "entitlements": ["design_tools", "premium"], "version": "1.4.0" },
    { "app_name": "QuickTask", "bundle_id": "com.othermaster.task", "product_id": "com.othermaster.yearlyvip", "entitlements": ["task_management", "premium"], "version": "2.1.0" },
    { "app_name": "IslandWappScreen", "bundle_id": "com.islandweek.screen", "product_id": "islandweek1342", "entitlements": ["screen_customization"], "version": "3.3.0" },
    { "app_name": "VPN", "bundle_id": "com.vpn.app", "product_id": "com.yearMember", "entitlements": ["vpn_access", "premium_subscription"], "version": "4.5.1" },
    { "app_name": "oldroll", "bundle_id": "com.zijayrate.analogcam", "product_id": "com.zijayrate.analogcam.vipforever10", "entitlements": ["vintage_filter", "premium"], "version": "6.0.0" },
    { "app_name": "Subscriptions", "bundle_id": "com.touchbits.subscriptions", "product_id": "com.touchbits.subscriptions.iap.pro.yearly", "entitlements": ["subscriptions_manager", "premium"], "version": "2.5.0" },
    { "app_name": "intolive", "bundle_id": "me.imgbase.intolive", "product_id": "me.imgbase.intolive.proSubYearly", "entitlements": ["live_wallpapers", "premium_access"], "version": "1.7.0" },
    { "app_name": "PocketPics", "bundle_id": "com.pocketpics.app", "product_id": "pocketpics_monthly_withtrial_0901", "entitlements": ["premium_photo_features"], "version": "2.0.0" },
    { "app_name": "CardDiary", "bundle_id": "com.fuyuan.inkDiary", "product_id": "FuYuan.inkDiary.YearB.Pro", "entitlements": ["journal_entries", "premium"], "version": "3.2.0" },
    { "app_name": "Bear", "bundle_id": "net.shinyfrog.bear", "product_id": "net.shinyfrog.bear_iOS.pro_yearly_subscription_bis", "entitlements": ["notes", "premium"], "version": "2.1.0" },
    { "app_name": "aDiary", "bundle_id": "com.LuoWei.aDiary", "product_id": "com.LuoWei.aDiary.yearly0", "entitlements": ["personal_journal", "premium"], "version": "4.0.1" },
    { "app_name": "LifeTracker", "bundle_id": "com.dk.lifetracker", "product_id": "com.dk.lifetracker.yearplan", "entitlements": ["life_management", "premium"], "version": "2.2.0" },
    { "app_name": "newFitnessApp", "bundle_id": "com.newfitness.app", "product_id": "newfitnessapp02", "entitlements": ["fitness_tracker", "premium"], "version": "3.0.0" },
    { "app_name": "CostMemo", "bundle_id": "org.zrey.money", "product_id": "org.zrey.money.lifetime", "entitlements": ["finance_manager", "premium"], "version": "4.5.2" },
    { "app_name": "LifeTime", "bundle_id": "com.marklabs.lovetime", "product_id": "com.marklabs.lovHere is the continuation of the full list:
    { "app_name": "LifeTime", "bundle_id": "com.marklabs.lovetime", "product_id": "com.marklabs.lovetime.lifetime", "entitlements": ["love_management", "premium"], "version": "3.0.0" },
    { "app_name": "MusicFlow", "bundle_id": "com.flower.musicflow", "product_id": "com.flower.musicflow.premium.year", "entitlements": ["premium_music", "unlimited_access"], "version": "1.2.0" },
    { "app_name": "UltimatePlanner", "bundle_id": "com.ultimateplanner.app", "product_id": "com.ultimateplanner.pro", "entitlements": ["task_planner", "premium"], "version": "3.5.0" },
    { "app_name": "QuickRun", "bundle_id": "com.quickrun.app", "product_id": "com.quickrun.speed", "entitlements": ["speed_tracking", "premium"], "version": "2.7.0" },
    { "app_name": "Glimpse", "bundle_id": "com.glimpse.camera", "product_id": "com.glimpse.camera.pro", "entitlements": ["photo_editor", "premium"], "version": "5.0.2" },
    { "app_name": "SnapMaster", "bundle_id": "com.snapmaster.app", "product_id": "com.snapmaster.photoeditor", "entitlements": ["photo_master", "premium_features"], "version": "4.3.0" },
    { "app_name": "TimeGuard", "bundle_id": "com.timeguard.app", "product_id": "com.timeguard.pro", "entitlements": ["time_tracking", "premium"], "version": "2.6.0" },
    { "app_name": "MoneyTrack", "bundle_id": "com.moneytrack.app", "product_id": "com.moneytrack.premium", "entitlements": ["finance_management", "premium"], "version": "3.0.1" },
    { "app_name": "DreamStudio", "bundle_id": "com.dreamstudio.app", "product_id": "com.dreamstudio.creative", "entitlements": ["creative_tools", "premium"], "version": "2.0.0" },
    { "app_name": "FitTrack", "bundle_id": "com.fittrack.app", "product_id": "com.fittrack.subscriber", "entitlements": ["fitness_tracking", "premium"], "version": "4.1.0" },
    { "app_name": "SmartDiet", "bundle_id": "com.smartdiet.app", "product_id": "com.smartdiet.pro", "entitlements": ["diet_management", "premium"], "version": "5.2.0" },
    { "app_name": "FinanceLog", "bundle_id": "com.financelog.app", "product_id": "com.financelog.pro", "entitlements": ["expense_tracking", "premium"], "version": "6.0.0" },
    { "app_name": "PhotoMagic", "bundle_id": "com.photomagic.app", "product_id": "com.photomagic.pro", "entitlements": ["photo_enhancer", "premium"], "version": "3.8.0" },
    { "app_name": "TaskMaster", "bundle_id": "com.taskmaster.app", "product_id": "com.taskmaster.premium", "entitlements": ["task_management", "premium"], "version": "2.9.0" },
    { "app_name": "DocumentKeeper", "bundle_id": "com.documentkeeper.app", "product_id": "com.documentkeeper.premium", "entitlements": ["document_storage", "premium"], "version": "4.4.0" },
    { "app_name": "QuickScan", "bundle_id": "com.quickscan.app", "product_id": "com.quickscan.premium", "entitlements": ["scanner", "premium"], "version": "1.1.0" },
    { "app_name": "PhotoRetouch", "bundle_id": "com.photoretouch.app", "product_id": "com.photoretouch.pro", "entitlements": ["photo_retoucher", "premium"], "version": "5.1.0" },
    { "app_name": "MindMap", "bundle_id": "com.mindmap.app", "product_id": "com.mindmap.premium", "entitlements": ["mind_mapping", "premium"], "version": "6.1.0" },
    { "app_name": "Journey", "bundle_id": "com.journey.app", "product_id": "com.journey.app.yearly", "entitlements": ["journaling", "premium"], "version": "2.0.2" }
];
    
    for (let data of list) {
      if (bundle_id == data.bundle_id || bundle_id == data.app_name) {
        let product_id = data.product_id;
        let entitlements = data.entitlements;
        
        subscriber.subscriptions[(product_id)] = date;
        
        for (let entitlement of entitlements) {
          subscriber.entitlements[(entitlement)] = date;
          subscriber.entitlements[(entitlement)].product_identifier = product_id;
        }
        break;
      }
    }
    
    obj.body = JSON.stringify(body);
  }
}

$done(obj);

