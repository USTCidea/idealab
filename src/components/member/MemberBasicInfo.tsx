import React from "react";
import {
  EnvelopeIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { Card } from "../ui";
import type { TeamMember } from "../../types";

interface MemberBasicInfoProps {
  member: TeamMember;
}

const formatMemberBio = (member: TeamMember) => {
  if (!member.bio) return member.bio;
  if (
    member.role === "phd" ||
    member.role === "master" ||
    member.role === "postdoc" ||
    member.role === "alumni"
  ) {
    return member.bio.replace(/，?\d+级$/, "");
  }
  return member.bio;
};

const MemberBasicInfo: React.FC<MemberBasicInfoProps> = ({ member }) => {
  const displayBio = formatMemberBio(member);

  const getRoleDisplayName = (role: TeamMember["role"]) => {
    const roleMap = {
      faculty: "导师",
      postdoc: "博士后",
      phd: "博士生",
      master: "硕士生",
      alumni: "毕业生",
    };
    return roleMap[role];
  };

  const getRoleColor = (role: TeamMember["role"]) => {
    const colorMap = {
      faculty: "bg-purple-100 text-purple-800",
      postdoc: "bg-indigo-100 text-indigo-800",
      phd: "bg-blue-100 text-blue-800",
      master: "bg-green-100 text-green-800",
      alumni: "bg-gray-100 text-gray-800",
    };
    return colorMap[role];
  };

  return (
    <Card className="mb-8" padding="lg" variant="flat">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
        {/* 头像 */}
        <div className="flex-shrink-0 mb-6 lg:mb-0">
          <div className="relative w-32 h-32 mx-auto lg:mx-0">
            {member.avatar ? (
              <img
                src={`${import.meta.env.BASE_URL}${member.avatar}`}
                alt={member.name}
                className="w-full h-full rounded-full object-cover border-4 border-gray-100"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    member.name
                  )}&background=00409c&color=fff&size=128`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-primary-100 rounded-full flex items-center justify-center border-4 border-gray-100">
                <span className="text-primary-900 font-bold text-4xl">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}

            {/* 角色标签 */}
            <span
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(
                member.role
              )}`}
            >
              {getRoleDisplayName(member.role)}
            </span>
          </div>
        </div>

        {/* 基本信息 */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {member.name}
            </h1>
            {member.nameEn && (
              <p className="text-xl text-gray-600 mb-2">{member.nameEn}</p>
            )}
            {/* 职称和导师类型 */}
            {(member.title || member.supervisorType) && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                {member.title && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {member.title}
                  </span>
                )}
                {member.supervisorType && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {member.supervisorType}
                  </span>
                )}
              </div>
            )}
            {displayBio && (
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                {displayBio}
              </p>
            )}
          </div>

          {/* 详细信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {member.role === "alumni" && member.graduationYear && (
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">
                  毕业年份：{member.graduationYear}年
                </span>
              </div>
            )}

            {member.role === "alumni" && member.currentPosition && (
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">
                  当前职位：{member.currentPosition}
                </span>
              </div>
            )}

            {member.email && (
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <a
                  href={`mailto:${member.email}`}
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  {member.email}
                </a>
              </div>
            )}

            {member.website && (
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  个人主页
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MemberBasicInfo;
