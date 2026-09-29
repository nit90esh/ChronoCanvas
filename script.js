const UNSPLASH_ACCESS_KEY = "GUGU8HN5OMYC8-n5NSrhpUCYnnNurbcKLxNs8QnyO2s";
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
let globalTimeOfDay = null;
const body = document.getElementsByTagName("body")[0];
body.style.backgroundSize = "cover";
body.style.backgroundPosition = "center";
body.style.backgroundRepeat = "no-repeat";
function drawClock(ctx, radius) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // Draw fancy face with gradient and glow
  ctx.save();
  let faceGradient = ctx.createRadialGradient(
    200,
    200,
    radius * 0.2,
    200,
    200,
    radius,
  );
  faceGradient.addColorStop(0, "#23272b");
  faceGradient.addColorStop(0.7, "#23272b");
  faceGradient.addColorStop(1, "#00ffe7");
  ctx.beginPath();
  ctx.arc(200, 200, radius, 0, 2 * Math.PI);
  ctx.fillStyle = faceGradient;
  ctx.shadowColor = "#00ffe7";
  ctx.shadowBlur = 32;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(0,255,231,0.25)";
  ctx.stroke();
  ctx.restore();

  // Draw numbers with neon glow
  ctx.save();
  ctx.font = "bold 28px Segoe UI, Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num <= 12; num++) {
    let ang = ((num - 3) * (Math.PI * 2)) / 12;
    let x = 200 + Math.cos(ang) * (radius - 40);
    let y = 200 + Math.sin(ang) * (radius - 40);
    ctx.save();
    ctx.shadowColor = "#00ffe7";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#fff";
    ctx.fillText(num, x, y);
    ctx.restore();
  }
  ctx.restore();

  // Draw ticks with color accent
  ctx.save();
  for (let i = 0; i < 60; i++) {
    let ang = ((i - 15) * (Math.PI * 2)) / 60;
    ctx.beginPath();
    ctx.moveTo(
      200 + Math.cos(ang) * (radius - 16),
      200 + Math.sin(ang) * (radius - 16),
    );
    ctx.lineTo(
      200 + Math.cos(ang) * (radius - (i % 5 === 0 ? 32 : 24)),
      200 + Math.sin(ang) * (radius - (i % 5 === 0 ? 32 : 24)),
    );
    ctx.strokeStyle = i % 5 === 0 ? "#00ffe7" : "#fff3";
    ctx.lineWidth = i % 5 === 0 ? 4 : 1.5;
    ctx.shadowColor = i % 5 === 0 ? "#00ffe7" : "transparent";
    ctx.shadowBlur = i % 5 === 0 ? 8 : 0;
    ctx.stroke();
  }
  ctx.restore();
}

function drawHands(ctx, radius, now) {
  let hour = now.getHours() % 12;
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ms = now.getMilliseconds();

  // Hour hand (gradient, shadow)
  let hourAngle = ((hour + minute / 60) * Math.PI * 2) / 12 - Math.PI / 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(
    200 + Math.cos(hourAngle) * (radius - 110),
    200 + Math.sin(hourAngle) * (radius - 110),
  );
  ctx.strokeStyle = ctx.createLinearGradient(
    200,
    200,
    200 + Math.cos(hourAngle) * (radius - 110),
    200 + Math.sin(hourAngle) * (radius - 110),
  );
  ctx.strokeStyle.addColorStop(0, "#00ffe7");
  ctx.strokeStyle.addColorStop(1, "#fff");
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.shadowColor = "#00ffe7";
  ctx.shadowBlur = 16;
  ctx.stroke();
  ctx.restore();

  // Minute hand (gradient, shadow)
  let minAngle = ((minute + second / 60) * Math.PI * 2) / 60 - Math.PI / 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(
    200 + Math.cos(minAngle) * (radius - 70),
    200 + Math.sin(minAngle) * (radius - 70),
  );
  ctx.strokeStyle = ctx.createLinearGradient(
    200,
    200,
    200 + Math.cos(minAngle) * (radius - 70),
    200 + Math.sin(minAngle) * (radius - 70),
  );
  ctx.strokeStyle.addColorStop(0, "#fff");
  ctx.strokeStyle.addColorStop(1, "#00ffe7");
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.shadowColor = "#00ffe7";
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.restore();

  // Second hand (neon accent)
  let secAngle = ((second + ms / 1000) * Math.PI * 2) / 60 - Math.PI / 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(
    200 + Math.cos(secAngle) * (radius - 50),
    200 + Math.sin(secAngle) * (radius - 50),
  );
  ctx.strokeStyle = "#ff00cc";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.shadowColor = "#ff00cc";
  ctx.shadowBlur = 16;
  ctx.stroke();
  ctx.restore();

  // Center dot (glow)
  ctx.save();
  ctx.beginPath();
  ctx.arc(200, 200, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "#00ffe7";
  ctx.shadowBlur = 24;
  ctx.fill();
  ctx.restore();
}
function getCurrentTime(now) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value || 0,
  );
  return { hour, minute, totalMinutes: hour * 60 + minute };
}
function getTimeOfDay(hour, minute) {
  const totalMinutes = hour * 60 + minute;
  const DAWN_START = 5 * 60; // 05:00
  const DAY_START = 7 * 60; // 07:00
  const SUNSET_START = 17 * 60; // 17:00
  const NIGHT_START = 19 * 60; // 19:00
  if (totalMinutes >= DAWN_START && totalMinutes < DAY_START) {
    return "dawn";
  }
  if (totalMinutes >= DAY_START && totalMinutes < SUNSET_START) {
    return "day";
  }
  if (totalMinutes >= SUNSET_START && totalMinutes < NIGHT_START) {
    return "sunset";
  }
  return "night";
}

