import type { Metadata, Viewport } from "next";
import { Outfit, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// 영문 가독성이 우수한 Outfit 폰트 설정
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

// 한글 글꼴 가독성을 보장하는 Noto Sans KR 폰트 설정
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

// 웹앱 검색엔진 최적화(SEO)를 위한 메타데이터 설정 (viewport 분리)
export const metadata: Metadata = {
  title: " ", // 첫 로딩 시 특정 이름 노출을 방지하기 위해 공백 한 칸으로 초기화합니다.
  description: "공식 멀티링크 프로필 페이지입니다. 구글 시트로 관리되는 실시간 링크와 포트폴리오를 제공합니다.",
  keywords: ["프로필 링크", "멀티링크", "지정인", "포트폴리오", "솔루션 아키텍터"],
};

// 뷰포트 정보 설정 분리 (Next.js 권장 사항)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// 루트 레이아웃 정의 (React 함수형 컴포넌트)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${outfit.variable} ${notoSansKR.variable} h-full antialiased`}
      style={{
        // 영문에는 Outfit, 국문에는 Noto Sans KR을 믹스하여 custom font로 맵핑
        "--font-sans-custom": "var(--font-outfit), var(--font-noto-sans-kr), sans-serif",
      } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50">
        {children}
      </body>
    </html>
  );
}
