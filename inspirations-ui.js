/**
 * 灵感墙模块 UI
 */

function initInspirationUI() {
  const inspirationBtn = document.querySelector('[data-section="inspirations"] .add-btn');
  const inspirationDialog = document.getElementById('inspiration-dialog');
  
  if (inspirationBtn) {
    inspirationBtn.addEventListener('click', () => {
      document.getElementById('inspiration-form').reset();
      inspirationDialog.showModal();
    });
  }
  
  if (inspirationDialog) {
    inspirationDialog.addEventListener('cancel', () => {
      inspirationDialog.close();
    });
  }
  
  const form = document.getElementById('inspiration-form');
  if (form) {
    form.addEventListener('submit', handleInspirationSubmit);
  }
  
  loadInspirationsFromAPI();
}

async function loadInspirationsFromAPI() {
  try {
    const inspirations = await fetchInspirations();
    renderInspirationsList(inspirations);
  } catch (error) {
    console.error('加载灵感失败:', error);
  }
}

function renderInspirationsList(inspirations) {
  const listContainer = document.getElementById('inspirations-list');
  if (!listContainer) return;
  
  if (inspirations.length === 0) {
    listContainer.innerHTML = '<p class="empty-state">暂无灵感信息</p>';
    return;
  }
  
  let html = '';
  inspirations.forEach(inspiration => {
    html += createInspirationHTML(inspiration);
  });
  
  listContainer.innerHTML = html;
  
  // 绑定事件
  document.querySelectorAll('.inspiration-item').forEach(item => {
    const inspirationId = item.dataset.inspirationId;
    
    item.querySelector('.delete-btn')?.addEventListener('click', () => {
      confirmDeleteInspiration(inspirationId);
    });
  });
}

function createInspirationHTML(inspiration) {
  const keywords = Array.isArray(inspiration.keywords) ? inspiration.keywords : [];
  const colors = Array.isArray(inspiration.colors) ? inspiration.colors : [];
  
  let html = `
    <div class="inspiration-item" data-inspiration-id="${inspiration.id}">
      <div class="inspiration-header">
        <h4>${inspiration.title}</h4>
        <span class="tag-badge">${inspiration.tag || '灵感'}</span>
      </div>
  `;
  
  // 颜色调色盘
  if (colors.length > 0) {
    html += `<div class="color-palette">`;
    colors.forEach(color => {
      html += `<div class="color-swatch" style="background-color: ${color};" title="${color}"></div>`;
    });
    html += `</div>`;
  }
  
  // 内容
  if (inspiration.note) {
    html += `<p class="inspiration-note">${inspiration.note}</p>`;
  }
  
  // 关键词
  if (keywords.length > 0) {
    html += `<div class="keywords">`;
    keywords.forEach(keyword => {
      html += `<span class="keyword-tag">${keyword}</span>`;
    });
    html += `</div>`;
  }
  
  // 操作按钮
  html += `
      <div class="inspiration-actions">
        <button class="btn-small delete-btn" style="background:#e8b4b4;">删除</button>
      </div>
    </div>
  `;
  
  return html;
}

function confirmDeleteInspiration(inspirationId) {
  if (confirm('确定要删除这个灵感吗？')) {
    deleteInspirationItem(inspirationId);
  }
}

async function deleteInspirationItem(inspirationId) {
  try {
    const result = await deleteInspiration(inspirationId);
    if (result) {
      loadInspirationsFromAPI();
    }
  } catch (error) {
    console.error('删除失败:', error);
  }
}

async function handleInspirationSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const title = form.querySelector('[name="title"]').value;
  const tag = form.querySelector('[name="tag"]').value || '灵感';
  const note = form.querySelector('[name="note"]').value || '';
  const palette = form.querySelector('[name="palette"]').value || '';
  const keywordsStr = form.querySelector('[name="keywords"]').value || '';
  const colorsStr = form.querySelector('[name="colors"]').value || '';
  
  if (!title) {
    alert('请填写灵感标题');
    return;
  }
  
  const keywords = keywordsStr.split('、').filter(k => k.trim());
  const colors = colorsStr.split('、').filter(c => c.trim());
  
  const result = await addInspiration(title, tag, note, palette, keywords, colors, '');
  if (result) {
    loadInspirationsFromAPI();
    document.getElementById('inspiration-dialog').close();
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initInspirationUI);