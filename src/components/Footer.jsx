export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-400 text-sm space-y-4">

        {/* DISCLAIMER */}
        <p className="leading-relaxed">
          All anime characters, names, and related trademarks are the property of
          their respective owners.
          <br />
          All wallpapers on AuraAnime are fan-made or AI-generated and are not
          affiliated with or endorsed by any official studios or creators.
        </p>

        {/* LINKS */}
        <div className="px-6 py-10 border-b border-white/10 text-center text-gray-400">
          <a href="/privacy-policy" className="text-white text-base font-bold drop-shadow-[0_0_8px_#6366f1] hover:drop-shadow-[0_0_18px_#8b5cf6] transition-all">
            Privacy Policy
          </a>
          &nbsp;|&nbsp;
          <a href="/dmca" className="text-white text-base font-bold drop-shadow-[0_0_8px_#6366f1] hover:drop-shadow-[0_0_18px_#8b5cf6] transition-all">
            DMCA
          </a>
          &nbsp;|&nbsp;
          <a href="/terms" className="text-white text-base font-bold drop-shadow-[0_0_8px_#6366f1] hover:drop-shadow-[0_0_18px_#8b5cf6] transition-all">
            Terms
          </a>
          &nbsp;|&nbsp;
          <a href="/contact" className="text-white text-base font-bold drop-shadow-[0_0_8px_#6366f1] hover:drop-shadow-[0_0_18px_#8b5cf6] transition-all">
            Contact
          </a>
        </div>

        {/* COPYRIGHT */}
        <p className="text-xs text-gray-500">
          © 2026 AuraAnime. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
