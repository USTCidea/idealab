import React from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardTitle, CardContent } from "../ui";
import type { TeamMember } from "../../types";

interface MemberResearchInterestsProps {
  member: TeamMember;
}

const MemberResearchInterests: React.FC<MemberResearchInterestsProps> = ({
  member,
}) => {
  if (!member.researchInterests || member.researchInterests.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8" variant="flat">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <LightBulbIcon className="h-6 w-6 text-primary-600" />
          <span>研究兴趣</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {member.researchInterests.map((interest, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg px-4 py-3 text-center transition-all duration-200 hover:shadow-md hover:from-primary-100 hover:to-blue-100"
            >
              <span className="text-primary-800 font-medium text-sm">
                {interest}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberResearchInterests;
