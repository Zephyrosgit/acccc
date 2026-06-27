import React from "react";
import Image from "next/image";
import { ProfileInfo } from "@/types";

interface ProfileHeaderProps {
  info: ProfileInfo;
}

/**
 * 프로필 상단 영역을 담당하는 함수형 컴포넌트입니다.
 * 아바타 이미지, 사용자 이름, 타이틀, 그리고 관심사 태그를 완벽한 수직 중앙 정렬로 렌더링합니다.
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ info }) => {
  const { name, title, tags, profileImg } = info;

  return (
    <div className="flex flex-col items-center text-center mt-6 mb-8">
      {/* 아바타 이미지 영역: 딥 퍼플 투 마젠타 그라디언트 테두리로 감싸 트렌디함을 더합니다. */}
      <div className="relative w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-brand-start to-brand-end shadow-md transition-transform duration-500 hover:scale-105">
        <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
          <Image
            src={profileImg}
            alt={`${name} 프로필 이미지`}
            fill
            sizes="112px"
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* 사용자 이름 */}
      <h1 className="mt-4 text-2xl font-bold text-slate-800 tracking-tight">
        {name}
      </h1>

      {/* 직책 및 소개 */}
      <p className="mt-1.5 text-sm font-medium text-slate-500">
        {title}
      </p>

      {/* 관심사 / 직무 태그 리스트 */}
      {tags.length > 0 && (
        <div className="mt-3.5 flex flex-wrap justify-center gap-1.5 max-w-xs">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold text-slate-600 bg-white shadow-xs rounded-full border border-slate-100"
            >
              {tag.startsWith("#") ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
