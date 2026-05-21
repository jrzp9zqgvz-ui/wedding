/**
 * API 集成模块 - 与后端 SQLite 服务交互
 */

const API_BASE = 'http://localhost:3000';

// ==================== 计划相关 API ====================

async function fetchAllPlans() {
  try {
    const response = await fetch(`${API_BASE}/plans`);
    if (!response.ok) throw new Error('获取计划失败');
    return await response.json();
  } catch (error) {
    console.error('获取计划错误:', error);
    return [];
  }
}

async function addPlan(title, description, start_date, end_date, category) {
  try {
    const response = await fetch(`${API_BASE}/plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, start_date, end_date, category })
    });
    if (!response.ok) throw new Error('添加计划失败');
    return await response.json();
  } catch (error) {
    console.error('添加计划错误:', error);
    alert('添加计划失败：' + error.message);
    return null;
  }
}

async function updatePlan(id, title, description, start_date, end_date, category, done) {
  try {
    const response = await fetch(`${API_BASE}/plans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, start_date, end_date, category, done })
    });
    if (!response.ok) throw new Error('更新计划失败');
    return await response.json();
  } catch (error) {
    console.error('更新计划错误:', error);
    alert('更新计划失败：' + error.message);
    return null;
  }
}

async function deletePlan(id) {
  try {
    const response = await fetch(`${API_BASE}/plans/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('删除计划失败');
    return await response.json();
  } catch (error) {
    console.error('删除计划错误:', error);
    alert('删除计划失败：' + error.message);
    return null;
  }
}

async function togglePlanDone(id) {
  try {
    const response = await fetch(`${API_BASE}/plans/${id}/toggle`, { method: 'PATCH' });
    if (!response.ok) throw new Error('更新状态失败');
    return await response.json();
  } catch (error) {
    console.error('切换状态错误:', error);
    return null;
  }
}

// ==================== 商家 API ====================

async function fetchVendors(type) {
  try {
    let url = `${API_BASE}/vendors`;
    if (type) url += `?type=${encodeURIComponent(type)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('获取商家失败');
    return await response.json();
  } catch (error) {
    console.error('获取商家错误:', error);
    return [];
  }
}

async function addVendor(type, name, style, contact, wechat, quote, deposit, final, signed, depositPaid, pkg, outfit, schedule, note) {
  try {
    const response = await fetch(`${API_BASE}/vendors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, name, style, contact, wechat, quote, deposit, final, signed, depositPaid, package: pkg, outfit, schedule, note })
    });
    if (!response.ok) throw new Error('添加商家失败');
    return await response.json();
  } catch (error) {
    console.error('添加商家错误:', error);
    return null;
  }
}

async function updateVendor(id, type, name, style, contact, wechat, quote, deposit, final, signed, depositPaid, pkg, outfit, schedule, note) {
  try {
    const response = await fetch(`${API_BASE}/vendors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, name, style, contact, wechat, quote, deposit, final, signed, depositPaid, package: pkg, outfit, schedule, note })
    });
    if (!response.ok) throw new Error('更新商家失败');
    return await response.json();
  } catch (error) {
    console.error('更新商家错误:', error);
    return null;
  }
}

async function deleteVendor(id) {
  try {
    const response = await fetch(`${API_BASE}/vendors/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('删除商家失败');
    return await response.json();
  } catch (error) {
    console.error('删除商家错误:', error);
    return null;
  }
}

// ==================== 预算 API ====================

async function fetchExpenses() {
  try {
    const response = await fetch(`${API_BASE}/expenses`);
    if (!response.ok) throw new Error('获取支出失败');
    return await response.json();
  } catch (error) {
    console.error('获取支出错误:', error);
    return [];
  }
}

async function fetchExpensesSummary() {
  try {
    const response = await fetch(`${API_BASE}/expenses/summary`);
    if (!response.ok) throw new Error('获取支出汇总失败');
    return await response.json();
  } catch (error) {
    console.error('获取支出汇总错误:', error);
    return [];
  }
}

async function addExpense(category, item, amount, paid) {
  try {
    const response = await fetch(`${API_BASE}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, item, amount, paid })
    });
    if (!response.ok) throw new Error('添加支出失败');
    return await response.json();
  } catch (error) {
    console.error('添加支出错误:', error);
    return null;
  }
}

async function updateExpense(id, category, item, amount, paid) {
  try {
    const response = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, item, amount, paid })
    });
    if (!response.ok) throw new Error('更新支出失败');
    return await response.json();
  } catch (error) {
    console.error('更新支出错误:', error);
    return null;
  }
}

async function deleteExpense(id) {
  try {
    const response = await fetch(`${API_BASE}/expenses/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('删除支出失败');
    return await response.json();
  } catch (error) {
    console.error('删除支出错误:', error);
    return null;
  }
}

// ==================== 宾客 API ====================

async function fetchGuests() {
  try {
    const response = await fetch(`${API_BASE}/guests`);
    if (!response.ok) throw new Error('获取宾客失败');
    return await response.json();
  } catch (error) {
    console.error('获取宾客错误:', error);
    return [];
  }
}

async function addGuest(name, side, count, attending, gift, seat, phone, remark) {
  try {
    const response = await fetch(`${API_BASE}/guests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, side, count, attending, gift, seat, phone, remark })
    });
    if (!response.ok) throw new Error('添加宾客失败');
    return await response.json();
  } catch (error) {
    console.error('添加宾客错误:', error);
    return null;
  }
}

