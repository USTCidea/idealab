import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import { Button, Card } from "../components/ui";

const NotFound: React.FC = () => {
  const quickLinks = [
    { name: "首页", path: "/", icon: HomeIcon },
    { name: "团队信息", path: "/team", icon: null },
    { name: "学术论文", path: "/publications", icon: null },
    { name: "学术动态", path: "/news", icon: null },
    { name: "团队风采", path: "/gallery", icon: null },
    { name: "科研项目", path: "/projects", icon: null },
  ];

  return (
    <div className="py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 图标 */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold text-primary-200 mb-4">
              404
            </div>
            <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
              <MagnifyingGlassIcon className="h-12 w-12 text-primary-600" />
            </div>
          </div>

          {/* 错误信息 */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              页面未找到
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              抱歉，您访问的页面不存在或已被移动。
              请检查网址是否正确，或使用下方的导航链接返回其他页面。
            </p>
          </div>

          {/* 快速导航 */}
          <Card className="mb-8" padding="lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              快速导航
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="group p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {IconComponent && (
                        <IconComponent className="h-6 w-6 text-primary-600 group-hover:text-primary-700" />
                      )}
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                        {link.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              icon={<ArrowLeftIcon className="h-4 w-4" />}
            >
              返回上一页
            </Button>
            <Link to="/">
              <Button variant="primary" icon={<HomeIcon className="h-4 w-4" />}>
                返回首页
              </Button>
            </Link>
          </div>

          {/* 帮助信息 */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              需要帮助？
            </h3>
            <p className="text-gray-600 mb-4">
              如果您认为这是一个错误，或者需要技术支持，请联系我们：
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a
                href="mailto:3dv-lab@university.edu.cn"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                发送邮件
              </a>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">电话：+86 010-XXXX-XXXX</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
