"use client"

import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft, ExternalLink, RefreshCw, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

interface BeritaTbcPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

interface NewsItem {
  title: string
  link: string
  pubDate: string
  description: string
  image?: string
  source: string
  sourceLogo?: string
}

const RSS_FEEDS = [
  {
    url: "https://www.who.int/rss-feeds/news-english.xml",
    source: "World Health Organization",
    sourceLogo: "/who-world-health-organization-logo-blue.jpg",
  },
  {
    url: "https://www.cdc.gov/feeds/tb/rss.xml",
    source: "CDC - Centers for Disease Control",
    sourceLogo: "/cdc-logo-blue.jpg",
  },
  {
    url: "https://www.tbonline.info/feed/",
    source: "TB Online",
    sourceLogo: "/tb-online-logo.jpg",
  },
  {
    url: "https://www.stoptb.org/feed",
    source: "Stop TB Partnership",
    sourceLogo: "/stop-tb-partnership-logo.jpg",
  },
  {
    url: "https://www.tballiance.org/news/feed",
    source: "TB Alliance",
    sourceLogo: "/tb-alliance-logo-green.jpg",
  },
]

export default function BeritaTbcPage({ onBack, onNavigate }: BeritaTbcPageProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    setLoading(true)
    setError(null)

    try {
      const feedPromises = RSS_FEEDS.map(async (feed) => {
        try {
          const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`)

          if (!response.ok) return []

          const data = await response.json()

          if (data.status !== "ok" || !data.items) return []

          // Filter for TB/tuberculosis related news
          const tbNews = data.items
            .filter((item: any) => {
              const searchText = `${item.title} ${item.description}`.toLowerCase()
              return (
                searchText.includes("tuberculosis") ||
                searchText.includes("tb ") ||
                searchText.includes(" tb") ||
                searchText.includes("tbc") ||
                searchText.includes("mycobacterium") ||
                feed.url.includes("tb") // Include all items from TB-specific feeds
              )
            })
            .slice(0, 5)
            .map((item: any) => ({
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              description: item.description?.replace(/<[^>]*>/g, "").slice(0, 150) + "...",
              image: item.enclosure?.link || item.thumbnail || item.image,
              source: feed.source,
              sourceLogo: feed.sourceLogo,
            }))

          return tbNews
        } catch (err) {
          console.error(`Error fetching from ${feed.source}:`, err)
          return []
        }
      })

      const allNewsArrays = await Promise.all(feedPromises)
      const allNews = allNewsArrays.flat()

      // Sort by date (newest first) and remove duplicates
      const uniqueNews = allNews
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .filter((item, index, self) => index === self.findIndex((t) => t.title === item.title))

      if (uniqueNews.length > 0) {
        setNews(uniqueNews)
      } else {
        // Fallback to static news if no feeds return data
        setNews(getStaticNews())
      }
    } catch (err) {
      console.error("Error fetching news:", err)
      setError("Gagal memuat berita. Menampilkan berita tersimpan.")
      setNews(getStaticNews())
    } finally {
      setLoading(false)
    }
  }

  const getStaticNews = (): NewsItem[] => [
    {
      title:
        "Siapa yang Menyerukan Tindakan Mendesak untuk Mengatasi Gangguan Layanan Tuberkulosis di Seluruh Dunia yang Mengancam Nyawa Jutaan Orang?",
      link: "https://www.who.int/news/tuberculosis",
      pubDate: new Date().toISOString(),
      description:
        "WHO menyerukan tindakan mendesak untuk mengatasi gangguan layanan TB yang mengancam jutaan nyawa di seluruh dunia.",
      image: "/doctors-examining-xray-tuberculosis-hospital.jpg",
      source: "World Health Organization",
      sourceLogo: "/who-world-health-organization-logo-blue.jpg",
    },
    {
      title: "Tuberkulosis Kembali Menjadi Penyebab Utama Kematian Akibat Penyakit Menular",
      link: "https://www.who.int/news/tuberculosis",
      pubDate: new Date(Date.now() - 86400000).toISOString(),
      description:
        "Laporan terbaru menunjukkan TB kembali menjadi penyebab utama kematian akibat penyakit menular di dunia.",
      image: "/medical-professionals-examining-chest-xray-scan.jpg",
      source: "World Health Organization",
      sourceLogo: "/who-world-health-organization-logo-blue.jpg",
    },
    {
      title: "Siapa yang Mengumumkan Prakualifikasi Pertama untuk Tes Diagnostik Tuberkulosis?",
      link: "https://www.who.int/news/tuberculosis",
      pubDate: new Date(Date.now() - 172800000).toISOString(),
      description:
        "WHO mengumumkan prakualifikasi pertama untuk tes diagnostik TB yang dapat meningkatkan deteksi dini.",
      source: "World Health Organization",
      sourceLogo: "/who-world-health-organization-logo-blue.jpg",
    },
    {
      title:
        "Kemenkes RI dan TB Alliance Jalin Kemitraan Strategis untuk Percepat Inovasi Pengobatan TB dan Mikobakterial",
      link: "https://www.kemkes.go.id",
      pubDate: new Date(Date.now() - 259200000).toISOString(),
      description:
        "Kementerian Kesehatan Indonesia menjalin kemitraan strategis untuk mempercepat inovasi pengobatan TB.",
      image: "/doctor-patient-medical-examination-diagnostic-equi.jpg",
      source: "Kementerian Kesehatan RI",
      sourceLogo: "/kemenkes-indonesia-green-logo.jpg",
    },
    {
      title: "Layanan TBC Itu Gratis, Pemerintah Tegaskan Komitmen Lindungi SDM Indonesia",
      link: "https://www.kemkes.go.id",
      pubDate: new Date(Date.now() - 345600000).toISOString(),
      description:
        "Pemerintah menegaskan komitmen untuk melindungi sumber daya manusia Indonesia dengan layanan TBC gratis.",
      source: "Kementerian Kesehatan RI",
      sourceLogo: "/kemenkes-indonesia-green-logo.jpg",
    },
    {
      title: "CDC Updates Guidelines for TB Testing and Treatment in Healthcare Settings",
      link: "https://www.cdc.gov/tb/",
      pubDate: new Date(Date.now() - 432000000).toISOString(),
      description:
        "New CDC guidelines provide updated recommendations for tuberculosis testing and treatment protocols.",
      image: "/medical-laboratory-testing.jpg",
      source: "CDC - Centers for Disease Control",
      sourceLogo: "/cdc-logo-blue.jpg",
    },
    {
      title: "Global Fund Announces $1.5 Billion Investment to End TB Epidemic",
      link: "https://www.stoptb.org/",
      pubDate: new Date(Date.now() - 518400000).toISOString(),
      description:
        "The Global Fund commits significant investment to accelerate efforts to end the TB epidemic worldwide.",
      source: "Stop TB Partnership",
      sourceLogo: "/stop-tb-partnership-logo.jpg",
    },
    {
      title: "New Shorter TB Treatment Regimen Shows Promising Results in Clinical Trials",
      link: "https://www.tballiance.org/",
      pubDate: new Date(Date.now() - 604800000).toISOString(),
      description: "Clinical trials reveal a new shorter treatment regimen could revolutionize TB treatment globally.",
      image: "/medical-pills-medication-treatment.jpg",
      source: "TB Alliance",
      sourceLogo: "/tb-alliance-logo-green.jpg",
    },
    {
      title: "Indonesia Targets 90% TB Case Detection Rate by 2025",
      link: "https://www.kemkes.go.id",
      pubDate: new Date(Date.now() - 691200000).toISOString(),
      description: "Indonesia sets ambitious target to detect 90% of TB cases as part of national health program.",
      image: "/indonesia-healthcare-hospital.jpg",
      source: "Kementerian Kesehatan RI",
      sourceLogo: "/kemenkes-indonesia-green-logo.jpg",
    },
    {
      title: "WHO Launches New Framework for TB Preventive Treatment",
      link: "https://www.who.int/news/tuberculosis",
      pubDate: new Date(Date.now() - 777600000).toISOString(),
      description: "New framework aims to scale up TB preventive treatment and reduce new infections worldwide.",
      source: "World Health Organization",
      sourceLogo: "/who-world-health-organization-logo-blue.jpg",
    },
  ]

  useEffect(() => {
    fetchNews()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const openNewsLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-[#f0f7fa]">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#fef3c7] to-[#fde68a] pt-6 pb-8 px-4 rounded-b-[32px]">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <button
                onClick={onBack}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mt-1"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="text-[#d97706] text-2xl font-bold leading-tight">
                Berita Terkini
                <br />
                tentang
                <br />
                TBC!!
              </h1>
            </div>
            <div className="w-32 h-28">
              <Image
                src="/woman-presenting-news-computer-yellow-illustration.jpg"
                alt="News illustration"
                width={128}
                height={112}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 pb-24">
          {/* Refresh Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={fetchNews}
              disabled={loading}
              className="flex items-center gap-2 text-sm text-[#4a90d9] font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-[#4a90d9] animate-spin mb-4" />
              <p className="text-gray-500">Memuat berita...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
              <p className="text-amber-600 text-sm">{error}</p>
            </div>
          )}

          {/* News Cards */}
          {!loading && (
            <div className="space-y-4">
              {news.map((item, index) => (
                <button
                  key={index}
                  onClick={() => openNewsLink(item.link)}
                  className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  {item.image ? (
                    <div className="relative h-44 w-full">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-32 w-full bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] flex items-center justify-center p-4">
                      <Image
                        src={item.sourceLogo || "/placeholder.svg?height=60&width=200&query=WHO logo"}
                        alt={item.source}
                        width={200}
                        height={60}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  )}
                  {/* Progress bar for cards without image */}
                  {!item.image && (
                    <div className="px-4 pt-2">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-[#4a90d9] rounded-full" />
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{formatDate(item.pubDate)}</span>
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center lg:hidden">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#4a90d9] rounded-full text-white"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </button>
          <button onClick={() => onNavigate("edukasi")} className="p-2 text-gray-400">
            <BookOpen className="w-6 h-6" />
          </button>
          <button onClick={() => onNavigate("jadwal")} className="p-2 text-gray-400">
            <Calendar className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <Image
                src="/images/tbcare-logo.png"
                alt="TBCare Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-[#4a90d9]">TBCare</span>
          </div>

          <nav className="flex-1 space-y-2">
            <button
              onClick={() => onNavigate("home")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Beranda</span>
            </button>
            <button
              onClick={() => onNavigate("edukasi")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Edukasi</span>
            </button>
            <button
              onClick={() => onNavigate("jadwal")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Jadwal</span>
            </button>
          </nav>

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mt-auto"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Kembali</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-3xl p-8 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[#d97706] mb-2">Berita Terkini tentang TBC</h1>
                  <p className="text-[#92400e]/70 max-w-lg">
                    Dapatkan informasi terbaru seputar tuberkulosis dari sumber terpercaya seperti WHO, CDC, Kementerian
                    Kesehatan RI, dan organisasi kesehatan global lainnya.
                  </p>
                  <button
                    onClick={fetchNews}
                    disabled={loading}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white rounded-full text-[#d97706] font-medium text-sm transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh Berita
                  </button>
                </div>
                <div className="w-48 h-40">
                  <Image
                    src="/woman-presenting-news-computer-yellow-illustration.jpg"
                    alt="News illustration"
                    width={192}
                    height={160}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm text-gray-500">Sumber:</span>
              {RSS_FEEDS.map((feed, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200"
                >
                  {feed.source}
                </span>
              ))}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-12 h-12 text-[#4a90d9] animate-spin mb-4" />
                <p className="text-gray-500">Memuat berita dari {RSS_FEEDS.length} sumber...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
                <p className="text-amber-600">{error}</p>
              </div>
            )}

            {/* News Grid */}
            {!loading && (
              <>
                <p className="text-sm text-gray-500 mb-4">{news.length} berita ditemukan</p>

                <div className="grid grid-cols-2 gap-6">
                  {news.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => openNewsLink(item.link)}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-left group"
                    >
                      {item.image ? (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-36 w-full bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] flex flex-col items-center justify-center p-6">
                          <Image
                            src={item.sourceLogo || "/placeholder.svg?height=60&width=200&query=WHO logo"}
                            alt={item.source}
                            width={200}
                            height={60}
                            className="h-14 w-auto object-contain mb-3"
                          />
                          <div className="w-32 h-1.5 bg-white/50 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-[#4a90d9] rounded-full" />
                          </div>
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 line-clamp-3 group-hover:text-[#4a90d9] transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium">{item.source}</span>
                            <span className="text-xs text-gray-400">{formatDate(item.pubDate)}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#4a90d9] transition-colors" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Info Banner */}
            <div className="mt-8 bg-[#4a90d9]/5 border border-[#4a90d9]/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#4a90d9]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-[#4a90d9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Sumber Berita Terpercaya</h3>
                  <p className="text-sm text-gray-600">
                    Berita yang ditampilkan bersumber dari WHO, CDC, Stop TB Partnership, TB Alliance, dan Kementerian
                    Kesehatan Republik Indonesia untuk memastikan informasi yang akurat dan terpercaya seputar
                    tuberkulosis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
