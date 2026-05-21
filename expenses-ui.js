/**
 * 预算管理模块 UI
 */

const expenseCategories = ['酒店', '婚庆', '摄影', '摄像', '化妆', '司仪', '接亲车队', '礼服', '其他'];

function initExpenseUI() {
  const expenseBtn = document.querySelector('[data-section="expenses"] .add-btn');
  const expenseDialog = document.getElementById('expense-dialog');
  
  if (expenseBtn) {
    expenseBtn.addEventListener('click', () => {
      document.getElementById('expense-form').reset();
      expenseDialog.showModal();
    });
  }
  
  if (expenseDialog) {
    expenseDialog.addEventListener('cancel', () => {
      expenseDialog.close();
    });
  }
  
  const form = document.getElementById('expense-form');
  if (form) {
    form.addEventListener('submit', handleExpenseSubmit);
  }
  
  // 切换已支付/未支付标签
  document.querySelectorAll('[data-expense-status]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const status = e.target.dataset.expenseStatus;
      loadExpensesFromAPI(status);
      
      document.querySelectorAll('[data-expense-status]').forEach(t => {
        t.classList.remove('active');
      });
      e.target.classList.add('active');
    });
  });
  
  loadExpensesFromAPI();
}

async function loadExpensesFromAPI(filter = 'all') {
  try {
    const expenses = await fetchExpenses();
    const summary = await fetchExpensesSummary();
    
    const filtered = filter === 'all' ? expenses 
      : filter === 'paid' ? expenses.filter(e => e.paid)
      : expenses.filter(e => !e.paid);
    
    renderExpensesList(filtered, summary);
  } catch (error) {
    console.error('加载预算失败:', error);
  }
}

function renderExpensesList(expenses, summary) {
  const listContainer = document.getElementById('expenses-list');
  if (!listContainer) return;
  
  if (expenses.length === 0) {
    listContainer.innerHTML = '<p class="empty-state">暂无预算信息</p>';
    return;
  }
  
  // 按分类分组
  const grouped = {};
  expenses.forEach(expense => {
    if (!grouped[expense.category]) {
      grouped[expense.category] = [];
    }
    grouped[expense.category].push(expense);
  });
  
  let html = '';
  Object.keys(grouped).sort().forEach(category => {
    const items = grouped[category];
    const total = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const paid = items.filter(item => item.paid).reduce((sum, item) => sum + (item.amount || 0), 0);
    const unpaid = total - paid;
    
    html += `<div class="expense-category-group">
      <div class="category-header">
        <h3>${category}</h3>
        <div class="category-stats">
          <span class="stat">已支付: ¥${paid.toLocaleString()}</span>
          <span class="stat" style="color:#d9534f;">未支付: ¥${unpaid.toLocaleString()}</span>
          <span class="stat total">小计: ¥${total.toLocaleString()}</span>
        </div>
      </div>
      <div class="expense-items">`;
    
    items.forEach(expense => {
      html += createExpenseHTML(expense);
    });
    
    html += '</div></div>';
  });
  
  listContainer.innerHTML = html;
  
  // 添加底部汇总
  const totalPaid = expenses.filter(e => e.paid).reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalUnpaid = expenses.filter(e => !e.paid).reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalAll = totalPaid + totalUnpaid;
  
  const summaryHTML = `<div class="expenses-summary">
    <h3>总体概览</h3>
    <div class="summary-stats">
      <div class="stat-item">
        <span class="label">已支付</span>
        <span class="amount">¥${totalPaid.toLocaleString()}</span>
      </div>
      <div class="stat-item">
        <span class="label">未支付</span>
        <span class="amount">¥${totalUnpaid.toLocaleString()}</span>
      </div>
      <div class="stat-item highlight">
        <span class="label">总预算</span>
        <span class="amount">¥${totalAll.toLocaleString()}</span>
      </div>
    </div>
  </div>`;
  
  listContainer.innerHTML += summaryHTML;
  
  // 绑定事件
  document.querySelectorAll('.expense-item').forEach(item => {
    const expenseId = item.dataset.expenseId;
    
    item.querySelector('.toggle-paid')?.addEventListener('click', () => {
      toggleExpensePaid(expenseId);
    });
    
    item.querySelector('.delete-btn')?.addEventListener('click', () => {
      confirmDeleteExpense(expenseId);
    });
  });
}

function createExpenseHTML(expense) {
  const paidClass = expense.paid ? 'paid' : 'unpaid';
  
  return `
    <div class="expense-item ${paidClass}" data-expense-id="${expense.id}">
      <div class="expense-content">
        <span class="item-name">${expense.item}</span>
        <span class="item-amount">¥${(expense.amount || 0).toLocaleString()}</span>
      </div>
      <div class="expense-actions">
        <button class="btn-small toggle-paid" title="切换支付状态">
          ${expense.paid ? '✓ 已支付' : '未支付'}
        </button>
        <button class="btn-small delete-btn" style="background:#e8b4b4;">删除</button>
      </div>
    </div>
  `;
}

async function toggleExpensePaid(expenseId) {
  try {
    const expenses = await fetchExpenses();
    const expense = expenses.find(e => e.id == expenseId);
    if (!expense) return;
    
    const result = await updateExpense(
      expense.id, expense.category, expense.item, expense.amount, !expense.paid
    );
    
    if (result) {
      loadExpensesFromAPI();
    }
  } catch (error) {
    console.error('更新失败:', error);
  }
}

function confirmDeleteExpense(expenseId) {
  if (confirm('确定要删除这项支出吗？')) {
    deleteExpenseItem(expenseId);
  }
}

async function deleteExpenseItem(expenseId) {
  try {
    const result = await deleteExpense(expenseId);
    if (result) {
      loadExpensesFromAPI();
    }
  } catch (error) {
    console.error('删除失败:', error);
  }
}

async function handleExpenseSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const category = form.querySelector('[name="category"]').value;
  const item = form.querySelector('[name="item"]').value;
  const amount = parseFloat(form.querySelector('[name="amount"]').value) || 0;
  
  if (!category || !item) {
    alert('请填写分类和项目');
    return;
  }
  
  const result = await addExpense(category, item, amount, false);
  if (result) {
    loadExpensesFromAPI();
    document.getElementById('expense-dialog').close();
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initExpenseUI);