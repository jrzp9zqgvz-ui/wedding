-- 计划表：存储所有人共享的计划内容
CREATE TABLE IF NOT EXISTS plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  start_date TEXT,
  end_date TEXT,
  category TEXT,
  done BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 商家表：存储婚礼服务商家信息
CREATE TABLE IF NOT EXISTS vendors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  style TEXT,
  contact TEXT,
  wechat TEXT,
  quote REAL,
  deposit REAL,
  final REAL,
  signed BOOLEAN DEFAULT 0,
  depositPaid BOOLEAN DEFAULT 0,
  package TEXT,
  outfit TEXT,
  schedule TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 预算表：存储支出和费用记录
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  item TEXT NOT NULL,
  amount REAL,
  paid BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 宾客表：存储宾客名单和信息
CREATE TABLE IF NOT EXISTS guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  side TEXT,
  count INTEGER DEFAULT 1,
  attending BOOLEAN DEFAULT 1,
  gift REAL DEFAULT 0,
  seat TEXT,
  phone TEXT,
  remark TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 灵感墙表：存储灵感参考和设计理念
CREATE TABLE IF NOT EXISTS inspirations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  tag TEXT,
  note TEXT,
  palette TEXT,
  keywords TEXT,
  colors TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 新人档案表：存储新娘和新郎的信息
CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  person TEXT NOT NULL,
  weight TEXT,
  outfit TEXT,
  makeup TEXT,
  fitting TEXT,
  grooming TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 流程表：存储婚礼当天的流程和任务
CREATE TABLE IF NOT EXISTS timeline (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  detail TEXT,
  time TEXT,
  completed BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 设置表：存储全局设置如婚礼日期、预算等
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
