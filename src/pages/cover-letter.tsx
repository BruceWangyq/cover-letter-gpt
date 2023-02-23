import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Layout from "@/components/layout";

import LoadingDots from "@/components/common/LoadingDots";
import ResizablePanel from "@/components/common/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [generatedTexts, setGeneratedTexts] = useState<string>("");

  const prompt = `Create cover letter based on the job description: ${jobDescription} and resume: ${resume}`;

  const generate = async (e: any) => {
    e.preventDefault();
    setGeneratedTexts("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    console.log("data: ", data);
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      console.log("chunkValue: ", chunkValue);
      setGeneratedTexts((prev) => prev + chunkValue);
      console.log("generatedBios: ", generatedTexts);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center mt-24">
        <h1 className="sm:text-3xl text-2xl max-w-2xl font-bold text-orange-600 dark:text-orange-400 text-center">
          Input the job description and your resume, and we will generate a
          customized cover letter for you.
        </h1>

        <div className="max-w-xl md:max-w-2xl w-full flex flex-col justify-center">
          <div className="grid md:grid-cols-2 mx-auto md:space-x-8 w-full">
            <div className="flex flex-col w-full mt-10 items-center justify-center px-8 md:px-0">
              <p className="text-left font-medium text-orange-700 dark:text-orange-300">
                Input the job description.
              </p>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                className="w-full h-24 rounded-md border-2 p-3 border-orange-300 shadow-sm focus:border-black focus:ring-black my-5 mx-auto bg-white"
                placeholder={
                  "e.g. This is a sentence have a lot of grammar mistake."
                }
              />
            </div>

            <div className="flex flex-col w-full mt-10 items-center justify-center px-8 md:px-0">
              <p className="text-left font-medium text-orange-700 dark:text-orange-300">
                Input your resume.
              </p>

              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                rows={4}
                className="w-full h-24 rounded-md border-2 p-3 border-orange-300 shadow-sm focus:border-black focus:ring-black my-5 mx-auto bg-white"
                placeholder={
                  "e.g. This is a sentence have a lot of grammar mistake."
                }
              />
            </div>
          </div>

          {!loading && (
            <div className="flex justify-center">
              <button
                className="bg-orange-500 rounded-xl text-white dark:bg-orange-500 dark:text-black font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-orange-400 dark:hover:bg-orange-400 w-1/3 mx-2"
                onClick={(e) => generate(e)}
              >
                Generate
              </button>
            </div>
          )}
          {loading && (
            <button
              className="bg-orange-500 dark:bg-orange-500 rounded-xl text-white dark:text-black font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full dark:border-orange-500 dark:border-2"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedTexts && (
                <>
                  <h2 className="sm:text-4xl text-3xl font-bold text-orange-700 dark:text-orange-500 mx-auto text-center">
                    Here&apos;s your cover letter
                  </h2>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-12">
                    <div
                      className="bg-white dark:bg-orange-800 rounded-xl shadow-md p-4 border-orange-500 border-2 hover:bg-gray-100 transition cursor-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedTexts);
                        toast("Bio copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                    >
                      <p className="text-black dark:text-white">
                        {generatedTexts}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </div>
    </Layout>
  );
};

export default Home;
