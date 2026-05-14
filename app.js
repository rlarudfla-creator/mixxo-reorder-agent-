const DEFAULT_SETTINGS = {
  targetFullPriceSellThrough: 0.8,
  targetInventoryRate: 0.2,
  totalStores: 52,
  horizonWeeks: 8,
  productionLeadWeeks: 1,
};

const FACTORY_FILTERS = ["자싱", "광저우지사", "닝보"];
const VIRAL_DEFAULT_THRESHOLD = 150000;
const VIRAL_DEFAULT_SCORE = 5;

const SAMPLE_ROWS = [
  ["2026-W16", "MIWOWF502B", "프릴 롱 레이어드 원피스", "자싱", "MINT", "090", "OFFLINE", 24, 80, 41, 18, 18, 1438200, "2026-04-13", 0, "MIW25W501", 9, 118, 78, 72, 84, 80, 86, 185000, 12400, 410, 260, 4, 78, "Y", 10, 10, 120],
  ["2026-W17", "MIWOWF502B", "프릴 롱 레이어드 원피스", "자싱", "MINT", "090", "OFFLINE", 24, 80, 22, 19, 18, 1518100, "2026-04-13", 0, "MIW25W501", 9, 118, 78, 72, 84, 80, 86, 185000, 12400, 410, 260, 4, 78, "Y", 10, 10, 120],
  ["2026-W18", "MIWOWF502B", "프릴 롱 레이어드 원피스", "자싱", "MINT", "090", "ONLINE", 24, 80, 8, 14, 14, 1118600, "2026-04-13", 20, "MIW25W501", 9, 118, 78, 72, 84, 80, 86, 185000, 12400, 410, 260, 4, 78, "Y", 10, 10, 120],
  ["2026-W18", "MIWOWF502B", "프릴 롱 레이어드 원피스", "자싱", "MINT", "095", "ONLINE", 24, 110, 21, 36, 34, 2876400, "2026-04-13", 30, "MIW25W501", 9, 118, 82, 76, 88, 84, 90, 216000, 16300, 520, 330, 5, 84, "Y", 10, 10, 140],
  ["2026-W18", "MIWOWF502B", "프릴 롱 레이어드 원피스", "자싱", "MINT", "100", "ONLINE", 24, 70, 18, 17, 16, 1358300, "2026-04-13", 20, "MIW25W501", 9, 118, 72, 64, 68, 66, 70, 93000, 5100, 170, 90, 3, 70, "Y", 10, 10, 100],
  ["2026-W18", "MIWJHF14PB", "싱글 롱 코트", "광저우지사", "BLACK", "095", "OFFLINE", 38, 150, 39, 31, 28, 3999000, "2026-04-06", 40, "", 6, 86, 46, 55, 54, 52, 58, 52000, 1200, 45, 18, 1, 48, "N", 25, 20, 120],
  ["2026-W18", "MIWJHF14PB", "싱글 롱 코트", "닝보", "BEIGE", "090", "OFFLINE", 18, 90, 7, 33, 32, 4257000, "2026-04-06", 0, "", 7, 104, 69, 80, 86, 82, 88, 142000, 9700, 310, 180, 4, 82, "Y", 8, 20, 100],
].map((row) => ({
  week: row[0],
  styleCode: row[1],
  styleName: row[2],
  factoryName: row[3],
  color: row[4],
  size: row[5],
  channel: row[6],
  storeCount: row[7],
  receivedQty: row[8],
  currentStock: row[9],
  salesQty: row[10],
  fullPriceSalesQty: row[11],
  salesAmount: row[12],
  firstInboundDate: row[13],
  scheduledInboundQty: row[14],
  similarStyleCode: row[15],
  similarPlcWeeks: row[16],
  lastYearCurveIndex: row[17],
  exposureScore: row[18],
  customerSignalScore: row[19],
  customerSurveyScore: row[20],
  stylemateScore: row[21],
  supporterScore: row[22],
  shortformViewCount: row[23],
  shortformLikeCount: row[24],
  shortformCommentCount: row[25],
  shortformRegramCount: row[26],
  shortformReactionScore: row[27],
  omniChannelLiftScore: row[28],
  onlineExpansionPlanned: row[29] === "Y",
  attributeChangeRisk: row[30],
  moq: row[31],
  weeklyCapacity: row[32],
}));

