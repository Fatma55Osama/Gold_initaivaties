let config = null;
//  fetch("/config.json?v=4");
export async function loadConfig() {
  try {
    const res = await fetch(`/config.json?v=${Date.now()}`);
    config = await res.json();
    console.log("✅ config loaded:", config);
  } catch (error) {
    console.error("❌ Failed to load config.json", error);
    config = {
      API_URL: "http://163.121.35.181:10026/api",
      PATH_IMG: "http://163.121.35.181:10027/Upfiles",
    };
  }
}

export function getDomain() {
  return config?.API_URL || "http://163.121.35.181:10026/api";
}

export function getPathImg() {
  return config?.PATH_IMG || "http://163.121.35.181:10027/Upfiles";
}
