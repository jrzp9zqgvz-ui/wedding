const yuan = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

const today = new Date();
const defaultWeddingDate = new Date(today);
defaultWeddingDate.setDate(defaultWeddingDate.getDate() + 128);

const initialState = {
  weddingDate: defaultWeddingDate.toISOString().slice(0, 10),
  totalBudget: 180000,
  vendors: [
    {
      id: uid(),
      type: "酒店",
      name: "湖畔宴会厅",
      style: "白绿韩系",
      contact: "林经理 / 138****8821",
      wechat: "hotel-lin",
      quote: 68000,
      deposit: 10000,
      final: 58000,
      signed: true,
      depositPaid: true,
      package: "A 厅 20 桌起 / 含基础灯光音响",
      outfit: "白绿仪式区 / 香槟色桌布",
      schedule: "试菜待约，合同已归档",
      note: "合同、菜单、场地图都放这里",
    },
    {
      id: uid(),
      type: "司仪",
      name: "温柔不煽情 MC",
      style: "轻松自然",
      contact: "小红书 @wedding-mc",
      wechat: "mc-wedding",
      quote: 5800,
      deposit: 1000,
      final: 4800,
      signed: false,
      depositPaid: false,
      package: "全程主持 / 含彩排 / 不含外地交通",
      outfit: "深色礼服，轻松自然风",
      schedule: "等酒店流程确定后约线上聊",
      note: "不要太多套路，要能控场",
    },
    {
      id: uid(),
      type: "化妆",
      name: "Mia Bridal",
      style: "韩系清透",
      contact: "微信 mia-bride",
      wechat: "mia-bride",
      quote: 7200,
      deposit: 2000,
      final: 5200,
      signed: true,
      depositPaid: true,
      package: "新娘全天跟妆 / 妈妈妆 2 位",
      outfit: "主纱清透妆、敬酒服微醺妆",
      schedule: "试妆 6 月底",
      note: "试妆带晨袍和主纱照片",
    },
    {
      id: uid(),
      type: "摄影",
      name: "森光影像",
      style: "纪实抓拍",
      contact: "小红书 @forest-photo",
      wechat: "forest-photo",
      quote: 8800,
      deposit: 2000,
      final: 6800,
      signed: false,
      depositPaid: false,
      package: "双机位全天跟拍 / 精修 80 张 / 云相册",
      outfit: "画面偏胶片，少摆拍，多抓情绪",
      schedule: "确认早拍地点后定拍摄动线",
      note: "看完整婚礼样片，不只看九宫格",
    },
    {
      id: uid(),
      type: "摄像",
      name: "薄雾电影",
      style: "电影感",
      contact: "微信 mist-film",
      wechat: "mist-film",
      quote: 12800,
      deposit: 3000,
      final: 9800,
      signed: false,
      depositPaid: false,
      package: "双机位 + 快剪 + 3-5 分钟婚礼电影",
      outfit: "低饱和、暖调、不要过度转场",
      schedule: "仪式音乐确定后给剪辑参考",
      note: "问清楚原片交付和版权音乐",
    },
    {
      id: uid(),
      type: "婚庆",
      name: "白绿企划室",
      style: "韩系白绿",
      contact: "策划师 Echo",
      wechat: "echo-wedding",
      quote: 22000,
      deposit: 5000,
      final: 17000,
      signed: false,
      depositPaid: false,
      package: "仪式区 + 迎宾区 + 桌花 + 灯光基础包",
      outfit: "白绿花艺、暖光蜡烛、香槟桌布",
      schedule: "酒店场地图出来后复尺",
      note: "不要大红，不要厚重背景板",
    },
    {
      id: uid(),
      type: "接亲车队",
      name: "黑色奔驰 E 车队",
      style: "稳重统一",
      contact: "车队王哥 / 139****9120",
      wechat: "car-wang",
      quote: 5200,
      deposit: 1000,
      final: 4200,
      signed: false,
      depositPaid: false,
      package: "主婚车 1 辆 + 跟车 5 辆 / 5 小时 60 公里",
      outfit: "黑车白花，车头花不要夸张",
      schedule: "确认接亲路线后复核超时费",
      note: "问清楚司机红包、停车费、高速费谁出",
    },
  ],
  expenses: [
    { id: uid(), category: "酒店", item: "宴席定金", amount: 10000, paid: true },
    { id: uid(), category: "婚庆", item: "方案预估", amount: 18000, paid: false },
    { id: uid(), category: "摄影", item: "双机跟拍", amount: 8800, paid: false },
    { id: uid(), category: "礼服", item: "主纱租赁", amount: 6900, paid: true },
  ],
  guests: [
    { id: uid(), name: "张阿姨", side: "女方亲戚", count: 2, attending: true, gift: 0, seat: "待排" },
    { id: uid(), name: "大学室友", side: "朋友", count: 4, attending: true, gift: 0, seat: "朋友桌" },
    { id: uid(), name: "产品组同事", side: "同事", count: 6, attending: false, gift: 0, seat: "待定" },
  ],
  inspirations: [
    {
      id: uid(),
      title: "韩系白绿",
      tag: "现场",
      note: "白绿花艺，暖光蜡烛，香槟色桌布",
      colors: ["#f7f4ec", "#dbe7dc", "#a9bfae"],
      image: "",
      height: 320,
      palette: "白绿",
      keywords: ["韩系极简", "白绿花艺", "暖光", "自然"],
    },
    {
      id: uid(),
      title: "不要大红",
      tag: "避雷",
      note: "现场色彩控制在奶白、浅绿、香槟金",
      colors: ["#fffaf4", "#e8d4b6", "#b8945f"],
      image: "",
      height: 260,
      palette: "香槟金",
      keywords: ["奶油白", "低饱和", "香槟色", "不要大红"],
    },
    {
      id: uid(),
      title: "自然手捧花",
      tag: "花艺",
      note: "松弛、不规整，有一点空气感",
      colors: ["#f0ece4", "#91a996", "#e9b7ae"],
      image: "",
      height: 380,
      palette: "玫瑰粉",
      keywords: ["自然花艺", "空气感", "手捧花", "森系"],
    },
  ],
  profiles: [
    {
      id: uid(),
      person: "新娘",
      weight: "48.5 kg",
      outfit: "晨袍 / 秀禾 / 主纱 / 敬酒服",
      makeup: "韩系清透，底妆干净，眼妆不要浓",
      fitting: "主纱已试，敬酒服待定",
      grooming: "美甲、胸贴、美瞳、饰品待购买",
      note: "试妆当天带主纱照片和手捧花参考图",
    },
    {
      id: uid(),
      person: "新郎",
      weight: "72 kg",
      outfit: "黑色西装 / 白衬衫 / 领结 / 皮鞋",
      makeup: "轻遮瑕，发型清爽",
      fitting: "西装需二次量体",
      grooming: "皮鞋、袖扣、领带待确认",
      note: "新郎今天还没被完全安排，但已经在路上",
    },
  ],
  flow: [
    { id: uid(), title: "接亲", detail: "红包、游戏道具、摄影跟拍" },
    { id: uid(), title: "敬茶", detail: "茶具、父母胸花、摄影机位" },
    { id: uid(), title: "仪式", detail: "誓词、戒指、音乐、灯光" },
    { id: uid(), title: "敬酒", detail: "敬酒服、伴郎伴娘动线" },
    { id: uid(), title: "送客", detail: "喜糖、伴手礼、合照区" },
  ],
};