const HEADER_ALIASES = {
  week: ["week", "주차", "판매주차", "기준주차"],
  styleCode: ["stylecode", "style_code", "스타일", "스타일코드", "상품코드", "자체상품코드"],
  styleName: ["stylename", "style_name", "상품명", "스타일명"],
  color: ["color", "컬러", "색상"],
  size: ["size", "사이즈", "규격"],
  channel: ["channel", "채널", "판매채널"],
  storeCount: ["storecount", "store_count", "분배매장수", "매장수", "출고매장수"],
  receivedQty: ["receivedqty", "received_qty", "입고량", "최종입고량", "누적입고량"],
  currentStock: ["currentstock", "current_stock", "현재고", "재고", "재고수량"],
  salesQty: ["salesqty", "sales_qty", "판매량", "주간판매량", "누적판매량"],
  fullPriceSalesQty: ["fullpricesalesqty", "full_price_sales_qty", "정상판매량", "정상가판매량"],
  salesAmount: ["salesamount", "sales_amount", "판매금액", "매출"],
  firstInboundDate: ["firstinbounddate", "first_inbound_date", "최초입고일", "입고일"],
  scheduledInboundQty: ["scheduledinboundqty", "scheduled_inbound_qty", "예정입고량", "확정입고량"],
  similarStyleCode: ["similarstylecode", "similar_style_code", "유사스타일번호", "유사스타일넘버", "전년유사스타일"],
  similarPlcWeeks: ["similarplcweeks", "similar_plc_weeks", "유사상품plc", "유사plc", "잔여plc"],
  lastYearCurveIndex: ["lastyearcurveindex", "last_year_curve_index", "전년곡선", "전년동기간지수"],
  exposureScore: ["exposurescore", "exposure_score", "노출점수", "숏폼광고프로모션점수"],
  customerSignalScore: ["customersignalscore", "customer_signal_score", "고객신호점수", "서포터즈점수", "재입고알림점수"],
  customerSurveyScore: ["customersurveyscore", "customer_survey_score", "고객조사점수", "잠재수요점수"],
  stylemateScore: ["stylematescore", "stylemate_score", "스타일메이트점수", "스타일메이트"],
  supporterScore: ["supporterscore", "supporter_score", "서포터즈점수", "온라인서포터즈점수"],
  shortformViewCount: ["shortformviewcount", "shortform_view_count", "viewcount", "view_count", "숏폼조회수", "조회수"],
  shortformLikeCount: ["shortformlikecount", "shortform_like_count", "likecount", "like_count", "좋아요수", "좋아요"],
  shortformCommentCount: ["shortformcommentcount", "shortform_comment_count", "댓글수", "댓글"],
  shortformRegramCount: ["shortformregramcount", "shortform_regram_count", "리그램수", "리그램"],
  shortformReactionScore: ["shortformreactionscore", "shortform_reaction_score", "숏폼반응점수", "숏폼점수"],
  omniChannelLiftScore: ["omnichannelliftscore", "omni_channel_lift_score", "온오프동시판매급등점수", "온오프급등점수"],
  onlineExpansionPlanned: ["onlineexpansionplanned", "online_expansion_planned", "온라인확장", "온라인노출예정"],
  attributeChangeRisk: ["attributechangerisk", "attribute_change_risk", "속성변경리스크", "소재컬러변경리스크"],
  moq: ["moq", "최소생산수량"],
  weeklyCapacity: ["weeklycapacity", "weekly_capacity", "주간생산캐파", "생산가능수량"],
  factoryName: ["factoryname", "factory_name", "생산공장", "공장", "공장명"],
};

const REQUIRED_FIELDS = [
  "week",
  "styleCode",
  "styleName",
  "color",
  "size",
  "channel",
  "storeCount",
  "receivedQty",
  "currentStock",
  "salesQty",
  "fullPriceSalesQty",
  "salesAmount",
  "firstInboundDate",
  "scheduledInboundQty",
];

const app = document.querySelector("#app");
let rows = SAMPLE_ROWS;
let settings = { ...DEFAULT_SETTINGS };
let fileName = "샘플 데이터";
let warnings = [];
let adjustments = {};
let shortformOverrides = {};
let selectedFactory = "전체";
let selectedStyleCode = "";
let selectedStyleAnchorId = "";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const safeNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") return fallback;
  const numeric = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(numeric) ? numeric : fallback;
};
const number = (value) => Math.round(value).toLocaleString();
const percent = (value) => `${Math.round(value * 100)}%`;
const multiplier = (value) => `${Number(value).toFixed(2)}x`;
const signedPercent = (value) => `${value >= 0 ? "+" : ""}${Math.round(value * 100)}%`;
const normalizeHeader = (value) => String(value ?? "").replace(/\s+/g, "").replace(/[()/_-]/g, "").toLowerCase();
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" })[char]);
const inferFactoryName = (styleCode) => {
  const source = String(styleCode || "MIXXO");
  const total = Array.from(source).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return FACTORY_FILTERS[total % FACTORY_FILTERS.length];
};

function roundToMoq(qty, moq) {
  const rounded = Math.max(0, Math.round(qty));
  if (!moq || moq <= 1) return rounded;
  return Math.ceil(rounded / moq) * moq;
}

function demandRatioLabel(ratio) {
  const value = Math.round(ratio * 100);
  if (value >= 160) return `${value}% 강한 증산`;
  if (value >= 115) return `${value}% 증산`;
  if (value >= 90) return `${value}% 유지`;
  return `${value}% 감산`;
}

function scoreToLift(score, maxLift) {
  return ((clamp(score, 0, 100) - 50) / 50) * maxLift;
}

function getSkuId(row) {
  return [row.styleCode, row.color, row.size].join("::");
}

function normalizeShortformSelection(value) {
  const score = Number(value);
  return Number.isInteger(score) && score >= 1 && score <= 5 ? score : null;
}

function inferViralScoreFromCounts(row) {
  const views = safeNumber(row?.shortformViewCount, 0);
  const likes = safeNumber(row?.shortformLikeCount, 0);
  return views >= VIRAL_DEFAULT_THRESHOLD && likes >= VIRAL_DEFAULT_THRESHOLD
    ? VIRAL_DEFAULT_SCORE
    : null;
}

function buildInitialShortformOverrides(inputRows) {
  const grouped = new Map();
  inputRows.forEach((row) => {
    const id = getSkuId(row);
    grouped.set(id, [...(grouped.get(id) ?? []), row]);
  });

  return Array.from(grouped.entries()).reduce((result, [id, group]) => {
    const sorted = [...group].sort((a, b) => String(a.week).localeCompare(String(b.week)));
    const latest = sorted[sorted.length - 1];
    const score = normalizeShortformSelection(latest?.shortformReactionScore) ?? inferViralScoreFromCounts(latest);
    if (score) result[id] = score;
    return result;
  }, {});
}

function getWeeklySales(group) {
  const salesByWeek = new Map();
  group.forEach((row) => salesByWeek.set(row.week, (salesByWeek.get(row.week) ?? 0) + row.salesQty));
  return Array.from(salesByWeek.entries())
    .sort(([a], [b]) => String(a).localeCompare(String(b)))
    .map(([week, sales]) => ({ week, sales }));
}

