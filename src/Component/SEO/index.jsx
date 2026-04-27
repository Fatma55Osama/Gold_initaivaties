import { Helmet } from "react-helmet-async";
import { getDomain, getPathImg, getSiteUrl } from "../../configLoader";
import { useLocation } from "react-router-dom";

export default function Seo({ title, description, image, url }) {
    const pathimg = getPathImg()
    const domain = getDomain()
    const location = useLocation();
    const currentUrl = location.pathname; // "/infograph"
    const siteUrl = getSiteUrl()
    // console.log(`${siteUrl}${currentUrl}`)
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "مبادرة الألف يوم الذهبية",
        "url": "https://1000goldendays.mohp.gov.eg",
        "logo": "/src/assets/1000Logo-WNOvseAe-WNOvseAe.png",
        "sameAs": [
            "https://www.facebook.com/egypt.mohp",
        ]
    };
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="index,follow" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image || `${domain}/assets/1000Logo-WNOvseAe-WNOvseAe.png`} />
            <meta property="og:url" content={url || `${siteUrl}${currentUrl}`} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || `${domain}/assets/1000Logo-WNOvseAe-WNOvseAe.png`} />
            
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
}
