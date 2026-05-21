/**
 * 数据迁移脚本 - 将初始数据导入 SQLite 数据库
 * 运行命令: node migrate.js
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'plans.db');
const db = new sqlite3.Database(dbPath);

// 初始数据
const initialData = {
  vendors: [
    {
      type: "酒店",
      name: "湖畔宴会厅",
      style: "白绿韩系",
      contact: "林经理 / 138****8821",
      wechat: "hotel-lin",
      quote: 68000,
      deposit: 10000,
      final: 58000,
      signed: true,
      depositPaid: true,
      package: "A 厅 20 桌起 / 含基础灯光音响",
      outfit: "白绿仪式区 / 香槟色桌布",
      schedule: "试菜待约，合同已归档",
      note: "合同、菜单、场地图都放这里",
    },
    {
      type: "司仪",
      name: "温柔不煽情 MC",
      style: "轻松自然",
      contact: "小红书 @wedding-mc",
      wechat: "mc-wedding",
      quote: 5800,
      deposit: 1000,
      final: 4800,
      signed: false,
      depositPaid: false,
      package: "全程主持 / 含彩排 / 不含外地交通",
      outfit: "深色礼服，轻松自然风",
      schedule: "等酒店流程确定后约线上聊",
      note: "不要太多套路，要能控场",
    },
    {
      type: "化妆",
      name: "Mia Bridal",
      style: "韩系清透",
      contact: "微信 mia-bride",
      wechat: "mia-bride",
      quote: 7200,
      deposit: 2000,
      final: 5200,
      signed: true,
      depositPaid: true,
      package: "新娘全天跟妆 / 妈妈妆 2 位",
      outfit: "主纱清透妆、敬酒服微醺妆",
      schedule: "试妆 6 月底",
      note: "试妆带晨袍和主纱照片",
    },
    {
      type: "摄影",
      name: "森光影像",
      style: "纪实抓拍",
      contact: "小红书 @forest-photo",
      wechat: "forest-photo",
      quote: 8800,
      deposit: 2000,
      final: 6800,
      signed: false,
      depositPaid: false,
      package: "双机位全天跟拍 / 精修 80 张 / 云相册",
      outfit: "画面偏胶片，少摆拍，多抓情绪",
      schedule: "确认早拍地点后定拍摄动线",
      note: "看完整婚礼样片，不只看九宫格",
    },
    {
      type: "摄像",
      name: "薄雾电影",
      style: "电影感",
      contact: "微信 mist-film",
      wechat: "mist-film",
      quote: 12800,
      deposit: 3000,
      final: 9800,
      signed: false,
      depositPaid: false,
      package: "双机位 + 快剪 + 3-5 分钟婚礼电影",
      outfit: "低饱和、暖调、不要过度转场",
      schedule: "仪式音乐确定后给剪辑参考",
      note: "问清楚原片交付和版权音乐",
    },
    {
      type: "婚庆",
      name: "白绿企划室",
      style: "韩系白绿",
      contact: "策划师 Echo",
      wechat: "echo-wedding",
      quote: 22000,
      deposit: 5000,
      final: 17000,
      signed: false,
      depositPaid: false,
      package: "仪式区 + 迎宾区 + 桌花 + 灯光基础包",
      outfit: "白绿花艺、暖光蜡烛、香槟桌布",
      schedule: "酒店场地图出来后复尺",
      note: "不要大红，不要厚重背景板",
    },
    {
      type: "接亲车队",
      name: "黑色奔驰 E 车队",
      style: "稳重统一",
      contact: "车队王哥 / 139****9120",
      wechat: "car-wang",
      quote: 5200,
      deposit: 1000,
      final: 4200,
      signed: false,
      depositPaid: false,
      package: "主婚车 1 辆 + 跟车 5 辆 / 5 小时 60 公里",
      outfit: "黑车白花，车头花不要夸张",
      schedule: "确认接亲路线后复核超时费",
      note: "问清楚司机红包、停车费、高速费谁出",
    },
  ],
  expenses: [
    { category: "酒店", item: "宴席定金", amount: 10000, paid: true },
    { category: "婚庆", item: "方案预估", amount: 18000, paid: false },
    { category: "摄影", item: "双机跟拍", amount: 8800, paid: false },
    { category: "礼服", item: "主纱租赁", amount: 6900, paid: true },
  ],
  guests: [
    { name: "张阿姨", side: "女方亲戚", count: 2, attending: true, gift: 0, seat: "待排" },
    { name: "大学室友", side: "朋友", count: 4, attending: true, gift: 0, seat: "朋友桌" },
    { name: "产品组同事", side: "同事", count: 6, attending: false, gift: 0, seat: "待定" },
  ],
  inspirations: [
    {
      title: "韩系白绿",
      tag: "现场",
      note: "白绿花艺，暖光蜡烛，香槟色桌布",
      colors: JSON.stringify(["#f7f4ec", "#dbe7dc", "#a9bfae"]),
      palette: "白绿",
      keywords: JSON.stringify(["韩系极简", "白绿花艺", "暖光", "自然"]),
    },
    {
      title: "不要大红",
      tag: "避雷",
      note: "现场色彩控制在奶白、浅绿、香槟金",
      colors: JSON.stringify(["#fffaf4", "#e8d4b6", "#b8945f"]),
      palette: "香槟金",
      keywords: JSON.stringify(["奶油白", "低饱和", "香槟色", "不要大红"]),
    },
    {
      title: "自然手捧花",
      tag: "花艺",
      note: "松弛、不规整，有一点空气感",
      colors: JSON.stringify(["#f0ece4", "#91a996", "#e9b7ae"]),
      palette: "玫瑰粉",
      keywords: JSON.stringify(["自然花艺", "空气感", "手捧花", "森系"]),
    },
  ],
  profiles: [
    {
      person: "新娘",
      weight: "48.5 kg",
      outfit: "晨袍 / 秀禾 / 主纱 / 敬酒服",
      makeup: "韩系清透，底妆干净，眼妆不要浓",
      fitting: "主纱已试，敬酒服待定",
      grooming: "美甲、胸贴、美瞳、饰品待购买",
      note: "试妆当天带主纱照片和手捧花参考图",
    },
    {
      person: "新郎",
      weight: "72 kg",
      outfit: "黑色西装 / 白衬衫 / 领结 / 皮鞋",
      makeup: "轻遮瑕，发型清爽",
      fitting: "西装需二次量体",
      grooming: "皮鞋、袖扣、领带待确认",
      note: "新郎今天还没被完全安排，但已经在路上",
    },
  ],
  timeline: [
    { title: "接亲", detail: "红包、游戏道具、摄影跟拍" },
    { title: "敬茶", detail: "茶具、父母胸花、摄影机位" },
    { title: "仪式", detail: "誓词、戒指、音乐、灯光" },
    { title: "敬酒", detail: "敬酒服、伴郎伴娘动线" },
    { title: "送客", detail: "喜糖、伴手礼、合照区" },
  ],
  settings: [
    { key: "weddingDate", value: "2026-09-26" },
    { key: "totalBudget", value: "180000" },
  ],
};

// 迁移函数
function migrateData() {
  console.log('🔄 开始迁移数据...\n');

  let count = 0;
  let total = 0;

  // 计算总数
  Object.values(initialData).forEach(arr => {
    if (Array.isArray(arr)) total += arr.length;
  });

  // 商家数据
  console.log('📦 迁移商家数据...');
  initialData.vendors.forEach(vendor => {
    db.run(
      'INSERT OR IGNORE INTO vendors (type, name, style, contact, wechat, quote, deposit, final, signed, depositPaid, package, outfit, schedule, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [vendor.type, vendor.name, vendor.style, vendor.contact, vendor.wechat, vendor.quote, vendor.deposit, vendor.final, vendor.signed ? 1 : 0, vendor.depositPaid ? 1 : 0, vendor.package, vendor.outfit, vendor.schedule, vendor.note],
      function(err) {
        if (!err) count++;
        if (err) console.error('   ✗', vendor.name, err.message);
      }
    );
  });

  // 预算数据
  console.log('💰 迁移预算数据...');
  initialData.expenses.forEach(expense => {
    db.run(
      'INSERT OR IGNORE INTO expenses (category, item, amount, paid) VALUES (?, ?, ?, ?)',
      [expense.category, expense.item, expense.amount, expense.paid ? 1 : 0],
      function(err) {
        if (!err) count++;
        if (err) console.error('   ✗', expense.item, err.message);
      }
    );
  });

  // 宾客数据
  console.log('👥 迁移宾客数据...');
  initialData.guests.forEach(guest => {
    db.run(
      'INSERT OR IGNORE INTO guests (name, side, count, attending, gift, seat) VALUES (?, ?, ?, ?, ?, ?)',
      [guest.name, guest.side, guest.count, guest.attending ? 1 : 0, guest.gift, guest.seat],
      function(err) {
        if (!err) count++;
        if (err) console.error('   ✗', guest.name, err.message);
      }
    );
  });

  // 灵感数据
  console.log('💡 迁移灵感数据...');
  initialData.inspirations.forEach(inspiration => {
    db.run(
      'INSERT OR IGNORE INTO inspirations (title, tag, note, palette, keywords, colors) VALUES (?, ?, ?, ?, ?, ?)',
      [inspiration.title, inspiration.tag, inspiration.note, inspiration.palette, inspiration.keywords, inspiration.colors],
      function(err) {
        if (!err) count++;
        if (err) console.error('   ✗', inspiration.title, err.message);
      }
    );
  });

  // 新人档案数据
  console.log('👰 迁移新人档案...');
  initialData.profiles.forEach(profile => {
    db.run(
      'INSERT OR IGNORE INTO profiles (person, weight, outfit, makeup, fitting, grooming, note) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [profile.person, profile.weight, profile.outfit, profile.makeup, profile.fitting, profile.grooming, profile.note],
      function(err) {
        if (!err) count++;
        if (err) console.error('   ✗', profile.person, err.message);
      }
    );
  });

  // 流程数据
  console.log('📋 迁移流程数据...');
  initialData.timeline.forEach(item => {
    db.run(
      'INSERT OR IGNORE INTO timeline (title, detail) VALUES (?, ?)',
      [item.title, item.detail],
      function(err) {
        if (!err) count++;
        if (err) console.error('   ✗', item.title, err.message);
      }
    );
  });

  // 设置数据
  console.log('⚙️  迁移设置数据...');
  initialData.settings.forEach(setting => {
    db.run(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [setting.key, setting.value],
      function(err) {
        if (!err) count++;
        if (err) console.error('   ✗', setting.key, err.message);
      }
    );
  });

  // 完成后输出结果
  setTimeout(() => {
    console.log(`\n✅ 数据迁移完成！`);
    console.log(`📊 已迁移 ${count} 条记录 / 共 ${total} 条\n`);
    db.close(() => process.exit(0));
  }, 1000);
}

// 执行迁移
migrateData();
