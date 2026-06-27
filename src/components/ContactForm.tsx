import React, { useState } from "react";
import { Toast, ToastType } from "./Toast";

/**
 * 이메일 문의를 받는 Contact Form 컴포넌트입니다.
 * 인풋 창 테두리를 둥글고 정갈하게 정돈하고, 전송 버튼에 딥 퍼플-마젠타 그라디언트를 포인트로 적용합니다.
 */
export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 토스트 메시지 상태 관리
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastType>("success");

  // 문의하기 제출 처리 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 밸리데이션 검증
    if (!name.trim() || !email.trim() || !message.trim()) {
      setToastType("error");
      setToastMessage("모든 항목을 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 통합 구글 앱스 스크립트 API URL 혹은 레거시 문의하기 URL 참조
      const contactUrl = process.env.NEXT_PUBLIC_SHEET_API_URL || process.env.NEXT_PUBLIC_CONTACT_API_URL;

      if (contactUrl) {
        // 실제 API 엔드포인트가 존재하는 경우 서버로 데이터 전송
        const response = await fetch(contactUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        });

        // 전송 실패 시 예외 던짐
        if (!response.ok) {
          throw new Error("서버로 데이터 전송 중 오류 발생");
        }
      } else {
        // API 엔드포인트가 설정되지 않은 경우 1초 가상 지연 후 시각적 성공 피드백 제공 (Mock)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setToastType("success");
      setToastMessage("문의사항이 성공적으로 전달되었습니다.");
      
      // 폼 데이터 초기화
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      // 오류 발생 방지를 위해 catch 구문에 친절한 한국어 예외 처리 주석 배치
      console.error("이메일 문의하기 제출 오류:", error);
      setToastType("error");
      setToastMessage("전송에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-8 mb-10 px-6 py-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
      <h3 className="text-base font-bold text-slate-800 tracking-tight mb-1">
        이메일 문의하기
      </h3>
      <p className="text-xs text-slate-400 mb-5">
        질문이나 협업 제안을 보내주시면 이메일로 답변해 드립니다.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 이름 입력 란 */}
        <div>
          <input
            type="text"
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            required
            className="w-full px-4.5 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-colors bg-slate-50/50"
          />
        </div>

        {/* 이메일 주소 입력 란 */}
        <div>
          <input
            type="email"
            id="contact-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            required
            className="w-full px-4.5 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-colors bg-slate-50/50"
          />
        </div>

        {/* 문의 본문 내용 입력 란 */}
        <div>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="문의 사항을 자세히 적어주세요."
            rows={4}
            required
            className="w-full px-4.5 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-colors bg-slate-50/50 resize-none leading-relaxed"
          />
        </div>

        {/* 전송 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 mt-2 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-brand-start to-brand-end hover:opacity-95 shadow-md hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "보내는 중..." : "보내기"}
        </button>
      </form>

      {/* 토스트 팝업 렌더링 */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};