function getSearchQuery(timeOfDay) {
  const queries = {
    dawn: [
      "dawn landscape",
      "sunrise landscape",
      "early morning landscape",
      "morning sky landscape",
    ],
    day: [
      "beautiful daytime landscape",
      "bright landscape",
      "daytime city",
      "modern city daylight",
    ],
    sunset: [
      "golden hour landscape",
      "sunset landscape",
      "golden hour city",
      "evening landscape",
    ],
    night: [
      "night landscape",
      "night city",
      "city lights night",
      "dark blue night landscape",
    ],
  };
  const options = queries[timeOfDay];
  return options[Math.floor(Math.random() * options.length)];
}
async function fetchUnsplashImages(query) {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("Unsplash Access Key is missing.");
  }
  const params = new URLSearchParams({
    query,
    orientation: "landscape",
    per_page: "1",
    content_filter: "high",
  });
  const url = `${UNSPLASH_API_URL}?${params.toString()}`;
  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  });
  if (!response.ok) {
    throw new Error(
      `Unsplash API error: ${response.status} ${response.statusText}`,
    );
  }
  const data = await response.json();
  return data.results;
}
async function updateBackgroundImage(now) {
  const currentTime = getCurrentTime(now);
  const timeOfDay = getTimeOfDay(currentTime.hour, currentTime.minute);
  if (globalTimeOfDay !== timeOfDay) {
    globalTimeOfDay = timeOfDay;
    const query = getSearchQuery(timeOfDay);
    const results = await fetchUnsplashImages(query);
    if (results.length > 0) {
      const imageUrl = results[0].urls.full;
      body.style.backgroundImage = `url(${imageUrl})`;
    } else {
      const hours = currentTime.hour;
      if (hours >= 5 && hours < 12) {
        body.style.backgroundImage = "url('./assets/day.png')";
      } else if (hours >= 12 && hours < 18) {
        body.style.backgroundImage = "url('./assets/noon.png')";
      } else {
        body.style.backgroundImage = "url('./assets/night.png')";
      }
    }
  }
}

function updateClock() {
  const canvas = document.getElementById("analog-clock");
  const ctx = canvas.getContext("2d");
  const radius = 180;
  const now = new Date();
  drawClock(ctx, radius);
  drawHands(ctx, radius, now);

  // Date display
  const dateDisplay = document.getElementById("date-display");
  // Format date
  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // Format time in 12-hour with AM/PM
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
  dateDisplay.textContent = `${dateStr} | ${timeStr}`;
  updateBackgroundImage(now);
}

const quote = fetch("https://dummyjson.com/quotes/random");
quote
  .then((response) => response.json())
  .then((data) => {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `- ${data.author}`;
  });

setInterval(updateClock, 1000);
window.onload = updateClock;
