/**
 * 商家管理模块 UI
 */

const vendorTypes = ['酒店', '司仪', '化妆', '摄影', '摄像', '婚庆', '接亲车队'];

function initVendorUI() {
  const vendorBtn = document.querySelector('[data-section="vendors"] .add-btn');
  const vendorDialog = document.getElementById('vendor-dialog');
  
  if (vendorBtn) {
    vendorBtn.addEventListener('click', () => {
      document.getElementById('vendor-form').reset();
      vendorDialog.showModal();
    });
  }
  
  if (vendorDialog) {
    vendorDialog.addEventListener('cancel', () => {
      vendorDialog.close();
    });
    
    const closeBtn = vendorDialog.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        vendorDialog.close();
      });
    }
  }
  
  const form = document.getElementById('vendor-form');
  if (form) {
    form.addEventListener('submit', handleVendorSubmit);
  }
  
  // 切换标签页
  document.querySelectorAll('[data-vendor-type]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const type = e.target.dataset.vendorType;
      loadVendorsFromAPI(type === 'all' ? null : type);
      
      // 更新活跃标签
      document.querySelectorAll('[data-vendor-type]').forEach(t => {
        t.classList.remove('active');
      });
      e.target.classList.add('active');
    });
  });
  
  loadVendorsFromAPI();
}

async function loadVendorsFromAPI(type) {
  try {
    const vendors = await fetchVendors(type);
    renderVendorsList(vendors);
  } catch (error) {
    console.error('加载商家失败:', error);
  }
}

function renderVendorsList(vendors) {
  const listContainer = document.getElementById('vendors-list');
  if (!listContainer) return;
  
  if (vendors.length === 0) {
    listContainer.innerHTML = '<p class="empty-state">暂无商家信息</p>';
    return;
  }
  
  // 按类型分组
  const grouped = {};
  vendors.forEach(vendor => {
    if (!grouped[vendor.type]) {
      grouped[vendor.type] = [];
    }
    grouped[vendor.type].push(vendor);
  });
  
  let html = '';
  Object.keys(grouped).forEach(type => {
    html += `<div class="vendor-type-group">
      <h3>${type}</h3>
      <div class="vendor-items">`;
    
    grouped[type].forEach(vendor => {
      html += createVendorHTML(vendor);
    });
    
    html += '</div></div>';
  });
  
  listContainer.innerHTML = html;
  
  // 绑定事件
  document.querySelectorAll('.vendor-item').forEach(item => {
    const vendorId = item.dataset.vendorId;
    
    item.querySelector('.edit-btn')?.addEventListener('click', () => {
      editVendor(vendorId);
    });
    
    item.querySelector('.delete-btn')?.addEventListener('click', () => {
      confirmDeleteVendor(vendorId);
    });
    
    item.querySelector('.toggle-signed')?.addEventListener('click', () => {
      toggleVendorStatus(vendorId, 'signed');
    });
    
    item.querySelector('.toggle-deposit')?.addEventListener('click', () => {
      toggleVendorStatus(vendorId, 'depositPaid');
    });
  });
}

