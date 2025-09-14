# GEMINI-GLOBAL.md

**전역 Gemini Code 프로젝트 템플릿 및 자동화 설정**
이 파일은 어떤 프로젝트에서든 복사하여 사용할 수 있는 범용 설정입니다.
`gemini --config .gemini.json`

## 🎯 핵심 동작 원칙 (Universal)

### 완전 자동화 모드 (Full Automation Mode)
- **`.gemini/settings.local.json`** 파일에 `automationLevel: "full"`이 설정된 경우, **모든 작업을 확인 없이 자동으로 진행합니다.**
- `/init` 또는 기능 구현 요청 시, 계획 수립 후 즉시 실행에 옮깁니다.
- 연관관계가 없는 작업들은 **병렬 처리**로 효율성을 극대화합니다.
- 사용자 개입을 최소화하고 최종 결과만 보고합니다.

## ⚙️ 프로젝트별 자동화 설정 (`.gemini/settings.local.json`)
모든 자동화 작업은 이 설정 파일을 기반으로 동작합니다.

```json
{
  "projectName": "test-gemini",
  "githubRepoUrl": "https://github.com/jeonck/test-gemini",
  "automationLevel": "full",
  "techStack": "Vite + React + Tailwind",
  "deployment": {
    "platform": "github-pages",
    "url": "https://jeonck.github.io/test-gemini/"
  }
}
```
- `projectName`: `package.json`의 `name`과 `vite.config.js`의 `base` 경로에 사용됩니다.
- `githubRepoUrl`: Git 원격 저장소 URL로 사용됩니다.
- `automationLevel`: `"full"`로 설정 시, 확인 절차를 생략합니다.
- `deployment.url`: 배포 완료 후 최종 확인 URL로 사용됩니다.

## 🚀 Vite + React + Tailwind CSS 프로젝트 표준 (Universal Template)

### 프로젝트 자동 설정
요구사항에 Vite + React + Tailwind가 포함되면 다음을 **자동 실행**:

#### 1. 프로젝트 구조 (표준 템플릿)
(기존과 동일)

#### 2. 필수 설정 파일들 (검증된 템플릿)

**vite.config.js (저장소명 자동 설정)**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// .gemini/settings.local.json의 projectName을 기반으로 자동 설정
export default defineConfig({
  plugins: [react()],
  base: '/{projectName}/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
```
(package.json, tailwind.config.js, postcss.config.js는 기존과 동일)


## 🔄 초기 설정 완전 자동화 워크플로우

### `/init vite+react+tailwind` 명령 시 자동 실행 순서
```bash
# 1단계: .gemini/settings.local.json 읽기
# 설정 파일이 없으면 사용자에게 기본 설정을 요청합니다.

# 2단계: 프로젝트 구조 생성
mkdir -p react-app/src react-app/public .github/workflows

# 3-11단계: 설정 및 소스 파일 생성 (병렬 처리)
# settings.local.json의 projectName 값을 사용하여 파일 내용 자동 생성
Write package.json
Write vite.config.js
Write tailwind.config.js
Write postcss.config.js
Write index.html
Write src/main.jsx
Write src/App.jsx (World Clock 예제 컴포넌트)
Write src/index.css
Write public/vite.svg
Write .github/workflows/deploy.yml

# 12-14단계: Git 초기화 및 원격 저장소 연결
git init
git remote add origin [settings.local.json의 githubRepoUrl 값]
git branch -m main

# 15-17단계: 의존성 설치 및 빌드 테스트
cd react-app && npm install
npm run build

# 18-20단계: 초기 커밋 및 푸시
git add .
git commit -m "feat: Initial project setup with World Clock example"
git push origin main
```

## 🤖 기능 추가 자동화 워크플로우
"월드 클럭 구현"과 같은 기능 요청 시 다음 프로세스를 자동으로 수행합니다.

```bash
# 1단계: 사용자 요청 분석
# "월드 클럭 구현" -> App.jsx 수정 필요성 인지

# 2단계: 소스 코드 수정
# App.jsx를 월드 클럭 기능으로 덮어쓰기
Write react-app/src/App.jsx

# 3단계: 변경사항 커밋 및 푸시
git add react-app/src/App.jsx
git commit -m "feat: Implement World Clock feature"
git push origin main

# 4단계: (선택) 배포 확인
# settings.local.json의 deployment.url을 주기적으로 확인하여 배포 성공 검증
```

## 📚 재사용 가능한 컴포넌트 템플릿

### App.jsx (World Clock 예제)
```jsx
import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const timezones = [
    { name: 'London', tz: 'Europe/London' },
    { name: 'New York', tz: 'America/New_York' },
    { name: 'Seoul', tz: 'Asia/Seoul' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12 tracking-wider">
          World Clock
        </h1>

        <div className="space-y-6">
          {timezones.map(({ name, tz }) => (
            <div key={name} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">{name}</h2>
                <p className="text-3xl font-mono text-green-400">
                  {time.toLocaleTimeString('en-US', { timeZone: tz, hour12: false })}
                </p>
              </div>
              <p className="text-right text-gray-400 mt-1">
                {time.toLocaleDateString('en-US', { timeZone: tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
```

---

**💡 핵심 철학**: "코드를 통해 아이디어를 현실로 만들고, 개발자의 생산성을 극대화하며, 항상 최신 기술을 활용하여 최고의 결과물을 제공합니다."

**🎯 사용법**: 이 파일을 새 프로젝트 루트에 복사하고 `.gemini/settings.local.json`을 설정한 후, `/init` 또는 기능 요청을 시작하여 Gemini의 완전 자동화된 워크플로우를 경험하세요.