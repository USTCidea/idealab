import React, { useState, useMemo, useEffect } from "react";
import {
  // PhotoIcon,
  CalendarIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import { SearchBox, FilterSelect, EmptyState, Button } from "../components/ui";
import { mockGalleryImages } from "../data/mockData";
import type { GalleryImage } from "../types";

const Gallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [numColumns, setNumColumns] = useState(4);

  useEffect(() => {
    const getNumColumns = () => {
      if (typeof window === "undefined") return 4; // Default for SSR
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) return 4; // xl
      if (screenWidth >= 1024) return 3; // lg
      if (screenWidth >= 640) return 2; // sm
      return 1;
    };

    const onResize = () => {
      setNumColumns(getNumColumns());
    };

    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 获取分类选项
  const categoryOptions = useMemo(() => {
    const categories = Array.from(
      new Set(mockGalleryImages.map((img) => img.category))
    );
    const counts = categories.reduce((acc, category) => {
      acc[category] = mockGalleryImages.filter(
        (img) => img.category === category
      ).length;
      return acc;
    }, {} as Record<string, number>);

    const categoryLabels = {
      academic: "学术活动",
      team: "团队建设",
      conference: "会议交流",
      daily: "实验室日常",
    };

    return [
      { value: "all", label: "全部分类", count: mockGalleryImages.length },
      ...categories.map((category) => ({
        value: category,
        label:
          categoryLabels[category as keyof typeof categoryLabels] || category,
        count: counts[category],
      })),
    ];
  }, []);

  // 筛选和搜索逻辑
  const filteredImages = useMemo(() => {
    let filtered = mockGalleryImages;

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(query) ||
          img.description?.toLowerCase().includes(query) ||
          (img.tags &&
            img.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // 分类过滤
    if (selectedCategory !== "all") {
      filtered = filtered.filter((img) => img.category === selectedCategory);
    }

    // 按日期排序（新到旧）
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return filtered;
  }, [searchQuery, selectedCategory]);

  const reorderedImages = useMemo(() => {
    if (!filteredImages.length) return [];

    const result: GalleryImage[] = [];
    for (let c = 0; c < numColumns; c++) {
      for (let i = c; i < filteredImages.length; i += numColumns) {
        if (filteredImages[i]) {
          result.push(filteredImages[i]);
        }
      }
    }
    return result;
  }, [filteredImages, numColumns]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryDisplayName = (category: GalleryImage["category"]) => {
    const categoryMap = {
      academic: "学术活动",
      team: "团队建设",
      conference: "会议交流",
      daily: "实验室日常",
    };
    return categoryMap[category];
  };

  const getCategoryColor = (category: GalleryImage["category"]) => {
    const colorMap = {
      academic: "bg-blue-100 text-blue-800",
      team: "bg-green-100 text-green-800",
      conference: "bg-purple-100 text-purple-800",
      daily: "bg-yellow-100 text-yellow-800",
    };
    return colorMap[category];
  };

  // const handleImageClick = (image: GalleryImage) => {
  //   setSelectedImage(image);
  //   setCurrentImageIndex(
  //     filteredImages.findIndex((img) => img.id === image.id)
  //   );
  // };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(filteredImages[prevIndex]);
    }
  };

  const handleNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "all";

  return (
    <div className="py-16">
      <Container>
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            团队风采
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            记录实验室的精彩瞬间，展示团队的学术活动、日常工作和团队建设
          </p>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="mb-8">
          {/* 搜索框 */}
          <div className="mb-6">
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜索图片标题、描述、标签..."
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* 筛选控制 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <FilterSelect
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categoryOptions}
                placeholder="选择分类"
                className="w-48"
              />
              {hasActiveFilters && (
                <Button variant="ghost" onClick={handleClearFilters}>
                  清除筛选
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                共 {filteredImages.length} 张图片
              </span>
            </div>
          </div>
        </div>

        {/* 图片网格 */}
        {filteredImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {reorderedImages.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid cursor-pointer group"
                // onClick={() => handleImageClick(image)}
              >
                <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="relative">
                    <img
                      src={`${import.meta.env.BASE_URL}${image.thumbnail}`}
                      alt={image.title}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                    {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <PhotoIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div> */}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          image.category
                        )}`}
                      >
                        {getCategoryDisplayName(image.category)}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {formatDate(image.date)}
                      </div>
                    </div>

                    <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">
                      {image.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {image.description}
                    </p>

                    {image.tags && image.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {image.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                        {image.tags.length > 3 && (
                          <span className="inline-block text-gray-500 text-xs px-2 py-1">
                            +{image.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            type={hasActiveFilters ? "no-results" : "no-data"}
            title={hasActiveFilters ? "未找到匹配的图片" : "暂无图片数据"}
            description={
              hasActiveFilters
                ? "请尝试修改搜索关键词或筛选条件"
                : "团队风采图片正在整理中"
            }
            action={
              hasActiveFilters ? (
                <Button onClick={handleClearFilters}>清除筛选条件</Button>
              ) : null
            }
          />
        )}

        {/* 图片浏览器模态框 */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* 关闭按钮 */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              {/* 导航按钮 */}
              {currentImageIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
              )}

              {currentImageIndex < filteredImages.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              )}

              {/* 图片 */}
              <img
                src={`${import.meta.env.BASE_URL}${selectedImage.url}`}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />

              {/* 图片信息 */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      selectedImage.category
                    )} bg-opacity-80`}
                  >
                    {getCategoryDisplayName(selectedImage.category)}
                  </span>
                  <span className="text-sm">
                    {formatDate(selectedImage.date)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-gray-200">
                  {selectedImage.description}
                </p>
                {selectedImage.tags && selectedImage.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {selectedImage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-300 mt-2">
                  {currentImageIndex + 1} / {filteredImages.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Gallery;
