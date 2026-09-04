import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeftIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Container from "../components/layout/Container";
import { Button, Breadcrumb } from "../components/ui";
import {
  MemberBasicInfo,
  MemberResearchInterests,
  MemberEducation,
  MemberWorkExperience,
  MemberRepresentativeWorks,
  MemberPublications,
  MemberProjects,
} from "../components/member";
import { mockTeamMembers } from "../data/mockData";

const MemberDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 根据ID查找成员
  const member = mockTeamMembers.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              成员未找到
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              抱歉，找不到该成员的信息。
            </p>
            <Link to="/team">
              <Button>返回团队页面</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // 根据成员角色决定显示哪些模块
  const shouldShowEducation =
    member.role === "faculty" ||
    member.role === "postdoc" ||
    member.role === "phd" ||
    (member.education && member.education.length > 0);
  const shouldShowPublications =
    member.role === "faculty" ||
    member.role === "postdoc" ||
    member.role === "phd" ||
    (member.publications && member.publications.length > 0);
  const shouldShowProjects =
    member.role === "faculty" ||
    member.role === "postdoc" ||
    member.role === "phd";

  const breadcrumbItems = [
    { label: "首页", path: "/", icon: <HomeIcon className="h-4 w-4" /> },
    {
      label: "团队信息",
      path: "/team",
      icon: <UserGroupIcon className="h-4 w-4" />,
    },
    { label: member.name },
  ];

  return (
    <div className="py-16">
      <Container>
        {/* 面包屑导航 */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* 返回按钮 */}
        <div className="mb-8">
          <Link
            to="/team"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            返回团队页面
          </Link>
        </div>

        {/* 基本信息 - 所有成员都显示 */}
        <MemberBasicInfo member={member} />

        {/* 研究兴趣 - 所有成员都显示 */}
        <MemberResearchInterests member={member} />

        {/* 教育背景 - 导师、博士生或有教育背景的成员显示 */}
        {shouldShowEducation && <MemberEducation member={member} />}

        {/* 工作经历 - 导师显示 */}
        {member.role === "faculty" && <MemberWorkExperience member={member} />}

        {/* 代表作 - 导师显示 */}
        {member.role === "faculty" && (
          <MemberRepresentativeWorks member={member} />
        )}

        {/* 学术论文 - 导师、博士生或有论文的成员显示 */}
        {shouldShowPublications && <MemberPublications member={member} />}

        {/* 参与项目 - 导师、博士生显示 */}
        {shouldShowProjects && <MemberProjects member={member} />}

        {/* 页面底部导航 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <Link
              to="/team"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              返回团队页面
            </Link>

            <div className="flex space-x-4">
              <Link to="/publications">
                <Button variant="outline" size="sm">
                  查看论文
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="sm">
                  查看项目
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MemberDetail;
