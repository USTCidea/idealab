import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeftIcon,
  CalendarIcon,
  TagIcon,
  UserIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import { Button, Card } from "../components/ui";
import { mockNews } from "../data/mockData";

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 根据ID查找新闻
  const news = mockNews.find((n) => n.id === id);

  if (!news) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              新闻未找到
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              抱歉，找不到该新闻的信息。
            </p>
            <Link to="/news">
              <Button>返回新闻页面</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const getCategoryDisplayName = (category: typeof news.category) => {
    const categoryMap = {
      conference: "学术会议",
      talk: "学术报告",
      thesis: "学位论文",
      achievement: "科研成果",
      collaboration: "学术合作",
      activity: "学术活动",
      personnel: "人事动态",
    };
    return categoryMap[category];
  };

  const getCategoryColor = (category: typeof news.category) => {
    const colorMap = {
      conference: "bg-purple-100 text-purple-800",
      talk: "bg-blue-100 text-blue-800",
      thesis: "bg-green-100 text-green-800",
      achievement: "bg-yellow-100 text-yellow-800",
      collaboration: "bg-indigo-100 text-indigo-800",
      activity: "bg-red-100 text-red-800",
      personnel: "bg-gray-100 text-gray-800",
    };
    return colorMap[category];
  };

  return (
    <div className="py-16">
      <Container>
        {/* 返回按钮 */}
        <div className="mb-8">
          <Link
            to="/news"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            返回新闻列表
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 新闻标题区 */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              {news.featured && (
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                  推荐
                </span>
              )}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                  news.category
                )}`}
              >
                {getCategoryDisplayName(news.category)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
              {news.title}
            </h1>

            {/* 新闻元信息 */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDate(news.publishDate)}</span>
              </div>

              {news.author && (
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4" />
                  <span>作者：{news.author}</span>
                </div>
              )}

              <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
                <ShareIcon className="h-4 w-4" />
                <span>分享</span>
              </button>
            </div>
          </div>

          {/* 新闻图片 */}
          {news.images && news.images.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {news.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${image}`}
                      alt={`${news.title} - 图片 ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 新闻内容 */}
          <Card className="mb-8" padding="lg">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {news.content}
              </div>
            </div>
          </Card>

          {/* 标签 */}
          {news.tags && news.tags.length > 0 && (
            <Card className="mb-8" padding="lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TagIcon className="h-5 w-5 mr-2 text-primary-600" />
                相关标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* 页面底部导航 */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Link
                to="/news"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                返回新闻列表
              </Link>

              <div className="flex space-x-4">
                <Link to="/gallery">
                  <Button variant="outline" size="sm">
                    查看图片
                  </Button>
                </Link>
                <Link to="/team">
                  <Button variant="outline" size="sm">
                    团队信息
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewsDetail;
