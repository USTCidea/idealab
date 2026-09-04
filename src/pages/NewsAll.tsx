import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  UserIcon,
  MapPinIcon,
  ClockIcon,
  ViewColumnsIcon,
  BookOpenIcon,
  AcademicCapIcon,
  PresentationChartBarIcon,
  TrophyIcon,
  UsersIcon,
  SparklesIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import {
  SearchBox,
  FilterSelect,
  Pagination,
  EmptyState,
  Button,
  NewsCard,
} from "../components/ui";
import { mockNews } from "../data/mockData";

const NewsAll: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date-desc");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"masonry" | "timeline">("masonry");

  const pageSize = 12; // 每页显示的数量

  const sortOptions = [
    { value: "date-desc", label: "日期（新到旧）" },
    { value: "date-asc", label: "日期（旧到新）" },
    { value: "title", label: "标题（A-Z）" },
    { value: "category", label: "分类" },
  ];

  const categoryOptions = [
    { value: "all", label: "全部类型" },
    { value: "achievement", label: "学术成就" },
    { value: "conference", label: "学术会议" },
    { value: "collaboration", label: "合作交流" },
    { value: "activity", label: "活动新闻" },
    { value: "personnel", label: "人员动态" },
    { value: "thesis", label: "学位论文" },
  ];

  // 筛选和搜索逻辑
  const filteredNews = useMemo(() => {
    let filtered = mockNews;

    // 分类过滤
    if (categoryFilter !== "all") {
      filtered = filtered.filter((news) => news.category === categoryFilter);
    }

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(query) ||
          news.content.toLowerCase().includes(query) ||
          news.author?.toLowerCase().includes(query) ||
          news.talkSpeaker?.toLowerCase().includes(query) ||
          news.conferenceName?.toLowerCase().includes(query) ||
          (news.tags &&
            news.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return (
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
          );
        case "date-asc":
          return (
            new Date(a.publishDate).getTime() -
            new Date(b.publishDate).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, categoryFilter]);

  // 分页逻辑
  const totalPages = Math.ceil(filteredNews.length / pageSize);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 重置页码当筛选条件变化时
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, categoryFilter]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSortBy("date-desc");
    setCategoryFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || categoryFilter !== "all";

  // 分类图标映射
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "achievement":
        return <TrophyIcon className="h-4 w-4" />;
      case "conference":
        return <AcademicCapIcon className="h-4 w-4" />;
      case "collaboration":
        return <UsersIcon className="h-4 w-4" />;
      case "activity":
        return <SparklesIcon className="h-4 w-4" />;
      case "personnel":
        return <UserPlusIcon className="h-4 w-4" />;
      case "talk":
        return <PresentationChartBarIcon className="h-4 w-4" />;
      case "thesis":
        return <BookOpenIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // 分类标签映射
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "achievement":
        return "学术成就";
      case "conference":
        return "学术会议";
      case "collaboration":
        return "合作交流";
      case "activity":
        return "活动新闻";
      case "personnel":
        return "人员动态";
      case "talk":
        return "学术讲座";
      case "thesis":
        return "学位论文";
      default:
        return category;
    }
  };

  // 分类颜色映射
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "achievement":
        return "bg-yellow-100 text-yellow-800";
      case "conference":
        return "bg-blue-100 text-blue-800";
      case "collaboration":
        return "bg-indigo-100 text-indigo-800";
      case "activity":
        return "bg-pink-100 text-pink-800";
      case "personnel":
        return "bg-green-100 text-green-800";
      case "talk":
        return "bg-orange-100 text-orange-800";
      case "thesis":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="py-16">
      <Container>
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            新闻动态
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            了解实验室最新的学术活动、研究进展和团队动态
          </p>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="mb-8">
          {/* 搜索框 */}
          <div className="mb-6">
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜索新闻标题、内容、作者..."
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* 筛选控制 */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <FilterSelect
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categoryOptions}
                className="w-48"
              />
              {hasActiveFilters && (
                <Button variant="ghost" onClick={handleClearFilters}>
                  清除筛选
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* 视图切换 */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    viewMode === "masonry"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ViewColumnsIcon className="h-4 w-4 mr-1.5" />
                  瀑布流
                </button>
                <button
                  onClick={() => setViewMode("timeline")}
                  className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    viewMode === "timeline"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ClockIcon className="h-4 w-4 mr-1.5" />
                  时间线
                </button>
              </div>

              <span className="text-sm text-gray-600">
                共 {filteredNews.length} 条动态
              </span>
              <FilterSelect
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                className="w-48"
              />
            </div>
          </div>
        </div>

        {/* 新闻列表 */}
        {paginatedNews.length > 0 ? (
          <>
            {viewMode === "masonry" ? (
              /* 瀑布流视图 */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            ) : (
              /* 时间线视图 */
              <div className="space-y-8 mb-8">
                <div className="relative">
                  {/* 时间线背景线 */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  {paginatedNews.map((news) => (
                    <div
                      key={news.id}
                      className="relative flex items-start space-x-6 pb-8"
                    >
                      {/* 时间线节点 */}
                      <div className="flex-shrink-0 w-16 h-16 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center relative z-10">
                        {getCategoryIcon(news.category) || (
                          <UserIcon className="h-6 w-6 text-blue-500" />
                        )}
                      </div>

                      {/* 内容卡片 */}
                      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            {/* 分类标签 */}
                            <div className="flex items-center mb-2">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                  news.category
                                )}`}
                              >
                                {getCategoryIcon(news.category)}
                                <span className="ml-1">
                                  {getCategoryLabel(news.category)}
                                </span>
                              </span>
                            </div>

                            <Link
                              to={`/news/${news.id}`}
                              className="hover:underline"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {news.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {news.content}
                            </p>
                          </div>
                        </div>

                        {/* 详细信息 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>发布：{news.publishDate}</span>
                          </div>

                          {news.category === "talk" && (
                            <>
                              <div className="flex items-center">
                                <UserIcon className="h-4 w-4 mr-2" />
                                <span>
                                  主讲人：{news.talkSpeaker || "待定"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-2" />
                                <span>时间：{news.talkTime || "待定"}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPinIcon className="h-4 w-4 mr-2" />
                                <span>地点：{news.talkLocation || "待定"}</span>
                              </div>
                            </>
                          )}

                          {news.category === "conference" && (
                            <>
                              <div className="flex items-center">
                                <AcademicCapIcon className="h-4 w-4 mr-2" />
                                <span>会议：{news.conferenceName}</span>
                              </div>
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                <span>日期：{news.conferenceDate}</span>
                              </div>
                            </>
                          )}

                          {news.category === "thesis" && (
                            <>
                              <div className="flex items-center">
                                <UserIcon className="h-4 w-4 mr-2" />
                                <span>作者：{news.thesisAuthor}</span>
                              </div>
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                <span>年份：{news.thesisYear}</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* 标签 */}
                        {news.tags && news.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {news.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 分页 */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                showQuickJumper={true}
              />
            )}
          </>
        ) : (
          <EmptyState
            type={hasActiveFilters ? "no-results" : "no-data"}
            title={hasActiveFilters ? "未找到匹配的新闻" : "暂无新闻动态"}
            description={
              hasActiveFilters
                ? "请尝试修改搜索关键词或筛选条件"
                : "实验室新闻动态正在整理中"
            }
            action={
              hasActiveFilters ? (
                <Button onClick={handleClearFilters}>清除筛选条件</Button>
              ) : null
            }
          />
        )}
      </Container>
    </div>
  );
};

export default NewsAll;
