/**
 * 婚礼流程模块 UI
 */

function initTimelineUI() {
  const timelineBtn = document.querySelector('[data-section="timeline"] .add-btn');
  const timelineDialog = document.getElementById('timeline-dialog');
  
  if (timelineBtn) {
    timelineBtn.addEventListener('click', () => {
      document.getElementById('timeline-form').reset();
      timelineDialog.showModal();
    });
  }
  
  if (timelineDialog) {
    timelineDialog.addEventListener('cancel', () => {
      timelineDialog.close();
    });
  }
  
  const form = document.getElementById('timeline-form');
  if (form) {
    form.addEventListener('submit', handleTimelineSubmit);
  }
  
  loadTimelineFromAPI();
}

async function loadTimelineFromAPI() {
  try {
    const timeline = await fetchTimeline();
    renderTimelineList(timeline);
  } catch (error) {
    console.error('加载流程失败:', error);
  }
}

function renderTimelineList(timeline) {
  const listContainer = document.getElementById('timeline-list');
  if (!listContainer) return;
  
  if (timeline.length === 0) {
    listContainer.innerHTML = '<p class="empty-state">暂无流程信息</p>';
    return;
  }
  
  let html = '<div class="timeline-container">';
  timeline.forEach((item, index) => {
    html += createTimelineHTML(item, index);
  });
  html += '</div>';
  
  listContainer.innerHTML = html;
  
  // 绑定事件
  document.querySelectorAll('.timeline-item').forEach(item => {
    const timelineId = item.dataset.timelineId;
    
    item.querySelector('.toggle-completed')?.addEventListener('click', () => {
      toggleTimelineCompleted(timelineId);
    });
    
    item.querySelector('.delete-btn')?.addEventListener('click', () => {
      confirmDeleteTimeline(timelineId);
    });
  });
}

function createTimelineHTML(item, index) {
  const completedClass = item.completed ? 'completed' : '';
  
  return `
    <div class="timeline-item ${completedClass}" data-timeline-id="${item.id}">
      <div class="timeline-marker">
        <div class="marker-circle ${completedClass}">
          ${item.completed ? '✓' : index + 1}
        </div>
      </div>
      
      <div class="timeline-content">
        <h4>${item.title}</h4>
        ${item.detail ? `<p>${item.detail}</p>` : ''}
        ${item.time ? `<span class="timeline-time">⏰ ${item.time}</span>` : ''}
      </div>
      
      <div class="timeline-actions">
        <button class="btn-small toggle-completed" title="切换完成状态">
          ${item.completed ? '✓ 已完成' : '未完成'}
        </button>
        <button class="btn-small delete-btn" style="background:#e8b4b4;">删除</button>
      </div>
    </div>
  `;
}

async function toggleTimelineCompleted(timelineId) {
  try {
    const result = await toggleTimelineItem(timelineId);
    if (result) {
      loadTimelineFromAPI();
    }
  } catch (error) {
    console.error('更新失败:', error);
  }
}

function confirmDeleteTimeline(timelineId) {
  if (confirm('确定要删除这个流程吗？')) {
    deleteTimelineItemFromDB(timelineId);
  }
}

async function deleteTimelineItemFromDB(timelineId) {
  try {
    const result = await deleteTimelineItem(timelineId);
    if (result) {
      loadTimelineFromAPI();
    }
  } catch (error) {
    console.error('删除失败:', error);
  }
}

async function handleTimelineSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const title = form.querySelector('[name="title"]').value;
  const detail = form.querySelector('[name="detail"]').value || '';
  const time = form.querySelector('[name="time"]').value || '';
  
  if (!title) {
    alert('请填写流程标题');
    return;
  }
  
  const result = await addTimelineItem(title, detail, time);
  if (result) {
    loadTimelineFromAPI();
    document.getElementById('timeline-dialog').close();
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initTimelineUI);