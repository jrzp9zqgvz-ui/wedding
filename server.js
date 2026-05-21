const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

// 中间件配置
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./'));

// ==================== 计划 API ====================

app.get('/plans', (req, res) => {
  db.all('SELECT * FROM plans ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('/plans', (req, res) => {
  const { title, description, start_date, end_date, category } = req.body;
  if (!title) return res.status(400).json({ message: '标题为必填项' });
  
  db.run(
    'INSERT INTO plans (title, description, start_date, end_date, category) VALUES (?, ?, ?, ?, ?)',
    [title, description, start_date, end_date, category],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID, message: '计划添加成功' });
    }
  );
});

app.put('/plans/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, start_date, end_date, category, done } = req.body;
  
  db.run(
    'UPDATE plans SET title = ?, description = ?, start_date = ?, end_date = ?, category = ?, done = ? WHERE id = ?',
    [title, description, start_date, end_date, category, done, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: '计划更新成功' });
    }
  );
});

app.delete('/plans/:id', (req, res) => {
  db.run('DELETE FROM plans WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: '计划删除成功' });
  });
});

app.patch('/plans/:id/toggle', (req, res) => {
  db.get('SELECT done FROM plans WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err);
    const newDone = row ? !row.done : true;
    db.run('UPDATE plans SET done = ? WHERE id = ?', [newDone ? 1 : 0, req.params.id], (err) => {
      if (err) return res.status(500).send(err);
      res.json({ id: req.params.id, done: newDone, message: '状态更新成功' });
    });
  });
});

// ==================== 商家 API ====================

app.get('/vendors', (req, res) => {
  const type = req.query.type;
  let query = 'SELECT * FROM vendors';
  let params = [];
  if (type) {
    query += ' WHERE type = ?';
    params.push(type);
  }
  query += ' ORDER BY created_at DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('/vendors', (req, res) => {
  const { type, name, style, contact, wechat, quote, deposit, final, signed, depositPaid, package: pkg, outfit, schedule, note } = req.body;
  if (!type || !name) return res.status(400).json({ message: '类型和名称为必填项' });
  
  db.run(
    'INSERT INTO vendors (type, name, style, contact, wechat, quote, deposit, final, signed, depositPaid, package, outfit, schedule, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [type, name, style, contact, wechat, quote, deposit, final, signed ? 1 : 0, depositPaid ? 1 : 0, pkg, outfit, schedule, note],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID, message: '商家添加成功' });
    }
  );
});

app.put('/vendors/:id', (req, res) => {
  const { type, name, style, contact, wechat, quote, deposit, final, signed, depositPaid, package: pkg, outfit, schedule, note } = req.body;
  
  db.run(
    'UPDATE vendors SET type = ?, name = ?, style = ?, contact = ?, wechat = ?, quote = ?, deposit = ?, final = ?, signed = ?, depositPaid = ?, package = ?, outfit = ?, schedule = ?, note = ? WHERE id = ?',
    [type, name, style, contact, wechat, quote, deposit, final, signed ? 1 : 0, depositPaid ? 1 : 0, pkg, outfit, schedule, note, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: '商家更新成功' });
    }
  );
});

app.delete('/vendors/:id', (req, res) => {
  db.run('DELETE FROM vendors WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: '商家删除成功' });
  });
});

// ==================== 预算 API ====================

app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.get('/expenses/summary', (req, res) => {
  db.all('SELECT category, SUM(amount) as total, SUM(CASE WHEN paid THEN amount ELSE 0 END) as paid FROM expenses GROUP BY category', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('/expenses', (req, res) => {
  const { category, item, amount, paid } = req.body;
  if (!category || !item) return res.status(400).json({ message: '分类和项目为必填项' });
  
  db.run(
    'INSERT INTO expenses (category, item, amount, paid) VALUES (?, ?, ?, ?)',
    [category, item, amount, paid ? 1 : 0],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID, message: '支出添加成功' });
    }
  );
});

