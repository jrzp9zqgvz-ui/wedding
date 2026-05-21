/**
 * 新人档案模块 UI
 */

function initProfileUI() {
  const profileBtn = document.querySelector('[data-section="profiles"] .add-btn');
  const profileDialog = document.getElementById('profile-dialog');
  
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      document.getElementById('profile-form').reset();
      profileDialog.showModal();
    });
  }
  
  if (profileDialog) {
    profileDialog.addEventListener('cancel', () => {
      profileDialog.close();
    });
  }
  
  const form = document.getElementById('profile-form');
  if (form) {
    form.addEventListener('submit', handleProfileSubmit);
  }
  
  loadProfilesFromAPI();
}

async function loadProfilesFromAPI() {
  try {
    const profiles = await fetchProfiles();
    renderProfilesList(profiles);
  } catch (error) {
    console.error('加载档案失败:', error);
  }
}

function renderProfilesList(profiles) {
  const listContainer = document.getElementById('profiles-list');
  if (!listContainer) return;
  
  if (profiles.length === 0) {
    listContainer.innerHTML = '<p class="empty-state">暂无档案信息</p>';
    return;
  }
  
  let html = '';
  profiles.forEach(profile => {
    html += createProfileHTML(profile);
  });
  
  listContainer.innerHTML = html;
  
  // 绑定事件
  document.querySelectorAll('.profile-item').forEach(item => {
    const profileId = item.dataset.profileId;
    
    item.querySelector('.edit-btn')?.addEventListener('click', () => {
      editProfile(profileId);
    });
    
    item.querySelector('.delete-btn')?.addEventListener('click', () => {
      confirmDeleteProfile(profileId);
    });
  });
}

function createProfileHTML(profile) {
  return `
    <div class="profile-item" data-profile-id="${profile.id}">
      <div class="profile-header">
        <h3>${profile.person}</h3>
      </div>
      
      <div class="profile-details">
        <div class="detail-section">
          <h4>基础信息</h4>
          ${profile.weight ? `<div class="detail-row">
            <span class="label">体重:</span>
            <span class="value">${profile.weight}</span>
          </div>` : ''}
        </div>
        
        <div class="detail-section">
          <h4>礼服</h4>
          ${profile.outfit ? `<div class="detail-row">
            <span class="label">服装:</span>
            <span class="value">${profile.outfit}</span>
          </div>` : ''}
        </div>
        
        <div class="detail-section">
          <h4>化妆造型</h4>
          ${profile.makeup ? `<div class="detail-row">
            <span class="label">妆容:</span>
            <span class="value">${profile.makeup}</span>
          </div>` : ''}
        </div>
        
        <div class="detail-section">
          <h4>试装进度</h4>
          ${profile.fitting ? `<div class="detail-row">
            <span class="label">试装:</span>
            <span class="value">${profile.fitting}</span>
          </div>` : ''}
        </div>
        
        <div class="detail-section">
          <h4>仪容整理</h4>
          ${profile.grooming ? `<div class="detail-row">
            <span class="label">项目:</span>
            <span class="value">${profile.grooming}</span>
          </div>` : ''}
        </div>
        
        ${profile.note ? `<div class="detail-section">
          <h4>备注</h4>
          <p class="note">${profile.note}</p>
        </div>` : ''}
      </div>
      
      <div class="profile-actions">
        <button class="btn-small edit-btn">编辑</button>
        <button class="btn-small delete-btn" style="background:#e8b4b4;">删除</button>
      </div>
    </div>
  `;
}

function editProfile(profileId) {
  // TODO: 实现编辑功能
  alert('编辑功能开发中...');
}

function confirmDeleteProfile(profileId) {
  if (confirm('确定要删除这个档案吗？')) {
    deleteProfileItem(profileId);
  }
}

async function deleteProfileItem(profileId) {
  try {
    const result = await deleteProfile(profileId);
    if (result) {
      loadProfilesFromAPI();
    }
  } catch (error) {
    console.error('删除失败:', error);
  }
}

async function handleProfileSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const person = form.querySelector('[name="person"]').value;
  const weight = form.querySelector('[name="weight"]').value || '';
  const outfit = form.querySelector('[name="outfit"]').value || '';
  const makeup = form.querySelector('[name="makeup"]').value || '';
  const fitting = form.querySelector('[name="fitting"]').value || '';
  const grooming = form.querySelector('[name="grooming"]').value || '';
  const note = form.querySelector('[name="note"]').value || '';
  
  if (!person) {
    alert('请填写人物名称');
    return;
  }
  
  const result = await addProfile(person, weight, outfit, makeup, fitting, grooming, note);
  if (result) {
    loadProfilesFromAPI();
    document.getElementById('profile-dialog').close();
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initProfileUI);