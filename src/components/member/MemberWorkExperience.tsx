import React from "react";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { Card } from "../ui";
import type { TeamMember } from "../../types";

interface MemberWorkExperienceProps {
  member: TeamMember;
}

const MemberWorkExperience: React.FC<MemberWorkExperienceProps> = ({
  member,
}) => {
  if (!member.workExperience || member.workExperience.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8" padding="lg" variant="flat">
      <div className="flex items-center mb-6">
        <BriefcaseIcon className="h-6 w-6 text-gray-400 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">工作经历</h2>
      </div>

      <div className="space-y-6">
        {member.workExperience.map((experience, index) => (
          <div
            key={index}
            className="relative pl-6 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0"
          >
            {/* 时间节点 */}
            <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-600 rounded-full border-2 border-white"></div>

            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {experience.position}
              </h3>
              <p className="text-base text-gray-700 mb-1">
                {experience.institution}
              </p>
              <p className="text-sm text-gray-500">
                {experience.startYear}年
                {experience.endYear ? ` - ${experience.endYear}年` : " - 至今"}
              </p>
            </div>

            {experience.description && (
              <p className="text-gray-600 leading-relaxed">
                {experience.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MemberWorkExperience;
