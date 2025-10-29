// TestFlight 自动监控脚本 

const CONFIG = {
  APP_ID: 'KZy5bjde',
  CHECK_INTERVAL: 120, // 秒
  MAX_RETRY: 3,
  NOTIFICATION_COOLDOWN: 300 // 5分钟内不重复通知
}

const STORAGE_KEYS = {
  LAST_STATUS: 'tf_last_status',
  LAST_NOTIFICATION: 'tf_last_notification',
  CHECK_COUNT: 'tf_check_count',
  AVAILABLE_FOUND: 'tf_available_found'
}

// 获取存储的数据
function getStoredData(key, defaultValue = null) {
  try {
    const data = $persistentStore.read(key)
    return data ? JSON.parse(data) : defaultValue
  } catch (e) {
    return defaultValue
  }
}

// 存储数据
function setStoredData(key, value) {
  try {
    $persistentStore.write(JSON.stringify(value), key)
    return true
  } catch (e) {
    console.log(`存储失败: ${key} = ${value}`)
    return false
  }
}

// 检查是否需要发送通知
function shouldNotify(status) {
  const lastNotification = getStoredData(STORAGE_KEYS.LAST_NOTIFICATION, 0)
  const now = Date.now()
  
  // 如果是可用状态，立即通知
  if (status === 'available') {
    return true
  }
  
  // 其他状态检查冷却时间
  return (now - lastNotification) > (CONFIG.NOTIFICATION_COOLDOWN * 1000)
}

// 发送通知
function sendNotification(title, subtitle, body, status) {
  if (shouldNotify(status)) {
    $notification.post(title, subtitle, body)
    setStoredData(STORAGE_KEYS.LAST_NOTIFICATION, Date.now())
    console.log(`📢 通知已发送: ${title} - ${subtitle}`)
  } else {
    console.log(`🔇 通知被抑制: ${title}`)
  }
}

// 主监控函数
function checkTestFlight() {
  const checkCount = getStoredData(STORAGE_KEYS.CHECK_COUNT, 0) + 1
  setStoredData(STORAGE_KEYS.CHECK_COUNT, checkCount)
  
  const CHECK_URL = `https://testflight.apple.com/join/${CONFIG.APP_ID}`
  const timestamp = new Date().toLocaleString('zh-CN')
  
  console.log(`🔍 [${timestamp}] 第${checkCount}次检查 TestFlight: ${CONFIG.APP_ID}`)
  
  $httpClient.get({
    url: CHECK_URL,
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache'
    },
    timeout: 30
  }, function(error, response, data) {
    
    if (error) {
      console.log(`❌ 网络错误: ${error}`)
      sendNotification('TestFlight监控', '网络错误', `${CONFIG.APP_ID}: ${error}`, 'error')
      $done()
      return
    }
    
    console.log(`📡 HTTP状态: ${response.status}`)
    
    if (response.status !== 200) {
      console.log(`⚠️ 异常状态码: ${response.status}`)
      sendNotification('TestFlight监控', '状态异常', `${CONFIG.APP_ID}: HTTP ${response.status}`, 'error')
      $done()
      return
    }
    
    if (!data) {
      console.log(`❌ 响应数据为空`)
      sendNotification('TestFlight监控', '数据异常', `${CONFIG.APP_ID}: 响应为空`, 'error')
      $done()
      return
    }
    
    console.log(`📄 页面长度: ${data.length} 字符`)
    
    // 分析页面状态
    const pageText = data.toLowerCase()
    let currentStatus = 'unknown'
    let statusMessage = ''
    
    // 检测已满状态
    if (pageText.includes('this beta is full') || 
        pageText.includes('beta已满') || 
        pageText.includes('已满') ||
        pageText.includes('beta is full') ||
        pageText.includes('no longer accepting')) {
      
      currentStatus = 'full'
      statusMessage = 'TestFlight 已满'
      console.log(`😔 ${statusMessage}`)
      
    } 
    // 检测可用状态
    else if (pageText.includes('accept') || 
             pageText.includes('join') || 
             pageText.includes('install') ||
             pageText.includes('start testing') ||
             pageText.includes('开始测试') ||
             pageText.includes('接受')) {
      
      currentStatus = 'available'
      statusMessage = '🎉 发现可用名额！'
      console.log(statusMessage)
      
      // 记录发现可用的时间
      setStoredData(STORAGE_KEYS.AVAILABLE_FOUND, Date.now())
      
    }
    // 检测应用不存在
    else if (pageText.includes('could not find') ||
             pageText.includes('not found') ||
             pageText.includes('无法找到') ||
             pageText.includes('不存在')) {
      
      currentStatus = 'not_found'
      statusMessage = 'TestFlight 应用不存在'
      console.log(`❌ ${statusMessage}`)
      
    } else {
      currentStatus = 'unknown'
      statusMessage = '状态未知，继续监控'
      console.log(`🤔 ${statusMessage}`)
    }
    
    // 获取上次状态
    const lastStatus = getStoredData(STORAGE_KEYS.LAST_STATUS, '')
    
    // 状态变化时发送通知
    if (currentStatus !== lastStatus) {
      console.log(`📊 状态变化: ${lastStatus} → ${currentStatus}`)
      
      switch (currentStatus) {
        case 'available':
          sendNotification('🚀 TestFlight可用!', `${CONFIG.APP_ID} 有名额了!`, '立即前往加入!', 'available')
          break
        case 'full':
          if (lastStatus === 'available') {
            sendNotification('😔 TestFlight已满', `${CONFIG.APP_ID} 名额已满`, '继续监控中...', 'full')
          }
          break
        case 'not_found':
          sendNotification('❌ TestFlight异常', `${CONFIG.APP_ID} 应用不存在`, '请检查APP ID', 'not_found')
          break
      }
    } else {
      console.log(`📊 状态无变化: ${currentStatus}`)
    }
    
    // 保存当前状态
    setStoredData(STORAGE_KEYS.LAST_STATUS, currentStatus)
    
    // 每50次检查发送一次状态报告
    if (checkCount % 50 === 0) {
      const availableTime = getStoredData(STORAGE_KEYS.AVAILABLE_FOUND, null)
      const reportMsg = availableTime ? 
        `已检查${checkCount}次，上次发现可用: ${new Date(availableTime).toLocaleString('zh-CN')}` :
        `已检查${checkCount}次，暂未发现可用名额`
      
      sendNotification('TestFlight监控报告', `${CONFIG.APP_ID}`, reportMsg, 'report')
    }
    
    console.log(`✅ 检查完成，当前状态: ${currentStatus}`)
    $done()
  })
}

// 启动监控
console.log(`🚀 TestFlight自动监控启动`)
console.log(`📱 监控应用: ${CONFIG.APP_ID}`)
console.log(`⏰ 检查间隔: ${CONFIG.CHECK_INTERVAL}秒`)

checkTestFlight()
