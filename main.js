const teacherAccess = {
  MAAMHANNAGANDARA: { label: "Ma'am Hanna", matches: ["ma'am hanna", "maam hanna"] },
  MAAMMHIRAGANDA: { label: "Ma'am Mhira", matches: ["ma'am mhira", "maam mhira"] },
  SIRAIESPOGI: { label: "Sir Aies", matches: ["sir aies"] },
  SIRIANKAVOUGH: { label: "Sir Ian", matches: ["sir ian"] },
  SIRMARKMWAA: { label: "Sir Mark", matches: ["sir mark"] },
  BERNALDEZTEACHERS: { label: "Bernaldez Teachers", matches: ["bernaldez teachers", "teachers"] }
};

const teacherLetters = [
  { name: "Acaylar - Ma'am Hanna", path: "Acaylar/Ma'am Hanna.html" },
  { name: "Acaylar - Sir Aies", path: "Acaylar/Sir Aies.html" },
  { name: "Acaylar - Sir Ian", path: "Acaylar/Sir Ian.html" },
  { name: "Bernaldez - Sir Ian", path: "Bernaldez/Sir Ian/index.html" },
  { name: "Bernaldez - Sir Mark", path: "Bernaldez/Sir Mark/index.html" },
  { name: "Bernaldez - Teachers", path: "Bernaldez/Teachers/index.html" },
  { name: "Fronda - Maam Hanna", path: "Fronda/MaamHanna.html" },
  { name: "Fronda - Sir Aies", path: "Fronda/SirAies.html" },
  { name: "Fronda - Sir Ian", path: "Fronda/SirIan.html" },
  { name: "Gaba - Maam Hanna", path: "Gaba/MaamHanna.html" },
  { name: "Gaba - Sir Aies", path: "Gaba/SirAies.html" },
  { name: "Gaba - Sir Ian", path: "Gaba/SirIan.html" },
  { name: "Libed - Maam Hanna", path: "Libed/MaamHanna.html" },
  { name: "Libed - Sir Aies", path: "Libed/SirAies.html" },
  { name: "Libed - Sir Ian", path: "Libed/SirIan.html" },
  { name: "Lim - Maam Hanna", path: "Lim/MaamHanna.html" },
  { name: "Lim - Sir Aies", path: "Lim/SirAies.html" },
  { name: "Lim - Sir Ian", path: "Lim/SirIan.html" },
  { name: "Lobegas - Maam Mhira", path: "Lobegas/MaamMhira.html" },
  { name: "Lobegas - Sir Aies", path: "Lobegas/SirAies.html" },
  { name: "Lobegas - Sir Ian", path: "Lobegas/SirIan.html" },
  { name: "Miranda - Maam Hanna", path: "Miranda/MaamHanna.html" },
  { name: "Miranda - Maam Mhira", path: "Miranda/MaamMhira.html" },
  { name: "Miranda - Sir Ian", path: "Miranda/SirIan.html" },
  { name: "Mojica - Ma'am Mhira", path: "Mojica/Ma'am Mhira.html" },
  { name: "Mojica - Sir Aies", path: "Mojica/sir Aies.html" },
  { name: "Mojica - Sir Ian", path: "Mojica/sir Ian.html" },
  { name: "Pedines - Maam Hanna", path: "Pedines/maamhanna/teach 2.html" },
  { name: "Pedines - Sir Aies", path: "Pedines/siraies/teach 3.html" },
  { name: "Pedines - Sir Ian", path: "Pedines/sirian/tach 1.html" },
  { name: "Tepase - Maam Hanna", path: "Tepase/maamhanna.html" },
  { name: "Tepase - Maam Mhira", path: "Tepase/maammhira.html" },
  { name: "Tepase - Sir Ian", path: "Tepase/sirian.html" }
].filter((teacher) => {
  const label = teacher.name.toLowerCase();
  return label.includes("sir") || label.includes("maam") || label.includes("ma'am") || label.includes("teachers");
});

