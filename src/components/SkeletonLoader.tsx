import React from "react";

/**
 * 데이터를 불러오는 과정 동안 실제 렌더링될 UI 형태 그대로 반짝이는 애니메이션 효과를 표출하는 스켈레톤 컴포넌트입니다.
 * 체감 로딩 속도를 향상시키기 위해 적용됩니다.
 */
export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center animate-pulse">
      {/* 프로필 아바타 영역 스켈레톤 */}
      <div className="w-28 h-28 rounded-full bg-slate-200 mt-6" />

      {/* 이름 및 직책 영역 스켈레톤 */}
      <div className="h-6 w-32 bg-slate-200 rounded-md mt-5" />
      <div className="h-4 w-48 bg-slate-200 rounded-md mt-2" />

      {/* 태그 리스트 영역 스켈레톤 */}
      <div className="flex gap-2 mt-4.5">
        <div className="h-6 w-16 bg-slate-200 rounded-full" />
        <div className="h-6 w-20 bg-slate-200 rounded-full" />
        <div className="h-6 w-14 bg-slate-200 rounded-full" />
      </div>

      {/* 링크 카드 목록 스켈레톤 (총 3개 구성) */}
      <div className="w-full mt-10">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="w-full h-[88px] mb-4 bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-center gap-2"
          >
            <div className="h-4.5 w-1/3 bg-slate-200 rounded-md" />
            <div className="h-3 w-2/3 bg-slate-200 rounded-md" />
          </div>
        ))}
      </div>

      {/* 이메일 문의하기 폼 영역 스켈레톤 */}
      <div className="w-full mt-6 h-[320px] bg-white rounded-3xl border border-slate-100 p-6 flex flex-col gap-4">
        <div className="h-5 w-24 bg-slate-200 rounded-md self-center" />
        <div className="h-3 w-40 bg-slate-200 rounded-md self-center mb-2" />
        <div className="h-10 w-full bg-slate-200 rounded-xl" />
        <div className="h-10 w-full bg-slate-200 rounded-xl" />
        <div className="h-20 w-full bg-slate-200 rounded-xl" />
        <div className="h-12 w-full bg-slate-200 rounded-xl mt-2" />
      </div>
    </div>
  );
};