let state = normalizeState(loadState());
let activeInspoFilter = "全部";
let activeVendorCompareType = "全部";
const dialog = document.querySelector("#quick-dialog");
const form = document.querySelector("#quick-form");
const dialogTitle = document.querySelector("#dialog-title");
const dialogFields = document.querySelector("#dialog-fields");

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function loadState() {
  const saved = localStorage.getItem("wedding-control-state");
  return saved ? JSON.parse(saved) : initialState;
}

function normalizeState(saved) {
  const merged = { ...initialState, ...saved };
  const savedVendorNames = new Set((merged.vendors || []).map((vendor) => vendor.name));
  const missingDefaultVendors = initialState.vendors.filter((vendor) => !savedVendorNames.has(vendor.name));
  merged.vendors = [...(merged.vendors || []), ...missingDefaultVendors];
  merged.vendors = (merged.vendors || []).map((vendor) => ({
    depositPaid: Boolean(vendor.signed),
    wechat: vendor.wechat || vendor.contact || "待补充",
    package: vendor.package || "基础套餐待补充",
    outfit: vendor.outfit || vendor.style || "款式待补充",
    schedule: vendor.schedule || "档期 / 试妆 / 路线待确认",
    ...vendor,
  }));
  merged.inspirations = (merged.inspirations || []).map((item, index) => {
    const analyzed = analyzeInspiration(item);
    return {
      image: "",
      height: 260 + ((index * 73) % 150),
      ...item,
      palette: item.palette || analyzed.palette,
      keywords: item.keywords || analyzed.keywords,
      colors: item.colors || analyzed.colors,
    };
  });
  merged.profiles = merged.profiles || initialState.profiles;
  return merged;
}