app.put('/expenses/:id', (req, res) => {
  const { category, item, amount, paid } = req.body;
  
  db.run(
    'UPDATE expenses SET category = ?, item = ?, amount = ?, paid = ? WHERE id = ?',
    [category, item, amount, paid ? 1 : 0, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: '支出更新成功' });
    }
  );
});

app.delete('/expenses/:id', (req, res) => {
  db.run('DELETE FROM expenses WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: '支出删除成功' });
  });
});

// ==================== 宾客 API ====================

app.get('/guests', (req, res) => {
  db.all('SELECT * FROM guests ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('/guests', (req, res) => {
  const { name, side, count, attending, gift, seat, phone, remark } = req.body;
  if (!name) return res.status(400).json({ message: '名字为必填项' });
  
  db.run(
    'INSERT INTO guests (name, side, count, attending, gift, seat, phone, remark) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, side, count || 1, attending !== false ? 1 : 0, gift || 0, seat, phone, remark],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID, message: '宾客添加成功' });
    }
  );
});

app.put('/guests/:id', (req, res) => {
  const { name, side, count, attending, gift, seat, phone, remark } = req.body;
  
  db.run(
    'UPDATE guests SET name = ?, side = ?, count = ?, attending = ?, gift = ?, seat = ?, phone = ?, remark = ? WHERE id = ?',
    [name, side, count || 1, attending !== false ? 1 : 0, gift || 0, seat, phone, remark, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: '宾客更新成功' });
    }
  );
});

app.delete('/guests/:id', (req, res) => {
  db.run('DELETE FROM guests WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: '宾客删除成功' });
  });
});

// ==================== 灵感墙 API ====================

app.get('/inspirations', (req, res) => {
  db.all('SELECT * FROM inspirations ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    const parsed = rows.map(row => ({
      ...row,
      keywords: row.keywords ? JSON.parse(row.keywords) : [],
      colors: row.colors ? JSON.parse(row.colors) : []
    }));
    res.json(parsed);
  });
});

app.post('/inspirations', (req, res) => {
  const { title, tag, note, palette, keywords, colors, image_url } = req.body;
  if (!title) return res.status(400).json({ message: '标题为必填项' });
  
  db.run(
    'INSERT INTO inspirations (title, tag, note, palette, keywords, colors, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, tag, note, palette, JSON.stringify(keywords || []), JSON.stringify(colors || []), image_url],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID, message: '灵感添加成功' });
    }
  );
});

app.delete('/inspirations/:id', (req, res) => {
  db.run('DELETE FROM inspirations WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: '灵感删除成功' });
  });
});

// ==================== 新人档案 API ====================

app.get('/profiles', (req, res) => {
  db.all('SELECT * FROM profiles ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('/profiles', (req, res) => {
  const { person, weight, outfit, makeup, fitting, grooming, note } = req.body;
  if (!person) return res.status(400).json({ message: '人物为必填项' });
  
  db.run(
    'INSERT INTO profiles (person, weight, outfit, makeup, fitting, grooming, note) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [person, weight, outfit, makeup, fitting, grooming, note],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID, message: '档案添加成功' });
    }
  );
});

app.put('/profiles/:id', (req, res) => {
  const { person, weight, outfit, makeup, fitting, grooming, note } = req.body;
  
  db.run(
    'UPDATE profiles SET person = ?, weight = ?, outfit = ?, makeup = ?, fitting = ?, grooming = ?, note = ? WHERE id = ?',
    [person, weight, outfit, makeup, fitting, grooming, note, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: '档案更新成功' });
    }
  );
});

// ==================== 流程 API ====================

app.get('/timeline', (req, res) => {
  db.all('SELECT * FROM timeline ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('/timeline', (req, res) => {
  const { title, detail, time } = req.body;
  if (!title) return res.status(400).json({ message: '标题为必填项' });
  
  db.run(
    'INSERT INTO timeline (title, detail, time) VALUES (?, ?, ?)',
    [title, detail, time],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID, message: '流程添加成功' });
    }
  );
});

