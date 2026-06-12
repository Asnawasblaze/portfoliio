import React from 'react';

const Journal: React.FC = () => {
  return (
    <section id="journal" className="bg-white text-black py-32 overflow-hidden">
      <h2 className="page-title mb-12 px-16">JOURNAL</h2>
      
      <div className="logo-loop-container w-full py-8 group">
        <style>{`
            @keyframes logoLoop {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .logo-track {
                display: flex;
                align-items: center;
                gap: 60px;
                animation: logoLoop 25s linear infinite;
                width: max-content;
            }
            .logo-loop-container:hover .logo-track {
                animation-play-state: paused;
            }
            .logo-item {
                font-size: 45px;
                font-weight: 900;
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .logo-icon {
                font-size: 50px;
            }
        `}</style>
        <div className="logo-track">
            {/* Original Set */}
            <div className="logo-item">C</div>
            <i className="fa-brands fa-python logo-icon"></i>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" className="w-12 h-12 object-contain" alt="Java"/>
            <i className="fa-brands fa-js logo-icon"></i>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" className="w-12 h-12 object-contain" alt="R"/>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" className="w-12 h-12 object-contain" alt="VSCode"/>
            <i className="fa-brands fa-git-alt logo-icon"></i>
            <i className="fa-brands fa-github logo-icon"></i>
            <i className="fa-solid fa-brain logo-icon"></i>
            <i className="fa-solid fa-database logo-icon"></i>

            {/* Duplicates for Loop */}
             <div className="logo-item">C</div>
            <i className="fa-brands fa-python logo-icon"></i>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" className="w-12 h-12 object-contain" alt="Java"/>
            <i className="fa-brands fa-js logo-icon"></i>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" className="w-12 h-12 object-contain" alt="R"/>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" className="w-12 h-12 object-contain" alt="VSCode"/>
            <i className="fa-brands fa-git-alt logo-icon"></i>
            <i className="fa-brands fa-github logo-icon"></i>
            <i className="fa-solid fa-brain logo-icon"></i>
            <i className="fa-solid fa-database logo-icon"></i>
        </div>
      </div>
    </section>
  );
};

export default Journal;