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
      { "app_name": "ScreenRecord", "product_id": "pxx" },
      { "app_name": "bazaart", "product_id": "Bazaart_Premium_Monthly_v9" },
      { "app_name": "Patternator", "product_id": "Patternator_Lock_Screen_Monthly" },
      { "app_name": "Revive", "product_id": "revive.inapp.pro.lt_wotrial_42.99" },
      { "app_name": "Picsew", "product_id": "com.sugarmo.ScrollClip.pro", "bundle_id": "com.sugarmo.ScrollClip" },
      { "app_name": "Air", "product_id": "co.airapps.calculator.yearly" },
      { "app_name": "HashPhotos", "product_id": "com.kobaltlab.HashPhotos.iap.allinone.free" },
      { "app_name": "ProxyFi", "product_id": "week.proxyfi.sub" },
      { "app_name": "Side", "product_id": "com.johnil.side.year" },
      { "app_name": "MyMemoryDebris", "product_id": "com.chenxi.shannian.superNian" },
      { "app_name": "FileArtifact", "product_id": "com.shengzhou.fileartifact.year" },
      { "app_name": "ChickAlarmClock", "product_id": "Pro_M01" },
      { "app_name": "TWWeatherMajor", "product_id": "com.highonemob.weather.base.w" },
      { "app_name": "ProKnockOut", "product_id": "com.knockout.1monthplus.2weektrail" },
      { "app_name": "PutApp", "product_id": "com.maliquankai.appdesign" },
      { "app_name": "CCD_Camera", "product_id": "pxx" },
      { "app_name": "CHAT AI", "product_id": "pxx" },
      { "app_name": "Koloro", "product_id": "pxx" },
      { "app_name": "AllMyBatteries", "product_id": "pxx" },
      { "app_name": "ReLens", "product_id": "com.risingcabbage.pro.camera.yearlysubscription" },
      { "app_name": "Fashion Design Sketches", "product_id": "com.pocketartstudio.fashiondesign.twomonths" },
      { "app_name": "QuickTask", "product_id": "com.othermaster.yearlyvip" },
      { "app_name": "IslandWappScreen", "product_id": "islandweek1342" },
      { "app_name": "VPN", "product_id": "com.yearMember" },
      { "app_name": "oldroll", "product_id": "com.zijayrate.analogcam.vipforever10" },
      { "app_name": "Subscriptions", "product_id": "com.touchbits.subscriptions.iap.pro.yearly" },
      { "app_name": "intolive", "product_id": "me.imgbase.intolive.proSubYearly" },
      { "app_name": "PocketPics", "product_id": "pocketpics_monthly_withtrial_0901" },
      { "app_name": "CardDiary", "product_id": "FuYuan.inkDiary.YearB.Pro" },
      { "app_name": "Bear", "product_id": "net.shinyfrog.bear_iOS.pro_yearly_subscription_bis" },
      { "app_name": "aDiary", "product_id": "com.LuoWei.aDiary.yearly0" },
      { "app_name": "LifeTracker", "product_id": "com.dk.lifetracker.yearplan" },
      { "app_name": "newFitnessApp", "product_id": "newfitnessapp02" },
      { "app_name": "CostMemo", "product_id": "org.zrey.money.lifetime" },
      { "app_name": "LifeTime", "product_id": "com.marklabs.lovetime.year" },
      { "app_name": "iTimely", "product_id": "org.zrey.iTimely.lifetime" },
      { "app_name": "DoMemo", "product_id": "org.zrey.fastnote.lifetime" },
      { "app_name": "VDIT", "product_id": "me.imgbase.videoday.profeaturesYearly" },
      { "app_name": "xTerminal", "product_id": "xterminal.pro2" },
      { "app_name": "MoodTracker", "product_id": "co.vulcanlabs.moodtracker.lifetime2" },
      { "app_name": "Fotoz", "product_id": "com.kiddy.fotoz.ipa.pro" },
      { "app_name": "Count", "product_id": "counter.sub.gr1.1w" },
      { "app_name": "Wext", "product_id": "com.lmf.wext.year" },
      { "app_name": "Scanner", "product_id": "scannerapp.free.premium.subscription.m1mte" },
      { "app_name": "Metion", "product_id": "org.zrey.metion.pro" },
      { "app_name": "Ever Play", "product_id": "com.zhangchao.AudioPlayer.subscription.oneYear" },
      { "app_name": "Carbon VPN", "product_id": "Prog_oneYear_auto" },
      { "app_name": "RealTuner", "product_id": "com.gismart.tuner.weekly" },
      { "app_name": "ShellBean", "product_id": "com.ningle.shellbean.subscription.year" },
      { "app_name": "MomentShouZhang", "product_id": "xichaoshouzhangQuarterlyPlus" },
      { "app_name": "XinQingRiJi", "product_id": "zhiwenshouzhangQuarterlyPlus" },
      { "app_name": "MoMoShouZhang", "product_id": "shunchangshouzhangQuarterlyPlus" },
      { "app_name": "BuBuSZ", "product_id": "quaVersion" },
      { "app_name": "LingLongShouZ", "product_id": "zhenwushouzhangPlusVersion" },
      { "app_name": "Dart", "product_id": "xyz.iofree.lifelog.pro.yearly" },
      { "app_name": "Pixiu", "product_id": "com.RuoG.Pixiu.VIPYear" },
      { "app_name": "Lister", "product_id": "com.productlab.lister.yearly" },
      { "app_name": "Daylio", "product_id": "net.daylio.one_year_pro" },
      { "app_name": "Nutrilio", "product_id": "net.nutrilio.one_year_plus" },
      { "app_name": "YSBrowser", "product_id": "com.ys.pro" },
      { "app_name": "xiaori", "product_id": "membership" },
      { "app_name": "Miary", "product_id": "lifetime_sub" },
      { "app_name": "Mindkit", "product_id": "mindkit_yearly" },
      { "app_name": "EnhanceFox", "product_id": "com.risingcabbage.enhancefox.yearlysubscribewithtreetrial" },
      { "app_name": "Snoring", "product_id": "com.koshel.snore.premiumYearThreeDaysTria" },
      { "app_name": "PDFReaderPro", "product_id": "com.pdfreaderpro.free.member.all_access_pack_permanent_license.001" }
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

