"use client";

import React from "react";

const UpgradePage = () => {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Upgrade Your Experience</h2>

      <div className="border p-6 rounded-lg bg-blue-50 shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Good News!</h3>
        <p className="text-gray-700 mb-4">
          You don't need to upgrade anything for now, as our platform is
          currently <strong>completely free</strong> for all users.
        </p>
        <p className="text-gray-700 mb-4">
          Enjoy unlimited mock interviews, personalized feedback, and access to
          all the premium features without paying a single penny. We're here to
          help you prepare for interviews and succeed in your career journey!
        </p>

        <div className="bg-white p-5 rounded-lg border shadow-sm mt-4">
          <h4 className="font-bold text-lg text-green-500 mb-2">
            Free Features You Can Enjoy:
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            <li>Unlimited mock interviews with AI-generated questions</li>
            <li>Real-time feedback and performance analysis</li>
            <li>Detailed suggestions to improve your responses</li>
            <li>Access to expert-level interview questions</li>
            <li>Completely ad-free experience</li>
          </ul>
        </div>

        <p className="mt-6 text-gray-700">
          Stay tuned for exciting future updates! For now, enjoy all the premium
          features absolutely free.
        </p>
      </div>
    </div>
  );
};

export default UpgradePage;
