import React from "react";
import {
  DocumentTextIcon,
  AcademicCapIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import Card from "./Card";
import type { Publication } from "../../types";
import { mockTeamMembers } from "../../data/mockData";

interface PublicationCardProps {
  publication: Publication;
  layout?: "horizontal" | "vertical";
  showAbstract?: boolean;
  className?: string;
  highlightAuthors?: boolean; // 是否高亮实验室成员
}

// 从团队成员数据生成实验室成员姓名列表（用于匹配和加粗）
// 包含三种格式：中文名、西方格式英文名（名+姓）、东亚格式英文名（姓+名）
const generateLabMemberNames = () => {
  const names: string[] = [];

  mockTeamMembers.forEach((member) => {
    // 添加中文名
    if (member.name) {
      names.push(member.name);
    }

    // 处理英文名
    if (member.nameEn) {
      // 添加原始英文名（通常是 名+姓 格式，如 "Lindong Liu"）
      names.push(member.nameEn);

      // 生成 姓+名 格式（如 "Liu Lindong"）
      const nameParts = member.nameEn.trim().split(/\s+/);
      if (nameParts.length >= 2) {
        // 假设最后一部分是姓，其余是名
        const lastName = nameParts[nameParts.length - 1];
        const firstName = nameParts.slice(0, -1).join(" ");
        const reversedName = `${lastName} ${firstName}`;
        names.push(reversedName);
      }
    }
  });

  return names;
};

const LAB_MEMBERS = generateLabMemberNames();

const PublicationCard: React.FC<PublicationCardProps> = ({
  publication,
  layout = "horizontal",
  showAbstract = true,
  className = "",
  highlightAuthors = true, // 默认开启高亮
}) => {
  const getTypeDisplayName = (type: Publication["type"]) => {
    const typeMap = {
      journal: "期刊论文",
      conference: "会议论文",
      workshop: "工作坊",
    };
    return typeMap[type];
  };

  const getTypeColor = (type: Publication["type"]) => {
    const colorMap = {
      journal: "bg-blue-100 text-blue-800",
      conference: "bg-green-100 text-green-800",
      workshop: "bg-purple-100 text-purple-800",
    };
    return colorMap[type];
  };

  const getTypeIcon = (type: Publication["type"]) => {
    const iconMap = {
      journal: DocumentTextIcon,
      conference: AcademicCapIcon,
      workshop: UserGroupIcon,
    };
    return iconMap[type];
  };

  // 判断作者是否是实验室成员
  const isLabMember = (author: string): boolean => {
    // 移除通讯作者标记和首尾空格
    const cleanAuthor = author.replace(/\*/g, "").trim();

    // 完全匹配（不区分大小写）
    // 只匹配三种格式：中文名、Firstname Lastname、Lastname Firstname
    return LAB_MEMBERS.some(
      (member) => cleanAuthor.toLowerCase() === member.toLowerCase()
    );
  };

  // 渲染作者列表（带高亮功能）
  const renderAuthors = () => {
    if (!highlightAuthors) {
      return publication.authors.join(", ");
    }

    return publication.authors.map((author, index) => {
      const isLab = isLabMember(author);
      return (
        <React.Fragment key={index}>
          {index > 0 && ", "}
          <span className={isLab ? "font-bold text-gray-900" : ""}>
            {author}
          </span>
        </React.Fragment>
      );
    });
  };

  const TypeIcon = getTypeIcon(publication.type);

  if (layout === "vertical") {
    return (
      <Card
        className={`group hover:shadow-lg transition-all duration-200 ${className}`}
        hoverable
      >
        {/* 移除特色标识 */}

        {/* 论文类型图标 */}
        <div className="h-32 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg mb-4 flex items-center justify-center group-hover:scale-[1.02] transition-transform">
          <TypeIcon className="h-16 w-16 text-primary-600" />
        </div>

        <div className="space-y-3">
          {/* 类型和年份 */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                publication.type
              )}`}
            >
              {getTypeDisplayName(publication.type)}
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {publication.year}
            </span>
          </div>

          {/* 标题 */}
          <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors line-clamp-2">
            {publication.title}
          </h3>

          {/* 作者 */}
          <p className="text-gray-600 text-sm">作者：{renderAuthors()}</p>

          {/* 发表期刊/会议 */}
          <p className="text-gray-600 text-sm font-medium">
            {publication.venue}
          </p>

          {/* 摘要 */}
          {showAbstract && publication.abstract && (
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {publication.abstract}
            </p>
          )}

          {/* 链接 */}
          <div className="flex items-center space-x-4 pt-2">
            {publication.pdfUrl && (
              <a
                href={`${import.meta.env.BASE_URL}${publication.pdfUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm transition-colors"
              >
                <DocumentTextIcon className="h-4 w-4 mr-1" />
                PDF
              </a>
            )}
            {publication.projectUrl && (
              <a
                href={publication.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm transition-colors"
              >
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                项目
              </a>
            )}
            {publication.doi && (
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm transition-colors"
              >
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                DOI
              </a>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // 水平布局
  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-200 ${className}`}
      hoverable
      padding="lg"
    >
      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* 图标区域 */}
        <div className="w-full md:w-24 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
          <TypeIcon className="h-10 w-10 text-primary-600" />
        </div>

        {/* 内容区域 */}
        <div className="flex-1 space-y-2">
          {/* 类型标识 */}
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                publication.type
              )}`}
            >
              {getTypeDisplayName(publication.type)}
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {publication.year}
            </span>
          </div>

          {/* 标题 */}
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
            {publication.title}
          </h3>

          {/* 作者 */}
          <p className="text-gray-600 mb-2">
            <span className="font-medium">作者：</span>
            {renderAuthors()}
          </p>

          {/* 发表期刊/会议 */}
          <p className="text-gray-600 mb-2 font-medium">
            <span className="font-normal">发表于：</span>
            {publication.venue}
          </p>

          {/* 摘要 */}
          {showAbstract && publication.abstract && (
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {publication.abstract}
            </p>
          )}

          {/* 链接 */}
          <div className="flex items-center space-x-4 pt-2">
            {publication.pdfUrl && (
              <a
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm transition-colors"
              >
                <DocumentTextIcon className="h-4 w-4 mr-1" />
                PDF下载
              </a>
            )}
            {publication.projectUrl && (
              <a
                href={publication.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm transition-colors"
              >
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                项目主页
              </a>
            )}
            {publication.doi && (
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm transition-colors"
              >
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                DOI链接
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PublicationCard;
