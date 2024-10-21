"use client";

import React from "react";

const QuestionsPage = () => {
  // Example frequently asked questions (FAQ)
  const faqData = [
    {
      question: "How would AI interview mock website help clear interviews?",
      answer:
        "Our platform provides real-time AI-generated interview questions and feedback, helping you practice and improve your responses for actual interviews.",
    },
    {
      question: "What are the different features provided on this platform?",
      answer:
        "The platform offers mock interviews, real-time feedback, detailed performance analysis, and AI-based suggestions for improving interview skills.",
    },
    {
      question: "Is the AI interview mock website free to use?",
      answer:
        "Yes, the platform is completely free for now, providing unlimited mock interviews and full access to all features without any charge.",
    },
    {
      question: "How accurate is the feedback provided by the AI?",
      answer:
        "The AI leverages advanced algorithms and models to provide accurate feedback based on your answers, helping you identify strengths and areas for improvement.",
    },
    {
      question: "Can I choose the difficulty level of the mock interviews?",
      answer:
        "Yes, you can select the difficulty level based on your preparation stage, ranging from beginner to expert-level interviews.",
    },
  ];

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

      <div className="space-y-5">
        {faqData.map((faq, index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-50">
            <h3 className="font-bold text-lg text-primary mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
