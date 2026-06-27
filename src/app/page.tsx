"use client";

import React, { useState, useEffect } from "react";
import { ProfileHeader } from "@/components/ProfileHeader";
import { LinkCard } from "@/components/LinkCard";
import { ContactForm } from "@/components/ContactForm";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { fetchProfileInfo, fetchLinkCards } from "@/utils/googleSheets";
import { ProfileInfo, LinkCardItem } from "@/types";

/**
 * 멀티링크 프로필 서비스의 메인 홈 컴포넌트입니다.
 * 모바일 화면 규격에 최적화된 수직 정중앙 정렬 레이아웃을 가지며,
 * 구글 시트 백오피스로부터 실시간 데이터를 로드하여 렌더링합니다.
 */
export default function Home() {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [linkCards, setLinkCards] = useState<LinkCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 브라우저에 마운트될 때 실시간 구글 시트 데이터를 로딩합니다.
  useEffect(() => {
    const loadData = async () => {
      try {
        // 프로필 정보와 링크 리스트를 병렬 비동기 호출하여 로딩 속도를 향상시킵니다.
        const [profile, cards] = await Promise.all([
          fetchProfileInfo(),
          fetchLinkCards(),
        ]);
        
        setProfileInfo(profile);
        setLinkCards(cards);

        // 브라우저 탭 타이틀도 구글 시트에서 가져온 이름으로 실시간 동적 맵핑합니다.
        if (profile && profile.name) {
          document.title = `${profile.name} | 공식 멀티링크 프로필`;
        }
      } catch (error) {
        // 네트워크 끊김 등의 장애 시에도 fallback 데이터가 유틸리티에서 리턴되어 UI 오류 발생을 최소화합니다.
        console.error("데이터 실시간 로드 중 에러 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center items-start px-4 py-8">
      <div className="w-full max-w-md flex flex-col items-center">
        
        {isLoading ? (
          // 데이터를 불러오는 중일 때는 Pulse 애니메이션 스켈레톤을 렌더링
          <SkeletonLoader />
        ) : (
          <>
            {/* 프로필 이미지, 이름, 직무 태그 헤더 영역 */}
            {profileInfo && (
              <header className="w-full flex flex-col items-center">
                <ProfileHeader info={profileInfo} />
              </header>
            )}

            {/* 중앙 실시간 링크 리스트 및 문의하기 폼 영역 */}
            <main className="w-full flex flex-col items-center">
              {linkCards.map((card, index) => (
                <LinkCard key={card.order || index} card={card} />
              ))}

              {/* 최하단 문의하기 입력 폼 */}
              <ContactForm />
            </main>
          </>
        )}

        {/* 저작권 표시 푸터 */}
        <footer className="mt-4 mb-6 text-center select-none">
          <p className="text-[10px] text-slate-300 font-semibold tracking-widest uppercase">
            © {new Date().getFullYear()} {profileInfo?.name || "지정인"}. Powered by Antigravity v2.1.4
          </p>
        </footer>

      </div>
    </div>
  );
}
