"use client";
import { Lightbulb, Volume, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
    const textToSpeech=(text)=>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);

        }
        else{
            alert('Sorry, Your browser does not support to speech')
        }
    }

  return mockInterviewQuestion&&(
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gp-5">
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <h2
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
                 ${activeQuestionIndex == index && 'bg-primary text-white'} `}
            >
              Question #{index + 1}
            </h2>
          ))}
          
      </div>
      <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.Question}</h2>
          <Volume2 className='cursor-pointer' onClick={()=> textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)} />

      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 item-center text-primary">
            <Lightbulb/>
            <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>

    </div>
  );
}

export default QuestionsSection;