function saveState() {
  localStorage.setItem("wedding-control-state", JSON.stringify(state));
}

function money(value) {
  return yuan.format(Number(value || 0));
}

function analyzeInspiration(item) {
  const text = `${item.title || ""} ${item.tag || ""} ${item.note || ""}`.toLowerCase();
  let palette = "奶油白";
  let colors = ["#fffaf4", "#e7ded2", "#b8945f"];
  const keywords = new Set(["AI分析", "婚礼灵感"]);

  if (text.includes("绿") || text.includes("森") || text.includes("自然")) {
    palette = "白绿";
    colors = ["#f7f4ec", "#dbe7dc", "#91a996"];
    ["韩系", "白绿花艺", "自然", "低饱和"].forEach((word) => keywords.add(word));
  }
  if (text.includes("香槟") || text.includes("金") || text.includes("暖光")) {
    palette = "香槟金";
    colors = ["#fff8ec", "#e8d4b6", "#b8945f"];
    ["暖光", "香槟色", "精致", "蜡烛感"].forEach((word) => keywords.add(word));
  }
  if (text.includes("粉") || text.includes("玫瑰") || text.includes("花")) {
    palette = "玫瑰粉";
    colors = ["#fff4f1", "#e9b7ae", "#b76f6a"];
    ["柔和", "花艺", "浪漫", "空气感"].forEach((word) => keywords.add(word));
  }
  if (text.includes("红") || text.includes("避雷") || text.includes("不要")) {
    ["避雷", "不要大红", "控制饱和度"].forEach((word) => keywords.add(word));
  }
  if (text.includes("礼服") || text.includes("纱")) keywords.add("礼服参考");
  if (text.includes("车")) keywords.add("车队款式");

  return { palette, colors, keywords: Array.from(keywords).slice(0, 6) };
}

function render() {
  saveState();
  renderHeader();
  renderRecommendations();
  renderVendors();
  renderBudget();
  renderGuests();
  renderInspirations();
  renderProfiles();
  renderFlow();
}

window.setTimeout(() => {
  document.querySelector("#splash-screen")?.classList.add("is-hidden");
}, 3200);

function renderHeader() {
  const target = new Date(`${state.weddingDate}T00:00:00`);
  const diff = Math.max(0, Math.ceil((target - new Date()) / 86400000));
  const spent = state.expenses.filter((item) => item.paid).reduce((sum, item) => sum + Number(item.amount), 0);
  const projected = state.expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  document.querySelector("#wedding-date-label").textContent = state.weddingDate.replaceAll("-", ".");
  document.querySelector("#days-left").textContent = diff;
  document.querySelector("#progress-percent").textContent = "0%";
  document.querySelector("#progress-count").textContent = "0/0";
  document.querySelector("#progress-bar").style.width = "0%";
  document.querySelector("#spent-total").textContent = money(spent);
  document.querySelector("#budget-btn").textContent = money(state.totalBudget);
  document.querySelector("#budget-alert").textContent =
    projected > state.totalBudget
      ? `按当前报价会超出 ${money(projected - state.totalBudget)}`
      : `预计还剩 ${money(state.totalBudget - projected)} 可安排`;
}

