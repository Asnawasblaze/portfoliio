import React from 'react';

const Protocol: React.FC = () => {
  return (
    <section id="protocol" className="bg-black text-white py-32 px-16 min-h-screen">
      <h2 className="page-title mb-12">PROTOCOL</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300">
            <div className="w-full h-[250px] bg-gradient-to-br from-[#667eea] to-[#764ba2]"></div>
            <div className="p-6">
              <h3 className="mb-2">Card Title {item}</h3>
              <p className="body-text opacity-80">
                This is the description text for the protocol card. It provides details about the content and showcases the project highlights.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Protocol;