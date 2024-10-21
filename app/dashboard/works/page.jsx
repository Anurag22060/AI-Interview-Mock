"use client";

import React from "react";

const HowItWorksPage = () => {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">How It Works</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-primary mb-4">
          Experience the Future of Interview Preparation with AI!
        </h3>
        <p className="text-gray-700 mb-4">
          Our platform leverages cutting-edge AI technology to simulate real
          interview scenarios, making your preparation effective and engaging.
          With personalized feedback and a user-friendly interface, you can
          enhance your interview skills from the comfort of your home.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-lg shadow-md bg-blue-50">
          <h4 className="font-bold text-lg text-green-500 mb-2">
            Step-by-Step Workflow
          </h4>
          <ol className="list-decimal list-inside text-gray-700">
            <li className="mb-2">Go to the Dashboard.</li>
            <li className="mb-2">Add a New Mock Interview or select from previous mocks.</li>
            <li className="mb-2">Fill in the required details.</li>
            <li className="mb-2">Start the interview.</li>
            <li className="mb-2">
              The AI will generate interview questions tailored to your profile.
            </li>
            <li className="mb-2">
              Turn on your camera and microphone to answer the questions.
            </li>
            <li className="mb-2">
              Enjoy the feature where AI reads the questions for you!
            </li>
            <li className="mb-2">
              After completing the interview, receive detailed feedback on your performance.
            </li>
          </ol>
        </div>

        <div className="border p-6 rounded-lg shadow-md bg-blue-50">
          <h4 className="font-bold text-lg text-green-500 mb-2">
            Key Features of Our AI Interview Mock
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            <li>Realistic interview simulations with AI-generated questions</li>
            <li>Customizable mock interview settings</li>
            <li>Real-time speech analysis and feedback</li>
            <li>Audio feature to hear questions aloud for better understanding</li>
            <li>Dive into detailed performance reports post-interview</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold text-primary mb-4">
          Start Your Journey Today!
        </h3>
        <p className="text-gray-700 mb-4">
          Embrace the power of AI and enhance your interview skills. Our platform
          is designed to help you succeed, ensuring you're well-prepared for your
          next big opportunity!
        </p>
      </div>
    </div>
  );
};

export default HowItWorksPage;
