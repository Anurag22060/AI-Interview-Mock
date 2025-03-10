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
        results?.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      },[results])

      useEffect(()=>{
        if(!isRecording && userAnswer?.length>10){
          UpdateUserAnswer();
        }
      },[userAnswer])

      const StartStopRecording=async()=>{
        if(isRecording){
         
          stopSpeechToText();


        }
        else{
          startSpeechToText();
        }
      }

      // const UpdateUserAnswer=async()=>{
      //   setLoading(true);
      //   console.log(userAnswer);
        
      //   const feedbackPrompt="Question:"+ mockInterviewQuestion[activeQuestionIndex]?.Question + ", User Answer:"+ userAnswer+",Depends on question and user answer for give interview question"+" please give us rating for answer out of 10 and feedback as area of improvement if any "+"in just 3-4 lines to improve it in JSON format with rating field and feedback field";

      //   const result = await chatSession.sendMessage(feedbackPrompt);
      //   const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
      //   // console.log(mockJsonResp);
      //   const JsonFeedbackResp = JSON.parse(mockJsonResp);
      //   const resp= await db.insert(UserAnswer).values({
      //     mockIdRef:interviewData?.mockId,
      //     question:mockInterviewQuestion[activeQuestionIndex]?.Question, 
      //     correctAns:mockInterviewQuestion[activeQuestionIndex]?.Answer,
      //     userAns:userAnswer,
      //     feedback:JsonFeedbackResp?.feedback,
      //     rating:JsonFeedbackResp?.rating,
      //     userEmail:user?.primaryEmailAddress?.emailAddress,
      //     createdAt:moment().format('DD-MM-yyyy') 
      //   })
      //   if(resp){
      //     toast('User Answer recorded successfully')
      //     setUserAnswer('');
      //     setResults([]);
      //   }
      //   setResults([]);
      //   setLoading(false);
      // }


      const UpdateUserAnswer = async () => {
        setLoading(true);
        console.log(userAnswer);
        
        const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.Question + ", User Answer:" + userAnswer + ", Depends on question and user answer for give interview question" + " please give us rating for answer out of 10 and feedback as area of improvement if any " + "in just 3-4 lines to improve it in JSON format with rating field and feedback field";
    
        try {
            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            const JsonFeedbackResp = JSON.parse(mockJsonResp);
    
            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.Question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy')
            });
    
            if (resp) {
                toast('User Answer recorded successfully');
            }
        } catch (error) {
            console.error("Error saving user answer:", error);
            toast('Error recording answer');
        } finally {
            
            setUserAnswer(''); // Clear user answer
            setResults([]);    // Clear speech recognition results
            setLoading(false); // Stop the loading state
        }
    }
    

  return (
    

    <div className="flex item-center justify-center flex-col">
    <div className="relative flex flex-col justify-center items-center bg-black rounded-lg mt-20">
      <Webcam
        mirrored={true}
        style={{
          height: 300,
          width: "100%",
          zIndex: 10,
          objectFit: "cover",
          borderRadius: "0.5rem", 
        }}
      />
      <Image
        src={"/webcam.png"}
        width={200}
        height={200}
        className="absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
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