app.put('/timeline/:id', (req, res) => {
  const { title, detail, time, completed } = req.body;
  
  db.run(
    'UPDATE timeline SET title = ?, detail = ?, time = ?, completed = ? WHERE id = ?',
    [title, detail, time, completed ? 1 : 0, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: '流程更新成功' });
    }
  );
});

app.patch('/timeline/:id/toggle', (req, res) => {
  db.get('SELECT completed FROM timeline WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err);
    const newCompleted = row ? !row.completed : true;
    db.run('UPDATE timeline SET completed = ? WHERE id = ?', [newCompleted ? 1 : 0, req.params.id], (err) => {
      if (err) return res.status(500).send(err);
      res.json({ id: req.params.id, completed: newCompleted });
    });
  });
});

app.delete('/timeline/:id', (req, res) => {
  db.run('DELETE FROM timeline WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: '流程删除成功' });
  });
});

// ==================== 设置 API ====================

app.get('/settings/:key', (req, res) => {
  db.get('SELECT value FROM settings WHERE key = ?', [req.params.key], (err, row) => {
    if (err) return res.status(500).send(err);
    res.json({ key: req.params.key, value: row ? row.value : null });
  });
});

app.post('/settings/:key', (req, res) => {
  const { value } = req.body;
  db.run(
    'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
    [req.params.key, value],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: '设置保存成功' });
    }
  );
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: '服务器运行正常' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🎉 防止备婚崩溃系统后端服务已启动`);
  console.log(`📍 服务器地址: http://localhost:${PORT}`);
  console.log(`💾 数据库: SQLite (plans.db)`);
  console.log(`\n📚 可用的 API 端点 (完整版)\n`);
  console.log(`  计划:`);
  console.log(`    GET    /plans           - 获取所有计划`);
  console.log(`    POST   /plans           - 添加新计划`);
  console.log(`    PUT    /plans/:id       - 更新计划`);
  console.log(`    PATCH  /plans/:id/toggle - 切换计划完成状态`);
  console.log(`    DELETE /plans/:id       - 删除计划\n`);
  console.log(`  商家:`);
  console.log(`    GET    /vendors         - 获取商家列表`);
  console.log(`    POST   /vendors         - 添加商家`);
  console.log(`    PUT    /vendors/:id     - 更新商家`);
  console.log(`    DELETE /vendors/:id     - 删除商家\n`);
  console.log(`  预算:`);
  console.log(`    GET    /expenses        - 获取所有支出`);
  console.log(`    GET    /expenses/summary - 获取支出汇总`);
  console.log(`    POST   /expenses        - 添加支出`);
  console.log(`    PUT    /expenses/:id    - 更新支出`);
  console.log(`    DELETE /expenses/:id    - 删除支出\n`);
  console.log(`  宾客:`);
  console.log(`    GET    /guests          - 获取宾客列表`);
  console.log(`    POST   /guests          - 添加宾客`);
  console.log(`    PUT    /guests/:id      - 更新宾客`);
  console.log(`    DELETE /guests/:id      - 删除宾客\n`);
  console.log(`  灵感:`);
  console.log(`    GET    /inspirations    - 获取灵感列表`);
  console.log(`    POST   /inspirations    - 添加灵感`);
  console.log(`    DELETE /inspirations/:id - 删除灵感\n`);
  console.log(`  新人档案:`);
  console.log(`    GET    /profiles        - 获取档案列表`);
  console.log(`    POST   /profiles        - 添加档案`);
  console.log(`    PUT    /profiles/:id    - 更新档案\n`);
  console.log(`  流程:`);
  console.log(`    GET    /timeline        - 获取流程列表`);
  console.log(`    POST   /timeline        - 添加流程`);
  console.log(`    PUT    /timeline/:id    - 更新流程`);
  console.log(`    PATCH  /timeline/:id/toggle - 切换流程完成状态`);
  console.log(`    DELETE /timeline/:id    - 删除流程\n`);
  console.log(`  设置:`);
  console.log(`    GET    /settings/:key   - 获取设置`);
  console.log(`    POST   /settings/:key   - 保存设置\n`);
  console.log(`  其他:`);
  console.log(`    GET    /health          - 健康检查\n`);
});
