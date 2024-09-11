import Header from "../components/Header.astro";
import Layout from "../layouts/Layout.astro";

import Footer from "../components/Footer.astro";

export default function EmailForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { fullName, email, message } = Object.fromEntries(formData);
    console.log({ fullName, email, message });
    try {
      const res = await fetch("/api/sendEmail.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Mensaje para Casa de Vida <onboarding@resend.dev>",
          to: ["joaco0mr4@gmail.com"],
          subject: `Mensaje de ${fullName} - ${email}`,
          html: `${message}`,
        }),
      });
      const data = await res.json();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <main className="bg-white flex items-center justify-center py-32">
        <div className="md:flex items-center justify-center gap-x-28">
          <div className="w-auto flex flex-col px-3">
            <div className="">
              <h1 className="text-3xl font-extrabold text-[#141414] mt-5">
                Contáctanos
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-y-2 mt-5"
            >
              <h2 className="font-semibold text-[#141414] min-h-full">
                Nombres y Apellidos
              </h2>
              <input
                className="bg-[#0059AD] bg-opacity-10 text-[#141414] md:w-[299px] w-[280px] h-[34px] rounded-md p-2"
                type="name"
                name="fullName"
                placeholder="name"
              />
              <h2 className="font-semibold text-[#141414]">
                Correo electrónico
              </h2>
              <input
                className="bg-[#0059AD] bg-opacity-10 text-[#141414] md:w-[299px] w-[280px] h-[34px] rounded-md p-2"
                type="email"
                name="email"
                placeholder="email"
              />
              <h2 className="font-semibold text-[#141414]">Mensaje</h2>
              <input
                className="bg-[#0059AD] bg-opacity-10 text-[#141414] md:w-[299px] w-[280px] h-[130px] rounded-md p-2 resize-none"
                type="text"
                name="message"
                placeholder="message"
              />
              <input
                type="submit"
                value="Send Email"
                className="bg-[#0059AD] text-white font-semibold rounded-md w-28 h-10 mt-6 hover:bg-sky-700"
              ></input>
            </form>
          </div>
          <div className="font-medium flex flex-col items-start w-full md:pt-0 pt-16">
            <div className="font-medium flex flex-col items-start w-80">
              <div className="relative pl-4">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-[#0059AD] rounded-lg"></div>
                <div className="pl-4">
                  <p className="text-[#141414] md:text-[16px] text-[14px]">
                    "Muchas gracias por contactarnos. Es nuestro deseo servirte
                    de la mejor manera que podamos. Pronto estaremos en contacto
                    contigo. Si tienes tiempo visita nuestro sitio si quieres
                    saber mas acerca de nosotros"
                  </p>
                  <p className="text-[#141414] md:text-[16px] text-[14px] mt-4 font-bold">
                    Ps. Angelo Oncoy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
