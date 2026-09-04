import React from "react";
import {
  FolderIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Card, CardHeader, CardTitle, CardContent } from "../ui";
import { mockProjects } from "../../data/mockData";
import type { TeamMember, Project } from "../../types";

interface MemberProjectsProps {
  member: TeamMember;
}

const MemberProjects: React.FC<MemberProjectsProps> = ({ member }) => {
  // 找到成员参与的项目（作为负责人或成员）
  const memberProjects = mockProjects.filter(
    (project) =>
      project.leader === member.name || project.members.includes(member.name)
  );

  if (memberProjects.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
    });
  };

  const formatCurrency = (amount: number) => {
    return (amount / 10000).toFixed(1) + "万元";
  };

  const getTypeDisplayName = (type: Project["type"]) => {
    const typeMap = {
      national: "国家级项目",
      provincial: "省级项目",
      university: "校级项目",
      enterprise: "企业合作",
    };
    return typeMap[type];
  };

  const getTypeColor = (type: Project["type"]) => {
    const colorMap = {
      national: "bg-red-100 text-red-800",
      provincial: "bg-blue-100 text-blue-800",
      university: "bg-green-100 text-green-800",
      enterprise: "bg-purple-100 text-purple-800",
    };
    return colorMap[type];
  };

  const getStatusDisplayName = (status: Project["status"]) => {
    const statusMap = {
      ongoing: "进行中",
      completed: "已完成",
      planned: "计划中",
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Project["status"]) => {
    const colorMap = {
      ongoing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      planned: "bg-yellow-100 text-yellow-800",
    };
    return colorMap[status];
  };

  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "ongoing":
        return <ClockIcon className="h-4 w-4" />;
      case "completed":
        return <CheckCircleIcon className="h-4 w-4" />;
      case "planned":
        return <PlusCircleIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-8" variant="flat">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FolderIcon className="h-6 w-6 text-primary-600" />
          <span>参与项目</span>
          <span className="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full">
            {memberProjects.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {memberProjects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
            >
              <div className="space-y-4">
                {/* 项目标题和状态 */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          project.type
                        )}`}
                      >
                        {getTypeDisplayName(project.type)}
                      </span>

                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {getStatusIcon(project.status)}
                        <span className="ml-1">
                          {getStatusDisplayName(project.status)}
                        </span>
                      </span>

                      {/* 角色标识 */}
                      {project.leader === member.name ? (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                          负责人
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                          参与成员
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 项目描述 */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* 项目信息 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span>
                      {formatDate(project.startDate)} -{" "}
                      {project.endDate ? formatDate(project.endDate) : "进行中"}
                    </span>
                  </div>

                  {project.funding && (
                    <div className="flex items-center space-x-2">
                      <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                      <span>资金：{formatCurrency(project.funding)}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="h-4 w-4 text-gray-400" />
                    <span>团队：{project.members.length + 1}人</span>
                  </div>
                </div>

                {/* 相关论文 */}
                {project.relatedPublications &&
                  project.relatedPublications.length > 0 && (
                    <div className="text-xs text-gray-500">
                      相关论文：{project.relatedPublications.length}篇
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>

        {memberProjects.length >= 3 && (
          <div className="mt-6 text-center">
            <a
              href="/projects"
              className="inline-flex items-center px-4 py-2 border border-primary-300 rounded-md text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
            >
              查看更多项目
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberProjects;