function renderRecommendations() {
  const signedHotel = state.vendors.some((vendor) => vendor.type.includes("酒店") && vendor.signed);
  const unsignedVendors = state.vendors.filter((vendor) => !vendor.signed).length;
  const guestCount = state.guests.reduce((sum, guest) => sum + Number(guest.count), 0);
  const ideas = [];

  if (signedHotel) ideas.push("确定桌数和备桌规则");
  if (unsignedVendors) ideas.push(`还有 ${unsignedVendors} 个商家没签约`);
  if (state.vendors.some((vendor) => vendor.type === "接亲车队" && !vendor.signed)) ideas.push("车队路线和超时费还没锁");
  if (guestCount < 80) ideas.push("继续补宾客名单");
  if (state.inspirations.length < 10) ideas.push("把截图集中丢进灵感墙");
  ideas.push("每周复盘一次尾款日期");

  document.querySelector("#recommendations").innerHTML = ideas
    .slice(0, 5)
    .map((item) => `<span class="chip">✓ ${item}</span>`)
    .join("");
}

function renderVendors() {
  const vendorTypes = ["全部", ...new Set(state.vendors.map((vendor) => vendor.type))];
  document.querySelector("#vendor-filters").innerHTML = vendorTypes
    .map(
      (type) =>
        `<button class="mini-pill ${type === activeVendorCompareType ? "active" : ""}" data-action="filter-vendor-type" data-type="${escapeHtml(type)}">${escapeHtml(type)}</button>`,
    )
    .join("") + `<button class="primary-btn compact add-inline-btn" id="add-vendor-btn">+ 新商家</button>`;

  renderVendorComparison();

  document.querySelector("#vendor-grid").innerHTML = state.vendors
    .map(
      (vendor) => `
        <article class="vendor-card">
          <div class="vendor-top">
            <div>
              <p class="eyebrow">${escapeHtml(vendor.type)}</p>
              <h3>${escapeHtml(vendor.name)}</h3>
            </div>
            <span class="status ${vendor.signed ? "" : "pending"}">${vendor.signed ? "已签约" : "待确认"}</span>
          </div>
          <div class="vendor-price">${money(vendor.quote)}</div>
          <dl>
            <dt>风格</dt><dd>${escapeHtml(vendor.style)}</dd>
            <dt>款式</dt><dd>${escapeHtml(vendor.outfit)}</dd>
            <dt>定金</dt><dd>${money(vendor.deposit)}</dd>
            <dt>尾款</dt><dd>${money(vendor.final)}</dd>
            <dt>微信</dt><dd>${escapeHtml(vendor.wechat)}</dd>
            <dt>联系</dt><dd>${escapeHtml(vendor.contact)}</dd>
            <dt>备注</dt><dd>${escapeHtml(vendor.note)}</dd>
          </dl>
          <div class="card-actions">
            <button class="ghost-btn compact" data-action="view-vendor" data-id="${vendor.id}">详情</button>
            <button class="ghost-btn compact" data-action="toggle-vendor-sign" data-id="${vendor.id}">${vendor.signed ? "取消签约" : "标记签约"}</button>
            <button class="danger-btn" data-action="delete-vendor" data-id="${vendor.id}" title="删除">×</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function getComparedVendors() {
  return activeVendorCompareType === "全部"
    ? state.vendors
    : state.vendors.filter((vendor) => vendor.type === activeVendorCompareType);
}

function renderVendorComparison() {
  const vendors = getComparedVendors();
  const comparison = document.querySelector("#vendor-comparison");
  if (!vendors.length) {
    comparison.innerHTML = "<p class=\"muted\">这个分类还没有商家。</p>";
    return;
  }

  const quotes = vendors.map((vendor) => Number(vendor.quote || 0));
  const lowest = Math.min(...quotes);
  const highest = Math.max(...quotes);
  const average = Math.round(quotes.reduce((sum, value) => sum + value, 0) / quotes.length);
  const unpaidFinal = vendors.reduce((sum, vendor) => sum + (vendor.signed ? Number(vendor.final || 0) : 0), 0);
  const cheapest = vendors.find((vendor) => Number(vendor.quote || 0) === lowest);

  comparison.innerHTML = `
    <div class="compare-summary">
      <div><span>对比范围</span><strong>${escapeHtml(activeVendorCompareType)}</strong></div>
      <div><span>最低报价</span><strong>${money(lowest)}</strong></div>
      <div><span>最高报价</span><strong>${money(highest)}</strong></div>
      <div><span>平均报价</span><strong>${money(average)}</strong></div>
      <div><span>已签尾款</span><strong>${money(unpaidFinal)}</strong></div>
    </div>
    <div class="compare-alert">
      当前最省：<strong>${escapeHtml(cheapest?.name || "-")}</strong>。价格低不等于最合适，重点看套餐范围、超时费、原片/成片交付和备注里没问清楚的部分。
    </div>
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th>商家</th>
            <th>类型</th>
            <th>报价</th>
            <th>微信</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          ${vendors
            .map((vendor) => {
              const quote = Number(vendor.quote || 0);
              const isLowest = quote === lowest;
              return `
                <tr class="${isLowest ? "best-row" : ""}">
                  <td><button class="link-btn" data-action="view-vendor" data-id="${vendor.id}">${escapeHtml(vendor.name)}</button></td>
                  <td><button class="type-btn" data-action="filter-vendor-type" data-type="${escapeHtml(vendor.type)}">${escapeHtml(vendor.type)}</button></td>
                  <td><strong>${money(quote)}</strong></td>
                  <td>${escapeHtml(vendor.wechat)}</td>
                  <td>
                    <span class="table-status ${vendor.signed ? "" : "pending"}">${vendor.signed ? "已签" : "待定"}</span>
                    <p class="risk-note">${escapeHtml(getVendorRisk(vendor))}</p>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function getVendorRisk(vendor) {
  const risks = [];
  if (!vendor.signed) risks.push("未签约");
  if (!vendor.depositPaid) risks.push("定金未付");
  if ((vendor.package || "").includes("待补充")) risks.push("套餐缺失");
  if ((vendor.schedule || "").includes("待确认")) risks.push("档期待确认");
  if (vendor.type === "接亲车队") risks.push("确认超时/停车/高速费");
  return risks.length ? risks.join("、") : "暂无明显风险";
}

function openVendorDetail(vendor) {
  dialogTitle.textContent = `${vendor.type}详情`;
  dialogFields.innerHTML = `
    <div class="vendor-modal">
      <div>
        <p class="eyebrow">${escapeHtml(vendor.type)}</p>
        <h3>${escapeHtml(vendor.name)}</h3>
        <div class="detail-price">${money(vendor.quote)}</div>
      </div>
      <div class="detail-grid">
        <span>套餐</span><strong>${escapeHtml(vendor.package)}</strong>
        <span>款式</span><strong>${escapeHtml(vendor.outfit)}</strong>
        <span>档期</span><strong>${escapeHtml(vendor.schedule)}</strong>
        <span>定金</span><strong>${money(vendor.deposit)} · ${vendor.depositPaid ? "已付" : "未付"}</strong>
        <span>尾款</span><strong>${money(vendor.final)}</strong>
        <span>微信</span><strong>${escapeHtml(vendor.wechat)}</strong>
        <span>联系</span><strong>${escapeHtml(vendor.contact)}</strong>
        <span>风险</span><strong>${escapeHtml(getVendorRisk(vendor))}</strong>
      </div>
      <p class="detail-note">${escapeHtml(vendor.note)}</p>
    </div>
  `;
  form.onsubmit = (event) => {
    event.preventDefault();
    dialog.close();
  };
  dialog.showModal();
}

function renderBudget() {
  document.querySelector("#expense-list").innerHTML = state.expenses
    .map(
      (expense) => `
        <article class="expense-item">
          <span class="status ${expense.paid ? "" : "pending"}">${expense.paid ? "已付" : "未付"}</span>
          <div>
            <p class="task-title">${escapeHtml(expense.item)}</p>
            <p class="task-meta">${escapeHtml(expense.category)} · ${money(expense.amount)}</p>
          </div>
          <button class="danger-btn" data-action="delete-expense" data-id="${expense.id}" title="删除">×</button>
        </article>
      `,
    )
    .join("");

  const byCategory = state.expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  document.querySelector("#category-summary").innerHTML = Object.entries(byCategory)
    .map(([category, total]) => `<div class="summary-row"><span>${escapeHtml(category)}</span><strong>${money(total)}</strong></div>`)
    .join("");
}

function renderGuests() {
  const guestTotal = state.guests.reduce((sum, guest) => sum + Number(guest.count), 0);
  const giftTotal = state.guests.reduce((sum, guest) => sum + Number(guest.gift), 0);
  document.querySelector("#guest-total").textContent = guestTotal;
  document.querySelector("#table-total").textContent = Math.ceil(guestTotal / 10);
  document.querySelector("#gift-total").textContent = money(giftTotal);
  document.querySelector("#guest-table").innerHTML = state.guests
    .map(
      (guest) => `
        <tr>
          <td>${escapeHtml(guest.name)}</td>
          <td>${escapeHtml(guest.side)}</td>
          <td>${guest.count}</td>
          <td>${guest.attending ? "是" : "待定"}</td>
          <td>${money(guest.gift)}</td>
          <td>${escapeHtml(guest.seat)}</td>
          <td><button class="danger-btn" data-action="delete-guest" data-id="${guest.id}" title="删除">×</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderInspirations() {
  const inspirations = activeInspoFilter === "全部"
    ? state.inspirations
    : state.inspirations.filter((item) => item.palette === activeInspoFilter || item.keywords.includes(activeInspoFilter));

  document.querySelectorAll("[data-action='filter-inspo']").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeInspoFilter);
  });

  document.querySelector("#inspiration-wall").innerHTML = inspirations
    .map(
      (item) => `
        <article class="inspo-card" style="--accent:${item.colors[0]}; --pin-h:${item.height || 300}px">
          <div class="pin-image">
            ${
              item.image
                ? `<img src="${item.image}" alt="${escapeHtml(item.title)}" />`
                : `<div class="pin-placeholder">${escapeHtml(item.palette || "AI")}</div>`
            }
          </div>
          <div class="inspo-tag-row">
            <span class="status">${escapeHtml(item.tag)}</span>
            <div class="swatch">${item.colors.map((color) => `<i style="--c:${color}"></i>`).join("")}</div>
          </div>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="card-meta">${escapeHtml(item.note)}</p>
            <div class="keyword-row">${item.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")}</div>
          </div>
          <button class="danger-btn" data-action="delete-inspo" data-id="${item.id}" title="删除">×</button>
        </article>
      `,
    )
    .join("");
}

function renderProfiles() {
  document.querySelector("#couple-grid").innerHTML = state.profiles
    .map(
      (profile) => `
        <article class="profile-card">
          <div class="profile-head">
            <div>
              <p class="eyebrow">${escapeHtml(profile.person)}</p>
              <h3>${escapeHtml(profile.person)}管理</h3>
            </div>
            <span class="status">体重 ${escapeHtml(profile.weight)}</span>
          </div>
          <div class="profile-list">
            <div><span>服装</span><strong>${escapeHtml(profile.outfit)}</strong></div>
            <div><span>妆容</span><strong>${escapeHtml(profile.makeup)}</strong></div>
            <div><span>试穿</span><strong>${escapeHtml(profile.fitting)}</strong></div>
            <div><span>细节</span><strong>${escapeHtml(profile.grooming)}</strong></div>
          </div>
          <p class="detail-note">${escapeHtml(profile.note)}</p>
          <button class="danger-btn" data-action="delete-profile" data-id="${profile.id}" title="删除">×</button>
        </article>
      `,
    )
    .join("");
}

function renderFlow() {
  document.querySelector("#flow-list").innerHTML = state.flow
    .map(
      (step, index) => `
        <article class="flow-item">
          <span class="drag-handle">${index + 1}</span>
          <div>
            <p class="task-title">${escapeHtml(step.title)}</p>
            <p class="task-meta">${escapeHtml(step.detail)}</p>
          </div>
          <div class="flow-actions">
            <button data-action="move-flow" data-dir="-1" data-id="${step.id}" title="上移">↑</button>
            <button data-action="move-flow" data-dir="1" data-id="${step.id}" title="下移">↓</button>
          </div>
          <button class="danger-btn" data-action="delete-flow" data-id="${step.id}" title="删除">×</button>
        </article>
      `,
    )
    .join("");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    if (!file || !file.size) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function openForm(title, fields, onSubmit) {
  dialogTitle.textContent = title;
  dialogFields.innerHTML = `<div class="field-grid">${fields
    .map((field) => {
      const common = `name="${field.name}" ${field.required ? "required" : ""}`;
      if (field.type === "select") {
        return `<label>${field.label}<select ${common}>${field.options
          .map((option) => `<option value="${option.value}">${option.label}</option>`)
          .join("")}</select></label>`;
      }
      if (field.type === "file") return `<label>${field.label}<input type="file" accept="image/*" ${common} /></label>`;
      if (field.type === "textarea") return `<label>${field.label}<textarea ${common}></textarea></label>`;
      return `<label>${field.label}<input type="${field.type || "text"}" ${common} value="${field.value || ""}" /></label>`;
    })
    .join("")}</div>`;

  form.onsubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    for (const field of fields) {
      if (field.type === "file") {
        data[field.name] = await readFileAsDataUrl(formData.get(field.name));
      }
    }
    onSubmit(data);
    dialog.close();
    form.reset();
    render();
  };

  dialog.showModal();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action], .nav-item, #add-vendor-btn, #add-expense-btn, #add-guest-btn, #add-inspo-btn, #add-profile-item-btn, #add-step-btn, #edit-date-btn, #budget-btn");
  if (!target) return;

  if (target.classList.contains("nav-item")) {
    document.querySelectorAll(".nav-item, .view").forEach((item) => item.classList.remove("active"));
    target.classList.add("active");
    document.querySelector(`#view-${target.dataset.view}`).classList.add("active");
    return;
  }

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (target.id === "edit-date-btn") {
    openForm("修改婚礼日期", [{ label: "婚礼日期", name: "date", type: "date", required: true, value: state.weddingDate }], (data) => {
      state.weddingDate = data.date;
    });
  }

  if (target.id === "budget-btn") {
    openForm("修改总预算", [{ label: "总预算", name: "budget", type: "number", required: true, value: state.totalBudget }], (data) => {
      state.totalBudget = Number(data.budget);
    });
  }

  if (target.id === "add-vendor-btn") {
    openForm(
      "新增商家",
      [
        { label: "类型", name: "type", required: true, value: "摄影" },
        { label: "商家名", name: "name", required: true },
        { label: "风格", name: "style" },
        { label: "联系方式 / 链接", name: "contact" },
        { label: "商家微信", name: "wechat" },
        { label: "报价", name: "quote", type: "number", value: 0 },
        { label: "定金", name: "deposit", type: "number", value: 0 },
        { label: "尾款", name: "final", type: "number", value: 0 },
        { label: "套餐 / 服务范围", name: "package", type: "textarea" },
        { label: "款式 / 风格细节", name: "outfit", type: "textarea" },
        { label: "档期 / 试妆 / 路线", name: "schedule", type: "textarea" },
        { label: "备注", name: "note", type: "textarea" },
      ],
      (data) =>
        state.vendors.unshift({
          id: uid(),
          ...data,
          quote: Number(data.quote),
          deposit: Number(data.deposit),
          final: Number(data.final),
          signed: false,
          depositPaid: false,
        }),
    );
  }

  if (target.id === "add-expense-btn") {
    openForm(
      "新增预算",
      [
        { label: "分类", name: "category", required: true },
        { label: "项目", name: "item", required: true },
        { label: "金额", name: "amount", type: "number", required: true },
        {
          label: "状态",
          name: "paid",
          type: "select",
          options: [
            { label: "未付", value: "false" },
            { label: "已付", value: "true" },
          ],
        },
      ],
      (data) => state.expenses.unshift({ id: uid(), ...data, amount: Number(data.amount), paid: data.paid === "true" }),
    );
  }

  if (target.id === "add-guest-btn") {
    openForm(
      "新增宾客",
      [
        { label: "姓名 / 分组", name: "name", required: true },
        { label: "关系", name: "side", value: "朋友" },
        { label: "人数", name: "count", type: "number", value: 1 },
        { label: "红包", name: "gift", type: "number", value: 0 },
        { label: "座位", name: "seat", value: "待排" },
      ],
      (data) => state.guests.unshift({ id: uid(), ...data, count: Number(data.count), gift: Number(data.gift), attending: true }),
    );
  }

  if (target.id === "add-inspo-btn") {
    openForm(
      "新增灵感",
      [
        { label: "标题", name: "title", required: true },
        { label: "上传图片", name: "image", type: "file" },
        { label: "分类", name: "tag", value: "现场" },
        { label: "备注", name: "note", type: "textarea" },
      ],
      (data) => {
        const analysis = analyzeInspiration(data);
        state.inspirations.unshift({
          id: uid(),
          ...data,
          ...analysis,
          height: 250 + Math.floor(Math.random() * 180),
        });
      },
    );
  }

  if (target.id === "add-profile-item-btn") {
    openForm(
      "新增个人记录",
      [
        {
          label: "对象",
          name: "person",
          type: "select",
          options: [
            { label: "新娘", value: "新娘" },
            { label: "新郎", value: "新郎" },
          ],
        },
        { label: "体重 / 尺寸", name: "weight", value: "待记录" },
        { label: "服装", name: "outfit", type: "textarea" },
        { label: "妆容 / 发型", name: "makeup", type: "textarea" },
        { label: "试穿 / 量体", name: "fitting", type: "textarea" },
        { label: "配饰 / 细节", name: "grooming", type: "textarea" },
        { label: "备注", name: "note", type: "textarea" },
      ],
      (data) => state.profiles.unshift({ id: uid(), ...data }),
    );
  }

  if (target.id === "add-step-btn") {
    openForm(
      "新增流程",
      [
        { label: "流程名", name: "title", required: true },
        { label: "展开事项", name: "detail", type: "textarea" },
      ],
      (data) => state.flow.push({ id: uid(), ...data }),
    );
  }

  if (action === "filter-inspo") {
    activeInspoFilter = target.dataset.filter;
    renderInspirations();
  }

  if (action === "filter-vendor-type") {
    activeVendorCompareType = target.dataset.type;
    renderVendors();
  }

  if (action === "view-vendor") {
    const vendor = state.vendors.find((item) => item.id === id);
    if (vendor) openVendorDetail(vendor);
  }

  if (action === "toggle-vendor-sign") {
    const vendor = state.vendors.find((item) => item.id === id);
    vendor.signed = !vendor.signed;
    render();
  }

  if (action === "toggle-vendor-deposit") {
    const vendor = state.vendors.find((item) => item.id === id);
    vendor.depositPaid = !vendor.depositPaid;
    render();
  }

  if (action?.startsWith("delete-")) {
    const key = {
      "delete-vendor": "vendors",
      "delete-expense": "expenses",
      "delete-guest": "guests",
      "delete-inspo": "inspirations",
      "delete-profile": "profiles",
      "delete-flow": "flow",
    }[action];
    state[key] = state[key].filter((item) => item.id !== id);
    render();
  }

  if (action === "move-flow") {
    const index = state.flow.findIndex((item) => item.id === id);
    const next = index + Number(target.dataset.dir);
    if (next >= 0 && next < state.flow.length) {
      [state.flow[index], state.flow[next]] = [state.flow[next], state.flow[index]];
      render();
    }
  }
});

render();
