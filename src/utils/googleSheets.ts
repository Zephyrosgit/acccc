import { ProfileInfo, LinkCardItem } from "@/types";

// 단일 구글 앱스 스크립트 웹 앱 API URL 환경변수
const API_URL = process.env.NEXT_PUBLIC_SHEET_API_URL;

// 기본 Fallback 프로필 정보 (구글 시트 연동 실패 또는 미설정 시 제공)
export const DEFAULT_PROFILE_INFO: ProfileInfo = {
  name: "지정인",
  title: "대표이사 / 솔루션 아키텍터",
  tags: ["#솔루션아키텍터", "#콘텐츠작가", "#멘토"],
  profileImg: "/avatar.png",
};

// 기본 Fallback 링크 카드 리스트
export const DEFAULT_LINK_CARDS: LinkCardItem[] = [
  {
    order: 1,
    title: "xsnsre_host (스레드)",
    description: "사업과 AI 생태계를 공유합니다.",
    linkUrl: "https://threads.net",
    isActive: true,
  },
  {
    order: 2,
    title: "AI 솔루션 활용 스터디",
    description: "새롭게 배우기 아까운 좋은 나만의 스터디",
    linkUrl: "https://open.kakao.com",
    isActive: true,
  },
  {
    order: 3,
    title: "모두의 창업 전체 멘토",
    description: "멘토링이 필요하다면 언제든 찾아주세요.",
    linkUrl: "https://example.com",
    isActive: true,
  },
];

// 중복 API 호출을 제어하기 위한 메모리 캐싱 및 Promise 공유 기법 적용 (CORS 및 최적화 대응)
let globalFetchPromise: Promise<{ profile: ProfileInfo; links: LinkCardItem[] }> | null = null;

// 구글 시트 API의 응답 데이터 명세를 정의하는 TypeScript 타입들 (any 배제 규칙 준수)
interface GasLinkItem {
  order?: number;
  title?: string;
  description?: string;
  linkUrl?: string;
  isActive?: boolean;
}

interface GasApiResponse {
  result: string;
  error?: string;
  profile?: {
    name?: string;
    title?: string;
    tags?: string[];
    profile_img?: string;
  };
  links?: GasLinkItem[];
}

/**
 * 통합 구글 앱스 스크립트 웹 API로부터 프로필 정보와 링크 데이터를 통합 조회합니다.
 */
async function fetchIntegratedData(): Promise<{ profile: ProfileInfo; links: LinkCardItem[] }> {
  if (!API_URL) {
    console.warn("NEXT_PUBLIC_SHEET_API_URL 환경변수가 설정되지 않아 Mock 데이터를 로드합니다.");
    return { profile: DEFAULT_PROFILE_INFO, links: DEFAULT_LINK_CARDS };
  }

  try {
    // 실시간 동기화를 보장하기 위해 브라우저 HTTP 캐시를 우회합니다.
    const separator = API_URL.includes("?") ? "&" : "?";
    const urlWithTimestamp = `${API_URL}${separator}t=${Date.now()}`;

    // fetch 호출 실패(CORS, 네트워크 차단 등)가 Next.js 개발 오버레이를 띄우지 않도록 단독 try-catch로 격리 처리합니다.
    let response: Response;
    try {
      response = await fetch(urlWithTimestamp, { cache: "no-store" });
    } catch (e) {
      console.warn("구글 API 호출이 차단되었거나 실패했습니다. (CORS 또는 네트워크 미연결). Mock 데이터로 대체합니다.", e);
      return { profile: DEFAULT_PROFILE_INFO, links: DEFAULT_LINK_CARDS };
    }

    if (!response.ok) {
      throw new Error(`HTTP 에러 발생! 상태코드: ${response.status}`);
    }

    const data: GasApiResponse = await response.json();
    if (data.result !== "success") {
      throw new Error(data.error || "API 응답 실패");
    }

    const profileData: ProfileInfo = {
      name: data.profile?.name || DEFAULT_PROFILE_INFO.name,
      title: data.profile?.title || DEFAULT_PROFILE_INFO.title,
      tags: Array.isArray(data.profile?.tags) ? data.profile.tags : DEFAULT_PROFILE_INFO.tags,
      profileImg: data.profile?.profile_img || DEFAULT_PROFILE_INFO.profileImg,
    };

    const linkCards: LinkCardItem[] = Array.isArray(data.links)
      ? data.links.map((item) => ({
          order: Number(item.order ?? 99),
          title: String(item.title ?? ""),
          description: String(item.description ?? ""),
          linkUrl: String(item.linkUrl ?? ""),
          isActive: item.isActive === true,
        }))
      : DEFAULT_LINK_CARDS;

    return { profile: profileData, links: linkCards };
  } catch (error) {
    // API 연결 장애 시 안전한 구동을 위해 fallback 데이터를 보장합니다.
    console.error("통합 API 로드 실패, Fallback 적용:", error);
    return { profile: DEFAULT_PROFILE_INFO, links: DEFAULT_LINK_CARDS };
  }
}

/**
 * 컴포넌트 호출 최적화를 위해 캐시된 Promise를 획득하거나 새로 생성합니다.
 * fetchProfileInfo와 fetchLinkCards가 동시에 호출되어도 실제 fetch는 1회만 일어납니다.
 */
function getOrStartFetch(): Promise<{ profile: ProfileInfo; links: LinkCardItem[] }> {
  if (!globalFetchPromise) {
    globalFetchPromise = fetchIntegratedData();
    // 100ms 후 캐시를 초기화하여 다음 렌더링 호출 시 신선한 데이터를 받도록 구성
    setTimeout(() => {
      globalFetchPromise = null;
    }, 100);
  }
  return globalFetchPromise;
}

/**
 * 프로필 상단 정보를 개별 조회하는 랩퍼 함수입니다.
 */
export async function fetchProfileInfo(): Promise<ProfileInfo> {
  const data = await getOrStartFetch();
  return data.profile;
}

/**
 * 링크 카드 리스트를 개별 조회하는 랩퍼 함수입니다.
 */
export async function fetchLinkCards(): Promise<LinkCardItem[]> {
  const data = await getOrStartFetch();
  return data.links;
}
