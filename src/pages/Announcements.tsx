import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDaysIcon as CalendarDays,
  LockClosedIcon as LockKeyhole,
} from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import { mockNews } from "../data/mockData";

interface GroupMeeting {
  date: string;
  title: string;
}

interface MonthlyMeetingColumn {
  period: string;
  group: string[];
  names: string[];
  additionalNames?: string[];
}

const DEMO_PASSWORD = "513513";
const UNLOCK_STORAGE_KEY = "idealab-internal-schedule-unlocked-until";
const UNLOCK_DURATION = 7 * 24 * 60 * 60 * 1000;

const groupMeetings: GroupMeeting[] = [
  { date: "2026-08-31", title: "博士预开题及毕业预答辩（孙钰清、谭政、李振东）" },
  {
    date: "2026-09-07",
    title:
      "新生见面会（代替以前请吃饭；预约教室、准备零食；新生制作 PPT 进行自我介绍，并汇报工作进展和工作计划）",
  },
  {
    date: "2026-09-14",
    title:
      "硕士预开题：徐光辉、林家祥、李绪泰、张芳菲、王梓声、李鉴岐、郑永胜",
  },
  { date: "2026-09-28", title: "博士个人学术汇报：吴子翔、郭秋炜、廖祥斌" },
  { date: "2026-10-12", title: "博士个人学术汇报：李淑宇、邢淦琛、段睿" },
  { date: "2026-10-26", title: "博士个人学术汇报：赵俊喆、李昊洋、吴天阳" },
  { date: "2026-11-09", title: "个人学术汇报（研二学硕）：徐光辉、李鉴岐、林家祥" },
  { date: "2026-11-23", title: "个人学术汇报（研二学硕）：李绪泰、张芳菲、郑永胜" },
  { date: "2026-12-07", title: "奇瑞专项汇报：彭意仰、杨佳源、朱传奇" },
  { date: "2026-12-21", title: "个人学术汇报（研一新生）：苏睿涵、金柯、刘元辛" },
  { date: "2027-01-04", title: "个人学术汇报（研一新生/专博）：仝宇、陈郅奥、付一郎" },
  { date: "2027-01-18", title: "年度总结" },
  { date: "2027-01-25", title: "待安排" },
];

const monthlyMeetings: MonthlyMeetingColumn[] = [
  {
    period: "9月上",
    group: ["毕业年级", "研一学/专硕"],
    names: ["廖祥斌", "段睿", "吴天阳", "孙钰清", "徐光辉", "张芳菲", "李绪泰"],
    additionalNames: ["于成成", "汪勐航", "刘许成"],
  },
  {
    period: "9月下",
    group: ["研二专硕"],
    names: ["赵俊喆", "李昊洋", "邢淦琛", "林家祥", "李鉴岐", "郑永胜"],
  },
  {
    period: "10月上",
    group: ["毕业年级"],
    names: ["廖祥斌", "段睿", "吴天阳", "孙钰清", "徐光辉", "张芳菲", "李绪泰"],
  },
  {
    period: "10月下",
    group: ["研一学硕"],
    names: ["赵俊喆", "李昊洋", "邢淦琛", "林家祥", "李鉴岐", "郑永胜"],
  },
  {
    period: "11月上",
    group: ["毕业年级"],
    names: ["廖祥斌", "段睿", "吴天阳", "孙钰清", "徐光辉", "张芳菲", "李绪泰"],
    additionalNames: ["于成成", "汪勐航", "刘许成"],
  },
  {
    period: "11月下",
    group: ["研二专硕"],
    names: ["赵俊喆", "李昊洋", "邢淦琛", "林家祥", "李鉴岐", "郑永胜"],
  },
  {
    period: "12月上",
    group: ["毕业年级", "研一学硕"],
    names: ["廖祥斌", "段睿", "吴天阳", "孙钰清", "徐光辉", "张芳菲", "李绪泰"],
  },
  {
    period: "12月下",
    group: ["研一专硕"],
    names: ["赵俊喆", "李昊洋", "邢淦琛", "林家祥", "李鉴岐", "郑永胜"],
  },
  {
    period: "1月上",
    group: ["毕业年级"],
    names: ["廖祥斌", "段睿", "吴天阳", "孙钰清", "徐光辉", "张芳菲", "李绪泰"],
    additionalNames: ["于成成", "汪勐航", "刘许成"],
  },
  {
    period: "1月下",
    group: ["研一学硕", "研二专硕"],
    names: ["赵俊喆", "李昊洋", "邢淦琛", "林家祥", "李鉴岐", "郑永胜"],
  },
];