function createVendorHTML(vendor) {
  const signedClass = vendor.signed ? 'signed' : '';
  const depositClass = vendor.depositPaid ? 'paid' : '';
  
  return `
    <div class="vendor-item" data-vendor-id="${vendor.id}">
      <div class="vendor-header">
        <h4>${vendor.name}</h4>
        <div class="vendor-status">
          <span class="status-badge ${signedClass}" title="签约状态">
            ${vendor.signed ? '✓ 已签约' : '未签约'}
          </span>
          <span class="status-badge ${depositClass}" title="定金状态">
            ${vendor.depositPaid ? '✓ 已付定金' : '未付定金'}
          </span>
        </div>
      </div>
      
      <div class="vendor-details">
        <div class="detail-row">
          <span class="label">分类:</span>
          <span class="value">${vendor.type}</span>
        </div>
        ${vendor.style ? `<div class="detail-row">
          <span class="label">风格:</span>
          <span class="value">${vendor.style}</span>
        </div>` : ''}
        ${vendor.quote ? `<div class="detail-row">
          <span class="label">报价:</span>
          <span class="value price">¥${vendor.quote.toLocaleString()}</span>
        </div>` : ''}
        ${vendor.deposit ? `<div class="detail-row">
          <span class="label">定金:</span>
          <span class="value">¥${vendor.deposit.toLocaleString()}</span>
        </div>` : ''}
        ${vendor.final ? `<div class="detail-row">
          <span class="label">尾款:</span>
          <span class="value">¥${vendor.final.toLocaleString()}</span>
        </div>` : ''}
        ${vendor.contact ? `<div class="detail-row">
          <span class="label">联系:</span>
          <span class="value">${vendor.contact}</span>
        </div>` : ''}
        ${vendor.wechat ? `<div class="detail-row">
          <span class="label">微信:</span>
          <span class="value">${vendor.wechat}</span>
        </div>` : ''}
        ${vendor.package ? `<div class="detail-row">
          <span class="label">套餐:</span>
          <span class="value">${vendor.package}</span>
        </div>` : ''}
        ${vendor.outfit ? `<div class="detail-row">
          <span class="label">服装:</span>
          <span class="value">${vendor.outfit}</span>
        </div>` : ''}
        ${vendor.schedule ? `<div class="detail-row">
          <span class="label">进度:</span>
          <span class="value">${vendor.schedule}</span>
        </div>` : ''}
        ${vendor.note ? `<div class="detail-row">
          <span class="label">备注:</span>
          <span class="value note">${vendor.note}</span>
        </div>` : ''}
      </div>
      
      <div class="vendor-actions">
        <button class="btn-small toggle-signed" title="切换签约状态">
          ${vendor.signed ? '✓ 已签约' : '未签约'}
        </button>
        <button class="btn-small toggle-deposit" title="切换定金状态">
          ${vendor.depositPaid ? '✓ 已付' : '未付'}
        </button>
        <button class="btn-small edit-btn">编辑</button>
        <button class="btn-small delete-btn" style="background:#e8b4b4;">删除</button>
      </div>
    </div>
  `;
}

async function toggleVendorStatus(vendorId, field) {
  try {
    // 获取当前数据
    const vendors = await fetchVendors();
    const vendor = vendors.find(v => v.id == vendorId);
    if (!vendor) return;
    
    // 更新字段
    vendor[field] = !vendor[field];
    
    // 提交更新
    const result = await updateVendor(
      vendor.id, vendor.type, vendor.name, vendor.style, vendor.contact,
      vendor.wechat, vendor.quote, vendor.deposit, vendor.final,
      vendor.signed, vendor.depositPaid, vendor.package, vendor.outfit,
      vendor.schedule, vendor.note
    );
    
    if (result) {
      loadVendorsFromAPI();
    }
  } catch (error) {
    console.error('更新状态失败:', error);
  }
}

function editVendor(vendorId) {
  // TODO: 实现编辑功能
  alert('编辑功能开发中...');
}

function confirmDeleteVendor(vendorId) {
  if (confirm('确定要删除这个商家吗？')) {
    deleteVendorItem(vendorId);
  }
}

async function deleteVendorItem(vendorId) {
  try {
    const result = await deleteVendor(vendorId);
    if (result) {
      loadVendorsFromAPI();
    }
  } catch (error) {
    console.error('删除失败:', error);
  }
}

async function handleVendorSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const type = form.querySelector('[name="type"]').value;
  const name = form.querySelector('[name="name"]').value;
  const style = form.querySelector('[name="style"]').value || '';
  const contact = form.querySelector('[name="contact"]').value || '';
  const wechat = form.querySelector('[name="wechat"]').value || '';
  const quote = parseFloat(form.querySelector('[name="quote"]').value) || 0;
  const deposit = parseFloat(form.querySelector('[name="deposit"]').value) || 0;
  const final = parseFloat(form.querySelector('[name="final"]').value) || 0;
  const package_ = form.querySelector('[name="package"]').value || '';
  const outfit = form.querySelector('[name="outfit"]').value || '';
  const schedule = form.querySelector('[name="schedule"]').value || '';
  const note = form.querySelector('[name="note"]').value || '';
  
  if (!type || !name) {
    alert('请填写分类和名称');
    return;
  }
  
  const result = await addVendor(type, name, style, contact, wechat, quote, deposit, final, false, false, package_, outfit, schedule, note);
  if (result) {
    loadVendorsFromAPI();
    document.getElementById('vendor-dialog').close();
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initVendorUI);