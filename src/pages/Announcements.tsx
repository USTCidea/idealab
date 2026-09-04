import React from "react";
import Container from "../components/layout/Container";
import { mockTimeline } from "../data/mockData";

const Announcements: React.FC = () => {
  // Sort news by date (newest first)
  const sortedNews = [...mockTimeline].sort((a, b) => {
    return (
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  });

  return (
    <div className="py-16">
      <Container>
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            时间线
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            实验室动态记录
          </p>
        </div>

        {/* Simple News List */}
        <div className="max-w-4xl mx-auto">
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

          {/* Total count */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              共 {sortedNews.length} 条事件
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Announcements;
