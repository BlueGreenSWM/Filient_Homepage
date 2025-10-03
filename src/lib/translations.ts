export const translations = {
  en: {
    hero: {
      title: "File organization",
      titleHighlight: "powered by AI",
      subtitle: "Tell Filient what to do in plain English. No complex rules, no manual setup. Just describe how you want your files organized.",
      downloadCta: "Download for Mac",
      waitlistCta: "Join Waitlist",
      watchDemo: "Watch Demo"
    },
    stats: {
      items: [
        { value: 230, suffix: " hours", label: "Saved per year" },
        { value: 54, suffix: "%", label: "Less time searching" },
        { value: 10000, suffix: "+", label: "Files organized daily" },
        { value: 5, suffix: " min", label: "Average setup time" }
      ]
    },
    features: {
      title: "Natural language,",
      titleHighlight: "powerful automation",
      subtitle: "No more clicking through complex UIs. Just describe what you want and let AI do the work.",
      items: [
        {
          title: "Natural Language Rules",
          description: "Just tell Filient what you want: \"Move all PDFs older than 30 days to Archive\" or \"Organize photos by date and location\""
        },
        {
          title: "Instant Setup",
          description: "No complex rule builders or regex patterns. Write what you want in plain English and Filient handles the rest."
        },
        {
          title: "Smart Understanding",
          description: "Filient understands context. It knows \"old files\" means different things for downloads vs documents."
        },
        {
          title: "Local Processing",
          description: "Everything runs on your machine. Your files never leave your computer."
        },
        {
          title: "Scheduled Execution",
          description: "Runs periodically to keep your files organized automatically."
        },
        {
          title: "Retroactive Cleaning",
          description: "Apply rules to existing files. Clean up years of file chaos in minutes."
        }
      ],
      examplesTitle: "Example commands",
      examples: [
        "\"Delete all files with 'product' in their name\"",
        "\"Organize all files by date created\"",
        "\"Delete files older than 7 days\"",
        "\"Tag work-related files with red priority label\""
      ]
    },
    howItWorks: {
      title: "Three steps to",
      titleHighlight: "perfect organization",
      steps: [
        {
          number: "01",
          title: "Install Filient",
          description: "Download and install in under a minute. Works with macOS Monterey and later.",
          example: null
        },
        {
          number: "02",
          title: "Tell it what to do",
          description: "Write rules in plain English. No technical knowledge required.",
          example: "\"Put all invoices in the Accounting folder and rename them with the date\""
        },
        {
          number: "03",
          title: "Files organize themselves",
          description: "Filient runs in the background, organizing files as they arrive.",
          example: "Invoice_2024.pdf → Accounting/2024-01-15_Invoice.pdf"
        }
      ],
      noManualFiling: "No more manual filing",
      noManualFilingDesc: "Filient works 24/7 in the background. Set it up once and never think about file organization again."
    },
    comparison: {
      title: "Built for humans,",
      titleHighlight: "not programmers",
      tableHeaders: {
        feature: "",
        filient: "Filient",
        fillientSubtitle: "AI-powered",
        hazel: "Hazel",
        hazelSubtitle: "Rule-based",
        manual: "Manual",
        manualSubtitle: "DIY"
      },
      features: [
        {
          name: "Setup complexity",
          filient: "Write in plain English",
          hazel: "Complex rule builder",
          manual: "No automation"
        },
        {
          name: "Learning curve",
          filient: "Zero - just describe what you want",
          hazel: "Steep - requires technical knowledge",
          manual: "None"
        },
        {
          name: "Flexibility",
          filient: "Natural language commands",
          hazel: "Limited to predefined patterns",
          manual: "Full manual control"
        },
        {
          name: "Time to first rule",
          filient: "< 1 minute",
          hazel: "10-30 minutes",
          manual: "N/A"
        }
      ]
    },
    pricing: {
      title: "Invest in Your",
      titleHighlight: "Productivity",
      subtitle: "Save 230 hours per year. That's worth ${{amount}} at your current rate.",
      calculator: {
        title: "ROI Calculator",
        hourlyRate: "Your Hourly Rate",
        hoursWasted: "Hours Wasted Per Year",
        monthlySavings: "Monthly Savings",
        yearlySavings: "Yearly Savings",
        roiPercentage: "ROI Percentage"
      },
      plans: [
        {
          name: "Pro",
          price: 4.99,
          period: "per month",
          description: "For professionals who value their time",
          features: [
            "AI-powered organization",
            "Unlimited devices",
            "Priority support",
            "Advanced analytics",
            "Custom workflows",
            "Cloud backup"
          ],
          cta: "Get Started",
          popular: true
        },
        {
          name: "Team",
          price: 9.99,
          period: "per user/month",
          description: "For teams and organizations",
          features: [
            "Everything in Pro",
            "Team collaboration",
            "Admin dashboard",
            "API access",
            "SSO integration",
            "Dedicated support"
          ],
          cta: "Contact Sales",
          popular: false
        }
      ],
      guarantee: "30-Day Money-Back Guarantee"
    },
    download: {
      title: "Ready to save",
      titleHighlight: "230 hours a year?",
      subtitle: "Join thousands who've already simplified their file management with AI.",
      downloadCta: "Download for Mac",
      requirements: "macOS 12.0+",
      emailPlaceholder: "Enter your email",
      waitlistCta: "Join Waitlist",
      waitlistSuccess: "Thanks! We'll notify you when Filient is ready for {{platform}}.",
      featuredIn: "As featured in",
      publications: ["TechCrunch", "Product Hunt", "Hacker News"]
    },
    footer: {
      links: {
        privacy: "Privacy",
        terms: "Terms",
        contact: "Contact"
      },
      copyright: "© {{year}} Filient. All rights reserved."
    }
  },
  ko: {
    hero: {
      title: "파일 정리",
      titleHighlight: "AI로 자동화",
      subtitle: "Filient에게 평범한 한국어로 원하는 것을 말하세요. 복잡한 규칙도, 수동 설정도 필요 없습니다. 파일을 어떻게 정리하고 싶은지 설명만 하세요.",
      downloadCta: "Mac용 다운로드",
      waitlistCta: "대기자 명단 등록",
      watchDemo: "데모 보기"
    },
    stats: {
      items: [
        { value: 230, suffix: " 시간", label: "연간 절약 시간" },
        { value: 54, suffix: "%", label: "검색 시간 감소" },
        { value: 10000, suffix: "+", label: "일일 정리 파일" },
        { value: 5, suffix: " 분", label: "평균 설정 시간" }
      ]
    },
    features: {
      title: "자연어로,",
      titleHighlight: "강력한 자동화",
      subtitle: "복잡한 UI를 클릭할 필요가 없습니다. 원하는 것을 설명하면 AI가 처리합니다.",
      items: [
        {
          title: "자연어 규칙",
          description: "Filient에게 원하는 것을 말하세요: \"30일 이상 된 모든 PDF를 Archive로 이동\" 또는 \"날짜와 위치별로 사진 정리\""
        },
        {
          title: "즉시 설정",
          description: "복잡한 규칙 빌더나 정규식 패턴이 필요 없습니다. 평범한 한국어로 원하는 것을 작성하면 Filient가 나머지를 처리합니다."
        },
        {
          title: "스마트 이해",
          description: "Filient는 맥락을 이해합니다. \"오래된 파일\"이 다운로드와 문서에서 다른 의미라는 것을 알고 있습니다."
        },
        {
          title: "로컬 처리",
          description: "모든 것이 당신의 컴퓨터에서 실행됩니다. 파일은 절대 컴퓨터를 떠나지 않습니다."
        },
        {
          title: "주기적 실행",
          description: "주기적으로 실행되어 파일을 자동으로 정리합니다."
        },
        {
          title: "소급 정리",
          description: "기존 파일에 규칙을 적용하세요. 수년간의 파일 혼란을 몇 분 안에 정리합니다."
        }
      ],
      examplesTitle: "예시 명령어",
      examples: [
        "\"이름에 'product'가 포함된 모든 파일 삭제\"",
        "\"생성일별로 모든 파일 정리\"",
        "\"7일 이상 된 파일 삭제\"",
        "\"업무 관련 파일에 빨간색 우선순위 라벨 지정\""
      ]
    },
    howItWorks: {
      title: "3단계로",
      titleHighlight: "완벽한 정리",
      steps: [
        {
          number: "01",
          title: "Filient 설치",
          description: "1분 이내에 다운로드하고 설치하세요. macOS Monterey 이상에서 작동합니다.",
          example: null
        },
        {
          number: "02",
          title: "원하는 것을 말하세요",
          description: "평범한 한국어로 규칙을 작성하세요. 기술적 지식이 필요하지 않습니다.",
          example: "\"모든 송장을 회계 폴더에 넣고 날짜로 이름 변경\""
        },
        {
          number: "03",
          title: "파일이 스스로 정리됩니다",
          description: "Filient는 백그라운드에서 실행되어 파일이 도착하면 정리합니다.",
          example: "송장_2024.pdf → 회계/2024-01-15_송장.pdf"
        }
      ],
      noManualFiling: "더 이상 수동 정리는 없습니다",
      noManualFilingDesc: "Filient는 24시간 내내 백그라운드에서 작동합니다. 한 번 설정하면 파일 정리에 대해 다시 생각할 필요가 없습니다."
    },
    comparison: {
      title: "인간을 위한,",
      titleHighlight: "프로그래머용이 아닌",
      tableHeaders: {
        feature: "",
        filient: "Filient",
        fillientSubtitle: "AI 기반",
        hazel: "Hazel",
        hazelSubtitle: "규칙 기반",
        manual: "수동",
        manualSubtitle: "직접"
      },
      features: [
        {
          name: "설정 복잡도",
          filient: "평범한 한국어로 작성",
          hazel: "복잡한 규칙 빌더",
          manual: "자동화 없음"
        },
        {
          name: "학습 곡선",
          filient: "제로 - 원하는 것을 설명하기만",
          hazel: "가파름 - 기술 지식 필요",
          manual: "없음"
        },
        {
          name: "유연성",
          filient: "자연어 명령",
          hazel: "미리 정의된 패턴으로 제한",
          manual: "완전한 수동 제어"
        },
        {
          name: "첫 규칙까지 소요 시간",
          filient: "< 1분",
          hazel: "10-30분",
          manual: "해당 없음"
        }
      ]
    },
    pricing: {
      title: "당신의",
      titleHighlight: "생산성에 투자하세요",
      subtitle: "연간 230시간을 절약하세요. 현재 비율로 ${{amount}}의 가치입니다.",
      calculator: {
        title: "ROI 계산기",
        hourlyRate: "시간당 급여",
        hoursWasted: "연간 낭비 시간",
        monthlySavings: "월간 절약액",
        yearlySavings: "연간 절약액",
        roiPercentage: "ROI 비율"
      },
      plans: [
        {
          name: "Pro",
          price: 4.99,
          period: "월",
          description: "시간을 중요하게 생각하는 전문가를 위한",
          features: [
            "AI 기반 정리",
            "무제한 기기",
            "우선 지원",
            "고급 분석",
            "커스텀 워크플로우",
            "클라우드 백업"
          ],
          cta: "시작하기",
          popular: true
        },
        {
          name: "Team",
          price: 9.99,
          period: "사용자당/월",
          description: "팀과 조직을 위한",
          features: [
            "Pro의 모든 기능",
            "팀 협업",
            "관리자 대시보드",
            "API 액세스",
            "SSO 통합",
            "전담 지원"
          ],
          cta: "영업팀 문의",
          popular: false
        }
      ],
      guarantee: "30일 환불 보장"
    },
    download: {
      title: "연간",
      titleHighlight: "230시간을 절약할 준비가 되셨나요?",
      subtitle: "AI로 파일 관리를 단순화한 수천 명과 함께하세요.",
      downloadCta: "Mac용 다운로드",
      requirements: "macOS 12.0+",
      emailPlaceholder: "이메일을 입력하세요",
      waitlistCta: "대기자 명단 등록",
      waitlistSuccess: "감사합니다! {{platform}}용 Filient가 준비되면 알려드리겠습니다.",
      featuredIn: "다음 매체에 소개됨",
      publications: ["TechCrunch", "Product Hunt", "Hacker News"]
    },
    footer: {
      links: {
        privacy: "개인정보처리방침",
        terms: "이용약관",
        contact: "문의"
      },
      copyright: "© {{year}} Filient. 모든 권리 보유."
    }
  }
} as const

export type Language = keyof typeof translations
export type TranslationKeys = typeof translations.en
