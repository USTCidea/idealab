import React from "react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardTitle, CardContent } from "../ui";
import type { TeamMember } from "../../types";

interface MemberEducationProps {
  member: TeamMember;
}

const MemberEducation: React.FC<MemberEducationProps> = ({ member }) => {
  if (!member.education || member.education.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8" variant="flat">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AcademicCapIcon className="h-6 w-6 text-primary-600" />
          <span>教育背景</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {member.education.map((edu, index) => (
            <div key={index} className="relative pl-8 pb-6 last:pb-0">
              {/* 时间轴线条 */}
              {index < member.education!.length - 1 && (
                <div className="absolute left-2 top-6 w-0.5 h-full bg-gray-200"></div>
              )}

              {/* 时间轴节点 */}
              <div className="absolute left-0 top-1 w-4 h-4 bg-primary-600 rounded-full border-2 border-white shadow-sm"></div>

              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.degree}
                  </h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {edu.year}年
                  </span>
                </div>

                <p className="text-gray-700 font-medium">{edu.institution}</p>

                {edu.major && (
                  <p className="text-gray-600 text-sm">专业：{edu.major}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberEducation;
