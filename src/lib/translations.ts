export const translations = {
  en: {
    nav: {
      docs: "Docs",
      userGuide: "User Guide"
    },
    hero: {
      eyebrow: "Stop manual file organization",
      title: "File organization",
      titleHighlight: "with Filient",
      subtitle: "Just tell Filient how you want your files organized.",
      subtitle2: "Set up through conversation without complex rules or manual work.",
      downloadCta: "Download for Mac",
      waitlistCta: "Join Waitlist",
      watchDemo: "Watch Demo",
      disquietBadge: "#1 Product on Disquiet Week 43",
      highlights: [
        "Completely free - No credit card required",
        "Create automation rules through conversation",
        "1-minute setup"
      ]
    },
    quickStart: {
      userGuide: {
        icon: "📖",
        title: "User Guide",
        subtitle: "New to Filient? Easy step-by-step guide to get you started",
        cta: "View Guide"
      },
      feedback: {
        icon: "💬",
        title: "Send Feedback",
        subtitle: "Your ideas become real features in Filient",
        cta: "Share Your Thoughts"
      }
    },
    stats: {
      items: [
        { value: 230, suffix: " hours", label: "Saved per year" },
        { value: 54, suffix: "%", label: "Less time exploring files" },
        { value: 1000, suffix: "+", label: "Auto-organized files" },
        { value: 1, suffix: " min", label: "Initial setup time" }
      ]
    },
    features: {
      title: "Natural language,",
      titleHighlight: "powerful automation",
      subtitle: "No more clicking through complex UIs. Just describe what you want and let AI do the work.",
      items: [
        {
          title: "AI Chatbot",
          description: "Describe what you need in chat and Filient builds the right automation on the spot.",
          videoKey: "AI_CHATBOT"
        },
        {
          title: "Rollback Safety",
          description: "Undo any automation with a single click and restore files exactly as they were.",
          videoKey: "ROLLBACK"
        },
        {
          title: "Scheduled Runs",
          description: "Set a cadence and Filient keeps your folders tidy by running rules automatically.",
          videoKey: "PERIODIC_EXECUTION"
        }
      ],
      watchVideoLabel: "Watch feature video",
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
          description: "Create rules through conversation. No technical knowledge required.",
          example: "\"Put all invoices in the Accounting folder and rename them with the date\""
        },
        {
          number: "03",
          title: "Files organize themselves",
          description: "Filient runs in the background and automatically organizes files based on your schedule settings.",
          example: "Invoice_2024.pdf → Accounting/2024-01-15_Invoice.pdf"
        }
      ],
      noManualFiling: "No more manual filing",
      noManualFilingDesc: "Filient works 24/7 in the background. Set it up once and never think about file organization again."
    },
    comparison: {
      title: "User-focused,",
      titleHighlight: "convenient automation",
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
      title: "Wasting time finding files every day,",
      titleHighlight: "stop now",
      subtitle: "Set it up once and it keeps organizing automatically",
      features: [
        "Safe undo",
        "Korean language support"
      ],
      downloadCta: "Download for Mac",
      requirements: "macOS 12.0+",
      freeStart: "Free to start",
      emailPlaceholder: "Enter your email",
      waitlistCta: "Join Waitlist",
      waitlistSuccess: "Thanks! We'll notify you when Filient is ready for {{platform}}.",
      featuredIn: "As featured in",
      publications: ["TechCrunch", "Product Hunt", "Hacker News"],
      modalTitle: "Download Filient",
      modalDescription: "Enter your email to start downloading",
      emailLabel: "Email Address",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      startDownload: "Start Download",
      downloading: "Downloading...",
      privacyNote: "We respect your privacy. No spam, ever.",
      downloadWithoutEmail: "Download without email"
    },
    footer: {
      links: {
        privacy: "Privacy",
        terms: "Terms",
        contact: "Contact",
        feedback: "Feedback"
      },
      disquiet: "View on Disquiet",
      kakaoChat: "Join Open Chat",
      xChat: "Contact on X",
      copyright: "© {{year}} Filient. All rights reserved."
    }
  },
  ko: {
    nav: {
      docs: "문서",
      userGuide: "사용 가이드"
    },
    hero: {
      eyebrow: "수동 파일 정리는 이제 그만",
      title: "파일 정리",
      titleHighlight: "Filient와 함께",
      subtitle: "Filient에게 파일을 어떻게 정리하고 싶은지 설명만 하세요.",
      subtitle2: "복잡한 규칙도 수작업 없이 대화만으로 설정 해보세요.",
      downloadCta: "Mac용 다운로드",
      waitlistCta: "대기자 명단 등록",
      watchDemo: "데모 보기",
      disquietBadge: "디스콰이엇 43주차 1위",
      highlights: [
        "완전 무료 - 카드 등록 불필요",
        "대화만으로 자동 정리 규칙 생성",
        "1분만에 설치 완료"
      ]
    },
    quickStart: {
      userGuide: {
        icon: "📖",
        title: "사용자 가이드",
        subtitle: "처음이어도 괜찮아요, 따라하면 바로 사용할 수 있어요",
        cta: "가이드 보기"
      },
      feedback: {
        icon: "💬",
        title: "피드백 보내기",
        subtitle: "여러분의 아이디어가 실제 기능으로 만들어져요",
        cta: "의견 남기기"
      }
    },
    stats: {
      items: [
        { value: 230, suffix: " 시간", label: "연간 절약 시간" },
        { value: 54, suffix: "%", label: "파일 탐색 시간 감소" },
        { value: 1000, suffix: "+", label: "자동 정리 파일" },
        { value: 1, suffix: " 분", label: "초기 설정 시간" }
      ]
    },
    features: {
      title: "자연어로,",
      titleHighlight: "강력한 자동화",
      subtitle: "복잡한 UI를 클릭할 필요가 없습니다. 원하는 것을 설명하면 AI가 처리합니다.",
      items: [
        {
          title: "AI 챗봇",
          description: "챗봇과 대화하면서 원하는 정리 규칙을 자연어로 만들고 바로 실행할 수 있습니다.",
          videoKey: "AI_CHATBOT"
        },
        {
          title: "롤백",
          description: "한 번의 클릭으로 적용한 자동화를 되돌리고, 원본 파일 상태를 그대로 복원합니다.",
          videoKey: "ROLLBACK"
        },
        {
          title: "주기적 실행",
          description: "스케줄만 지정하면 Filient가 주기적으로 규칙을 실행해 폴더를 자동으로 정리합니다.",
          videoKey: "PERIODIC_EXECUTION"
        }
      ],
      watchVideoLabel: "영상 보기",
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
          description: "대화를 통해 규칙을 작성하세요. 기술적 지식이 필요하지 않습니다.",
          example: "\"모든 송장을 회계 폴더에 넣고 날짜로 이름 변경\""
        },
        {
          number: "03",
          title: "파일이 스스로 정리됩니다",
          description: "Filient는 백그라운드에서 실행되며 사용자가 실행 주기를 설정하면 자동으로 파일이 정리됩니다.",
          example: "송장_2024.pdf → 회계/2024-01-15_송장.pdf"
        }
      ],
      noManualFiling: "더 이상 수동 정리는 없습니다",
      noManualFilingDesc: "Filient는 24시간 내내 백그라운드에서 작동합니다. 한 번 설정하면 파일 정리에 대해 다시 생각할 필요가 없습니다."
    },
    comparison: {
      title: "사용자 입장에서 고려한,",
      titleHighlight: "편리한 자동화",
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
      title: "매일 파일 찾느라 시간 낭비,",
      titleHighlight: "이제 그만하세요",
      subtitle: "한 번 설정하면 계속 자동 정리",
      features: [
        "안전한 되돌리기",
        "한국어 지원"
      ],
      downloadCta: "Mac용 다운로드",
      requirements: "macOS 12.0+",
      freeStart: "무료 시작",
      emailPlaceholder: "이메일을 입력하세요",
      waitlistCta: "대기자 명단 등록",
      waitlistSuccess: "감사합니다! {{platform}}용 Filient가 준비되면 알려드리겠습니다.",
      featuredIn: "다음 매체에 소개됨",
      publications: ["TechCrunch", "Product Hunt", "Hacker News"],
      modalTitle: "Filient 다운로드",
      modalDescription: "다운로드를 시작하려면 이메일을 입력하세요",
      emailLabel: "이메일 주소",
      emailRequired: "이메일을 입력해주세요",
      emailInvalid: "올바른 이메일 주소를 입력해주세요",
      startDownload: "다운로드 시작",
      downloading: "다운로드 중...",
      privacyNote: "개인정보를 존중합니다. 스팸 메일을 보내지 않습니다.",
      downloadWithoutEmail: "이메일 없이 다운로드"
    },
    footer: {
      links: {
        privacy: "개인정보처리방침",
        terms: "이용약관",
        contact: "문의",
        feedback: "피드백"
      },
      disquiet: "디스콰이엇에서 보기",
      kakaoChat: "오픈채팅 참여하기",
      xChat: "X에서 문의하기",
      copyright: "© {{year}} Filient. 모든 권리 보유."
    }
  }
} as const

export type Language = keyof typeof translations
export type TranslationKeys = typeof translations.en
