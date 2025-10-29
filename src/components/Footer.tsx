"use client"

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { KakaoIcon } from '@/components/icons/KakaoIcon'
import { XIcon } from '@/components/icons/XIcon'
import { DisquietIcon } from '@/components/icons/DisquietIcon'

export function Footer() {
  const { t, language } = useLanguage()

  // Email subject based on language
  const emailSubject = language === 'ko'
    ? 'Filient%20문의'
    : 'Filient%20Inquiry'

  return (
    <footer className="py-12 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-gray-900">Filient</h3>

            {/* Disquiet Link */}
            <a
              href="https://disquiet.io/product/filient"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center transition-transform hover:scale-110"
              aria-label={t.footer.disquiet || "디스콰이엇에서 보기"}
            >
              <DisquietIcon size={28} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {t.footer.disquiet || "디스콰이엇에서 보기"}
              </span>
            </a>

            {/* KakaoTalk Link */}
            <a
              href="https://open.kakao.com/o/smeZtWXh"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center transition-transform hover:scale-110"
              aria-label={t.footer.kakaoChat || "카카오톡 오픈채팅"}
            >
              <KakaoIcon size={28} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {t.footer.kakaoChat || "오픈채팅 참여하기"}
              </span>
            </a>

            {/* X (Twitter) Link */}
            <a
              href="https://x.com/filient_app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center transition-transform hover:scale-110"
              aria-label={t.footer.xChat || "Contact on X"}
            >
              <XIcon size={28} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {t.footer.xChat || "Contact on X"}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              {t.footer.links.privacy}
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              {t.footer.links.terms}
            </Link>
            <a
              href={`mailto:bluegreen.soma@gmail.com?subject=${emailSubject}`}
              className="hover:text-gray-900 transition-colors"
            >
              {t.footer.links.contact}
            </a>
            <a
              href="https://forms.gle/QZKCSgFT4cwitzt79"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              {t.footer.links.feedback}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          {t.footer.copyright.replace('{{year}}', new Date().getFullYear().toString())}
        </div>
      </div>
    </footer>
  )
}
