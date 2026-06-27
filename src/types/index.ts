/**
 * 프로필 상단에 표출될 핵심 정보를 정의하는 인터페이스입니다.
 * 구글 시트의 Profile_Info 탭에서 읽어오며, 상단 아바타 및 헤더 영역 렌더링에 사용됩니다.
 */
export interface ProfileInfo {
  name: string;        // 프로필 이름 (예: "지정인")
  title: string;       // 직책 / 서브타이틀 (예: "대표이사")
  tags: string[];      // 관심사 혹은 직무 태그 리스트 (예: ["#솔루션아키텍터", "#콘텐츠작가", "#멘토"])
  profileImg: string;  // 프로필 아바타 이미지 URL 혹은 로컬 파일 경로
}

/**
 * 화면 중앙에 노출되는 개별 링크 카드의 구조를 정의하는 인터페이스입니다.
 * 구글 시트의 Link_Cards 탭에서 행 단위로 입력된 데이터를 맵핑합니다.
 */
export interface LinkCardItem {
  order: number;       // 노출 순서 (정렬 기준값)
  title: string;       // 링크 카드 버튼의 메인 제목 (예: "xsnsre_host (스레드)")
  description: string; // 링크 카드에 대한 상세 설명 (예: "사업과 AI 생태계를 공유합니다.")
  linkUrl: string;     // 버튼 클릭 시 이동할 타겟 URL
  isActive: boolean;   // 실제 노출 여부 (구글 시트의 TRUE/FALSE 값과 맵핑)
}
