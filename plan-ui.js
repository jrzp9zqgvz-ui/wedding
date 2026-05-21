/**
 * 计划 UI 管理模块
 */

// 缓存 DOM 元素
const planElements = {
  listContainer: null,
  dialog: null,
  form: null,
  openBtn: null
};

/**
 * 初始化计划 UI
 */
function initPlanUI() {
  planElements.listContainer = document.getElementById('plans-list');
  planElements.dialog = document.getElementById('plan-dialog');
  planElements.form = document.getElementById('plan-form');
  planElements.openBtn = document.getElementById('open-plan-form-btn');

  if (!planElements.listContainer || !planElements.dialog) {
    console.warn('计划容器或对话框未找到');
    return;
  }

  // 绑定事件
  planElements.openBtn?.addEventListener('click', openPlanDialog);
  planElements.form?.addEventListener('submit', handlePlanSubmit);
  
  // 对话框按钮事件
  const cancelBtn = planElements.dialog.querySelector('[value="cancel"]');
  const saveBtn = planElements.dialog.querySelector('[value="save"]');
  
  cancelBtn?.addEventListener('click', closePlanDialog);
  saveBtn?.addEventListener('click', handlePlanSubmit);

  // 页面加载时获取计划
  loadPlansFromAPI();
}

/**
 * 打开添加计划对话框
 */
function openPlanDialog() {
  if (planElements.dialog) {
    planElements.dialog.showModal();
    document.getElementById('plan-title').focus();
  }
}

/**
 * 关闭对话框
 */
function closePlanDialog() {
  if (planElements.dialog) {
    planElements.dialog.close();
    resetPlanForm();
  }
}

/**
 * 重置表单
 */
function resetPlanForm() {
  if (planElements.form) {
    planElements.form.reset();
  }
}

/**
 * 处理计划表单提交
 */
async function handlePlanSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('plan-title').value.trim();
  const description = document.getElementById('plan-description').value.trim();
  const category = document.getElementById('plan-category').value;
  const startDate = document.getElementById('plan-start-date').value;
  const endDate = document.getElementById('plan-end-date').value;

  if (!title) {
    alert('请输入计划标题');
    return;
  }

  const result = await addPlan(title, description, startDate, endDate, category);
  
  if (result) {
    closePlanDialog();
    loadPlansFromAPI();
  }
}

/**
 * 从 API 加载计划并显示
 */
async function loadPlansFromAPI() {
  const plans = await fetchAllPlans();
  renderPlansList(plans);
}

/**
 * 渲染计划列表
 */
function renderPlansList(plans) {
  if (!planElements.listContainer) return;

  if (plans.length === 0) {
    planElements.listContainer.innerHTML = '<p class="muted" style="padding: 1rem;">还没有计划，点击上方按钮添加一个吧～</p>';
    return;
  }

  planElements.listContainer.innerHTML = plans.map(plan => createPlanHTML(plan)).join('');

  // 绑定每个计划项的事件
  plans.forEach(plan => {
    const planEl = document.getElementById(`plan-${plan.id}`);
    if (planEl) {
      const checkbox = planEl.querySelector('.plan-checkbox');
      const deleteBtn = planEl.querySelector('.plan-delete-btn');
      
      checkbox?.addEventListener('change', () => togglePlanStatus(plan.id));
      deleteBtn?.addEventListener('click', () => confirmDeletePlan(plan.id));
    }
  });
}

/**
 * 创建单个计划的 HTML
 */
function createPlanHTML(plan) {
  const doneClass = plan.done ? 'done' : '';
  const doneText = plan.done ? '✓' : '○';
  const categoryEmoji = getCategoryEmoji(plan.category);
  
  const startDate = plan.start_date ? new Date(plan.start_date).toLocaleDateString('zh-CN') : '';
  const endDate = plan.end_date ? new Date(plan.end_date).toLocaleDateString('zh-CN') : '';
  
  const dateRange = startDate && endDate 
    ? `${startDate} ~ ${endDate}`
    : startDate ? startDate : '';

  return `
    <div class="task-item ${doneClass}" id="plan-${plan.id}">
      <div class="task-content">
        <input type="checkbox" class="plan-checkbox" ${plan.done ? 'checked' : ''} aria-label="标记完成" />
        <div class="task-info">
          <div class="task-title">
            ${categoryEmoji} ${plan.title}
          </div>
          ${plan.description ? `<div class="task-detail">${plan.description}</div>` : ''}
          ${dateRange ? `<div class="task-date" style="font-size: 0.85rem; color: #999; margin-top: 0.25rem;">📅 ${dateRange}</div>` : ''}
        </div>
      </div>
      <div class="task-actions">
        <button class="plan-delete-btn" aria-label="删除计划" style="background: none; border: none; cursor: pointer; color: #999; font-size: 1.2rem;">✕</button>
      </div>
    </div>
  `;
}

/**
 * 获取分类对应的 emoji
 */
function getCategoryEmoji(category) {
  const emojiMap = {
    '酒店': '🏨',
    '婚庆': '💐',
    '摄影': '📸',
    '摄像': '🎥',
    '化妆': '💄',
    '司仪': '🎤',
    '其他': '📝'
  };
  return emojiMap[category] || '📋';
}

/**
 * 切换计划完成状态
 */
async function togglePlanStatus(id) {
  const result = await togglePlanDone(id);
  if (result) {
    loadPlansFromAPI();
  }
}

/**
 * 确认删除计划
 */
async function confirmDeletePlan(id) {
  if (confirm('确定要删除这个计划吗？')) {
    const result = await deletePlan(id);
    if (result) {
      loadPlansFromAPI();
    }
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initPlanUI);
