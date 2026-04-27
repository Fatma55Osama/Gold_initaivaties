let config = null;
//  fetch("/config.json?v=4");
export async function loadConfig() {
  try {
    const res = await fetch(`/config.json?v=${Date.now()}`);
    config = await res.json();
  } catch (error) {
    config = {
      API_URL: "https://localhost:7220",
      PATH_IMG: "https://localhost:7220/Upfiles",
       SITE_URL: "https://1000goldendays.mohp.gov.eg"
    };
  }
}

export function getDomain() {
  return config?.API_URL || "https://localhost:7220";
}

export function getPathImg() {
  return config?.PATH_IMG || "https://localhost:7220/Upfiles";
}
export function getSiteUrl() {
  return config?.SITE_URL || "https://1000goldendays.mohp.gov.eg";
}