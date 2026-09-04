import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeftIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui";
import {
  mockProjects,
  mockPublications,
  mockTeamMembers,
} from "../data/mockData";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 根据ID查找项目
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              项目未找到
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              抱歉，找不到该项目的信息。
            </p>
            <Link to="/projects">
              <Button>返回项目页面</Button>
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
    });
  };

  const formatCurrency = (amount: number) => {
    return (amount / 10000).toFixed(1) + "万元";
  };

  const getTypeDisplayName = (type: typeof project.type) => {
    const typeMap = {
      national: "国家级项目",
      provincial: "省级项目",
      university: "校级项目",
      enterprise: "企业合作",
    };
    return typeMap[type];
  };

  const getTypeColor = (type: typeof project.type) => {
    const colorMap = {
      national: "bg-red-100 text-red-800",
      provincial: "bg-blue-100 text-blue-800",
      university: "bg-green-100 text-green-800",
      enterprise: "bg-purple-100 text-purple-800",
    };
    return colorMap[type];
  };

  const getStatusDisplayName = (status: typeof project.status) => {
    const statusMap = {
      ongoing: "进行中",
      completed: "已完成",
      planned: "计划中",
    };
    return statusMap[status];
  };

  const getStatusColor = (status: typeof project.status) => {
    const colorMap = {
      ongoing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      planned: "bg-yellow-100 text-yellow-800",
    };
    return colorMap[status];
  };

  const getStatusIcon = (status: typeof project.status) => {
    switch (status) {
      case "ongoing":
        return <ClockIcon className="h-5 w-5" />;
      case "completed":
        return <CheckCircleIcon className="h-5 w-5" />;
      case "planned":
        return <PlusCircleIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // 获取相关论文
  const relatedPublications = project.relatedPublications
    ? mockPublications.filter((pub) =>
        project.relatedPublications!.includes(pub.id)
      )
    : [];

  return (
    <div className="py-16">
      <Container>
        {/* 返回按钮 */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            返回项目列表
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* 项目标题区 */}
          <Card className="mb-8" padding="lg">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                      project.type
                    )}`}
                  >
                    {getTypeDisplayName(project.type)}
                  </span>

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {getStatusIcon(project.status)}
                    <span className="ml-1">
                      {getStatusDisplayName(project.status)}
                    </span>
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  {project.title}
                </h1>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* 项目信息卡片 */}
              <div className="lg:w-80 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  项目信息
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">项目负责人：</span>
                    <span className="font-medium">{project.leader}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">团队规模：</span>
                    <span className="font-medium">
                      {project.members.length + 1}人
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">开始时间：</span>
                    <span className="font-medium">
                      {formatDate(project.startDate)}
                    </span>
                  </div>

                  {project.endDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">结束时间：</span>
                      <span className="font-medium">
                        {formatDate(project.endDate)}
                      </span>
                    </div>
                  )}

                  {project.funding && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">项目资金：</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(project.funding)}
                      </span>
                    </div>
                  )}

                  {project.website && (
                    <div className="pt-2">
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        项目主页
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 团队成员 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserGroupIcon className="h-6 w-6 text-primary-600" />
                    <span>团队成员</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 项目负责人 */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        项目负责人
                      </h4>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <span className="font-medium text-orange-800">
                          {project.leader}
                        </span>
                      </div>
                    </div>

                    {/* 参与成员 */}
                    {project.members.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          参与成员
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {project.members.map((memberName, index) => {
                            const member = mockTeamMembers.find(
                              (m) => m.name === memberName
                            );
                            return (
                              <div
                                key={index}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center"
                              >
                                {member ? (
                                  <Link
                                    to={`/team/${member.id}`}
                                    className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                                  >
                                    {memberName}
                                  </Link>
                                ) : (
                                  <span className="font-medium text-gray-800">
                                    {memberName}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 相关论文 */}
              {relatedPublications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DocumentTextIcon className="h-6 w-6 text-primary-600" />
                      <span>相关论文</span>
                      <span className="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full">
                        {relatedPublications.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {relatedPublications.map((publication) => (
                        <div
                          key={publication.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {publication.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {publication.authors.join(", ")}
                          </p>
                          <p className="text-sm text-gray-600">
                            {publication.venue}, {publication.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* 侧边栏 */}
            <div className="space-y-6">
              {/* 项目进度 */}
              <Card>
                <CardHeader>
                  <CardTitle>项目进度</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">当前状态</span>
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
                    </div>

                    {project.status === "ongoing" && (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">项目进度</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 快速操作 */}
              <Card>
                <CardHeader>
                  <CardTitle>相关链接</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link to="/publications" className="block">
                      <Button variant="outline" size="sm" fullWidth>
                        查看论文
                      </Button>
                    </Link>
                    <Link to="/team" className="block">
                      <Button variant="outline" size="sm" fullWidth>
                        团队信息
                      </Button>
                    </Link>
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button variant="outline" size="sm" fullWidth>
                          项目主页
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 页面底部导航 */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Link
                to="/projects"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                返回项目列表
              </Link>

              <div className="flex space-x-4">
                <Link to="/publications">
                  <Button variant="outline" size="sm">
                    查看论文
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

export default ProjectDetail;
