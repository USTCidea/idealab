export interface ReadingGroup {
  id: string;
  name: string;
  teachers: string[];
  members: string[];
}

export interface ReadingActivity {
  id: string;
  groupId: string;
  /** ISO 时间，包含中国时区，例如 2026-09-18T14:00:00+08:00。 */
  startsAt: string;
  endsAt?: string;
  location: string;
  presenters: string[];
  paperTitle: string;
  paperAuthors?: string;
  paperVenue?: string;
  paperUrl?: string;
  slidesUrl?: string;
  summary?: string;
}

// 在这里维护组名、指导老师和成员；未提供的名单保持为空。
export const readingGroups: ReadingGroup[] = [
  {
    id: "group-1",
    name: "合作优化方向",
    teachers: ["刘林冬", "刘许成"],
    members: ["寥祥斌", "吴子翔", "陆运阳"],
  },
  {
    id: "group-2",
    name: "优化学习方向",
    teachers: ["朱龔", "杜建忠", "张勋", "王澹"],
    members: ["林家祥", "段睿", "邢淦琛", "李淑宇", "刘元辛", "金柯", "苏睿涵", "陈郅奥"],
  },
  {
    id: "group-3",
    name: "数据智能方向",
    teachers: ["于成成", "汪勐航", "逯兰", "刘文情"],
    members: ["徐光辉", "李昊洋", "李鉴岐", "仝宇", "付一郎"],
  },
  {
    id: "group-4",
    name: "运营管理方向",
    teachers: ["李宜福", "卢文涛", "王德瑞"],
    members: ["郭秋炜", "吴天阳", "张芳菲", "郑永胜", "赵俊喆", "李绪泰", "孙钰清"],
  },
];

export const readingGuidelines = [
  {
    title: "双周开展，组内协商",
    description: "原则上每两周开展一次，具体频率和时间由各组成员与负责教师协商确定。每组每次由两位同学各分享一篇论文。",
  },
  {
    title: "精读标注，带着问题分享",
    description: "不要求重新制作完整 PPT，可用简要 PPT 配合论文 PDF 讲解。阅读时标注关键模型、方法和实验结果，记录疑问与不足，并整理个人理解和可能的研究拓展方向。",
  },
  {
    title: "提前通知，落实场地",
    description: "每组确定一位负责同学，至少提前一周将时间、地点、主讲人和论文信息提交给阅读小组组织同学，汇总后由网站负责人付一郎更新。时间确定后，联系团队日历负责人李绪泰预约教室。",
  },
  {
    title: "分享留痕，积累资料",
    description: "汇报结束后，将论文及 PPT 等分享资料交给李昊洋统一归档，积累阅读记录与论文集，供后续学习和研究参考。",
  },
];

export const readingDiscussionQuestions = [
  "论文解决了什么问题？",
  "为什么采用这一方法？",
  "方法的优势与局限是什么？",
  "对自己的研究有什么启发？",
  "还有哪些值得进一步探索的方向？",
];

// 每次活动新增一条记录，保留旧记录。填写示例见 READING_GROUPS.md。
export const readingActivities: ReadingActivity[] = [
  {
    id: "group-1-20260911-01",
    groupId: "group-1",
    startsAt: "2026-09-11T14:00:00+08:00",
    location: "管科楼219",
    presenters: ["吴子翔"],
    paperTitle: "Capacity sharing and cost allocation among independent firms with congestion",
  },
  {
    id: "group-3-20260911-01",
    groupId: "group-3",
    startsAt: "2026-09-11T18:30:00+08:00",
    location: "管科楼105",
    presenters: ["李昊洋"],
    paperTitle: "Menu Pricing of Large Language Models",
  },
  {
    id: "group-2-20260913-01",
    groupId: "group-2",
    startsAt: "2026-09-13T18:30:00+08:00",
    location: "管科楼107",
    presenters: ["李淑宇"],
    paperTitle: "Learning Memory-Enhanced Improvement Heuristics for Flexible Job Shop Scheduling",
  },
  {
    id: "group-2-20260913-02",
    groupId: "group-2",
    startsAt: "2026-09-13T18:30:00+08:00",
    location: "管科楼107",
    presenters: ["陈郅奥"],
    paperTitle: "Automated Scheduling Heuristic Generation and Evaluation via Large Language Model",
  },
];

export function getActivityStatus(activity: ReadingActivity, now: number) {
  if (now < Date.parse(activity.startsAt)) return "upcoming";
  if (!activity.endsAt) {
    // 未提供结束时间：以开始日期对应的北京时间次日零点为归档边界。
    const chinaDay = new Date(Date.parse(activity.startsAt) + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const nextMidnight = Date.parse(`${chinaDay}T00:00:00+08:00`) + 24 * 60 * 60 * 1000;
    return now < nextMidnight ? "today" : "past";
  }
  if (now < Date.parse(activity.endsAt)) return "ongoing";
  return "past";
}
