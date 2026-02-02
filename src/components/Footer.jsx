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
        <div className="px-6 py-10 border-b border-white/10 text-center">
          <a href="/privacy-policy" className="text-4xl font-bold drop-shadow-[0_0_15px_#6366f1]">
          
        
            Privacy Policy
          </a>
          &nbsp;|&nbsp;
          <a href="/dmca" className="text-4xl font-bold drop-shadow-[0_0_15px_#6366f1]">
            DMCA
          </a>
          &nbsp;|&nbsp;
          <a href="/terms" className="text-4xl font-bold drop-shadow-[0_0_15px_#6366f1]">
            Terms
          </a>
          &nbsp;|&nbsp;
          <a href="/contact" className="text-4xl font-bold drop-shadow-[0_0_15px_#6366f1]">
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
