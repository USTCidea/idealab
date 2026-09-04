import React from "react";
import {
  ExclamationTriangleIcon,
  FolderIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface EmptyStateProps {
  type?: "no-data" | "no-results" | "error" | "custom";
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = "no-data",
  title,
  description,
  icon,
  action,
  className = "",
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case "no-results":
        return {
          icon: (
            <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-400" />
          ),
          title: "未找到相关内容",
          description: "请尝试其他搜索条件或筛选选项",
        };
      case "error":
        return {
          icon: (
            <ExclamationTriangleIcon className="h-12 w-12 mx-auto text-red-400" />
          ),
          title: "加载失败",
          description: "数据加载时出现错误，请稍后重试",
        };
      case "no-data":
      default:
        return {
          icon: <FolderIcon className="h-12 w-12 mx-auto text-gray-400" />,
          title: "暂无数据",
          description: "当前没有可显示的内容",
        };
    }
  };

  const defaultContent = getDefaultContent();

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="mx-auto max-w-md">
        {/* 图标 */}
        <div className="mb-4">{icon || defaultContent.icon}</div>

        {/* 标题 */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {title || defaultContent.title}
        </h3>

        {/* 描述 */}
        <p className="text-gray-600 mb-6">
          {description || defaultContent.description}
        </p>

        {/* 操作按钮 */}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
};

export default EmptyState;
