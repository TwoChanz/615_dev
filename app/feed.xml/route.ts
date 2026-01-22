import { getAllContent } from "@/lib/content"

export async function GET() {
  const baseUrl = "https://six1five.dev"
  const content = getAllContent()

  const itemsXml = content
    .map((item) => {
      const typeUrls = {
        blog: "blog",
        guide: "guides",
        lab: "labs",
      }
      const url = `${baseUrl}/${typeUrls[item.type]}/${item.slug}`

      return `
        <item>
          <title><![CDATA[${item.title}]]></title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <description><![CDATA[${item.description}]]></description>
          <pubDate>${new Date(item.date).toUTCString()}</pubDate>
          <category>${item.type}</category>
          ${item.tags.map((tag) => `<category>${tag}</category>`).join("\n          ")}
        </item>`
    })
    .join("")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Six1Five Devs</title>
    <link>${baseUrl}</link>
    <description>Build. Ship. Document. - Developer brand building in public, shipping real tools, and documenting the journey.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/icon-192.png</url>
      <title>Six1Five Devs</title>
      <link>${baseUrl}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
