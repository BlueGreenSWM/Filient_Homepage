export interface DocSection {
  id: string
  title: string
  titleEn: string
  content: string
  contentEn: string
}

export interface DocCategory {
  id: string
  title: string
  titleEn: string
  sections: DocSection[]
}

export const docsContent: DocCategory[] = [
  {
    id: 'getting-started',
    title: '시작하기',
    titleEn: 'Getting Started',
    sections: [
      {
        id: 'introduction',
        title: 'Filient 소개',
        titleEn: 'Introduction to Filient',
        content: `
# Filient란?

Filient는 macOS용 지능형 파일 정리 자동화 솔루션입니다. 사용자가 정의한 규칙에 따라 파일을 자동으로 분류, 이동, 이름 변경하여 깔끔한 파일 시스템을 유지할 수 있도록 도와줍니다.

## 주요 기능

### 🎯 스마트한 파일 정리
- **조건 기반 필터링**: 파일명, 확장자, 크기, 날짜, 태그 등 다양한 조건으로 파일 필터링
- **자동 실행**: 스케줄러를 통한 주기적 자동 정리
- **하위 폴더 지원**: 폴더 계층 구조 전체에 규칙 적용 가능

### 🔄 안전한 작업 처리
- **전체 히스토리 추적**: 모든 파일 작업 기록 보관
- **즉시 롤백**: 실수로 인한 작업도 쉽게 되돌리기
- **승인 워크플로우**: 중요한 작업 실행 전 사용자 승인 요구

### 🤖 AI 지원
- **자연어 규칙 생성**: AI와 대화하며 복잡한 규칙 쉽게 생성
- **스마트 제안**: 파일 패턴 분석 후 정리 방법 제안

## 사용 사례

### 📸 사진 정리
- 촬영 날짜별로 사진 자동 분류
- 카메라 모델별 폴더 생성
- 중복 사진 정리

### 📄 문서 관리
- 프로젝트별 문서 분류
- 날짜별 보고서 정리
- PDF, Word, Excel 파일 자동 분류

### 📥 다운로드 폴더 관리
- 파일 유형별 자동 분류
- 오래된 파일 자동 삭제
- 설치 파일 정리

## 시스템 요구사항

- **운영체제**: macOS 10.15 (Catalina) 이상
- **메모리**: 4GB RAM 이상 권장
- **저장공간**: 100MB 이상의 여유 공간
- **권한**: 전체 디스크 접근 권한 필요
        `,
        contentEn: `
# What is Filient?

Filient is an intelligent file organization automation solution for macOS. It helps maintain a clean file system by automatically classifying, moving, and renaming files according to user-defined rules.

## Key Features

### 🎯 Smart File Organization
- **Condition-based Filtering**: Filter files by name, extension, size, date, tags, and various conditions
- **Automatic Execution**: Periodic automatic organization through scheduler
- **Subfolder Support**: Apply rules to entire folder hierarchy

### 🔄 Safe Operation Processing
- **Complete History Tracking**: Keep records of all file operations
- **Instant Rollback**: Easily undo accidental operations
- **Approval Workflow**: Request user approval before important operations

### 🤖 AI Support
- **Natural Language Rule Creation**: Create complex rules easily through AI conversation
- **Smart Suggestions**: Analyze file patterns and suggest organization methods

## Use Cases

### 📸 Photo Organization
- Automatic classification by capture date
- Create folders by camera model
- Organize duplicate photos

### 📄 Document Management
- Classify documents by project
- Organize reports by date
- Automatic classification of PDF, Word, Excel files

### 📥 Downloads Folder Management
- Automatic classification by file type
- Auto-delete old files
- Organize installation files

## System Requirements

- **Operating System**: macOS 10.15 (Catalina) or higher
- **Memory**: 4GB RAM or more recommended
- **Storage**: 100MB or more free space
- **Permissions**: Full Disk Access required
        `
      },
      {
        id: 'installation',
        title: '설치 및 설정',
        titleEn: 'Installation & Setup',
        content: `
# 설치 및 설정

## 1. Filient 설치하기

### 다운로드
[Filient 공식 웹사이트](https://filient.ai)에서 최신 버전 다운로드

### 설치 과정
1. 다운로드한 \`Filient.dmg\` 파일 열기
2. Filient 앱을 Applications 폴더로 드래그
3. Applications 폴더에서 Filient 실행

## 2. 초기 설정

### 권한 설정

Filient가 파일을 관리하려면 macOS 시스템 권한이 필요합니다.

**전체 디스크 접근 권한**
1. Filient 실행 시 권한 요청 팝업이 나타남
2. "시스템 환경설정 열기" 클릭
3. **시스템 환경설정 > 보안 및 개인 정보 보호 > 개인 정보 보호 > 전체 디스크 접근 권한**
4. 좌측 하단 자물쇠 클릭 후 암호 입력
5. Filient 체크박스 선택
6. Filient 앱 재시작

> 💡 **팁**: 권한을 부여하지 않으면 일부 폴더에 접근할 수 없어 기능이 제한될 수 있습니다.

### 언어 설정
1. 설정 페이지 이동 (사이드바 하단 ⚙️ 아이콘)
2. **언어** 섹션에서 원하는 언어 선택:

   - 한국어
   - English

## 3. 첫 번째 폴더 추가

### 폴더 추가 방법

**방법 1: 폴더 선택기 사용**\n
1. 사이드바의 **"폴더 추가"** 버튼 클릭
2. Finder 창에서 관리할 폴더 선택
3. **"선택"** 버튼 클릭

**방법 2: 드래그 앤 드롭**
1. Finder에서 폴더 선택
2. Filient 사이드바로 드래그 앤 드롭
        `,
        contentEn: `
# Installation & Setup

## 1. Installing Filient

### Download
Download the latest version from [Filient official website](https://filient.ai)

### Installation Process
1. Open the downloaded \`Filient.dmg\` file
2. Drag Filient app to Applications folder
3. Run Filient from Applications folder

## 2. Initial Setup

### Permission Settings

Filient needs macOS system permissions to manage files.

**Full Disk Access Permission**
1. Permission request popup appears when running Filient
2. Click "Open System Preferences"
3. **System Preferences > Security & Privacy > Privacy > Full Disk Access**
4. Click the lock at bottom left and enter password
5. Check Filient checkbox
6. Restart Filient app

> 💡 **Tip**: Without granting permissions, some folders may be inaccessible and features may be limited.

### Language Settings
1. Go to Settings page (⚙️ icon at bottom of sidebar)
2. Select desired language in **Language** section
   - Korean
   - English

## 3. Add Your First Folder

### How to Add Folders

**Method 1: Using Folder Selector**
1. Click **"Add Folder"** button in sidebar
2. Select folder to manage in Finder window
3. Click **"Select"** button

**Method 2: Drag and Drop**
1. Select folder in Finder
2. Drag and drop to Filient sidebar
        `
      },
      {
        id: 'first-rule',
        title: '첫 번째 규칙 만들기',
        titleEn: 'Creating Your First Rule',
        content: `
# 첫 번째 규칙 만들기

이 가이드에서는 다운로드 폴더의 PDF 파일을 자동으로 문서 폴더로 이동하는 간단한 규칙을 만들어보겠습니다.

## 1. 규칙 생성 시작하기

### 폴더 선택
1. 사이드바에서 **다운로드** 폴더 선택
2. 우측 상단의 **"새 규칙"** 버튼 클릭

### 규칙 생성 방법 선택
세 가지 방법 중 하나를 선택할 수 있습니다:
- **수동으로 만들기**: 직접 조건과 액션 설정
- **AI 어시스턴트**: AI와 대화로 규칙 생성
- **템플릿 사용**: 미리 만들어진 템플릿 활용

## 2. 기본 정보 입력

### 규칙 이름
\`\`\`
PDF 문서 정리
\`\`\`

### 규칙 설명 (선택사항)
\`\`\`
다운로드 폴더의 PDF 파일을 문서 폴더로 자동 이동
\`\`\`

## 3. 조건 설정

조건은 어떤 파일에 규칙을 적용할지 결정합니다.

### 조건 추가
1. **"조건 추가"** 버튼 클릭
2. 조건 유형 선택: **"확장자"**
3. 설정:
   - 연산자: **같음**
   - 값: **pdf**
4. **"추가"** 클릭

## 4. 액션 설정

액션은 조건에 맞는 파일에 어떤 작업을 수행할지 결정합니다.

### 액션 추가
1. **"액션 추가"** 버튼 클릭
2. 액션 유형 선택: **"이동"**
3. 설정:
   - 대상 폴더: **~/Documents/PDF**
   - 충돌 처리: **이름 변경**
4. **"추가"** 클릭

## 5. 저장 및 테스트

1. 모든 설정 확인
2. **"저장"** 버튼 클릭
3. **"테스트 실행"** 으로 미리보기
4. 문제없으면 **"실행"** 클릭

🎉 축하합니다! 첫 번째 규칙을 성공적으로 만들었습니다!
        `,
        contentEn: `
# Creating Your First Rule

In this guide, we'll create a simple rule to automatically move PDF files from the Downloads folder to the Documents folder.

## 1. Start Creating a Rule

### Select Folder
1. Select **Downloads** folder in sidebar
2. Click **"New Rule"** button at top right

### Choose Rule Creation Method
You can choose from three methods:
- **Manual Creation**: Set conditions and actions directly
- **AI Assistant**: Create rules through AI conversation
- **Use Template**: Utilize pre-made templates

## 2. Enter Basic Information

### Rule Name
\`\`\`
Organize PDF Documents
\`\`\`

### Rule Description (Optional)
\`\`\`
Automatically move PDF files from Downloads folder to Documents folder
\`\`\`

## 3. Set Conditions

Conditions determine which files the rule applies to.

### Add Condition
1. Click **"Add Condition"** button
2. Select condition type: **"Extension"**
3. Settings:
   - Operator: **Equals**
   - Value: **pdf**
4. Click **"Add"**

## 4. Set Actions

Actions determine what operations to perform on files that meet the conditions.

### Add Action
1. Click **"Add Action"** button
2. Select action type: **"Move"**
3. Settings:
   - Target folder: **~/Documents/PDF**
   - Conflict handling: **Rename**
4. Click **"Add"**

## 5. Save and Test

1. Confirm all settings
2. Click **"Save"** button
3. Preview with **"Test Run"**
4. If everything looks good, click **"Run"**

🎉 Congratulations! You've successfully created your first rule!
        `
      }
    ]
  },
  {
    id: 'features',
    title: '핵심 기능',
    titleEn: 'Core Features',
    sections: [
      {
        id: 'folder-management',
        title: '폴더 관리',
        titleEn: 'Folder Management',
        content: `
# 폴더 관리

폴더 관리는 Filient의 핵심 기능으로, 자동 정리할 폴더를 추가하고 관리하는 기능입니다.

## 폴더 추가하기

### 방법 1: 폴더 선택기
1. 사이드바 상단의 **"폴더 추가"** 버튼 클릭
2. Finder 대화상자에서 원하는 폴더 선택
3. **"선택"** 클릭

### 방법 2: 드래그 앤 드롭
1. Finder에서 폴더 선택
2. Filient 사이드바로 드래그
3. 자동으로 폴더 추가됨

### 방법 3: 경로 직접 입력
1. **"폴더 추가"** 버튼 우클릭
2. "경로로 추가" 선택
3. 폴더 경로 입력 (예: ~/Documents/Projects)

## 폴더 구성

### 폴더 정보 보기
폴더를 선택하면 다음 정보를 확인할 수 있습니다:
- **폴더 경로**: 전체 경로
- **생성일**: 폴더가 Filient에 추가된 날짜
- **마지막 규칙 실행**: 최근 규칙 실행 시간
- **총 규칙 수**: 해당 폴더에 적용된 규칙 개수
- **파일 수**: 현재 폴더 내 파일 개수

### 즐겨찾기 설정
자주 사용하는 폴더를 즐겨찾기로 설정:
1. 폴더 선택
2. 폴더명 옆 ⭐ 아이콘 클릭
3. 사이드바 상단에 고정됨

## 계층 구조 관리

### 하위 폴더 표시
- 폴더 왼쪽 ▶ 아이콘 클릭으로 펼치기/접기
- 하위 폴더는 들여쓰기로 표시
- 무한 깊이 지원

### 하위 폴더 규칙 적용
1. 상위 폴더 선택
2. 규칙 생성 시 "하위 폴더 포함" 체크
3. 모든 하위 폴더에 자동 적용
        `,
        contentEn: `
# Folder Management

Folder management is a core feature of Filient, allowing you to add and manage folders for automatic organization.

## Adding Folders

### Method 1: Folder Selector
1. Click **"Add Folder"** button at top of sidebar
2. Select desired folder in Finder dialog
3. Click **"Select"**

### Method 2: Drag and Drop
1. Select folder in Finder
2. Drag to Filient sidebar
3. Folder is automatically added

### Method 3: Direct Path Entry
1. Right-click **"Add Folder"** button
2. Select "Add by Path"
3. Enter folder path (e.g., ~/Documents/Projects)

## Folder Configuration

### View Folder Information
When you select a folder, you can see the following information:
- **Folder Path**: Full path
- **Created Date**: Date folder was added to Filient
- **Last Rule Run**: Recent rule execution time
- **Total Rules**: Number of rules applied to this folder
- **File Count**: Current number of files in folder

### Set Favorites
Set frequently used folders as favorites:
1. Select folder
2. Click ⭐ icon next to folder name
3. Pinned to top of sidebar

## Hierarchy Management

### Display Subfolders
- Click ▶ icon on left of folder to expand/collapse
- Subfolders shown with indentation
- Unlimited depth support

### Apply Rules to Subfolders
1. Select parent folder
2. Check "Include subfolders" when creating rule
3. Automatically applies to all subfolders
        `
      },
      {
        id: 'rule-system',
        title: '규칙 시스템',
        titleEn: 'Rule System',
        content: `
# 규칙 시스템

규칙은 Filient의 핵심으로, 파일을 자동으로 정리하는 로직을 정의합니다. 각 규칙은 조건(Conditions)과 액션(Actions)으로 구성됩니다.

## 규칙의 구성 요소

### 기본 구조
\`\`\`
규칙 = 조건(들) + 액션(들) + 우선순위
\`\`\`

- **조건**: 어떤 파일에 적용할지 결정
- **액션**: 조건에 맞는 파일에 수행할 작업
- **우선순위**: 여러 규칙 간 실행 순서

## 규칙 생성

### 생성 방법

**1. 수동 생성**
1. 폴더 선택 > "새 규칙" 클릭
2. 규칙 정보 입력
3. 조건 추가
4. 액션 추가
5. 저장

**2. AI 어시스턴트**
1. "AI로 만들기" 선택
2. 자연어로 원하는 동작 설명
3. AI가 생성한 규칙 검토
4. 필요시 수정 후 저장

**3. 템플릿 사용**
1. "템플릿에서 만들기" 선택
2. 템플릿 라이브러리에서 선택
3. 파라미터 조정
4. 저장

## 조건 (Conditions)

### 파일 속성 조건
- **파일명**: 포함, 시작, 끝, 정규식
- **확장자**: 특정 확장자 매칭
- **크기**: 크거나 작거나 같음
- **날짜**: 생성일, 수정일, 접근일

### 메타데이터 조건
- **태그**: macOS 태그
- **속성**: 읽기 전용, 숨김, 시스템
- **콘텐츠**: 파일 내용 검색

## 액션 (Actions)

### 파일 작업
- **이동**: 다른 폴더로 이동
- **복사**: 사본 생성
- **이름 변경**: 패턴에 따라 이름 변경
- **삭제**: 휴지통으로 이동 또는 영구 삭제

### 조직화 작업
- **태그 추가**: macOS 태그 적용
- **폴더 생성**: 조건에 따라 새 폴더 생성
- **압축**: ZIP 파일로 압축
        `,
        contentEn: `
# Rule System

Rules are the core of Filient, defining the logic for automatically organizing files. Each rule consists of Conditions and Actions.

## Rule Components

### Basic Structure
\`\`\`
Rule = Condition(s) + Action(s) + Priority
\`\`\`

- **Conditions**: Determine which files to apply to
- **Actions**: Operations to perform on matching files
- **Priority**: Execution order among multiple rules

## Creating Rules

### Creation Methods

**1. Manual Creation**
1. Select folder > Click "New Rule"
2. Enter rule information
3. Add conditions
4. Add actions
5. Save

**2. AI Assistant**
1. Select "Create with AI"
2. Describe desired behavior in natural language
3. Review AI-generated rule
4. Modify if needed and save

**3. Use Template**
1. Select "Create from Template"
2. Choose from template library
3. Adjust parameters
4. Save

## Conditions

### File Property Conditions
- **Filename**: Contains, starts with, ends with, regex
- **Extension**: Match specific extensions
- **Size**: Greater than, less than, equals
- **Date**: Created, modified, accessed dates

### Metadata Conditions
- **Tags**: macOS tags
- **Attributes**: Read-only, hidden, system
- **Content**: Search file contents

## Actions

### File Operations
- **Move**: Move to another folder
- **Copy**: Create a copy
- **Rename**: Rename according to pattern
- **Delete**: Move to trash or permanently delete

### Organization Operations
- **Add Tag**: Apply macOS tags
- **Create Folder**: Create new folders based on conditions
- **Compress**: Compress to ZIP file
        `
      },
      {
        id: 'rule-templates',
        title: '규칙 템플릿',
        titleEn: 'Rule Templates',
        content: `
# 규칙 템플릿

템플릿을 사용하면 자주 사용하는 규칙을 빠르게 설정할 수 있습니다.

## 기본 제공 템플릿

### 📸 사진 정리
- **날짜별 정리**: 촬영 날짜별로 폴더 생성
- **카메라별 분류**: 카메라 모델별로 분류
- **스크린샷 정리**: 스크린샷을 별도 폴더로

### 📄 문서 관리
- **PDF 정리**: PDF 파일을 문서 폴더로
- **오피스 파일 분류**: Word, Excel, PowerPoint 분류
- **프로젝트별 정리**: 파일명 패턴으로 프로젝트 분류

### 📥 다운로드 관리
- **파일 타입별 분류**: 확장자별로 폴더 생성
- **오래된 파일 정리**: 30일 이상된 파일 아카이브
- **설치 파일 정리**: DMG, PKG 파일 정리

## 템플릿 사용하기

1. **템플릿 라이브러리 열기**
   - 새 규칙 > "템플릿에서 만들기"

2. **템플릿 선택**
   - 카테고리 탐색
   - 미리보기 확인

3. **파라미터 조정**
   - 폴더 경로 설정
   - 조건 값 수정
   - 액션 옵션 변경

4. **저장 및 적용**
   - 이름 지정
   - 폴더 선택
   - 활성화

## 커스텀 템플릿 만들기

### 템플릿으로 저장
1. 기존 규칙 선택
2. "템플릿으로 저장" 클릭
3. 템플릿 정보 입력:
   - 이름
   - 설명
   - 카테고리
   - 아이콘

### 템플릿 관리
- **편집**: 템플릿 수정
- **복제**: 비슷한 템플릿 생성
- **공유**: 다른 사용자와 공유
- **삭제**: 불필요한 템플릿 제거
        `,
        contentEn: `
# Rule Templates

Templates allow you to quickly set up frequently used rules.

## Built-in Templates

### 📸 Photo Organization
- **Organize by Date**: Create folders by capture date
- **Sort by Camera**: Classify by camera model
- **Screenshot Organization**: Move screenshots to separate folder

### 📄 Document Management
- **PDF Organization**: Move PDF files to Documents folder
- **Office File Classification**: Sort Word, Excel, PowerPoint files
- **Project Organization**: Classify by filename patterns

### 📥 Download Management
- **Sort by File Type**: Create folders by extension
- **Clean Old Files**: Archive files older than 30 days
- **Installation File Organization**: Organize DMG, PKG files

## Using Templates

1. **Open Template Library**
   - New Rule > "Create from Template"

2. **Select Template**
   - Browse categories
   - Check preview

3. **Adjust Parameters**
   - Set folder paths
   - Modify condition values
   - Change action options

4. **Save and Apply**
   - Name it
   - Select folder
   - Activate

## Creating Custom Templates

### Save as Template
1. Select existing rule
2. Click "Save as Template"
3. Enter template information:
   - Name
   - Description
   - Category
   - Icon

### Template Management
- **Edit**: Modify template
- **Duplicate**: Create similar template
- **Share**: Share with other users
- **Delete**: Remove unnecessary templates
        `
      }
    ]
  },
  {
    id: 'advanced',
    title: '고급 기능',
    titleEn: 'Advanced Features',
    sections: [
      {
        id: 'ai-assistant',
        title: 'AI 어시스턴트',
        titleEn: 'AI Assistant',
        content: `
# AI 어시스턴트

AI 어시스턴트를 사용하면 자연어로 복잡한 규칙을 쉽게 만들 수 있습니다.

## AI로 규칙 만들기

### 자연어 입력 예시

**사진 정리**
- "지난 달에 찍은 사진들을 날짜별로 정리해줘"
- "RAW 파일은 별도 폴더로 분리하고 JPG는 년/월 폴더로 정리해"

**문서 관리**
- "프로젝트명이 포함된 PDF를 각 프로젝트 폴더로 이동"
- "1MB 이상인 Word 문서를 Archive 폴더로 이동"

**다운로드 정리**
- "30일 이상 된 다운로드 파일을 삭제해"
- "설치 파일들을 Installers 폴더로 모아줘"

## AI 기능

### 규칙 생성
1. **자연어 이해**: 일상 언어로 설명
2. **조건 추출**: 자동으로 조건 파악
3. **액션 생성**: 적절한 액션 제안
4. **최적화**: 효율적인 규칙 구성

### 패턴 학습
- 사용 패턴 분석
- 개선 제안
- 자동 최적화

### 스마트 제안
- 파일 패턴 감지
- 정리 방법 추천
- 충돌 예방

## AI 설정

### 모델 선택
- **로컬 모델**: 오프라인, 빠른 응답
- **클라우드 모델**: 온라인, 고급 기능
- **자동 선택**: 상황에 따라 자동

### 프라이버시
- 파일 내용 전송 안 함
- 메타데이터만 분석
- 로컬 처리 우선

## 고급 사용법

### 복합 규칙
여러 조건과 액션을 조합한 복잡한 규칙:
\`\`\`
"프로젝트 A의 이미지 파일 중 1주일 이상 된 것들을
압축해서 Archive/ProjectA/Images 폴더로 이동하고
원본은 삭제해줘"
\`\`\`

### 조건부 실행
특정 상황에서만 실행되는 규칙:
\`\`\`
"금요일마다 Downloads 폴더의 임시 파일들을 정리하되,
프로젝트 관련 파일은 제외해"
\`\`\`
        `,
        contentEn: `
# AI Assistant

The AI Assistant allows you to easily create complex rules using natural language.

## Creating Rules with AI

### Natural Language Input Examples

**Photo Organization**
- "Organize photos taken last month by date"
- "Separate RAW files into a separate folder and organize JPGs by year/month"

**Document Management**
- "Move PDFs containing project names to their respective project folders"
- "Move Word documents larger than 1MB to Archive folder"

**Download Cleanup**
- "Delete download files older than 30 days"
- "Collect installation files into Installers folder"

## AI Features

### Rule Creation
1. **Natural Language Understanding**: Explain in everyday language
2. **Condition Extraction**: Automatically identify conditions
3. **Action Generation**: Suggest appropriate actions
4. **Optimization**: Efficient rule configuration

### Pattern Learning
- Analyze usage patterns
- Suggest improvements
- Automatic optimization

### Smart Suggestions
- Detect file patterns
- Recommend organization methods
- Prevent conflicts

## AI Settings

### Model Selection
- **Local Model**: Offline, fast response
- **Cloud Model**: Online, advanced features
- **Auto Select**: Automatic based on situation

### Privacy
- No file content transmission
- Metadata analysis only
- Local processing priority

## Advanced Usage

### Complex Rules
Complex rules combining multiple conditions and actions:
\`\`\`
"Compress Project A image files older than 1 week,
move to Archive/ProjectA/Images folder,
and delete originals"
\`\`\`

### Conditional Execution
Rules that execute only in specific situations:
\`\`\`
"Clean temporary files in Downloads folder every Friday,
but exclude project-related files"
\`\`\`
        `
      },
      {
        id: 'scheduler',
        title: '규칙 스케줄러',
        titleEn: 'Rule Scheduler',
        content: `
# 규칙 스케줄러

스케줄러를 사용하면 규칙을 자동으로 정기적으로 실행할 수 있습니다.

## 스케줄 설정

### 실행 주기
- **매일**: 지정된 시간에 매일 실행
- **매주**: 특정 요일에 실행
- **매월**: 특정 날짜에 실행
- **사용자 정의**: Cron 표현식 사용

### 시간 설정
1. 규칙 선택
2. "스케줄 설정" 클릭
3. 실행 주기 선택
4. 시간 지정
5. 저장

## 스케줄 유형

### 정기 실행
\`\`\`
매일 오후 6시: 0 18 * * *
매주 월요일 오전 9시: 0 9 * * 1
매월 1일 자정: 0 0 1 * *
\`\`\`

### 간격 실행
- 매 30분마다
- 매 2시간마다
- 매 6시간마다

### 이벤트 기반
- 시스템 시작 시
- 폴더 변경 감지 시
- 디스크 공간 부족 시

## 고급 설정

### 조건부 실행
- 특정 조건 충족 시에만 실행
- 파일 수가 특정 개수 이상일 때
- 폴더 크기가 임계값 초과 시

### 스케줄 그룹
여러 규칙을 그룹으로 묶어 동시 실행:
1. 스케줄 그룹 생성
2. 규칙들 추가
3. 그룹 스케줄 설정

### 충돌 방지
- 동시 실행 방지
- 순차 실행 옵션
- 우선순위 기반 대기열

## 모니터링

### 실행 로그
- 실행 시간
- 처리된 파일 수
- 성공/실패 상태
- 오류 메시지

### 알림 설정
- 실행 완료 알림
- 오류 발생 알림
- 요약 리포트 이메일
        `,
        contentEn: `
# Rule Scheduler

The scheduler allows you to automatically run rules on a regular basis.

## Schedule Settings

### Execution Frequency
- **Daily**: Run daily at specified time
- **Weekly**: Run on specific days
- **Monthly**: Run on specific dates
- **Custom**: Use Cron expressions

### Time Settings
1. Select rule
2. Click "Set Schedule"
3. Choose execution frequency
4. Specify time
5. Save

## Schedule Types

### Regular Execution
\`\`\`
Daily at 6 PM: 0 18 * * *
Every Monday at 9 AM: 0 9 * * 1
1st of every month at midnight: 0 0 1 * *
\`\`\`

### Interval Execution
- Every 30 minutes
- Every 2 hours
- Every 6 hours

### Event-based
- On system startup
- When folder changes detected
- When disk space is low

## Advanced Settings

### Conditional Execution
- Execute only when specific conditions are met
- When file count exceeds certain number
- When folder size exceeds threshold

### Schedule Groups
Group multiple rules for simultaneous execution:
1. Create schedule group
2. Add rules
3. Set group schedule

### Conflict Prevention
- Prevent simultaneous execution
- Sequential execution option
- Priority-based queue

## Monitoring

### Execution Log
- Execution time
- Number of files processed
- Success/failure status
- Error messages

### Notification Settings
- Execution complete notifications
- Error notifications
- Summary report emails
        `
      },
      {
        id: 'notifications',
        title: '알림 및 승인',
        titleEn: 'Notifications & Approval',
        content: `
# 알림 및 승인

중요한 작업에 대한 알림을 받고 승인 워크플로우를 설정할 수 있습니다.

## 알림 설정

### 알림 유형
- **실행 완료**: 규칙 실행이 완료되었을 때
- **오류 발생**: 실행 중 오류가 발생했을 때
- **승인 요청**: 승인이 필요한 작업이 있을 때
- **공간 부족**: 디스크 공간이 부족할 때

### 알림 방법
- **시스템 알림**: macOS 알림 센터
- **앱 내 알림**: Filient 앱 내 표시
- **이메일**: 등록된 이메일로 전송
- **푸시 알림**: 모바일 앱으로 전송

## 승인 워크플로우

### 승인 필요 설정
1. 규칙 편집
2. "승인 필요" 옵션 활성화
3. 승인 조건 설정:
   - 모든 작업
   - 특정 개수 이상
   - 특정 크기 이상

### 승인 프로세스
1. 규칙 실행 시작
2. 조건 확인 및 파일 목록 생성
3. 승인 요청 알림 발송
4. 사용자 검토:
   - 전체 승인
   - 부분 승인
   - 거부
5. 승인된 작업만 실행

### 일괄 승인
여러 승인 요청을 한 번에 처리:
- 모두 승인
- 모두 거부
- 개별 선택

## 알림 커스터마이징

### 중요도 설정
- **긴급**: 즉시 알림
- **높음**: 5분 내 알림
- **보통**: 요약하여 알림
- **낮음**: 로그만 기록

### 시간대 설정
- 방해 금지 시간
- 업무 시간만 알림
- 주말 알림 비활성화

### 그룹 알림
비슷한 알림을 그룹화:
- 동일 규칙 알림 묶기
- 시간별 요약
- 일일 다이제스트
        `,
        contentEn: `
# Notifications & Approval

Receive notifications for important operations and set up approval workflows.

## Notification Settings

### Notification Types
- **Execution Complete**: When rule execution is completed
- **Error Occurred**: When an error occurs during execution
- **Approval Request**: When an operation needs approval
- **Low Space**: When disk space is low

### Notification Methods
- **System Notifications**: macOS Notification Center
- **In-app Notifications**: Display within Filient app
- **Email**: Send to registered email
- **Push Notifications**: Send to mobile app

## Approval Workflow

### Setting Approval Required
1. Edit rule
2. Enable "Approval Required" option
3. Set approval conditions:
   - All operations
   - Above certain count
   - Above certain size

### Approval Process
1. Rule execution starts
2. Check conditions and generate file list
3. Send approval request notification
4. User review:
   - Approve all
   - Partial approval
   - Reject
5. Execute only approved operations

### Batch Approval
Process multiple approval requests at once:
- Approve all
- Reject all
- Individual selection

## Customizing Notifications

### Priority Settings
- **Urgent**: Notify immediately
- **High**: Notify within 5 minutes
- **Normal**: Summarize and notify
- **Low**: Log only

### Time Zone Settings
- Do not disturb hours
- Business hours only
- Disable weekend notifications

### Group Notifications
Group similar notifications:
- Bundle same rule notifications
- Hourly summary
- Daily digest
        `
      }
    ]
  },
  {
    id: 'reference',
    title: '참고자료',
    titleEn: 'Reference',
    sections: [
      {
        id: 'conditions',
        title: '조건 유형 상세',
        titleEn: 'Condition Types',
        content: `
# 조건 유형 상세

## 파일 속성 조건

### 파일명 조건
- **포함**: 특정 문자열 포함
- **시작**: 특정 문자열로 시작
- **끝**: 특정 문자열로 끝남
- **정규식**: 정규 표현식 매칭
- **와일드카드**: * 와 ? 사용

### 확장자 조건
- **같음**: 정확히 일치
- **포함**: 여러 확장자 중 하나
- **제외**: 특정 확장자 제외

### 크기 조건
- **크거나 같음**: 지정 크기 이상
- **작거나 같음**: 지정 크기 이하
- **범위**: 최소-최대 범위
- **단위**: B, KB, MB, GB, TB

### 날짜 조건
- **생성일**: 파일 생성 날짜
- **수정일**: 마지막 수정 날짜
- **접근일**: 마지막 접근 날짜
- **연산자**: 이전, 이후, 범위, 정확히

## 메타데이터 조건

### macOS 태그
- **포함**: 특정 태그 포함
- **모두 포함**: 모든 태그 포함
- **제외**: 특정 태그 없음

### 파일 속성
- **읽기 전용**: 읽기 전용 파일
- **숨김**: 숨김 파일
- **시스템**: 시스템 파일
- **번들**: 앱 번들

### Kind 조건
- **이미지**: 모든 이미지 파일
- **동영상**: 모든 동영상 파일
- **음악**: 모든 오디오 파일
- **문서**: 모든 문서 파일
- **앱**: 응용 프로그램

## 콘텐츠 조건

### 텍스트 포함
- 파일 내용에서 텍스트 검색
- PDF, Word, 텍스트 파일 지원
- 대소문자 구분 옵션

### 메타데이터 검색
- EXIF 데이터 (사진)
- ID3 태그 (음악)
- 문서 속성
        `,
        contentEn: `
# Condition Types Detail

## File Property Conditions

### Filename Conditions
- **Contains**: Contains specific string
- **Starts with**: Starts with specific string
- **Ends with**: Ends with specific string
- **Regex**: Regular expression matching
- **Wildcard**: Using * and ?

### Extension Conditions
- **Equals**: Exact match
- **In**: One of multiple extensions
- **Not in**: Exclude specific extensions

### Size Conditions
- **Greater than or equal**: Above specified size
- **Less than or equal**: Below specified size
- **Range**: Min-max range
- **Units**: B, KB, MB, GB, TB

### Date Conditions
- **Created**: File creation date
- **Modified**: Last modified date
- **Accessed**: Last accessed date
- **Operators**: Before, after, range, exactly

## Metadata Conditions

### macOS Tags
- **Contains**: Contains specific tag
- **Contains all**: Contains all tags
- **Excludes**: Doesn't have specific tag

### File Attributes
- **Read-only**: Read-only files
- **Hidden**: Hidden files
- **System**: System files
- **Bundle**: App bundles

### Kind Conditions
- **Image**: All image files
- **Movie**: All video files
- **Music**: All audio files
- **Document**: All document files
- **Application**: Applications

## Content Conditions

### Text Contains
- Search text in file content
- Supports PDF, Word, text files
- Case sensitivity option

### Metadata Search
- EXIF data (photos)
- ID3 tags (music)
- Document properties
        `
      },
      {
        id: 'actions',
        title: '액션 유형 상세',
        titleEn: 'Action Types',
        content: `
# 액션 유형 상세

## 파일 작업

### 이동 (Move)
파일을 다른 폴더로 이동
- **대상 폴더**: 절대 경로 또는 상대 경로
- **충돌 처리**: 덮어쓰기, 건너뛰기, 이름 변경
- **폴더 생성**: 대상 폴더가 없으면 자동 생성

### 복사 (Copy)
파일의 사본 생성
- **대상 폴더**: 복사할 위치
- **이름 패턴**: 사본 이름 규칙
- **메타데이터 보존**: 원본 메타데이터 유지

### 이름 변경 (Rename)
파일 이름 변경
- **패턴**: 날짜, 번호, 텍스트 조합
- **대소문자 변경**: 대문자, 소문자, 타이틀
- **치환**: 찾기 및 바꾸기

### 삭제 (Delete)
파일 제거
- **휴지통으로**: 복구 가능
- **영구 삭제**: 복구 불가능
- **보안 삭제**: 덮어쓰기 후 삭제

## 조직화 작업

### 태그 추가 (Add Tag)
macOS 태그 적용
- **색상 태그**: 빨강, 주황, 노랑 등
- **커스텀 태그**: 사용자 정의 태그
- **다중 태그**: 여러 태그 동시 적용

### 폴더 생성 (Create Folder)
조건에 따라 새 폴더 생성
- **이름 패턴**: 날짜, 파일명 기반
- **계층 구조**: 중첩 폴더 생성
- **권한 설정**: 읽기/쓰기 권한

### 압축 (Compress)
파일 압축
- **형식**: ZIP, TAR, 7Z
- **압축률**: 최대, 보통, 빠름
- **암호화**: 비밀번호 보호

## 시스템 작업

### 스크립트 실행 (Run Script)
사용자 정의 스크립트 실행
- **언어**: Bash, Python, AppleScript
- **파라미터**: 파일 경로 전달
- **출력**: 결과 캡처 및 로깅

### 알림 (Notify)
사용자에게 알림
- **메시지**: 커스텀 메시지
- **사운드**: 알림음 선택
- **액션**: 클릭 시 동작

### 앱 실행 (Open With)
특정 앱으로 파일 열기
- **앱 선택**: 시스템 앱 또는 지정
- **파라미터**: 명령줄 인수
- **백그라운드**: 백그라운드 실행
        `,
        contentEn: `
# Action Types Detail

## File Operations

### Move
Move files to another folder
- **Target Folder**: Absolute or relative path
- **Conflict Handling**: Overwrite, skip, rename
- **Create Folder**: Auto-create if target doesn't exist

### Copy
Create file copies
- **Target Folder**: Copy destination
- **Name Pattern**: Copy naming rules
- **Preserve Metadata**: Keep original metadata

### Rename
Change file names
- **Pattern**: Date, number, text combination
- **Case Change**: Uppercase, lowercase, title
- **Replace**: Find and replace

### Delete
Remove files
- **To Trash**: Recoverable
- **Permanent**: Not recoverable
- **Secure Delete**: Overwrite then delete

## Organization Operations

### Add Tag
Apply macOS tags
- **Color Tags**: Red, orange, yellow, etc.
- **Custom Tags**: User-defined tags
- **Multiple Tags**: Apply multiple tags simultaneously

### Create Folder
Create new folders based on conditions
- **Name Pattern**: Based on date, filename
- **Hierarchy**: Create nested folders
- **Permissions**: Read/write permissions

### Compress
Compress files
- **Format**: ZIP, TAR, 7Z
- **Compression**: Maximum, normal, fast
- **Encryption**: Password protection

## System Operations

### Run Script
Execute custom scripts
- **Language**: Bash, Python, AppleScript
- **Parameters**: Pass file paths
- **Output**: Capture and log results

### Notify
Notify user
- **Message**: Custom message
- **Sound**: Choose notification sound
- **Action**: Click behavior

### Open With
Open files with specific app
- **App Selection**: System app or specify
- **Parameters**: Command line arguments
- **Background**: Background execution
        `
      },
      {
        id: 'faq',
        title: 'FAQ',
        titleEn: 'FAQ',
        content: `
# 자주 묻는 질문 (FAQ)

## 일반 질문

### Q: Filient는 무료인가요?
A: 기본 기능은 무료로 사용할 수 있으며, 고급 기능은 Pro 버전에서 사용 가능합니다.

### Q: Windows나 Linux에서도 사용할 수 있나요?
A: 현재는 macOS만 지원하며, 다른 플랫폼은 개발 중입니다.

### Q: 파일이 실수로 삭제될 위험은 없나요?
A: 모든 작업은 히스토리에 기록되며, 롤백 기능으로 즉시 복구할 수 있습니다.

## 설치 및 설정

### Q: "전체 디스크 접근 권한"이 필요한 이유는?
A: macOS의 보안 정책상 파일을 이동/복사하려면 이 권한이 필요합니다.

### Q: 설치 후 앱이 실행되지 않아요
A: macOS 10.15 이상인지 확인하고, 시스템 환경설정에서 보안 설정을 확인하세요.

## 규칙 관련

### Q: 규칙이 실행되지 않아요
A: 다음을 확인하세요:
- 규칙이 활성화되어 있는지
- 폴더 권한이 있는지
- 조건이 올바른지

### Q: 여러 규칙이 충돌하면 어떻게 되나요?
A: 우선순위가 높은 규칙부터 순서대로 실행됩니다.

### Q: 규칙을 다른 Mac에서도 사용할 수 있나요?
A: 규칙을 내보내기/가져오기 기능으로 공유할 수 있습니다.

## AI 어시스턴트

### Q: AI가 파일 내용을 읽나요?
A: 아니요, 파일 메타데이터만 분석하며 내용은 읽지 않습니다.

### Q: 오프라인에서도 AI를 사용할 수 있나요?
A: 로컬 AI 모델을 선택하면 오프라인에서도 사용 가능합니다.

## 문제 해결

### Q: 파일이 잘못 이동되었어요
A: 히스토리 탭에서 해당 작업을 찾아 "롤백" 버튼을 클릭하세요.

### Q: 앱이 느려졌어요
A: 다음을 시도해보세요:
- 오래된 히스토리 정리
- 사용하지 않는 규칙 비활성화
- 앱 재시작

### Q: 특정 폴더에 접근할 수 없어요
A: 해당 폴더의 권한을 확인하고, 필요시 Finder에서 권한을 수정하세요.

## 기타

### Q: 데이터는 어디에 저장되나요?
A: 모든 데이터는 로컬에 저장되며, ~/Library/Application Support/Filient에 위치합니다.

### Q: 백업은 어떻게 하나요?
A: 설정 > 백업에서 전체 설정과 규칙을 백업할 수 있습니다.

### Q: 지원은 어떻게 받나요?
A: support@filient.com으로 문의하거나 커뮤니티 포럼을 이용하세요.
        `,
        contentEn: `
# Frequently Asked Questions (FAQ)

## General Questions

### Q: Is Filient free?
A: Basic features are free, advanced features are available in Pro version.

### Q: Can I use it on Windows or Linux?
A: Currently only macOS is supported, other platforms are in development.

### Q: Is there risk of accidental file deletion?
A: All operations are logged in history and can be instantly recovered with rollback.

## Installation & Setup

### Q: Why is "Full Disk Access" permission needed?
A: macOS security policy requires this permission to move/copy files.

### Q: App won't run after installation
A: Check if you have macOS 10.15 or higher and verify security settings in System Preferences.

## Rules Related

### Q: My rule isn't running
A: Check the following:
- Is the rule activated?
- Do you have folder permissions?
- Are conditions correct?

### Q: What happens when multiple rules conflict?
A: Rules execute in order from highest to lowest priority.

### Q: Can I use rules on another Mac?
A: Yes, you can share rules using export/import feature.

## AI Assistant

### Q: Does AI read file contents?
A: No, only file metadata is analyzed, contents are not read.

### Q: Can I use AI offline?
A: Yes, select local AI model for offline use.

## Troubleshooting

### Q: Files were moved incorrectly
A: Find the operation in History tab and click "Rollback" button.

### Q: App has become slow
A: Try the following:
- Clean old history
- Disable unused rules
- Restart app

### Q: Can't access certain folders
A: Check folder permissions and modify in Finder if needed.

## Other

### Q: Where is data stored?
A: All data is stored locally in ~/Library/Application Support/Filient.

### Q: How do I backup?
A: You can backup all settings and rules in Settings > Backup.

### Q: How do I get support?
A: Contact support@filient.com or use the community forum.
        `
      }
    ]
  }
]