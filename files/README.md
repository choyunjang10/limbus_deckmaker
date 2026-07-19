# 림버스 컴퍼니 인격 덱 생성기 (팬메이드)

키워드를 선택하면 12수감자 각각에서 가장 잘 맞는 인격을 하나씩 뽑아 12인격 덱을 만들어주는
정적(static) 웹 페이지입니다. 빌드 도구 없이 순수 HTML/CSS/JS로만 되어 있어 GitHub Pages에
바로 올릴 수 있습니다.

## ⚠️ 데이터에 대한 안내

`data.json`의 인격/키워드 데이터는 baslimbus.info를 실시간으로 크롤링한 것이 아니라,
**데모용으로 작성한 예시 데이터**입니다 (해당 사이트는 자바스크립트 렌더링 방식이라
자동 크롤링이 불가능했습니다). 실제 게임 정보와 다를 수 있으니, 아래 방법으로 직접 보완하세요.

### 데이터를 정확하게 채우는 방법
1. `data.json`을 열어 각 인격의 `name`, `rarity`, `keywords`를 실제 정보로 수정
2. 필요하면 인격을 더 추가 (형식은 기존 항목과 동일하게)
3. `keywords`에 새로운 키워드를 쓰고 싶다면 `script.js` 상단의 `KEYWORD_LIST` 배열에도 추가

## 로컬에서 미리보기

브라우저 보안 정책(CORS) 때문에 `index.html`을 그냥 더블클릭하면 `data.json`을 못 불러올 수
있습니다. 아래처럼 간단한 로컬 서버를 띄워서 확인하세요.

```bash
cd limbus-deck-gen
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

## GitHub Pages로 배포하기

1. GitHub에서 새 저장소를 만듭니다 (예: `limbus-deck-gen`).
2. 이 폴더(`index.html`, `style.css`, `script.js`, `data.json`)의 내용을 저장소 루트에 push 합니다.

   ```bash
   cd limbus-deck-gen
   git init
   git add .
   git commit -m "Initial commit: 림버스 덱 생성기"
   git branch -M main
   git remote add origin https://github.com/<사용자명>/<저장소명>.git
   git push -u origin main
   ```

3. GitHub 저장소 페이지 → **Settings** → **Pages** 메뉴로 이동합니다.
4. **Build and deployment** → **Source**를 `Deploy from a branch`로 설정합니다.
5. **Branch**를 `main` / `/(root)`로 선택하고 **Save**를 누릅니다.
6. 1~2분 후 `https://<사용자명>.github.io/<저장소명>/` 주소로 접속하면 페이지가 열립니다.

## 파일 구성

```
limbus-deck-gen/
├── index.html    # 메인 페이지 구조
├── style.css     # 다크 테마 스타일
├── script.js     # 덱 생성 로직 (키워드 매칭 알고리즘)
├── data.json     # 인격/키워드 데이터 (직접 보완 필요)
└── README.md     # 이 파일
```
