import { useEffect, useState } from "react";
import { BookOpenIcon, CalendarDaysIcon, MapPinIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import { readingGroups, readingActivities, getActivityStatus } from "../data/readingGroups";
import type { ReadingActivity } from "../data/readingGroups";

const dateFormat = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai", month: "long", day: "numeric", year: "numeric", weekday: "short",
});
const timeFormat = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", hour12: false,
});

function activityTime(activity: ReadingActivity) {
  const start = new Date(activity.startsAt);
  if (!activity.endsAt) return `${dateFormat.format(start)} ${timeFormat.format(start)} 开始`;
  const end = new Date(activity.endsAt);
  const endDay = dateFormat.format(start) === dateFormat.format(end) ? "" : `${dateFormat.format(end)} `;
  return `${dateFormat.format(start)} ${timeFormat.format(start)} — ${endDay}${timeFormat.format(end)}`;
}

function ActivityCard({ activity, now }: { activity: ReadingActivity; now: number }) {
  const status = getActivityStatus(activity, now);
  const group = readingGroups.find((item) => item.id === activity.groupId);
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-800">{group?.name}</span>
        <span className={status === "past" ? "text-gray-500" : "font-medium text-blue-700"}>
          {status === "past" ? "往期活动" : status === "ongoing" ? "进行中" : status === "today" ? "当日活动" : "即将开展"}
        </span>
      </div>
      <h3 className="mb-3 break-words text-xl font-semibold leading-relaxed text-gray-900">{activity.paperTitle}</h3>
      {(activity.paperAuthors || activity.paperVenue) && (
        <p className="text-sm text-gray-500">{[activity.paperAuthors, activity.paperVenue].filter(Boolean).join(" · ")}</p>
      )}
      <dl className="mt-5 grid gap-4 text-base text-gray-700 sm:grid-cols-2">
        <div><dt className="mb-1 text-sm text-gray-500">主讲同学</dt><dd>{activity.presenters.join("、")}</dd></div>
        <div><dt className="mb-1 flex items-center gap-1 text-sm text-gray-500"><MapPinIcon className="h-4 w-4" aria-hidden="true" />活动地点</dt><dd className="break-words">{activity.location}</dd></div>
        <div className="sm:col-span-2"><dt className="mb-1 flex items-center gap-1 text-sm text-gray-500"><CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />活动时间（北京时间）</dt><dd>{activityTime(activity)}</dd></div>
      </dl>
      {activity.summary && <p className="mt-5 whitespace-pre-line leading-relaxed text-gray-600">{activity.summary}</p>}
      {(activity.paperUrl || activity.slidesUrl) && (
        <div className="mt-6 flex flex-wrap gap-5 border-t border-gray-100 pt-4 text-sm font-medium">
          {activity.paperUrl && <a href={activity.paperUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">阅读论文 ↗</a>}
          {activity.slidesUrl && <a href={activity.slidesUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">分享资料 ↗</a>}
        </div>
      )}
    </article>
  );
}

export default function ReadingGroups() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const activities = readingActivities.filter((item) => selectedGroup === "all" || item.groupId === selectedGroup);
  const upcoming = activities.filter((item) => getActivityStatus(item, now) !== "past")
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const past = activities.filter((item) => getActivityStatus(item, now) === "past")
    .sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt));

  return (
    <div className="py-16">
      <Container>
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">阅读小组</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
            以论文精读拓展学术视野，在师生交流中深化对研究问题与方法的理解。通过批判性思考与讨论，发现值得探索的新问题，让阅读成为研究创新的起点。
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-800">
            <BookOpenIcon className="h-5 w-5" aria-hidden="true" />精读论文 · 思辨交流 · 启发研究
          </div>
        </div>

        <section aria-labelledby="groups-title" className="mb-12">
          <h2 id="groups-title" className="mb-6 text-2xl font-bold">研究方向与分组</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {readingGroups.map((group, index) => (
              <article key={group.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50 px-6 py-4">
                  <h3 className="text-xl font-semibold text-blue-900">{group.name}</h3>
                  <span className="text-2xl font-semibold text-blue-300" aria-hidden="true">0{index + 1}</span>
                </div>
                <div className="p-6">
                  <dl className="space-y-5">
                    <div><dt className="mb-2 text-sm text-gray-500">负责教师</dt><dd className="text-base text-gray-800">{group.teachers.join("、") || "名单待公布"}</dd></div>
                    <div><dt className="mb-2 flex items-center gap-1 text-sm text-gray-500"><UserGroupIcon className="h-4 w-4" aria-hidden="true" />小组成员</dt><dd className="text-base leading-relaxed text-gray-800">{group.members.join("、") || "名单待公布"}</dd></div>
                  </dl>
                  <a href="#reading-activities" onClick={() => setSelectedGroup(group.id)} className="mt-6 inline-block text-sm font-medium underline underline-offset-4">查看本组活动 →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="reading-activities" aria-labelledby="activities-title" className="scroll-mt-28">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 id="activities-title" className="text-2xl font-bold">活动安排与记录</h2>
            <div className="flex flex-wrap gap-2" role="group" aria-label="按小组筛选活动">
              {[{ id: "all", name: "全部小组" }, ...readingGroups].map((group) => (
                <button key={group.id} type="button" aria-pressed={selectedGroup === group.id} onClick={() => setSelectedGroup(group.id)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${selectedGroup === group.id ? "border-blue-800 bg-blue-800 text-white" : "border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-800"}`}>
                  {group.name}
                </button>
              ))}
            </div>
          </div>
          <div aria-live="polite">
            <h3 className="mb-4 text-lg font-semibold">近期安排</h3>
            {upcoming.length ? <div className="grid gap-5">{upcoming.map((activity) => <ActivityCard key={activity.id} activity={activity} now={now} />)}</div> : (
              <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
                <CalendarDaysIcon className="mx-auto mb-3 h-8 w-8 text-blue-500" aria-hidden="true" />
                <p className="mb-2 text-lg font-medium text-gray-800">活动安排待公布</p>
                <p className="mb-0 text-base text-gray-500">确定后将在这里公布主讲同学、时间、地点及分享论文。</p>
              </div>
            )}
            <h3 className="mb-4 mt-10 text-lg font-semibold">往期记录</h3>
            {past.length ? <div className="grid gap-5">{past.map((activity) => <ActivityCard key={activity.id} activity={activity} now={now} />)}</div> : (
              <p className="rounded-lg border border-gray-200 bg-white px-6 py-8 text-base text-gray-500">暂无往期活动记录，后续将在此保留论文分享内容和资料。</p>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}
