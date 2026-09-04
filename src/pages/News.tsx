import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  UserIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import {
  SearchBox,
  FilterSelect,
  Pagination,
  EmptyState,
  Button,
} from "../components/ui";
import { mockLectures } from "../data/mockData";

const News: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date-desc");

  const pageSize = 10; // 每页显示的数量

  // 学术讲座数据
  const academicTalks = useMemo(() => {
    return mockLectures;
  }, []);

  const sortOptions = [
    { value: "date-desc", label: "日期（新到旧）" },
    { value: "date-asc", label: "日期（旧到新）" },
    { value: "title", label: "标题（A-Z）" },
    { value: "speaker", label: "主讲人（A-Z）" },
  ];

  // 筛选和搜索逻辑
  const filteredTalks = useMemo(() => {
    let filtered = academicTalks;

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (talk) =>
          talk.title.toLowerCase().includes(query) ||
          talk.content.toLowerCase().includes(query) ||
          talk.talkSpeaker?.toLowerCase().includes(query) ||
          talk.talkLocation?.toLowerCase().includes(query) ||
          (talk.tags &&
            talk.tags.some((tag) => tag.toLowerCase().includes(query)))
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
        case "speaker":
          return (a.talkSpeaker || "").localeCompare(b.talkSpeaker || "");
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, academicTalks]);

  // 分页逻辑
  const totalPages = Math.ceil(filteredTalks.length / pageSize);
  const paginatedTalks = filteredTalks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 重置页码当筛选条件变化时
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSortBy("date-desc");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery;

  return (
    <div className="py-16">
      <Container>
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            学术讲座
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            汇聚学术前沿，分享研究成果，邀请知名专家学者进行精彩的学术报告和技术分享
          </p>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="mb-8">
          {/* 搜索框 */}
          <div className="mb-6">
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜索讲座标题、主讲人、内容..."
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* 筛选控制 */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {hasActiveFilters && (
                <Button variant="ghost" onClick={handleClearFilters}>
                  清除筛选
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                共 {filteredTalks.length} 场讲座
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

        {/* 讲座列表 */}
        {paginatedTalks.length > 0 ? (
          <>
            {/* 表格视图 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        讲座标题
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        主讲人
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        详细信息
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedTalks.map((talk) => (
                      <tr
                        key={talk.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-1 min-w-0">
                              <Link
                                to={`/news/${talk.id}`}
                                className="hover:underline"
                              >
                                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                                  {talk.title}
                                </h3>
                              </Link>
                              {/* <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {talk.content}
                              </p> */}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">
                              {talk.talkSpeaker || "待定"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                              <span>{talk.talkTime || "时间待定"}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 text-gray-500 mr-2" />
                              <span>{talk.talkLocation || "地点待定"}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

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
            title={hasActiveFilters ? "未找到匹配的讲座" : "暂无讲座数据"}
            description={
              hasActiveFilters
                ? "请尝试修改搜索关键词"
                : "实验室学术讲座信息正在整理中"
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

export default News;
