import React from "react";
import { LinkCardItem } from "@/types";

interface LinkCardProps {
  card: LinkCardItem;
}

/**
 * 개별 링크 정보를 표출하는 카드 컴포넌트입니다.
 * 마우스 오버 시 부드러운 그림자와 미세한 스케일 업 애니메이션을 적용해 시각적 피드백을 제공합니다.
 */
export const LinkCard: React.FC<LinkCardProps> = ({ card }) => {
  const { title, description, linkUrl, isActive } = card;

  // 비활성화 상태의 카드는 화면에 표출하지 않습니다.
  if (!isActive) return null;

  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full px-6 py-4 mb-4 bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-lg hover:scale-[1.015] active:scale-[0.99] transition-all duration-300 group text-left"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1 pr-4">
          {/* 링크 카드 메인 제목 */}
          <h2 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
            {title}
          </h2>
          {/* 링크 카드 서브 설명 */}
          {description && (
            <p className="mt-1 text-xs text-slate-400 font-normal leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>
        
        {/* 오른쪽 화살표 아이콘: 마우스 오버 시 부드럽게 오른쪽으로 슬라이드됨 */}
        <div className="flex-shrink-0 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </a>
  );
};