async function updateGuest(id, name, side, count, attending, gift, seat, phone, remark) {
  try {
    const response = await fetch(`${API_BASE}/guests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, side, count, attending, gift, seat, phone, remark })
    });
    if (!response.ok) throw new Error('更新宾客失败');
    return await response.json();
  } catch (error) {
    console.error('更新宾客错误:', error);
    return null;
  }
}

async function deleteGuest(id) {
  try {
    const response = await fetch(`${API_BASE}/guests/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('删除宾客失败');
    return await response.json();
  } catch (error) {
    console.error('删除宾客错误:', error);
    return null;
  }
}

// ==================== 灵感 API ====================

async function fetchInspirations() {
  try {
    const response = await fetch(`${API_BASE}/inspirations`);
    if (!response.ok) throw new Error('获取灵感失败');
    return await response.json();
  } catch (error) {
    console.error('获取灵感错误:', error);
    return [];
  }
}

async function addInspiration(title, tag, note, palette, keywords, colors, image_url) {
  try {
    const response = await fetch(`${API_BASE}/inspirations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, tag, note, palette, keywords, colors, image_url })
    });
    if (!response.ok) throw new Error('添加灵感失败');
    return await response.json();
  } catch (error) {
    console.error('添加灵感错误:', error);
    return null;
  }
}

async function deleteInspiration(id) {
  try {
    const response = await fetch(`${API_BASE}/inspirations/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('删除灵感失败');
    return await response.json();
  } catch (error) {
    console.error('删除灵感错误:', error);
    return null;
  }
}

// ==================== 新人档案 API ====================

async function fetchProfiles() {
  try {
    const response = await fetch(`${API_BASE}/profiles`);
    if (!response.ok) throw new Error('获取档案失败');
    return await response.json();
  } catch (error) {
    console.error('获取档案错误:', error);
    return [];
  }
}

async function addProfile(person, weight, outfit, makeup, fitting, grooming, note) {
  try {
    const response = await fetch(`${API_BASE}/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ person, weight, outfit, makeup, fitting, grooming, note })
    });
    if (!response.ok) throw new Error('添加档案失败');
    return await response.json();
  } catch (error) {
    console.error('添加档案错误:', error);
    return null;
  }
}

async function updateProfile(id, person, weight, outfit, makeup, fitting, grooming, note) {
  try {
    const response = await fetch(`${API_BASE}/profiles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ person, weight, outfit, makeup, fitting, grooming, note })
    });
    if (!response.ok) throw new Error('更新档案失败');
    return await response.json();
  } catch (error) {
    console.error('更新档案错误:', error);
    return null;
  }
}

// ==================== 流程 API ====================

async function fetchTimeline() {
  try {
    const response = await fetch(`${API_BASE}/timeline`);
    if (!response.ok) throw new Error('获取流程失败');
    return await response.json();
  } catch (error) {
    console.error('获取流程错误:', error);
    return [];
  }
}

async function addTimelineItem(title, detail, time) {
  try {
    const response = await fetch(`${API_BASE}/timeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, detail, time })
    });
    if (!response.ok) throw new Error('添加流程失败');
    return await response.json();
  } catch (error) {
    console.error('添加流程错误:', error);
    return null;
  }
}

async function updateTimelineItem(id, title, detail, time, completed) {
  try {
    const response = await fetch(`${API_BASE}/timeline/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, detail, time, completed })
    });
    if (!response.ok) throw new Error('更新流程失败');
    return await response.json();
  } catch (error) {
    console.error('更新流程错误:', error);
    return null;
  }
}

async function toggleTimelineItem(id) {
  try {
    const response = await fetch(`${API_BASE}/timeline/${id}/toggle`, { method: 'PATCH' });
    if (!response.ok) throw new Error('切换流程状态失败');
    return await response.json();
  } catch (error) {
    console.error('切换流程状态错误:', error);
    return null;
  }
}

async function deleteTimelineItem(id) {
  try {
    const response = await fetch(`${API_BASE}/timeline/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('删除流程失败');
    return await response.json();
  } catch (error) {
    console.error('删除流程错误:', error);
    return null;
  }
}

// ==================== 设置 API ====================

async function getSetting(key) {
  try {
    const response = await fetch(`${API_BASE}/settings/${key}`);
    if (!response.ok) throw new Error('获取设置失败');
    const result = await response.json();
    return result.value;
  } catch (error) {
    console.error('获取设置错误:', error);
    return null;
  }
}

async function saveSetting(key, value) {
  try {
    const response = await fetch(`${API_BASE}/settings/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    if (!response.ok) throw new Error('保存设置失败');
    return await response.json();
  } catch (error) {
    console.error('保存设置错误:', error);
    return null;
  }
}

// ==================== 工具函数 ====================

async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) throw new Error('后端服务不可用');
    return await response.json();
  } catch (error) {
    console.error('后端服务不可用:', error);
    return null;
  }
}

// 页面加载时检查后端连接
window.addEventListener('load', async () => {
  const health = await checkBackendHealth();
  if (!health) {
    console.warn('⚠️ 后端服务未运行，请在终端执行: npm start');
  }
});
