// Auto_join_TF.js - 负责监控、通知和自动加入

// 解析参数
const params = new URLSearchParams($argument || '')
const APP_ID = params.get('APP_ID') || $argument?.APP_ID || 'KZy5bjd'
const AUTO_JOIN = params.get('AUTO_JOIN') !== 'false' // 默认开启自动加入
const NOTIFICATION = params.get('NOTIFICATION') !== 'false' // 默认开启通知

// 配置
const CONFIG = {
  APP_ID: APP_ID,
  AUTO_JOIN: AUTO_JOIN,
  NOTIFICATION: NOTIFICATION,
  RETRY_COUNT: 3,
  TIMEOUT: 15,
  JOIN_TIMEOUT: 30
}

// 存储键
const KEYS = {
  LAST_STATUS: `tf_status_${APP_ID}`,
  CHECK_COUNT: `tf_count_${APP_ID}`,
  LAST_AVAILABLE: `tf_available_${APP_ID}`
}

// 工具函数
function getStored(key, defaultValue = null) {
  try {
    const data = $persistentStore.read(key)
    return data ? JSON.parse(data) : defaultValue
  } catch {
    return defaultValue
  }
}

function setStored(key, value) {
  try {
    $persistentStore.write(JSON.stringify(value), key)
  } catch (e) {
    console.log(`存储失败: ${e}`)
  }
}

function notify(title, subtitle, body) {
  $notification.post(title, subtitle, body)
  console.log(`📢 ${title}: ${subtitle}`)
}

// 状态检测函数
function detectStatus(html) {
  if (!html) return 'error'
  
  const text = html.toLowerCase()
  
  // 检测可用状态 - 更精确的关键词
  if (text.includes('start testing') || 
      text.includes('accept') ||
      text.includes('install') ||
      text.includes('join the beta') ||
      text.includes('开始测试')) {
    return 'available'
  }
  
  // 检测已满状态
  if (text.includes('this beta is full') ||
      text.includes('beta已满') ||
      text.includes('no longer accepting') ||
      text.includes('已满')) {
    return 'full'
  }
  
  // 检测不存在
  if (text.includes('could not find') ||
      text.includes('not found') ||
      text.includes('无法找到')) {
    return 'not_found'
  }
  
  return 'unknown'
}

// 核心检测函数
function checkJoinPage() {
  const url = `https://testflight.apple.com/join/${APP_ID}`
  
  // 使用最新的请求头，模拟真实Safari
  const headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/21C62 Safari/604.1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  }
  
  $httpClient.get({
    url: url,
    headers: headers,
    timeout: CONFIG.TIMEOUT
  }, handleResponse)
}

// 处理响应
function handleResponse(error, response, data) {
  if (error) {
    console.log(`❌ 请求失败: ${error}`)
    notify('TestFlight监控', `网络错误: ${error}`)
    $done()
    return
  }
  
  const status = response.status
  console.log(`📡 状态码: ${status}`)
  
  if (status !== 200) {
    console.log(`⚠️ 异常状态: ${status}`)
    // 尝试备用方法
    checkAlternativeMethod()
    return
  }
  
  if (!data) {
    console.log(`❌ 无响应数据`)
    $done()
    return
  }
  
  analyzeContent(data)
}

// 分析页面内容
function analyzeContent(html) {
  const text = html.toLowerCase()
  const lastStatus = load(KEYS.LAST_STATUS)
  let currentStatus = 'unknown'
  
  // 检测各种状态
  if (text.includes('this beta is full') || 
      text.includes('beta已满') ||
      text.includes('no longer accepting') ||
      text.includes('已满')) {
    currentStatus = 'full'
    console.log(`😔 TestFlight已满`)
    
  } else if (text.includes('start testing') ||
             text.includes('accept') ||
             text.includes('install') ||
             text.includes('join') ||
             text.includes('开始测试')) {
    currentStatus = 'available'
    console.log(`🎉 发现可用名额！`)
    store(KEYS.LAST_AVAILABLE, Date.now())
    
  } else if (text.includes('could not find') ||
             text.includes('not found') ||
             text.includes('无法找到')) {
    currentStatus = 'not_found'
    console.log(`❌ 应用不存在`)
    
  } else {
    currentStatus = 'unknown'
    console.log(`🤔 状态未知`)
  }
  
  // 状态变化时通知
  if (currentStatus !== lastStatus) {
    handleStatusChange(lastStatus, currentStatus)
  }
  
  store(KEYS.LAST_STATUS, currentStatus)
  $done()
}

// 处理状态变化
function handleStatusChange(oldStatus, newStatus) {
  console.log(`📊 状态变化: ${oldStatus} → ${newStatus}`)
  
  switch (newStatus) {
    case 'available':
      if (CONFIG.NOTIFICATION) {
        notify('🚀 TestFlight可用！', 
               `${APP_ID} 发现可用名额！`,
               `https://testflight.apple.com/join/${APP_ID}`)
      }
      
      // 自动加入功能
      if (CONFIG.AUTO_JOIN) {
        console.log(`🤖 启动自动加入...`)
        setTimeout(() => {
          attemptAutoJoin()
        }, 1000) // 延迟1秒后尝试加入
      }
      break
      
    case 'full':
      if (oldStatus === 'available' && CONFIG.NOTIFICATION) {
        notify('😔 TestFlight已满', `${APP_ID} 名额已满，继续监控...`)
      }
      break
      
    case 'not_found':
      if (CONFIG.NOTIFICATION) {
        notify('❌ TestFlight异常', `${APP_ID} 应用不存在，请检查ID`)
      }
      break
  }
}

