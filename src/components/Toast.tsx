import React, { useEffect } from "react";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

/**
 * 폼 제출 등 사용자의 동작 피드백을 전달하는 미니 토스트 알림 컴포넌트입니다.
 * 화면 하단 중앙에 슬라이드 애니메이션과 함께 나타나며, 일정 시간 후 자동 소멸합니다.
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    // 지정된 시간이 지나면 토스트를 닫는 타이머 설정
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // 컴포넌트 언마운트 시 타이머 클리어 (메모리 누수 방지)
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4.5 py-3 rounded-2xl shadow-xl border bg-white border-slate-100 text-sm font-semibold transition-all duration-300 transform scale-100">
      {/* 결과 유형(성공/에러)에 따른 아이콘 구성 */}
      {isSuccess ? (
        <span className="text-emerald-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
      ) : (
        <span className="text-rose-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376C1.83 19.13 2.014 21 3.844 21h16.312c1.83 0 2.015-1.87 1.258-3.374L13.56 4.374c-.927-1.832-3.195-1.832-4.122 0L3.84 17.626zM12 17h.008v.008H12V17z"
            />
          </svg>
        </span>
      )}
      <span className="text-slate-700">{message}</span>
    </div>
  );
};
