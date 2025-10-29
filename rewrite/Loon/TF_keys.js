console.log('🚀 TestFlight快速设置启动')

// 目标APP ID
const TARGET_APP_ID = 'KZy5bjd'

// 设置APP ID
$persistentStore.write(TARGET_APP_ID, 'APP_ID')

// 初始化状态
$persistentStore.write('unknown', `tf_status_${TARGET_APP_ID}`)
$persistentStore.write('0', `tf_count_${TARGET_APP_ID}`)

console.log(`✅ 已配置监控目标: ${TARGET_APP_ID}`)
console.log(`🔗 TestFlight链接: https://testflight.apple.com/join/${TARGET_APP_ID}`)

// 发送确认通知
$notification.post(
  '🎯 TestFlight监控已配置', 
  `目标: ${TARGET_APP_ID}`,
  '监控将每1分钟检查一次，发现名额立即通知并自动加入！'
)

// 立即进行一次检查
console.log('🔍 执行首次检查...')

const checkUrl = `https://testflight.apple.com/join/${TARGET_APP_ID}`
const headers = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/21C62 Safari/604.1',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

$httpClient.get({
  url: checkUrl,
  headers: headers,
  timeout: 15
}, (error, response, data) => {
  if (error) {
    console.log(`❌ 首次检查失败: ${error}`)
    $notification.post('⚠️ 首次检查失败', `网络错误: ${error}`, '请检查网络连接')
  } else if (response.status === 200) {
    const text = data.toLowerCase()
    let status = 'unknown'
    
    if (text.includes('this beta is full') || text.includes('已满')) {
      status = 'full'
      console.log('📊 当前状态: TestFlight已满')
      $notification.post('📊 当前状态', 'TestFlight已满', '监控已启动，等待名额释放...')
    } else if (text.includes('start testing') || text.includes('join')) {
      status = 'available'
      console.log('🎉 当前状态: 有可用名额！')
      $notification.post('🎉 发现名额！', 'TestFlight当前可用！', `立即前往: https://testflight.apple.com/join/${TARGET_APP_ID}`)
    } else {
      console.log('🤔 当前状态: 未知')
      $notification.post('📊 状态检查', '状态未知', '监控已启动')
    }
    
    $persistentStore.write(status, `tf_status_${TARGET_APP_ID}`)
  } else {
    console.log(`⚠️ 首次检查异常: HTTP ${response.status}`)
    $notification.post('⚠️ 状态异常', `HTTP ${response.status}`, '监控已启动')
  }
  
  console.log('✅ 设置完成！监控已启动')
  $done()
})