function buildPlcGrowthSignal(group) {
  const latest = group[group.length - 1];
  const similarStyleCode = String(latest.similarStyleCode ?? "").trim();

  if (similarStyleCode) {
    const previousYearIndex = clamp(safeNumber(latest.lastYearCurveIndex, 100), 30, 250);
    return {
      source: `전년 유사 ${similarStyleCode}`,
      lift: clamp(previousYearIndex / 100 - 1, -0.5, 1.5),
      score: clamp(previousYearIndex / 2, 0, 100),
      description: `전년 PLC 지수 ${Math.round(previousYearIndex)}%`,
    };
  }

  const weeklySales = getWeeklySales(group).slice(-2);
  if (weeklySales.length < 2) {
    return {
      source: "최근 판매 추세",
      lift: 0,
      score: 50,
      description: "직전 2주 데이터 부족",
    };
  }

  const previous = weeklySales[0].sales;
  const current = weeklySales[1].sales;
  const growth = previous > 0 ? (current - previous) / previous : current > 0 ? 0.2 : 0;
  return {
    source: "직전 2주 상승률",
    lift: clamp(growth, -0.5, 1),
    score: clamp(50 + growth * 50, 0, 100),
    description: `${weeklySales[0].week}→${weeklySales[1].week} ${Math.round(growth * 100)}%`,
  };
}

function buildShortformScore(latest) {
  const views = safeNumber(latest.shortformViewCount, 0);
  const likes = safeNumber(latest.shortformLikeCount, 0);
  const comments = safeNumber(latest.shortformCommentCount, 0);
  const regrams = safeNumber(latest.shortformRegramCount, 0);

  if (views <= 0) {
    return clamp(safeNumber(latest.exposureScore, 50), 0, 100);
  }

  const reachScore = clamp((Math.log10(views + 1) / 5.2) * 100, 0, 100);
  const engagementRate = ((likes + comments * 4 + regrams * 5) / views) * 100;
  const engagementScore = clamp(engagementRate * 12, 0, 100);
  return clamp(reachScore * 0.55 + engagementScore * 0.45, 0, 100);
}

function buildShortformLift(shortformScore) {
  const normalizedScore = normalizeShortformSelection(shortformScore);
  if (normalizedScore) {
    return {
      score: normalizedScore * 20,
      lift: normalizedScore * 0.2,
      description: `${normalizedScore.toFixed(1)}점 × 20%`,
    };
  }

  return {
    score: 0,
    lift: 0,
    description: "미적용",
  };
}

function averageScores(scores, fallback) {
  const valid = scores
    .map((score) => safeNumber(score, Number.NaN))
    .filter((score) => Number.isFinite(score));
  if (!valid.length) return fallback;
  return valid.reduce((sum, score) => sum + score, 0) / valid.length;
}

function buildDemandModel(group, selloutPressure, shortformScore) {
  const latest = group[group.length - 1];
  const plcGrowth = buildPlcGrowthSignal(group);
  const weeklySales = getWeeklySales(group).slice(-4).map((row) => row.sales);
  const previous = weeklySales.slice(0, -1).reduce((sum, value) => sum + value, 0);
  const current = weeklySales.length ? weeklySales[weeklySales.length - 1] : 0;
  const previousAvg = previous / Math.max(1, weeklySales.length - 1);
  const momentum = previousAvg > 0 ? (current - previousAvg) / previousAvg : 0;
  const momentumScore = clamp(50 + momentum * 45, 0, 100);
  const shortform = buildShortformLift(shortformScore);
  const customerFallback = clamp(safeNumber(latest.customerSignalScore, 50), 0, 100);
  const validationScore = averageScores(
    [latest.customerSurveyScore, latest.stylemateScore, latest.supporterScore],
    customerFallback,
  );
  const providedOmniScore = safeNumber(latest.omniChannelLiftScore, Number.NaN);
  const omniScore = Number.isFinite(providedOmniScore)
    ? clamp(providedOmniScore, 0, 100)
    : latest.onlineExpansionPlanned
      ? 72
      : 50;
  const attributeRisk = clamp(safeNumber(latest.attributeChangeRisk, 0), 0, 100);
  const stockoutLift = clamp(selloutPressure - 0.78, 0, 0.18);

  const signals = [
    {
      key: "plc",
      label: "PLC 자동계산",
      score: plcGrowth.score,
      lift: plcGrowth.lift,
      description: plcGrowth.description,
    },
    {
      key: "shortform",
      label: "숏폼 반응점수",
      score: shortform.score,
      lift: shortform.lift,
      description: shortform.description,
    },
    {
      key: "validation",
      label: "스타일메이트/서포터즈",
      score: validationScore,
      lift: scoreToLift(validationScore, 0.42),
      description: "고객조사 기반 잠재 수요",
    },
    {
      key: "omni",
      label: "온·오프 동시판매",
      score: omniScore,
      lift: scoreToLift(omniScore, 0.24),
      description: latest.onlineExpansionPlanned ? "온라인 확장 예정" : "현재 채널 기준",
    },
    {
      key: "momentum",
      label: "판매 모멘텀",
      score: momentumScore,
      lift: scoreToLift(momentumScore, 0.18),
      description: "최근 주판량 변화",
    },
    {
      key: "attribute",
      label: "소재/컬러 변경 리스크",
      score: 100 - attributeRisk,
      lift: -(attributeRisk / 100) * 0.12,
      description: "속성 변경으로 인한 감산 보정",
    },
  ];
  const ratio = clamp(1 + signals.reduce((sum, signal) => sum + signal.lift, 0) + stockoutLift, 0.35, 3.4);
  const customerSurveyMultiplier = clamp(1 + signals[2].lift, 0.58, 1.42);
  const shortformMultiplier = 1 + signals[1].lift;
  return {
    ratio,
    customerSurveyMultiplier,
    plcGrowthSource: plcGrowth.source,
    plcGrowthRate: plcGrowth.lift,
    shortformMultiplier,
    signals,
  };
}

function getWeekCurve(group, horizonWeeks) {
  const latest = group[group.length - 1];
  const curveIndex = clamp(safeNumber(latest.lastYearCurveIndex, 100), 40, 160) / 100;
  const plcWeeks = safeNumber(latest.similarPlcWeeks, 8);
  const tailSlope = plcWeeks >= 10 ? 0.98 : plcWeeks >= 7 ? 0.94 : 0.9;
  return Array.from({ length: horizonWeeks }, (_, index) => {
    const weekDecay = Math.pow(tailSlope, index);
    return clamp(index === 0 ? 1 : curveIndex * weekDecay, 0.42, 1.35);
  });
}

