import Link from "next/link";
import SquigglyLines from "../common/SquigglyLines";

const Hero = () => {
  return (
    <div>
      <section
        className="container grid justify-center gap-6 py-8 md:py-12 lg:py-36 felx-wrap flex-col items-center w-full mt-24 px-4 fadeInUp mx-auto max-w-[900px] text-center"
        data-wow-delay=".2s"
      >
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
          Create{" "}
          <span className="relative whitespace-nowrap text-orange-500">
            <SquigglyLines />
            <span className="relative">Cover Letter</span>
          </span>{" "}
          in Seconds
        </h1>
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
          with GPT 3
        </h1>

        <p className="mb-5 text-base font-medium !leading-relaxed text-black/50 dark:text-white/50 dark:opacity-90 sm:text-lg md:text-xl">
          Input the job description and your resume, and we will generate a
          customized cover letter for you.
        </p>

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="/cover-letter"
            className="rounded-full bg-primary py-4 px-8 text-base font-semibold text-white dark:text-black bg-orange-500 dark:bg-orange-500 duration-300 ease-in-out hover:bg-orange-400 dark:hover:bg-white/80"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/BruceWangyq/cover-letter-gpt"
            className="rounded-full bg-black/20 py-4 px-8 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
          >
            Star on GitHub
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
