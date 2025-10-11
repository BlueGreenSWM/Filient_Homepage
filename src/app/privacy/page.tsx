"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  const { language } = useLanguage()

  const content = language === 'ko' ? {
    title: "개인정보처리방침",
    intro: "Filient(이하 \"회사\")는 「개인정보 보호법」에 따라 이용자의 개인정보를 보호하고 있습니다. 본 개인정보처리방침은 회사가 수집하는 개인정보와 그 처리 방법을 설명합니다.",
    backToHome: "홈으로 돌아가기",
    articles: [
      {
        title: "제1조(개인정보의 처리 목적)",
        content: [
          {
            subtitle: "회사는 다음의 목적을 위하여 개인정보를 처리합니다.",
            items: [
              { bold: "서비스 제공", text: "소프트웨어 라이선스 인증, 업데이트 제공, AI 기반 규칙 생성" },
              { bold: "서비스 개선", text: "사용 통계 분석, 오류 수정, 기능 개발" },
              { bold: "고객 지원", text: "문의 응대, 기술 지원" }
            ]
          }
        ]
      },
      {
        title: "제2조(처리하는 개인정보 항목)",
        content: [
          {
            subtitle: "필수 항목 (계약 이행 목적 - 동의 불요)",
            items: [
              { text: "기기 식별자 (Device ID)" },
              { text: "운영체제 정보" },
              { text: "소프트웨어 버전" },
              { text: "앱 사용 로그, 오류 데이터" }
            ]
          },
          {
            subtitle: "선택 항목 (별도 동의 필요)",
            items: [
              { text: "이메일 주소 (클라우드 동기화 시)" },
              { text: "AI 명령 텍스트 (AI 기능 사용 시)" }
            ]
          }
        ],
        note: "※ 파일 내용은 수집하지 않습니다. 모든 파일 분석은 로컬에서만 처리됩니다."
      },
      {
        title: "제3조(개인정보의 보유 및 이용기간)",
        content: [
          {
            items: [
              { bold: "서비스 이용 관련 정보", text: "서비스 이용계약 종료 시까지" },
              { bold: "고객 문의 기록", text: "3년 (전자상거래법)" },
              { bold: "익명화된 통계", text: "영구 보관" }
            ]
          }
        ]
      },
      {
        title: "제4조(개인정보의 제3자 제공)",
        content: [
          {
            subtitle: "AI 서비스 제공 (선택적)",
            items: [
              { bold: "제공받는 자", text: "Amazon Web Services, Inc." },
              { bold: "제공 목적", text: "AI 기반 규칙 생성" },
              { bold: "제공 항목", text: "자연어 명령 텍스트" },
              { bold: "보유기간", text: "처리 즉시 삭제" }
            ]
          }
        ]
      },
      {
        title: "제5조(개인정보처리의 위탁)",
        content: [
          {
            table: true,
            headers: ["수탁업체", "위탁업무"],
            rows: [
              ["Google LLC", "서비스 이용 통계 분석"]
            ]
          }
        ]
      },
      {
        title: "제6조(정보주체의 권리와 행사방법)",
        content: [
          {
            subtitle: "이용자는 다음의 권리를 행사할 수 있습니다.",
            items: [
              { text: "개인정보 열람, 정정, 삭제, 처리정지 요구" },
              { text: "개인정보 전송 요구" }
            ]
          },
          {
            subtitle: "권리 행사",
            items: [
              { text: "bluegreen.soma@gmail.com로 요청" }
            ]
          }
        ]
      },
      {
        title: "제7조(개인정보의 파기)",
        content: [
          {
            subtitle: "개인정보는 처리목적 달성 후 지체없이 파기합니다.",
            items: [
              { bold: "파기방법", text: "전자파일은 복구 불가능한 방법으로 삭제" }
            ]
          }
        ]
      },
      {
        title: "제8조(개인정보의 안전성 확보조치)",
        content: [
          {
            items: [
              { text: "개인정보 암호화" },
              { text: "접근권한 관리" },
              { text: "보안프로그램 설치 및 갱신" },
              { text: "내부관리계획 수립" }
            ]
          }
        ]
      },
      {
        title: "제9조(개인정보 자동 수집 및 거부)",
        content: [
          {
            items: [
              { bold: "자동 수집 정보", text: "앱 사용 패턴, 오류 로그" },
              { bold: "거부 방법", text: "소프트웨어 설정에서 \"사용 통계 전송\" 비활성화" }
            ]
          }
        ]
      },
      {
        title: "제10조(개인정보 보호책임자)",
        content: [
          {
            subtitle: "개인정보 보호책임자",
            items: [
              { text: "직책: 대표" },
              { text: "연락처: bluegreen.soma@gmail.com" }
            ]
          },
          {
            subtitle: "고객지원",
            items: [
              { text: "연락처: bluegreen.soma@gmail.com" }
            ]
          }
        ]
      },
      {
        title: "제11조(권익침해 구제)",
        content: [
          {
            subtitle: "개인정보 침해 시 다음 기관에 신고 가능합니다.",
            items: [
              { text: "개인정보보호위원회: 1833-6972 (www.kopico.go.kr)" },
              { text: "개인정보침해신고센터: 118 (privacy.kisa.or.kr)" }
            ]
          }
        ]
      },
      {
        title: "제12조(개인정보처리방침 변경)",
        content: [
          {
            items: [
              { text: "이 처리방침은 2025년 10월 13일부터 적용됩니다. 변경 시 7일 전 공지합니다." }
            ]
          }
        ]
      }
    ],
    effectiveDate: "시행일: 2025년 10월 13일"
  } : {
    title: "Privacy Policy",
    intro: "Filient (hereinafter \"Company\") protects users' personal information in accordance with the Personal Information Protection Act. This privacy policy explains the personal information collected by the Company and how it is processed.",
    backToHome: "Back to Home",
    articles: [
      {
        title: "Article 1 (Purpose of Personal Information Processing)",
        content: [
          {
            subtitle: "The Company processes personal information for the following purposes:",
            items: [
              { bold: "Service Provision", text: "Software license authentication, updates, AI-based rule generation" },
              { bold: "Service Improvement", text: "Usage statistics analysis, bug fixes, feature development" },
              { bold: "Customer Support", text: "Inquiry response, technical support" }
            ]
          }
        ]
      },
      {
        title: "Article 2 (Personal Information Items Processed)",
        content: [
          {
            subtitle: "Required Items (For Contract Performance - No Consent Required)",
            items: [
              { text: "Device ID" },
              { text: "Operating System Information" },
              { text: "Software Version" },
              { text: "App Usage Logs, Error Data" }
            ]
          },
          {
            subtitle: "Optional Items (Separate Consent Required)",
            items: [
              { text: "Email Address (for Cloud Sync)" },
              { text: "AI Command Text (when using AI features)" }
            ]
          }
        ],
        note: "※ File contents are not collected. All file analysis is processed locally only."
      },
      // English version continues with all articles...
    ],
    effectiveDate: "Effective Date: October 13, 2025"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{content.backToHome}</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h1>
          <p className="text-gray-600 leading-relaxed">{content.intro}</p>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {content.articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                {article.title}
              </h2>

              <div className="space-y-4">
                {article.content.map((section, sIndex) => (
                  <div key={sIndex}>
                    {'subtitle' in section && section.subtitle && (
                      <h3 className="font-medium text-gray-800 mb-3">
                        {section.subtitle}
                      </h3>
                    )}

                    {'table' in section && section.table ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              {section.headers?.map((header, hIndex) => (
                                <th key={hIndex} className="px-4 py-3 text-left font-medium text-gray-700">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.rows?.map((row, rIndex) => (
                              <tr key={rIndex} className="border-b border-gray-100">
                                {row.map((cell, cIndex) => (
                                  <td key={cIndex} className="px-4 py-3 text-gray-600">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      'items' in section && section.items && (
                        <ul className={`${'bold' in section.items[0] && section.items[0].bold ? 'space-y-2' : 'space-y-1'}`}>
                          {section.items.map((item: { bold?: string; text: string }, iIndex: number) => (
                            <li key={iIndex} className="flex items-start">
                              <span className="text-blue-500 mr-2 mt-1.5 text-xs">•</span>
                              <div className="flex-1">
                                {'bold' in item && item.bold && (
                                  <span className="font-medium text-gray-800 mr-2">
                                    {item.bold}:
                                  </span>
                                )}
                                <span className="text-gray-600">{item.text}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )
                    )}
                  </div>
                ))}
              </div>

              {article.note && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">{article.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 font-medium">{content.effectiveDate}</p>
        </div>
      </div>
    </div>
  )
}