function forecastReorders(inputRows, activeSettings, activeShortformOverrides = {}) {
  const grouped = new Map();
  inputRows.forEach((row) => {
    const id = [row.styleCode, row.color, row.size].join("::");
    grouped.set(id, [...(grouped.get(id) ?? []), row]);
  });

  return Array.from(grouped.entries()).map(([id, group]) => {
    const sorted = [...group].sort((a, b) => String(a.week).localeCompare(String(b.week)));
    const latest = sorted[sorted.length - 1];
    const receivedQty = Math.max(...sorted.map((row) => row.receivedQty), 0);
    const salesQty = sorted.reduce((sum, row) => sum + row.salesQty, 0);
    const fullPriceSalesQty = sorted.reduce((sum, row) => sum + row.fullPriceSalesQty, 0);
    const currentStock = latest.currentStock;
    const scheduledInboundQty = latest.scheduledInboundQty;
    const storeCount = Math.max(1, latest.storeCount);
    const recentRows = sorted.slice(-Math.min(sorted.length, 4));
    const recentWeeklySales = recentRows.reduce((sum, row) => sum + row.salesQty, 0) / Math.max(1, new Set(recentRows.map((row) => row.week)).size);
    const stockoutBoost = currentStock <= recentWeeklySales * 0.5 ? 1.25 : 1;
    const baselineWeeklySales = Math.max(1, recentWeeklySales * stockoutBoost);
    const selloutPressure = receivedQty > 0 ? salesQty / receivedQty : 0;
    const expansionMultiplier = clamp(activeSettings.totalStores / storeCount, 1, 3.5);
    const demandModel = buildDemandModel(sorted, selloutPressure, activeShortformOverrides[id]);
    const demandRatio = demandModel.ratio;
    const curve = getWeekCurve(sorted, activeSettings.horizonWeeks);
    const currentStockAtInbound = Math.max(0, currentStock - baselineWeeklySales * activeSettings.productionLeadWeeks);
    const rawWeeklyDemand = curve.map((curveValue) => baselineWeeklySales * expansionMultiplier * demandRatio * curveValue);
    const totalExpectedDemand = rawWeeklyDemand.reduce((sum, value) => sum + value, 0);
    const needBeforeConstraints = totalExpectedDemand / activeSettings.targetFullPriceSellThrough - currentStockAtInbound - scheduledInboundQty;
    const constrainedTotal = Math.max(0, needBeforeConstraints);
    const totalRawDemand = rawWeeklyDemand.reduce((sum, value) => sum + value, 0) || 1;
    const weeklyRecommendations = rawWeeklyDemand.map((weekDemand) => roundToMoq(constrainedTotal * (weekDemand / totalRawDemand), latest.moq));
    const totalRecommendation = weeklyRecommendations.reduce((sum, value) => sum + value, 0);
    const nextWeekCutQty = weeklyRecommendations[0] ?? 0;
    const expectedFullPriceSellThrough = totalExpectedDemand / Math.max(1, currentStockAtInbound + scheduledInboundQty + totalRecommendation);
    const riskScore =
      (expectedFullPriceSellThrough < 0.55 ? 1 : 0) +
      (expectedFullPriceSellThrough > 0.9 ? 1 : 0) +
      (selloutPressure > 0.82 ? 0.8 : 0) +
      (latest.attributeChangeRisk > 60 ? 0.7 : 0) +
      (latest.weeklyCapacity && nextWeekCutQty > latest.weeklyCapacity ? 0.8 : 0);
    const riskLevel = riskScore >= 2.3 ? "높음" : riskScore >= 1.25 ? "중간" : "낮음";
    const riskReasons = [
      expectedFullPriceSellThrough < 0.55 ? "과잉 재고 가능성" : "",
      expectedFullPriceSellThrough > 0.9 ? "품절 가능성" : "",
      selloutPressure > 0.82 ? "현재 판매율이 높아 공급 공백 위험" : "",
      latest.attributeChangeRisk > 60 ? "소재/컬러 변경 리스크 높음" : "",
      latest.weeklyCapacity && nextWeekCutQty > latest.weeklyCapacity ? "다음주 생산 캐파 초과" : "",
    ].filter(Boolean);

    return {
      id,
      styleCode: latest.styleCode,
      styleName: latest.styleName,
      factoryName: latest.factoryName?.trim() || inferFactoryName(latest.styleCode),
      color: latest.color,
      size: latest.size,
      storeCount,
      baselineWeeklySales,
      expansionMultiplier,
      demandRatio,
      demandRatioLabel: demandRatioLabel(demandRatio),
      finalWeeklySalesRatio: demandRatio * expansionMultiplier,
      customerSurveyMultiplier: demandModel.customerSurveyMultiplier,
      plcGrowthSource: demandModel.plcGrowthSource,
      plcGrowthRate: demandModel.plcGrowthRate,
      shortformMultiplier: demandModel.shortformMultiplier,
      demandSignals: demandModel.signals,
      weeklyRecommendations,
      nextWeekCutQty,
      materialPrepQty: totalRecommendation,
      totalRecommendation,
      expectedFullPriceSellThrough,
      riskLevel,
      riskReasons: riskReasons.length ? riskReasons : ["정상 범위"],
      recommendationReasons: [
        `최근 주판량 ${number(baselineWeeklySales)}장`,
        `전매장 확산 ${expansionMultiplier.toFixed(1)}배`,
        `입고 후 주판량 ${Math.round(demandRatio * 100)}%`,
        `최종 주판량 ${Math.round(demandRatio * expansionMultiplier * 100)}%`,
        `목표 정상판매율 ${Math.round(activeSettings.targetFullPriceSellThrough * 100)}%`,
      ],
      fullPriceSellThrough: receivedQty > 0 ? fullPriceSalesQty / receivedQty : 0,
    };
  }).sort((a, b) => b.totalRecommendation - a.totalRecommendation);
}

function csvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  const headers = csvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = csvLine(line);
    return headers.reduce((record, header, index) => {
      record[header] = values[index] ?? "";
      return record;
    }, {});
  });
}

function readKey(record, field) {
  const aliases = HEADER_ALIASES[field].map(normalizeHeader);
  const key = Object.keys(record).find((candidate) => aliases.includes(normalizeHeader(candidate)));
  return key ? record[key] : undefined;
}

function recordToRow(record, rowIndex) {
  const missing = REQUIRED_FIELDS.filter((field) => readKey(record, field) === undefined);
  if (missing.length) {
    return { warning: `${rowIndex}행: 필수 컬럼 누락 (${missing.join(", ")})` };
  }
  return {
    row: {
      week: String(readKey(record, "week") ?? ""),
      styleCode: String(readKey(record, "styleCode") ?? ""),
      styleName: String(readKey(record, "styleName") ?? ""),
      factoryName: String(readKey(record, "factoryName") ?? ""),
      color: String(readKey(record, "color") ?? ""),
      size: String(readKey(record, "size") ?? ""),
      channel: String(readKey(record, "channel") ?? ""),
      storeCount: safeNumber(readKey(record, "storeCount"), 1),
      receivedQty: safeNumber(readKey(record, "receivedQty"), 0),
      currentStock: safeNumber(readKey(record, "currentStock"), 0),
      salesQty: safeNumber(readKey(record, "salesQty"), 0),
      fullPriceSalesQty: safeNumber(readKey(record, "fullPriceSalesQty"), 0),
      salesAmount: safeNumber(readKey(record, "salesAmount"), 0),
      firstInboundDate: String(readKey(record, "firstInboundDate") ?? ""),
      scheduledInboundQty: safeNumber(readKey(record, "scheduledInboundQty"), 0),
      similarStyleCode: String(readKey(record, "similarStyleCode") ?? ""),
      similarPlcWeeks: safeNumber(readKey(record, "similarPlcWeeks"), 8),
      lastYearCurveIndex: safeNumber(readKey(record, "lastYearCurveIndex"), 100),
      exposureScore: safeNumber(readKey(record, "exposureScore"), 50),
      customerSignalScore: safeNumber(readKey(record, "customerSignalScore"), 50),
      customerSurveyScore: safeNumber(readKey(record, "customerSurveyScore"), Number.NaN),
      stylemateScore: safeNumber(readKey(record, "stylemateScore"), Number.NaN),
      supporterScore: safeNumber(readKey(record, "supporterScore"), Number.NaN),
      shortformViewCount: safeNumber(readKey(record, "shortformViewCount"), 0),
      shortformLikeCount: safeNumber(readKey(record, "shortformLikeCount"), 0),
      shortformCommentCount: safeNumber(readKey(record, "shortformCommentCount"), 0),
      shortformRegramCount: safeNumber(readKey(record, "shortformRegramCount"), 0),
      shortformReactionScore: safeNumber(readKey(record, "shortformReactionScore"), Number.NaN),
      omniChannelLiftScore: safeNumber(readKey(record, "omniChannelLiftScore"), Number.NaN),
      onlineExpansionPlanned: ["y", "yes", "true", "1", "예", "있음", "예정"].includes(String(readKey(record, "onlineExpansionPlanned") ?? "").trim().toLowerCase()),
      attributeChangeRisk: safeNumber(readKey(record, "attributeChangeRisk"), 0),
      moq: safeNumber(readKey(record, "moq"), 1),
      weeklyCapacity: safeNumber(readKey(record, "weeklyCapacity"), 0),
    },
  };
}

async function inflateRaw(bytes) {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("이 브라우저는 엑셀 압축 해제를 지원하지 않습니다. CSV 템플릿으로 업로드해주세요.");
  }
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function unzip(buffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  let end = bytes.length - 22;
  while (end >= 0 && view.getUint32(end, true) !== 0x06054b50) end -= 1;
  if (end < 0) throw new Error("엑셀 파일 구조를 읽을 수 없습니다.");
  const entries = view.getUint16(end + 10, true);
  let offset = view.getUint32(end + 16, true);
  const decoder = new TextDecoder();
  const files = {};

  for (let entry = 0; entry < entries; entry += 1) {
    if (view.getUint32(offset, true) !== 0x02014b50) break;
    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const fileNameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + fileNameLength));
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = bytes.slice(dataStart, dataStart + compressedSize);
    files[name] = method === 0 ? compressed : await inflateRaw(compressed);
    offset += 46 + fileNameLength + extraLength + commentLength;
  }
  return files;
}

function xmlText(node) {
  return node ? node.textContent ?? "" : "";
}

function columnIndex(ref) {
  const letters = String(ref).replace(/[0-9]/g, "");
  let value = 0;
  for (const letter of letters) value = value * 26 + letter.charCodeAt(0) - 64;
  return value - 1;
}

async function parseXlsx(buffer) {
  const files = await unzip(buffer);
  const decoder = new TextDecoder();
  const parser = new DOMParser();
  const sharedXml = files["xl/sharedStrings.xml"] ? decoder.decode(files["xl/sharedStrings.xml"]) : "";
  const sharedDoc = parser.parseFromString(sharedXml, "application/xml");
  const sharedStrings = Array.from(sharedDoc.querySelectorAll("si")).map((node) => xmlText(node));
  const sheetPath = Object.keys(files).find((path) => path.startsWith("xl/worksheets/sheet")) ?? "xl/worksheets/sheet1.xml";
  const sheetDoc = parser.parseFromString(decoder.decode(files[sheetPath]), "application/xml");
  const matrix = Array.from(sheetDoc.querySelectorAll("row")).map((rowNode) => {
    const cells = [];
    Array.from(rowNode.querySelectorAll("c")).forEach((cell) => {
      const ref = cell.getAttribute("r") ?? "";
      const type = cell.getAttribute("t");
      const raw = xmlText(cell.querySelector("v")) || xmlText(cell.querySelector("is"));
      cells[columnIndex(ref)] = type === "s" ? sharedStrings[Number(raw)] ?? "" : raw;
    });
    return cells;
  }).filter((line) => line.some((value) => String(value ?? "").trim()));
  const headers = matrix[0] ?? [];
  return matrix.slice(1).map((line) => headers.reduce((record, header, index) => {
    record[header] = line[index] ?? "";
    return record;
  }, {}));
}

