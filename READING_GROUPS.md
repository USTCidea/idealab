# 阅读小组内容更新

页面地址：`/idealab/reading-groups`。内容统一维护在 `src/data/readingGroups.ts`。

## 设置小组

修改 `readingGroups` 中的 `name`（组名）、`teachers`（老师姓名数组）、`members`（学生姓名数组）。保持 `id` 不变，活动通过它关联到对应小组。当前四组依次为合作优化、优化学习、数据智能、运营管理方向，ID 为 `group-1` 至 `group-4`。未提供的名单保持 `[]`，页面会显示“名单待公布”。

活动规则和讨论问题保留在同一文件的 `readingGuidelines`、`readingDiscussionQuestions` 中作为内部参考，网页不展示这些内容。

## 每次新增活动

在 `readingActivities` 数组中添加一个对象，保留之前的记录。下面仅为填写格式示例，不是真实活动，请替换全部示例内容后再发布：

```ts
export const readingActivities: ReadingActivity[] = [
  {
    id: "group-1-20260918-01", // 每条记录唯一；同场多篇论文可分别添加记录
    groupId: "group-1", // group-1 / group-2 / group-3 / group-4
    startsAt: "2026-09-18T14:00:00+08:00",
    endsAt: "2026-09-18T16:00:00+08:00",
    location: "请填写实际楼宇及会议室，或线上会议方式",
    presenters: ["请填写主讲同学姓名"],
    paperTitle: "请填写论文完整标题",
    paperAuthors: "选填：论文作者",
    paperVenue: "选填：期刊/会议及年份",
    paperUrl: "https://example.com/replace-with-real-paper",
    summary: "选填：分享内容或讨论纪要",
    // slidesUrl: "/idealab/reading-groups/实际文件名.pdf",
  },
];
```

时间使用带 `+08:00` 的完整格式，结束时间可选，填写时必须晚于开始时间。未填写结束时间时，只显示开始时间；开始后标为“当日活动”，北京时间次日零点自动归入往期。页面统一显示北京时间；开始前显示“即将开展”，活动期间显示“进行中”，结束后自动进入“往期记录”。近期活动按时间从近到远排列，往期活动按时间倒序排列。

`paperAuthors`、`paperVenue`、`paperUrl`、`slidesUrl`、`summary` 是可选项，没有就删除对应行。链接仅填写可信的 `https://` 网址或本站资源路径。分享资料可以放在 `public/reading-groups/` 中，然后填写包含 `/idealab/` 前缀的访问路径。

## 检查与更新网站

1. 保存文件后运行 `npm run dev`，打开终端显示的本地地址，并从导航进入“阅读小组”。
2. 核对小组、姓名、时间、地点、论文和资料链接。
3. 运行 `npm run build`，生成现有项目配置指定的 `docs` 目录。
4. 将源代码与所需的构建产物按项目现有发布流程提交、推送到 GitHub。是否自动上线取决于仓库的 Pages 或其他部署设置。

这是静态网站，当前没有网页内编辑后台；每次修改数据后需要重新构建和发布，线上内容才会更新。
