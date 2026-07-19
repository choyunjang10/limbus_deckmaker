const KEYWORD_LIST = ["출혈", "화상", "침몰", "붕괴", "진동", "충전", "기품", "매혹"];
const SINNER_ORDER = [
  "이상", "파우스트", "돈키호테", "료슈", "뫼르소", "홍루",
  "히스클리프", "이스마엘", "로쟈", "싱클레어", "오티스", "그레고르"
];

let identities = [];
let selectedKeywords = new Set();

const keywordListEl = document.getElementById("keyword-list");
const deckGridEl = document.getElementById("deck-grid");
const scoreSummaryEl = document.getElementById("score-summary");
const generateBtn = document.getElementById("generate-btn");
const randomBtn = document.getElementById("random-btn");

async function init() {
  const res = await fetch("data.json");
  identities = await res.json();
  renderKeywordChips();
  generateBtn.addEventListener("click", () => renderDeck(buildDeck(selectedKeywords)));
  randomBtn.addEventListener("click", () => renderDeck(buildRandomDeck()));
}

function renderKeywordChips() {
  keywordListEl.innerHTML = "";
  KEYWORD_LIST.forEach((kw) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = kw;
    chip.addEventListener("click", () => {
      if (selectedKeywords.has(kw)) {
        selectedKeywords.delete(kw);
        chip.classList.remove("active");
      } else {
        selectedKeywords.add(kw);
        chip.classList.add("active");
      }
    });
    keywordListEl.appendChild(chip);
  });
}

// 각 수감자(sinner)마다, 선택된 키워드와 가장 많이 겹치는 인격을 하나씩 고른다.
// 동점일 경우 레어도가 높은 쪽 우선, 그래도 동점이면 무작위.
function buildDeck(keywordSet) {
  const deck = [];
  SINNER_ORDER.forEach((sinner) => {
    const candidates = identities.filter((i) => i.sinner === sinner);
    if (candidates.length === 0) return;

    let best = [];
    let bestScore = -1;
    candidates.forEach((c) => {
      const score = c.keywords.filter((k) => keywordSet.has(k)).length;
      if (score > bestScore) {
        bestScore = score;
        best = [c];
      } else if (score === bestScore) {
        best.push(c);
      }
    });

    // 레어도 우선, 남으면 무작위
    const maxRarity = Math.max(...best.map((c) => c.rarity));
    const topRarity = best.filter((c) => c.rarity === maxRarity);
    const chosen = topRarity[Math.floor(Math.random() * topRarity.length)];
    deck.push({ ...chosen, matchScore: bestScore });
  });
  return deck;
}

function buildRandomDeck() {
  const deck = [];
  SINNER_ORDER.forEach((sinner) => {
    const candidates = identities.filter((i) => i.sinner === sinner);
    if (candidates.length === 0) return;
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    deck.push({ ...chosen, matchScore: 0 });
  });
  return deck;
}

function renderDeck(deck) {
  deckGridEl.innerHTML = "";

  const totalScore = deck.reduce((sum, d) => sum + d.matchScore, 0);
  scoreSummaryEl.textContent = selectedKeywords.size
    ? `선택 키워드: ${[...selectedKeywords].join(", ")} · 총 매칭 점수: ${totalScore}`
    : `키워드를 선택하지 않으면 각 수감자의 인격 중 하나가 무작위로 뽑혀요.`;

  deck.forEach((identity) => {
    const card = document.createElement("div");
    card.className = "identity-card";

    const sinnerEl = document.createElement("div");
    sinnerEl.className = "sinner";
    sinnerEl.textContent = identity.sinner;

    const nameEl = document.createElement("div");
    nameEl.className = "name";
    nameEl.textContent = identity.name;

    const starsEl = document.createElement("div");
    starsEl.className = "stars";
    starsEl.textContent = "★".repeat(identity.rarity + 1);

    const kwListEl = document.createElement("div");
    kwListEl.className = "kw-list";
    identity.keywords.forEach((kw) => {
      const kwEl = document.createElement("span");
      kwEl.className = "kw" + (selectedKeywords.has(kw) ? " matched" : "");
      kwEl.textContent = kw;
      kwListEl.appendChild(kwEl);
    });

    card.appendChild(sinnerEl);
    card.appendChild(nameEl);
    card.appendChild(starsEl);
    card.appendChild(kwListEl);
    deckGridEl.appendChild(card);
  });
}

init();