const loginForm = document.getElementById("loginForm");
const accessInput = document.getElementById("accessCode");
const loginMessage = document.getElementById("loginMessage");
const loginPanel = document.getElementById("loginPanel");
const lettersPanel = document.getElementById("lettersPanel");
const teacherGrid = document.getElementById("teacherGrid");
const logoutBtn = document.getElementById("logoutBtn");
const currentTeacherName = document.getElementById("currentTeacherName");

function setMessage(text, type) {
  loginMessage.textContent = text;
  loginMessage.className = `message ${type}`;
}

function isLoggedIn() {
  return !!sessionStorage.getItem("teacherLetterAccess");
}

function setTeacherAccess(teacherId) {
  sessionStorage.setItem("teacherLetterAccess", teacherId);
  localStorage.setItem("teacherAccess", teacherAccess[teacherId].label);
}

function clearTeacherAccess() {
  sessionStorage.removeItem("teacherLetterAccess");
  localStorage.removeItem("teacherAccess");
}

function getCurrentTeacher() {
  const teacherId = sessionStorage.getItem("teacherLetterAccess");
  return teacherAccess[teacherId] || null;
}

function matchesTeacher(teacherName, teacherProfile) {
  const normalizedName = teacherName.toLowerCase().replace(/['’]/g, "");
  return teacherProfile.matches.some((match) => {
    const normalizedMatch = match.toLowerCase().replace(/['’]/g, "");
    return normalizedName.includes(normalizedMatch);
  });
}

function renderLetters() {
  teacherGrid.innerHTML = "";

  const currentTeacher = getCurrentTeacher();
  const visibleLetters = currentTeacher
    ? teacherLetters.filter((teacher) => matchesTeacher(teacher.name, currentTeacher))
    : [];

  visibleLetters.forEach((teacher) => {
    const card = document.createElement("article");
    card.className = "teacher-card";

    const teacherName = (teacher.name.split(" - ")[1] || teacher.name).trim();
    const folderName = teacher.name.split(" - ")[0] || "Teacher";

    const badge = document.createElement("div");
    badge.className = "teacher-card-badge";
    badge.textContent = teacherName;

    const title = document.createElement("h3");
    title.textContent = folderName;

    const subtitle = document.createElement("p");
    subtitle.className = "teacher-card-subtitle";
    subtitle.textContent = "Open the teacher's letter";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Open Letter";
    button.addEventListener("click", () => {
      const safeUrl = encodeURI(teacher.path);
      window.location.href = safeUrl;
    });

    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(button);
    teacherGrid.appendChild(card);
  });
}

function updateCurrentTeacherLabel() {
  const teacher = getCurrentTeacher();
  if (currentTeacherName) {
    currentTeacherName.textContent = teacher ? teacher.label : "-";
  }
}

function showLetters() {
  loginPanel.classList.add("hidden");
  lettersPanel.classList.remove("hidden");
  updateCurrentTeacherLabel();
  renderLetters();
}

function showLogin() {
  lettersPanel.classList.add("hidden");
  loginPanel.classList.remove("hidden");
  if (currentTeacherName) {
    currentTeacherName.textContent = "-";
  }
  accessInput.value = "";
  accessInput.focus();
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredCode = accessInput.value.trim().toUpperCase();
  const teacherProfile = Object.entries(teacherAccess).find(([id, profile]) => id === enteredCode);

  if (teacherProfile) {
    const [teacherId] = teacherProfile;
    setTeacherAccess(teacherId);
    setMessage(`Access granted for ${teacherAccess[teacherId].label}.`, "success");
    showLetters();
    return;
  }

  setMessage("Invalid access code. Please try again.", "error");
  accessInput.value = "";
  accessInput.focus();
});

logoutBtn.addEventListener("click", () => {
  clearTeacherAccess();
  setMessage("You have been logged out.", "success");
  showLogin();
});

if (isLoggedIn()) {
  showLetters();
} else {
  showLogin();
}
