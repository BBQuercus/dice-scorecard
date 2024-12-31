import React from "react";

export default function GeneralInfo() {
  return (
    <div className="my-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">About</h2>
      <p className="text-sm text-gray-700">
        This is a small project I built in the train after being frustrated by
        the lack of useful digital scorecards. Feel free to use it to your
        disgression. For any suggestions, updates, questions, etc. please use
        the{" "}
        <a
          className="hover:underline"
          href="https://github.com/BBQuercus/dice-scorecard"
        >
          GitHub repo
        </a>{" "}
        where the code is open-sourced.
        <br />
        <br />© 2024 Bastian Eichenberger
      </p>
    </div>
  );
}
