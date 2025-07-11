import React from "react";

function Body() {
  return (
    <>
    
<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Purple Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)`,
    }}
  />
   <section>
        <div className="flex bg-cover bg-no-repeat bg-center bg-[url('/wh-bg.jpeg')] dark:bg-[url('/blueGradient.jpeg')]   ">
          <div className="h-screen w-full bg-Logo bg-no-repeat bg-center bg-contain flex items-center justify-center dark:bg-bkLogo z-10 "></div>
        </div>
      </section>
     
</div>



    
     

      <section id="about" class="px-8 py-12 bg-pandaWhite dark:bg-pandaBlack text-pandaBlack dark:text-pandaWhite">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-4xl font-bold mb-4">What is PillPanda?</h2>
          <p class="text-lg leading-relaxed">
            <strong>PillPanda</strong> helps you find medicines fast — no more
            calling around or guessing who has stock. Whether you're managing
            prescriptions, looking after someone else, or just need an urgent
            refill, PillPanda lets you check real-time availability, compare
            prices, and even locate alternatives from nearby pharmacies.
          </p>
          <p class="text-lg leading-relaxed mt-4">
            It’s built for speed, simplicity, and clarity — putting accurate
            medical access at your fingertips.
          </p>
        </div>
      </section>
    </>
  );
}

export default Body;
