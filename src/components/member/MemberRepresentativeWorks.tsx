import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { Card } from "../ui";
import type { TeamMember } from "../../types";

interface MemberRepresentativeWorksProps {
  member: TeamMember;
}

const MemberRepresentativeWorks: React.FC<MemberRepresentativeWorksProps> = ({
  member,
}) => {
  if (!member.representativeWorks || member.representativeWorks.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8" padding="lg" variant="flat">
      <div className="flex items-center mb-6">
        <StarIcon className="h-6 w-6 text-gray-400 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">代表作</h2>
      </div>

      <div className="space-y-4">
        {member.representativeWorks.map((work, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-1">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed text-sm">{work}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MemberRepresentativeWorks;
