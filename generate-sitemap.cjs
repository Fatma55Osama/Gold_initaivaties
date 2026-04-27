const fs = require("fs");
const axios = require("axios");
const https = require("https");
const { SitemapStream, streamToPromise } = require("sitemap");

const siteUrl = process.env.SITE_URL || "https://1000goldendays.mohp.gov.eg";

// https agent لتجاهل SSL مؤقتًا
const agent = new https.Agent({ rejectUnauthorized: false });

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: siteUrl });
  const { getDomain } = await import("./src/configLoader.js"); // import ديناميكي
  const domain = getDomain();

  const staticPages = [
    "/",
    "/infograph",
    "/about",
    "/contactus",
    "/indicators",
    "/Services",
    "/mediacorner",
    "/photo",
    "/video",
    "/messages",
    "/lightteam",
    "/opinion",
    "/jointeams",
    "/register",
    "/login",
    "/forgetpassword",
    "/consultationnew",
    "/consultationold",
    "/question",
  ];
  staticPages.forEach((page) =>
    sitemap.write({ url: page, changefreq: "weekly", priority: 0.8 })
  );

  // ✅ Infograph
// ✅ Infographs
try {
  const { data } = await axios.get(`${domain}/api/InfographControllerAPI`, { httpsAgent: agent });
  data.forEach(item => {
    if (item.id) {
      sitemap.write({
        url: `/infograph/detailsinfograph/${item.id}`,
        changefreq: "weekly",
        priority: 0.7,
      });
    } else {
      console.warn("⚠️ تم تجاهل عنصر بدون id في infographs:", item);
    }
  });
} catch (error) {
  console.error("⚠️ فشل في جلب الـ infographs:", error.message);
}

// ✅ أخبار
try {
  const { data } = await axios.get(`${domain}/api/NewsControllerAPI`, { httpsAgent: agent });
  data.forEach(item => {
    if (item.id) {
      sitemap.write({
        url: `/mediacorner/detailsnews/${item.id}`,
        changefreq: "weekly",
        priority: 0.7,
      });
    } else {
      console.warn("⚠️ تم تجاهل عنصر بدون id في الأخبار:", item);
    }
  });
} catch (error) {
  console.error("⚠️ فشل في جلب الأخبار:", error.message);
}

// ✅ Light team
try {
  const { data } = await axios.get(`${domain}/api/VActiveEmpControllerAPI`, { httpsAgent: agent });
  data.forEach(item => {
    if (item.id) {
      sitemap.write({
        url: `/lightteam/detailslightteam/${item.id}`,
        changefreq: "weekly",
        priority: 0.7,
      });
    } else {
      console.warn("⚠️ تم تجاهل عنصر بدون id في lightteam:", item);
    }
  });
} catch (error) {
  console.error("⚠️ فشل في جلب lightteam:", error.message);
}

  // ✅ Services
  try {
    const { data } = await axios.get(`${domain}/api/VServicesControllerAPI`, {
      httpsAgent: agent,
    });

    data.forEach((item) => {
      if (item.id) {
        sitemap.write({
          url: `/Services/${item.id}`,
          changefreq: "weekly",
          priority: 0.7,
        });
      } else {
        console.warn("⚠️ تم تجاهل عنصر بدون id في Services:", item);
      }
    });
  } catch (error) {
    console.error("⚠️ فشل في جلب الـ Services:", error.message);
  }

  sitemap.end();
  const xml = await streamToPromise(sitemap);
  fs.writeFileSync("public/sitemap.xml", xml.toString());
  console.log("✅ Sitemap generated at public/sitemap.xml");
}

generateSitemap();