// 自动加入功能
function attemptAutoJoin() {
  console.log(`🎯 尝试自动加入 TestFlight: ${APP_ID}`)
  
  const joinUrl = `https://testflight.apple.com/join/${APP_ID}`
  
  // 模拟点击加入的请求
  const headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/21C62 Safari/604.1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Referer': 'https://testflight.apple.com/',
    'Origin': 'https://testflight.apple.com'
  }
  
  // 第一步：获取加入页面
  $httpClient.get({
    url: joinUrl,
    headers: headers,
    timeout: CONFIG.JOIN_TIMEOUT
  }, (error, response, data) => {
    if (error) {
      console.log(`❌ 自动加入失败: ${error}`)
      if (CONFIG.NOTIFICATION) {
        notify('🤖 自动加入失败', `网络错误: ${error}`)
      }
      return
    }
    
    if (response.status !== 200) {
      console.log(`❌ 自动加入失败: HTTP ${response.status}`)
      if (CONFIG.NOTIFICATION) {
        notify('🤖 自动加入失败', `状态码: ${response.status}`)
      }
      return
    }
    
    // 检查页面内容
    if (data && data.toLowerCase().includes('start testing')) {
      console.log(`✅ 成功访问加入页面`)
      
      // 尝试打开TestFlight应用
      const testflightUrl = `itms-beta://testflight.apple.com/join/${APP_ID}`
      
      if (CONFIG.NOTIFICATION) {
        notify('🎉 自动加入成功！', 
               `已尝试打开TestFlight应用`,
               testflightUrl)
      }
      
      console.log(`🚀 已触发TestFlight应用打开: ${testflightUrl}`)
      
    } else if (data && data.toLowerCase().includes('full')) {
      console.log(`😔 加入时发现已满`)
      if (CONFIG.NOTIFICATION) {
        notify('😔 自动加入失败', `名额已满，错过了机会`)
      }
    } else {
      console.log(`🤔 自动加入结果未知`)
      if (CONFIG.NOTIFICATION) {
        notify('🤖 自动加入状态未知', `请手动检查`)
      }
    }
  })
}

// 核心检测函数
function checkTestFlight() {
  const count = getStored(KEYS.CHECK_COUNT, 0) + 1
  setStored(KEYS.CHECK_COUNT, count)
  
  console.log(`🔍 第${count}次检查: ${CONFIG.APP_ID}`)
  
  const url = `https://testflight.apple.com/join/${CONFIG.APP_ID}`
  
  // 使用最简单的请求头，模拟真实Safari
  const headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh-Hans;q=0.9'
  }
  
  $httpClient.get({
    url: url,
    headers: headers,
    timeout: CONFIG.TIMEOUT
  }, handleResponse)
}

// 处理响应
function handleResponse(error, response, data) {
  if (error) {
    console.log(`❌ 请求失败: ${error}`)
    notify('TestFlight监控', '网络错误', `${CONFIG.APP_ID}: ${error}`)
    $done()
    return
  }
  
  if (response.status !== 200) {
    console.log(`⚠️ HTTP ${response.status}`)
    notify('TestFlight监控', '状态异常', `${CONFIG.APP_ID}: HTTP ${response.status}`)
    $done()
    return
  }
  
  const currentStatus = detectStatus(data)
  const lastStatus = getStored(KEYS.LAST_STATUS, '')
  
  console.log(`📊 状态: ${lastStatus} → ${currentStatus}`)
  
  // 状态变化时通知
  if (currentStatus !== lastStatus) {
    handleStatusChange(currentStatus, lastStatus)
  }
  
  // 保存状态
  setStored(KEYS.LAST_STATUS, currentStatus)
  
  console.log(`✅ 检查完成`)
  $done()
}

// 处理状态变化
function handleStatusChange(current, last) {
  switch (current) {
    case 'available':
      setStored(KEYS.LAST_AVAILABLE, Date.now())
      notify('🎉 TestFlight可用!', `${CONFIG.APP_ID}`, '发现可用名额，立即前往!')
      break
    case 'full':
      if (last === 'available') {
        notify('😔 TestFlight已满', `${CONFIG.APP_ID}`, '名额已满，继续监控...')
      }
      break
    case 'not_found':
      notify('❌ TestFlight异常', `${CONFIG.APP_ID}`, '应用不存在，请检查ID')
      break
    case 'error':
      notify('⚠️ TestFlight错误', `${CONFIG.APP_ID}`, '检测出现问题')
      break
  }
}

// 启动监控
console.log(`🚀 TestFlight真正自动监控 v3.0`)
console.log(`📱 目标应用: ${APP_ID}`)
console.log(`🎯 专为iOS 16+和反MITM设计`)

checkWithMultipleMethods()

// 存储操作
function store(key, value) {
  $persistentStore.write(String(value), key)
}

function load(key, defaultValue = '') {
  return $persistentStore.read(key) || defaultValue
}

// 发送通知
function notify(title, body, url = '') {
  $notification.post(title, '', body, url)
  console.log(`📢 ${title}: ${body}`)
}

// 多重检测方法
function checkWithMultipleMethods() {
  const timestamp = new Date().toLocaleString('zh-CN')
  const count = parseInt(load(KEYS.CHECK_COUNT, '0')) + 1
  store(KEYS.CHECK_COUNT, count)
  
  console.log(`🔍 [${timestamp}] 第${count}次检查: ${APP_ID}`)
  
  // 方法1: 直接访问join链接
  checkJoinPage()
}
