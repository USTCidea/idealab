import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PublicationCard,
} from "../ui";
import { mockPublications } from "../../data/mockData";
import type { TeamMember } from "../../types";
import { Link } from "react-router-dom";

interface MemberPublicationsProps {
  member: TeamMember;
}

const MemberPublications: React.FC<MemberPublicationsProps> = ({ member }) => {
  // 根据成员的publication IDs或者作者姓名找到相关论文
  const memberPublications = mockPublications.filter((pub) => {
    // 如果成员有publications字段，使用ID匹配
    if (member.publications && member.publications.length > 0) {
      return member.publications.includes(pub.id);
    }
    // 否则根据作者姓名匹配（中文和英文）
    return pub.authors.includes(member.name) || pub.authors.includes(member.nameEn || "");
  });

  if (memberPublications.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8" variant="flat">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DocumentTextIcon className="h-6 w-6 text-primary-600" />
          <span>学术论文</span>
          <span className="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full">
            {memberPublications.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {memberPublications.map((publication) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              layout="horizontal"
              showAbstract={true}
            />
          ))}
        </div>

        {memberPublications.length >= 3 && (
          <div className="mt-6 text-center">
            <Link
              to="/publications"
              className="inline-flex items-center px-4 py-2 border border-primary-300 rounded-md text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
            >
              查看更多论文
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberPublications;