const Announcements: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [scheduleView, setScheduleView] = useState<"group" | "monthly">(
    "group",
  );

  useEffect(() => {
    const unlockedUntil = Number(localStorage.getItem(UNLOCK_STORAGE_KEY));
    setIsUnlocked(unlockedUntil > Date.now());
  }, []);

  const sortedNews = useMemo(
    () =>
      [...mockNews].sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
      ),
    [],
  );

  const handleUnlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== DEMO_PASSWORD) {
      setPasswordError("密码不正确，请重新输入");
      return;
    }

    localStorage.setItem(
      UNLOCK_STORAGE_KEY,
      String(Date.now() + UNLOCK_DURATION),
    );
    setIsUnlocked(true);
    setPassword("");
    setPasswordError("");
  };

  const handleLock = () => {
    localStorage.removeItem(UNLOCK_STORAGE_KEY);
    setIsUnlocked(false);
    setScheduleView("group");
  };

  return (
    <div className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            时间线
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            实验室动态记录
          </p>
        </div>

        <section className="mx-auto mb-12 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-md shadow-gray-200/50">
            <div className="flex flex-col gap-4 border-b border-primary-100 bg-gradient-to-r from-primary-50 to-white px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-900 text-white">
                  {isUnlocked ? (
                    <CalendarDays className="h-5 w-5" />
                  ) : (
                    <LockKeyhole className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-wide text-gray-900 sm:text-2xl">
                    组内日程
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    大组会及师生 Meeting 时间安排
                  </p>
                </div>
              </div>
              {isUnlocked ? (
                <button
                  type="button"
                  onClick={handleLock}
                  className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-primary-900 ring-1 ring-primary-100 transition hover:bg-primary-50"
                >
                  重新锁定
                </button>
              ) : (
                <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-primary-900 ring-1 ring-primary-100">
                  仅实验室成员查看
                </span>
              )}
            </div>

            {!isUnlocked ? (
              <div className="px-5 py-8 sm:px-7">
                <div className="mx-auto max-w-md text-center">
                  <p className="text-sm leading-6 text-gray-600">
                    请输入组内密码查看会议时间安排
                  </p>
                  <form
                    onSubmit={handleUnlock}
                    className="mt-5 flex flex-col gap-3 sm:flex-row"
                  >
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setPasswordError("");
                      }}
                      placeholder="请输入密码"
                      aria-label="组内日程密码"
                      className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-primary-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-800"
                    >
                      验证并查看
                    </button>
                  </form>
                  {passwordError && (
                    <p className="mt-3 text-sm text-red-600" role="alert">
                      {passwordError}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-gray-400">
                    验证成功后，将在当前设备保留 7 天
                  </p>
                </div>
              </div>
            ) : (
              <div className="px-4 py-6 sm:px-8 sm:py-8">
                <div className="mb-7 flex rounded-xl bg-gray-100 p-1.5">
                  <button
                    type="button"
                    onClick={() => setScheduleView("group")}
                    className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold tracking-wide transition sm:text-base ${
                      scheduleView === "group"
                        ? "bg-white text-primary-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    大组会安排
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleView("monthly")}
                    className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold tracking-wide transition sm:text-base ${
                      scheduleView === "monthly"
                        ? "bg-white text-primary-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    月度 Meeting
                  </button>
                </div>

                {scheduleView === "group" ? (
                  <div>
                    <div className="mb-5 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold tracking-wide text-gray-900">
                          2026—2027学年第一学期大组会
                        </h3>
                        <p className="mt-1.5 text-sm text-gray-500">
                          除夕为2027年2月6日
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-800">
                        共 {groupMeetings.length} 场
                      </span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      {groupMeetings.map((meeting, index) => {
                        const meetingDate = new Date(`${meeting.date}T23:59:59`);
                        const hasPassed = meetingDate.getTime() < Date.now();
                        const formattedDate = new Intl.DateTimeFormat("zh-CN", {
                          month: "long",
                          day: "numeric",
                        }).format(meetingDate);

                        return (
                          <div
                            key={meeting.date}
                            className={`grid gap-2.5 px-4 py-4 sm:grid-cols-[8rem_1fr] sm:items-start sm:px-5 ${
                              index > 0 ? "border-t border-gray-100" : ""
                            } ${hasPassed ? "bg-gray-50/70" : "bg-white"}`}
                          >
                            <div className="flex items-center gap-2.5 text-sm font-semibold text-primary-900">
                              <CalendarDays className="h-4 w-4 shrink-0" />
                              {formattedDate}
                            </div>
                            <div className="flex items-start justify-between gap-3">
                              <p
                                className={`text-[15px] leading-6 ${
                                  hasPassed ? "text-gray-500" : "text-gray-800"
                                }`}
                              >
                                {meeting.title}
                              </p>
                              {hasPassed && (
                                <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">
                                  已结束
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-5">
                      <h3 className="text-lg font-bold tracking-wide text-gray-900">
                        2026—2027学年第一学期月度讨论安排
                      </h3>
                      <p className="mt-2 max-w-4xl text-sm leading-6 text-gray-500">
                        有合作导师、CSC访学或合作师兄师姐组的同学，日常须保证与合作导师进行 weekly meeting，每年不少于20次。
                      </p>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                      <div className="grid min-w-[1180px] grid-cols-10 divide-x divide-gray-200">
                        {monthlyMeetings.map((column) => (
                          <div key={column.period} className="bg-white">
                            <div className="bg-primary-900 px-3 py-3 text-center text-sm font-bold tracking-wide text-white">
                              {column.period}
                            </div>
                            <div className="min-h-[4.75rem] border-b border-gray-200 bg-primary-50 px-2 py-2.5 text-center text-sm font-semibold leading-6 text-primary-900">
                              {column.group.map((group) => (
                                <div key={group}>{group}</div>
                              ))}
                            </div>
                            <div className="space-y-0.5 px-2 py-3 text-center text-sm leading-7 text-gray-700">
                              {column.names.map((name) => (
                                <div key={name}>{name}</div>
                              ))}
                            </div>
                            {column.additionalNames && (
                              <div className="border-t border-amber-200 bg-amber-50 px-2 py-3 text-center text-sm font-medium leading-7 text-amber-900">
                                {column.additionalNames.map((name) => (
                                  <div key={name}>{name}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="mt-4 text-xs leading-5 text-gray-400">
                      表格可左右滑动查看完整安排；毕业年级同学统一安排月初场次，其余同学按分组参加。
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">公开动态</h2>
            <span className="text-sm text-gray-500">共 {sortedNews.length} 条</span>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {sortedNews.map((news) => (
                <li
                  key={news.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center px-4 py-4 space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {news.publishDate}
                    </span>
                    <span className="text-base text-gray-900 hover:text-primary-900 transition-colors line-clamp-1">
                      {news.title}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Announcements;