async function parseFile(file) {
  const buffer = await file.arrayBuffer();
  const records = file.name.toLowerCase().endsWith(".csv")
    ? parseCsv(new TextDecoder("utf-8").decode(buffer))
    : await parseXlsx(buffer);
  const parsed = records.map((record, index) => recordToRow(record, index + 2));
  return {
    rows: parsed.map((item) => item.row).filter(Boolean),
    warnings: parsed.map((item) => item.warning).filter(Boolean),
  };
}

function buildCsvTemplate() {
  const headers = ["주차", "스타일코드", "상품명", "생산공장", "컬러", "사이즈", "채널", "분배매장수", "입고량", "현재고", "판매량", "정상가판매량", "판매금액", "최초입고일", "예정입고량", "유사스타일번호", "잔여PLC", "전년동기간지수", "노출점수", "고객신호점수", "고객조사점수", "스타일메이트점수", "서포터즈점수", "숏폼조회수", "좋아요수", "댓글수", "리그램수", "숏폼반응점수", "온오프동시판매급등점수", "온라인노출예정", "소재컬러변경리스크", "MOQ", "주간생산캐파"];
  const row = ["2026-W18", "MIWJHF14PB", "싱글 롱 코트", "자싱", "BLACK", "095", "OFFLINE", 28, 120, 24, 21, 20, 2709000, "2026-04-13", 0, "MIW25J014", 10, 112, 75, 68, 82, 78, 86, 185000, 12400, 410, 260, 4, 76, "Y", 15, 20, 140];
  return [headers.join(","), row.join(",")].join("\n");
}

