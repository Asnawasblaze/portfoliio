import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 rounded-t-[3rem] -mt-10 relative z-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-sans font-black text-5xl mb-6">KPR</h2>
            <p className="font-mono text-gray-400 max-w-sm text-sm">
              We are building the future of storytelling and digital identity. 
              The Keep is open. Enter at your own risk.
            </p>
          </div>
          
          <div>
            <h3 className="font-mono text-xs font-bold text-gray-500 mb-6 uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-4 font-sans font-bold text-lg">
              {['Home', 'Story', 'Characters', 'Shop', 'Whitepaper'].map(item => (
                <li key={item}><a href="#" className="hover:text-kpr-purple transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-mono text-xs font-bold text-gray-500 mb-6 uppercase tracking-widest">Socials</h3>
            <ul className="space-y-4 font-sans font-bold text-lg">
              {['Twitter', 'Discord', 'Instagram', 'OpenSea'].map(item => (
                <li key={item}><a href="#" className="hover:text-kpr-purple transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-gray-600">© 2024 KPR PROTOCOL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="font-mono text-xs text-green-500">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};