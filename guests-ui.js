/**
 * 宾客管理模块 UI
 */

function initGuestUI() {
  const guestBtn = document.querySelector('[data-section="guests"] .add-btn');
  const guestDialog = document.getElementById('guest-dialog');
  
  if (guestBtn) {
    guestBtn.addEventListener('click', () => {
      document.getElementById('guest-form').reset();
      guestDialog.showModal();
    });
  }
  
  if (guestDialog) {
    guestDialog.addEventListener('cancel', () => {
      guestDialog.close();
    });
  }
  
  const form = document.getElementById('guest-form');
  if (form) {
    form.addEventListener('submit', handleGuestSubmit);
  }
  
  // 切换宾客状态标签
  document.querySelectorAll('[data-guest-status]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const status = e.target.dataset.guestStatus;
      loadGuestsFromAPI(status);
      
      document.querySelectorAll('[data-guest-status]').forEach(t => {
        t.classList.remove('active');
      });
      e.target.classList.add('active');
    });
  });
  
  loadGuestsFromAPI();
}

async function loadGuestsFromAPI(filter = 'all') {
  try {
    const guests = await fetchGuests();
    
    const filtered = filter === 'all' ? guests
      : filter === 'attending' ? guests.filter(g => g.attending)
      : guests.filter(g => !g.attending);
    
    renderGuestsList(filtered);
  } catch (error) {
    console.error('加载宾客失败:', error);
  }
}

function renderGuestsList(guests) {
  const listContainer = document.getElementById('guests-list');
  if (!listContainer) return;
  
  if (guests.length === 0) {
    listContainer.innerHTML = '<p class="empty-state">暂无宾客信息</p>';
    return;
  }
  
  // 按方来源分组
  const grouped = {};
  guests.forEach(guest => {
    const side = guest.side || '其他';
    if (!grouped[side]) {
      grouped[side] = [];
    }
    grouped[side].push(guest);
  });
  
  let html = '';
  let totalAttending = 0;
  let totalCount = 0;
  
  Object.keys(grouped).sort().forEach(side => {
    const sideGuests = grouped[side];
    const attendingCount = sideGuests.filter(g => g.attending).length;
    const totalSideCount = sideGuests.reduce((sum, g) => sum + (g.count || 1), 0);
    const attendingSideCount = sideGuests.filter(g => g.attending).reduce((sum, g) => sum + (g.count || 1), 0);
    
    totalAttending += attendingSideCount;
    totalCount += totalSideCount;
    
    html += `<div class="guest-group">
      <div class="group-header">
        <h3>${side}</h3>
        <div class="group-stats">
          <span class="stat">确认: ${attendingCount}/${sideGuests.length}人</span>
          <span class="stat">总计: ${attendingSideCount}/${totalSideCount}位</span>
        </div>
      </div>
      <div class="guest-items">`;
    
    sideGuests.forEach(guest => {
      html += createGuestHTML(guest);
    });
    
    html += '</div></div>';
  });
  
  listContainer.innerHTML = html;
  
  // 添加底部汇总
  const summaryHTML = `<div class="guests-summary">
    <h3>宾客统计</h3>
    <div class="summary-stats">
      <div class="stat-item">
        <span class="label">确认出席</span>
        <span class="amount">${totalAttending}位</span>
      </div>
      <div class="stat-item highlight">
        <span class="label">总计</span>
        <span class="amount">${totalCount}位</span>
      </div>
    </div>
  </div>`;
  
  listContainer.innerHTML += summaryHTML;
  
  // 绑定事件
  document.querySelectorAll('.guest-item').forEach(item => {
    const guestId = item.dataset.guestId;
    
    item.querySelector('.toggle-attending')?.addEventListener('click', () => {
      toggleGuestAttending(guestId);
    });
    
    item.querySelector('.delete-btn')?.addEventListener('click', () => {
      confirmDeleteGuest(guestId);
    });
  });
}

function createGuestHTML(guest) {
  const attendingClass = guest.attending ? 'attending' : 'not-attending';
  
  return `
    <div class="guest-item ${attendingClass}" data-guest-id="${guest.id}">
      <div class="guest-header">
        <h4>${guest.name} <span class="guest-count">${guest.count || 1}人</span></h4>
        <span class="attending-badge">${guest.attending ? '✓ 确认' : '未确认'}</span>
      </div>
      <div class="guest-details">
        ${guest.phone ? `<div class="detail">📱 ${guest.phone}</div>` : ''}
        ${guest.seat ? `<div class="detail">💺 ${guest.seat}</div>` : ''}
        ${guest.gift ? `<div class="detail">🎁 已送礼</div>` : ''}
        ${guest.remark ? `<div class="detail">📝 ${guest.remark}</div>` : ''}
      </div>
      <div class="guest-actions">
        <button class="btn-small toggle-attending" title="切换出席状态">
          ${guest.attending ? '✓ 确认' : '未确认'}
        </button>
        <button class="btn-small delete-btn" style="background:#e8b4b4;">删除</button>
      </div>
    </div>
  `;
}

async function toggleGuestAttending(guestId) {
  try {
    const guests = await fetchGuests();
    const guest = guests.find(g => g.id == guestId);
    if (!guest) return;
    
    const result = await updateGuest(
      guest.id, guest.name, guest.side, guest.count, !guest.attending, guest.gift, guest.seat, guest.phone, guest.remark
    );
    
    if (result) {
      loadGuestsFromAPI();
    }
  } catch (error) {
    console.error('更新失败:', error);
  }
}

function confirmDeleteGuest(guestId) {
  if (confirm('确定要删除这位宾客吗？')) {
    deleteGuestItem(guestId);
  }
}

async function deleteGuestItem(guestId) {
  try {
    const result = await deleteGuest(guestId);
    if (result) {
      loadGuestsFromAPI();
    }
  } catch (error) {
    console.error('删除失败:', error);
  }
}

async function handleGuestSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const name = form.querySelector('[name="name"]').value;
  const side = form.querySelector('[name="side"]').value || '其他';
  const count = parseInt(form.querySelector('[name="count"]').value) || 1;
  const phone = form.querySelector('[name="phone"]').value || '';
  const remark = form.querySelector('[name="remark"]').value || '';
  
  if (!name) {
    alert('请填写宾客名字');
    return;
  }
  
  const result = await addGuest(name, side, count, false, 0, '', phone, remark);
  if (result) {
    loadGuestsFromAPI();
    document.getElementById('guest-dialog').close();
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initGuestUI);