import React, { useState, useMemo } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import {
  SearchBox,
  FilterSelect,
  Pagination,
  PublicationCard,
  EmptyState,
  Button,
} from "../components/ui";
import { mockPublications } from "../data/mockData";

const Publications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("year-desc");
  const [highlightAuthors, setHighlightAuthors] = useState(true); // 是否高亮作者

  const pageSize = 10; // 每页显示的数量

  // 获取筛选选项
  const typeOptions = useMemo(() => {
    const types = Array.from(new Set(mockPublications.map((pub) => pub.type)));
    const counts = types.reduce((acc, type) => {
      acc[type] = mockPublications.filter((pub) => pub.type === type).length;
      return acc;
    }, {} as Record<string, number>);

    return [
      { value: "all", label: "全部类型", count: mockPublications.length },
      ...types.map((type) => ({
        value: type,
        label:
          type === "journal"
            ? "期刊论文"
            : type === "conference"
            ? "会议论文"
            : "工作坊",
        count: counts[type],
      })),
    ];
  }, []);

  const yearOptions = useMemo(() => {
    const years = Array.from(
      new Set(mockPublications.map((pub) => pub.year))
    ).sort((a, b) => b - a);
    const counts = years.reduce((acc, year) => {
      acc[year] = mockPublications.filter((pub) => pub.year === year).length;
      return acc;
    }, {} as Record<number, number>);

    return [
      { value: "all", label: "全部年份", count: mockPublications.length },
      ...years.map((year) => ({
        value: year.toString(),
        label: `${year}年`,
        count: counts[year],
      })),
    ];
  }, []);

  const sortOptions = [
    { value: "year-desc", label: "年份（新到旧）" },
    { value: "year-asc", label: "年份（旧到新）" },
    { value: "title", label: "标题（A-Z）" },
    { value: "featured", label: "精选论文优先" },
  ];

  // 筛选和搜索逻辑
  const filteredPublications = useMemo(() => {
    let filtered = mockPublications;

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pub) =>
          pub.title.toLowerCase().includes(query) ||
          pub.authors.some((author) => author.toLowerCase().includes(query)) ||
          pub.venue.toLowerCase().includes(query) ||
          (pub.abstract && pub.abstract.toLowerCase().includes(query))
      );
    }

    // 类型过滤
    if (selectedType !== "all") {
      filtered = filtered.filter((pub) => pub.type === selectedType);
    }

    // 年份过滤
    if (selectedYear !== "all") {
      filtered = filtered.filter((pub) => pub.year.toString() === selectedYear);
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "year-desc":
          return b.year - a.year;
        case "year-asc":
          return a.year - b.year;
        case "title":
          return a.title.localeCompare(b.title);
        case "featured":
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.year - a.year; // 次要排序按年份
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedType, selectedYear, sortBy]);

  // 分页逻辑
  const totalPages = Math.ceil(filteredPublications.length / pageSize);
  const paginatedPublications = filteredPublications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 重置页码当筛选条件变化时
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedYear, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedYear("all");
    setSortBy("year-desc");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || selectedType !== "all" || selectedYear !== "all";

  return (
    <div className="py-16">
      <Container>
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            学术论文
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            展示实验室的研究成果和学术贡献，包括期刊论文、会议论文等各类学术发表
          </p>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="mb-8">
          {/* 搜索框 */}
          <div className="mb-6">
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜索论文标题、作者、期刊名称..."
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* 筛选控制 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                icon={<AdjustmentsHorizontalIcon className="h-4 w-4" />}
              >
                筛选条件
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" onClick={handleClearFilters}>
                  清除筛选
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                共 {filteredPublications.length} 篇论文
              </span>

              {/* 高亮实验室成员开关 */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highlightAuthors}
                  onChange={(e) => setHighlightAuthors(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">高亮实验室成员</span>
              </label>

              <FilterSelect
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                className="w-48"
              />
            </div>
          </div>

          {/* 筛选面板 */}
          {showFilters && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    论文类型
                  </label>
                  <FilterSelect
                    value={selectedType}
                    onChange={setSelectedType}
                    options={typeOptions}
                    placeholder="选择类型"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    发表年份
                  </label>
                  <FilterSelect
                    value={selectedYear}
                    onChange={setSelectedYear}
                    options={yearOptions}
                    placeholder="选择年份"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(false)}
                    className="w-full"
                  >
                    收起筛选
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 论文列表 */}
        {paginatedPublications.length > 0 ? (
          <>
            <div className="space-y-6 mb-8">
              {paginatedPublications.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  layout="horizontal"
                  showAbstract={true}
                  highlightAuthors={highlightAuthors}
                />
              ))}
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
            title={hasActiveFilters ? "未找到匹配的论文" : "暂无论文数据"}
            description={
              hasActiveFilters
                ? "请尝试修改搜索关键词或筛选条件"
                : "实验室论文数据正在整理中"
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

export default Publications;
