"use client"
import React, { useState } from "react";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
    const[openDialog,setOpenDialog]= useState(false);
    const[jobPosition,setJobPosition] = useState();
    const[jobDesc,setJobDesc] = useState();
    const[jobExperience,setJobExperience] = useState();
    const[loading,setLoading] = useState(false);
    const[jsonResponse,setJsonResponse] = useState([]);
    const router = useRouter();
    const {user} = useUser();


    const onSubmit = async(e)=>{
      setLoading(true);
      e.preventDefault(); // Used to stop refreshing the console automatically
      // console.log(jobPosition,jobDesc,jobExperience);

      // Gemini AI working code 

      const InputPrompt = "Job Position: "+jobPosition+", Job Description: "+jobDesc+" , Years of Experience: "+jobExperience+" , Depending on this information please provide me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions with answers in JSON Format, Give Question and Answered as field in JSON"

      const result = await chatSession.sendMessage(InputPrompt); // send prompt to AI
      const MockJsonResp = (result.response.text()).replace('```json','').replace('```','');
      // console.log(JSON.parse(MockJsonResp));// send the gather result to console in text format.
      setJsonResponse(MockJsonResp);

      if(MockJsonResp){
      const resp = await db.insert(MockInterview).values({
        mockId:uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDesc,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')
      }).returning({mockId:MockInterview.mockId});
      
      // console.log("Inserted ID:",resp);
      if(resp)
      {
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
    }
    else{
      console.log("ERROR");
    }
      setLoading(false);
    }
  return (
    <div>
    <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
    onClick={()=> setOpenDialog(true)}
    >
      <h2 className="text-lg text-center">
        + Add New
      </h2>
      </div>
      <Dialog open={openDialog}>
        
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
            <DialogDescription>
            <form onSubmit = {onSubmit}>
              <div>
                
                <h2>Add Details about your Job position/role, Job Description and Years of experience</h2>
                <div className="mt-7 my-3">
                  <label>Job Role/Job Position</label>
                  <Input placeholder="Ex. Full stack Developer" required
                  onChange={(e)=> setJobPosition(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Job Description/ Tech Stack (In Short)</label>
                  <Textarea placeholder="Ex.React, Angular,NodeJs,MySql etc" required
                  onChange={(e)=> setJobDesc(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Years of experience</label>
                  <Input placeholder="Ex.5" type="number" max="100" required
                    onChange={(e)=> setJobExperience(e.target.value)}
                  />
                 
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={()=> setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" disabled={loading} >
                {loading?
                <>
                  <LoaderCircle className="animate-spin"/>Generating from AI</>:'Start Interview'
                
                }
                </Button>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
   
    </div>
  );
};

export default AddNewInterview;
