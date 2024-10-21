"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModel";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment/moment";
import { UserAnswer } from "@/utils/schema";
import { toast } from "sonner";

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    const[userAnswer,setUserAnswer] = useState('');
    const{user} = useUser();
    const[loading,setLoading]= useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      },[results])

      useEffect(()=>{
        if(!isRecording && userAnswer.length>10){
          UpdateUserAnswer();
        }
      },[userAnswer])

      const StartStopRecording=async()=>{
        if(isRecording){
         
          stopSpeechToText();

          // if(userAnswer?.length<10){
          //   setLoading(false);
          //   toast('Error while saving your answer, Please record again')
          //   return;
          // }

        }
        else{
          startSpeechToText();
        }
      }

      const UpdateUserAnswer=async()=>{
        setLoading(true);
        console.log(userAnswer);
        
        const feedbackPrompt="Question:"+ mockInterviewQuestion[activeQuestionIndex]?.Question + ", User Answer:"+ userAnswer+",Depends on question and user answer for give interview question"+" please give us rating for answer out of 10 and feedback as area of improvement if any "+"in just 3-4 lines to improve it in JSON format with rating field and feedback field";

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
        console.log(mockJsonResp);
        const JsonFeedbackResp = JSON.parse(mockJsonResp);
        const resp= await db.insert(UserAnswer).values({
          mockIdRef:interviewData?.mockId,
          question:mockInterviewQuestion[activeQuestionIndex]?.Question, 
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.Answer,
          userAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy') 
        })
        if(resp){
          toast('User Answer recorded successfully')
        
        setUserAnswer('');
        setResults([]);
        }
        setResults([]);
        setLoading(false);
      }

  return (
    <div className="flex item-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-20">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button disabled={loading} variant="outline" className="my-10 w-auto mx-auto"
          onClick={StartStopRecording}>
        {isRecording?
        <h2 className="text-red-600 flex gap-2">
            <StopCircle/>Stop Recording
        </h2>
        :
        <h2 className="text-primary flex gap-2 items-center"><Mic/> Record Answer</h2>
        
        }
        </Button>
        {/* <Button className="w-auto mx-auto" onClick={()=>console.log(userAnswer)} >Show User Answer</Button> */}
    </div>
  );
}

export default RecordAnswerSection;