function downloadTemplate() {
  const blob = new Blob([`\uFEFF${buildCsvTemplate()}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "mixxo_reorder_template.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

function renderRisk(level) {
  const className = level === "높음" ? "risk-high" : level === "중간" ? "risk-mid" : "risk-low";
  return `<span class="risk-pill ${className}">${level}</span>`;
}

function renderAssumptionPanel(groups) {
  return `
    <section class="assumption-panel">
      <div class="assumption-copy">
        <span>자동 계산 기준</span>
        <h2>입고 후 주판량 비율</h2>
        <p>유사스타일번호가 있으면 전년 PLC 지수를 쓰고, 없으면 직전 2주 상승률을 사용합니다. 숏폼 반응점수는 1점당 20%씩 예상 수량을 올립니다.</p>
      </div>
      <div class="assumption-cards">
        ${groups.slice(0, 3).map((group) => `
          <article class="assumption-card">
            <div>
              <strong>${escapeHtml(group.styleCode)}</strong>
              <span>${escapeHtml(group.color)} / ${escapeHtml(group.size)}</span>
            </div>
            <div class="assumption-values">
              <span>PLC <b>${signedPercent(group.plcGrowthRate)}</b></span>
              <span>바이럴 <b>${multiplier(group.shortformMultiplier)}</b></span>
              <span>최종 <b>${percent(group.finalWeeklySalesRatio)}</b></span>
            </div>
            <small>${escapeHtml(group.plcGrowthSource)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderShortformScoreControlLegacy(group) {
  const selected = shortformOverrides[group.id] ?? null;
  const options = [null, 1, 2, 3, 4, 5];
  return `
    <div class="score-control" aria-label="숏폼 반응점수 선택">
      ${options.map((option) => `
        <button
          class="score-button ${selected === option ? "is-selected" : ""}"
          type="button"
          data-score-id="${escapeHtml(group.id)}"
          data-score="${option ?? ""}"
          aria-pressed="${selected === option}"
        >${option ?? "미적용"}</button>
      `).join("")}
    </div>
  `;
}

function renderShortformScoreControl(group) {
  const selected = shortformOverrides[group.id] ?? null;
  return `
    <label class="score-input-wrap" aria-label="숏폼 반응점수 직접 입력">
      <input
        class="score-input"
        type="number"
        min="1"
        max="5"
        step="1"
        inputmode="numeric"
        data-score-id="${escapeHtml(group.id)}"
        value="${selected ?? ""}"
        placeholder="미적용"
      />
      <span>1~5점</span>
    </label>
  `;
}

function getFactoryOptions(groups) {
  const uploadedFactories = Array.from(new Set(groups.map((group) => group.factoryName).filter(Boolean)));
  const extraFactories = uploadedFactories.filter((factoryName) => !FACTORY_FILTERS.includes(factoryName)).sort();
  return ["전체", ...FACTORY_FILTERS, ...extraFactories];
}

function getFactoryTotal(groups, factoryName) {
  const scoped = factoryName === "전체" ? groups : groups.filter((group) => group.factoryName === factoryName);
  return scoped.reduce((sum, group) => sum + group.totalRecommendation + (adjustments[group.id] ?? 0), 0);
}

function renderFactoryFilter(allGroups) {
  const options = getFactoryOptions(allGroups);
  if (!options.includes(selectedFactory)) selectedFactory = "전체";
  return `
    <section class="factory-panel factory-panel-top">
      <button class="factory-filter-title" type="button" disabled>공장 필터</button>
      <div class="factory-buttons">
        ${options.map((factoryName) => `
          <button
            class="factory-button ${selectedFactory === factoryName ? "is-selected" : ""}"
            type="button"
            data-factory="${escapeHtml(factoryName)}"
          >
            <span>${escapeHtml(factoryName)}</span>
            <strong>${number(getFactoryTotal(allGroups, factoryName))}장</strong>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderStyleColorSummary(allGroups) {
  if (!selectedStyleCode) return "";
  const styleGroups = allGroups.filter((group) => group.styleCode === selectedStyleCode);
  if (!styleGroups.length) return "";
  const colorMap = new Map();
  styleGroups.forEach((group) => {
    const current = colorMap.get(group.color) ?? {
      color: group.color,
      total: 0,
      weekly: Array.from({ length: settings.horizonWeeks }, () => 0),
      sizes: new Map(),
    };
    const finalQty = group.totalRecommendation + (adjustments[group.id] ?? 0);
    current.total += finalQty;
    group.weeklyRecommendations.forEach((qty, index) => {
      current.weekly[index] = (current.weekly[index] ?? 0) + qty;
    });
    current.sizes.set(group.size, (current.sizes.get(group.size) ?? 0) + finalQty);
    colorMap.set(group.color, current);
  });
  const styleName = styleGroups[0]?.styleName ?? "";

  return `
    <section class="color-summary">
      <div class="color-summary-head">
        <div>
          <span class="panel-kicker">상품 컬러별 수량</span>
          <h3>${escapeHtml(selectedStyleCode)} · ${escapeHtml(styleName)}</h3>
        </div>
        <button class="summary-close" type="button" id="closeStyleSummary">닫기</button>
      </div>
      <div class="color-summary-grid">
        ${Array.from(colorMap.values()).map((item) => `
          <article class="color-summary-item">
            <strong>${escapeHtml(item.color)}</strong>
            <b>${number(item.total)}장</b>
            <div class="size-assort">
              ${Array.from(item.sizes.entries()).map(([size, qty]) => `
                <span>${escapeHtml(size)} <strong>${number(qty)}장</strong> <em>${item.total ? Math.round((qty / item.total) * 100) : 0}%</em></span>
              `).join("")}
            </div>
            <small>${item.weekly.map((qty, index) => `${index + 1}주 ${number(qty)}`).join(" · ")}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderDecisionRows(groups, allGroups) {
  let summaryInserted = false;
  return groups.map((group) => {
    const row = renderGroupRow(group);
    if (
      selectedStyleCode &&
      group.styleCode === selectedStyleCode &&
      (!selectedStyleAnchorId || group.id === selectedStyleAnchorId) &&
      !summaryInserted
    ) {
      summaryInserted = true;
      return `${row}
        <tr class="inline-summary-row">
          <td colspan="23">${renderStyleColorSummary(allGroups)}</td>
        </tr>`;
    }
    return row;
  }).join("");
}

function render() {
  const allGroups = forecastReorders(rows, settings, shortformOverrides);
  const groups = selectedFactory === "전체"
    ? allGroups
    : allGroups.filter((group) => group.factoryName === selectedFactory);
  const totalRecommendation = groups.reduce((sum, group) => sum + group.totalRecommendation, 0);
  const nextWeekCut = groups.reduce((sum, group) => sum + group.nextWeekCutQty, 0);
  const materialPrep = groups.reduce((sum, group) => sum + group.materialPrepQty, 0);
  const highRiskCount = groups.filter((group) => group.riskLevel === "높음").length;

  app.innerHTML = `
    <header class="app-header">
      <div>
        <span class="eyebrow">MIXXO Reorder Agent v1</span>
        <h1>반응생산 리오더 수량예측</h1>
        <p>판매 반응, PLC, 노출, 고객 신호, 온라인 확산을 반영해 8주간의 스타일·컬러·사이즈별 생산 제안 수량을 계산합니다.</p>
      </div>
      <button class="secondary-button" id="resetSample" type="button">샘플 복원</button>
    </header>

    ${renderFactoryFilter(allGroups)}

    <section class="workspace-grid">
      <section class="panel">
        <div class="section-title"><span>파일</span><h2>데이터 업로드</h2></div>
        <label class="drop-zone">
          <strong>엑셀 또는 CSV 파일 선택</strong>
          <small>필수 컬럼은 템플릿 기준으로 맞추면 됩니다.</small>
          <input id="fileInput" type="file" accept=".xlsx,.xls,.csv" />
        </label>
        <div class="upload-actions">
          <button class="secondary-button" id="downloadTemplate" type="button">템플릿</button>
          <span>첫 번째 시트를 자동 분석</span>
        </div>
        ${warnings.length ? `<div class="warning-box"><strong>확인 필요</strong><p>${escapeHtml(warnings.slice(0, 2).join(" / "))}</p></div>` : ""}
      </section>

      <section class="panel">
        <div class="section-title"><span>기준</span><h2>운영 기준</h2></div>
        <div class="setting-grid">
          ${settingInput("targetFullPriceSellThrough", "목표 정상판매율", settings.targetFullPriceSellThrough, "0.01")}
          ${settingInput("targetInventoryRate", "재고율", settings.targetInventoryRate, "0.01")}
          ${settingInput("totalStores", "전체 매장", settings.totalStores, "1")}
          ${settingInput("productionLeadWeeks", "생산 리드타임", settings.productionLeadWeeks, "1")}
        </div>
      </section>
    </section>

    <section class="status-row">
      ${metric("분석 파일", escapeHtml(fileName), `${rows.length}개 판매 행`)}
      ${metric("다음주 봉제 투입", `${number(nextWeekCut)}장`, "1주차 추천 합계")}
      ${metric("원부자재 준비", `${number(materialPrep)}장`, "8주 누적 필요량")}
      ${metric("총 리오더 제안", `${number(totalRecommendation)}장`, `${groups.length}개 SKU`)}
      ${metric("고위험 SKU", `${highRiskCount}개`, "품절/과잉/캐파 리스크")}
    </section>

    <section class="logic-strip">
      <span>계산 기준: 예상 판매수요 / ${percent(settings.targetFullPriceSellThrough)} - 입고시점 예상 재고 - 확정 입고량. 유사스타일번호가 있으면 전년 PLC 지수로 증가율을 계산하고, 없으면 직전 2주 상승률을 사용합니다. 숏폼 반응점수는 1~5점 기준으로 1점당 20%씩 수요를 가산합니다.</span>
    </section>

    ${renderAssumptionPanel(groups)}

    <section class="decision-section">
      <div class="table-header">
        <div><h2>8주 리오더 결론</h2><p>스타일, 컬러, 사이즈별 추천 수량과 MD 조정 수량입니다.</p></div>
        <div class="legend"><span class="dot dot-good"></span>낮음 <span class="dot dot-mid"></span>중간 <span class="dot dot-high"></span>높음</div>
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>공장</th><th>상품</th><th>컬러</th><th>사이즈</th><th>현 주판량</th><th>입고 후 주판량 비율</th><th>숏폼 점수</th><th>바이럴 배수</th><th>최종 주판량 비율</th>
              <th>1주</th><th>2주</th><th>3주</th><th>4주</th><th>5주</th><th>6주</th><th>7주</th><th>8주</th>
              <th>8주 합계</th><th>MD 조정</th><th>최종</th><th>예상 정상판매율</th><th>리스크</th><th>근거</th>
            </tr>
          </thead>
          <tbody>${renderDecisionRows(groups, allGroups)}</tbody>
        </table>
      </div>
    </section>
  `;

  bindEvents();
}

function settingInput(key, label, value, step) {
  return `<label><span>${label}</span><input class="setting-input" data-key="${key}" type="number" step="${step}" value="${value}" /></label>`;
}

function metric(label, value, caption) {
  return `<div class="metric-card"><span>${label}</span><strong>${value}</strong><small>${caption}</small></div>`;
}

function renderGroupRow(group) {
  const adjustment = adjustments[group.id] ?? 0;
  const finalQty = group.totalRecommendation + adjustment;
  return `
    <tr>
      <td>${escapeHtml(group.factoryName)}</td>
      <td>
        <button class="product-link" type="button" data-style-code="${escapeHtml(group.styleCode)}" data-style-id="${escapeHtml(group.id)}">
          <strong>${escapeHtml(group.styleCode)}</strong>
          <span>${escapeHtml(group.styleName)}</span>
        </button>
      </td>
      <td>${escapeHtml(group.color)}</td>
      <td>${escapeHtml(group.size)}</td>
      <td>${number(group.baselineWeeklySales)}</td>
      <td>${group.demandRatioLabel}</td>
      <td>${renderShortformScoreControl(group)}</td>
      <td>${multiplier(group.shortformMultiplier)}</td>
      <td><strong>${percent(group.finalWeeklySalesRatio)}</strong><span>확산 ${multiplier(group.expansionMultiplier)}</span></td>
      ${group.weeklyRecommendations.map((qty) => `<td>${number(qty)}</td>`).join("")}
      <td class="strong-cell">${number(group.totalRecommendation)}</td>
      <td><input class="adjust-input" data-id="${escapeHtml(group.id)}" type="number" value="${adjustment}" /></td>
      <td class="strong-cell">${number(finalQty)}</td>
      <td>${percent(group.expectedFullPriceSellThrough)}</td>
      <td>${renderRisk(group.riskLevel)}</td>
      <td>
        <div class="reason-list">
          ${group.recommendationReasons.slice(0, 4).join(" · ")}
          <small>${group.riskReasons.join(" · ")}</small>
          <details class="signal-detail">
            <summary>근거 보기</summary>
            <div class="signal-list">
              ${group.demandSignals.map((signal) => `<span>${signal.label} ${Math.round(signal.score)}점 ${signedPercent(signal.lift)}</span>`).join("")}
            </div>
          </details>
        </div>
      </td>
    </tr>
  `;
}

function bindEvents() {
  document.querySelector("#resetSample").addEventListener("click", () => {
    rows = SAMPLE_ROWS;
    fileName = "샘플 데이터";
    warnings = [];
    adjustments = {};
    shortformOverrides = {};
    selectedFactory = "전체";
    selectedStyleCode = "";
    selectedStyleAnchorId = "";
    render();
  });
  document.querySelector("#downloadTemplate").addEventListener("click", downloadTemplate);
  document.querySelector("#fileInput").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = await parseFile(file);
      rows = parsed.rows;
      fileName = file.name;
      warnings = parsed.warnings;
      adjustments = {};
      shortformOverrides = buildInitialShortformOverrides(parsed.rows);
      selectedFactory = "전체";
      selectedStyleCode = "";
      selectedStyleAnchorId = "";
    } catch (error) {
      warnings = [error instanceof Error ? error.message : "파일을 읽는 중 문제가 발생했습니다."];
    }
    render();
  });
  document.querySelectorAll(".setting-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      settings = { ...settings, [event.target.dataset.key]: Number(event.target.value) };
      render();
    });
  });
  document.querySelectorAll(".factory-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      selectedFactory = event.currentTarget.dataset.factory || "전체";
      selectedStyleCode = "";
      selectedStyleAnchorId = "";
      render();
    });
  });
  document.querySelectorAll(".product-link").forEach((button) => {
    button.addEventListener("click", (event) => {
      selectedStyleCode = event.currentTarget.dataset.styleCode || "";
      selectedStyleAnchorId = event.currentTarget.dataset.styleId || "";
      render();
    });
  });
  document.querySelector("#closeStyleSummary")?.addEventListener("click", () => {
    selectedStyleCode = "";
    selectedStyleAnchorId = "";
    render();
  });
  document.querySelectorAll(".adjust-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      adjustments = { ...adjustments, [event.target.dataset.id]: Number(event.target.value) };
      render();
    });
  });
  document.querySelectorAll(".score-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const target = event.currentTarget;
      const id = target.dataset.scoreId;
      const score = normalizeShortformSelection(target.value);
      if (!id) return;

      if (score === null) {
        const next = { ...shortformOverrides };
        delete next[id];
        shortformOverrides = next;
        target.value = "";
      } else {
        shortformOverrides = { ...shortformOverrides, [id]: score };
        target.value = String(score);
      }

      render();
    });
  });
  document.querySelectorAll(".score-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.currentTarget;
      const id = target.dataset.scoreId;
      const score = normalizeShortformSelection(target.dataset.score);
      if (!id) return;

      if (score === null) {
        const next = { ...shortformOverrides };
        delete next[id];
        shortformOverrides = next;
      } else {
        shortformOverrides = { ...shortformOverrides, [id]: score };
      }

      render();
    });
  });
}

render();
