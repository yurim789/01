const counts = {
    "매우 그렇지 않다": 0,
    "그렇지 않다": 0,
    "보통": 0,
    "그렇다": 0,
    "매우 그렇다": 0
};

const ageCounts = {
    "20대": 0,
    "30대": 0,
    "40대": 0,
    "50대": 0,
    "60대": 0,
    "70대 이상": 0
};

const experienceCounts = {
    "1년 미만": 0,
    "1년~3년 미만": 0,
    "3년~6년 미만": 0,
    "6년~9년 미만": 0,
    "9년 이상": 0
};

const questionCounts = {
    q1: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q2: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q3: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q4: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q5: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q6: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q7: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q8: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q9: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q10: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q11: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q12: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q13: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0},
    q14: {"매우 그렇지 않다": 0, "그렇지 않다": 0, "보통": 0, "그렇다": 0, "매우 그렇다": 0}
};

let opinions = [];
let difficulties = [];

document.addEventListener("DOMContentLoaded", function() {
    // 모든 라디오 버튼에 클릭 이벤트 추가
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener("click", function() {
            if (this.previous) {
                this.checked = false;
                this.previous = false;
            } else {
                this.previous = true;
            }
        });
    });
});

function addResponse() {
    // 연령대 카운트
    const ageGroupRadios = document.getElementsByName("age-group");
    ageGroupRadios.forEach(radio => {
        if (radio.checked) {
            ageCounts[radio.value]++;
        }
    });

    // 경력 카운트
    const experienceRadios = document.getElementsByName("experience");
    experienceRadios.forEach(radio => {
        if (radio.checked) {
            experienceCounts[radio.value]++;
        }
    });

    // 설문 항목 카운트
    const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14"];
    questions.forEach(q => {
        const radios = document.getElementsByName(q);
        radios.forEach(radio => {
            if (radio.checked) {
                questionCounts[q][radio.value]++;
            }
        });
    });

    // 기타 의견 및 고충 추가
    const opinion = document.getElementById("opinion").value;
    if (opinion) {
        opinions.push(opinion);
        document.getElementById("opinion").value = "";
    }

    const difficulty = document.getElementById("difficulty").value;
    if (difficulty) {
        difficulties.push(difficulty);
        document.getElementById("difficulty").value = "";
    }

    updateCounts();
}

function updateCounts() {
    // 연령대 결과 업데이트
    document.getElementById("age-group-results").innerHTML = Object.keys(ageCounts).map(age => `<li>${age}: ${ageCounts[age]}</li>`).join("");

    // 경력 결과 업데이트
    document.getElementById("experience-results").innerHTML = Object.keys(experienceCounts).map(exp => `<li>${exp}: ${experienceCounts[exp]}</li>`).join("");

    // 설문 항목 결과 업데이트
    const questionTexts = [
        "교과과정이 잘 구성되었다고 생각합니까?",
        "교육 내용은 보수교육의 목적과 맞게 적절하다고 생각합니까?",
        "교육 내용이 현장과 관련성이 높다고 생각합니까?",
        "강사는 강의를 이해하기 쉽게 강의하였습니까?",
        "강사는 주제에 맞는 준비와 열의를 가지고 강의하였습니까?",
        "강사가 강의 주제에 맞는 전문성을 갖추었다고 생각합니까?",
        "교육 기간 및 시간은 적절하였다고 생각합니까?",
        "교육 내용에 맞는 사전준비가 이루어졌다고 생각합니까?",
        "교육 시작부터 수료까지 원활하게 운영되었다고 생각합니까?",
        "교육 중 불편사항 발생 시 교육기관이 적절히 대응하였다고 생각합니까?",
        "교육 진행 장소의 접근성이 적절하다고 생각합니까?",
        "교육 시설의 편리성과 수업 준비가 잘 갖추어졌다고 생각합니까?",
        "이 교육이 아이돌보미 활동에 도움이 될 것이라고 생각합니까?",
        "전반적으로 이 교육에 만족하십니까?"
    ];
    
    const questionResults = questionTexts.map((text, index) => {
        const q = `q${index + 1}`;
        const results = questionCounts[q];
        return `<li>${text}: 매우 그렇지 않다(${results["매우 그렇지 않다"]}), 그렇지 않다(${results["그렇지 않다"]}), 보통(${results["보통"]}), 그렇다(${results["그렇다"]}), 매우 그렇다(${results["매우 그렇다"]})</li>`;
    }).join("");
    
    document.getElementById("question-results").innerHTML = questionResults;

    // 기타 의견 및 고충 업데이트
    document.getElementById("opinion-results").innerHTML = opinions.map(opinion => `<li>${opinion}</li>`).join("");
    document.getElementById("difficulty-results").innerHTML = difficulties.map(difficulty => `<li>${difficulty}</li>`).join("");
}
