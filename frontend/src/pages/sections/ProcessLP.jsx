import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

function ProcessLP() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div
      id=""
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <div
        id="wrapper-content-process"
        className="max-w-7xl flex flex-col w-full px-3 py-32"
      >
        <div className="flex flex-col gap-4 py-20">
          <h2 className="text-center text-4xl sm:text-6xl font-bold font-titles tracking-tighter text-slate-900">
            Vos idées ont de l'impact
          </h2>
          <h5 className="sm:text-2xl text-xl text-center text-slate-700">
            Donnez vie à vos idées, soutenez celles qui <br /> vous inspirent et
            observez le changement en temps réel.
          </h5>
        </div>

        <div
          ref={ref}
          id="cards-container-process"
          className="flex flex-col max-w-6xl gap-40"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 500 },
              visible: { opacity: 1, y: 0 },
            }}
            whileInView={{ opacity: 1 }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="flex flex-row justify-between items-center w-full gap-8"
          >
            <div className="w-full h-full flex flex-col sm:flex-row ">
              <div className="bg-white w-full h-full">
                <img
                  src="../../assets/images/browserCapture1.svg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center sm:items-start">
                <h3 className="text-4xl sm:text-4xl font-bold font-titles tracking-tighter text-slate-900">
                  1. Proposez l’innovation
                </h3>
                <h6 className="sm:text-xl text-xl text-slate-700">
                  il n'a jamais été aussi simple, <br /> de mettre en avant vos
                  brillantes idées.
                </h6>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-row justify-between items-center w-full gap-8">
            <div className="w-full h-full flex flex-col sm:flex-row  ">
              <div className="bg-white w-full h-full">
                <img
                  src="../../assets/images/browserCapture2.svg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center sm:items-start">
                <h3 className="text-4xl sm:text-4xl font-bold font-titles tracking-tighter text-slate-900">
                  2. Votez pour le progrès
                </h3>
                <h6 className="sm:text-xl text-xl text-slate-700">
                  Explorez et soutenez les idées en vogue.
                </h6>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center w-full gap-8">
            <div className="w-full h-full flex flex-col sm:flex-row  ">
              <div className="bg-white w-full h-full">
                <img
                  src="../../assets/images/browserCapture3.svg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center sm:items-start">
                <h3 className="text-4xl sm:text-4xl font-bold font-titles tracking-tighter text-slate-900">
                  3. Suivez les décisions
                </h3>
                <h6 className="sm:text-xl text-xl text-slate-700">
                  Regardez votre idée prendre vie, <br /> célébrez sa
                  réalisation
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessLP;
