"use client";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function UploadAlert({ visible }: { visible: boolean }) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
    if (visible) {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
      <CheckCircle className="w-4 h-4" />
      <span>File uploaded successfully!</span>
    </div>
  );
}

// return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-background"
//     >
//       {analysis && (
//         <div className="container mx-auto px-6 py-8 max-w-7xl pt-24">
//           {/* Header with Theme Toggle */}
//           <div className="mb-8 flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
//                 Resume Analysis Dashboard
//               </h1>
//               <p className="text-slate-600 dark:text-slate-400">
//                 Comprehensive analysis of your resume&apos;s ATS compatibility
//                 and job match
//               </p>
//             </div>
//           </div>

//           {/* Key Metrics Overview */}
//           <MetricsOverview analysis={analysis} />

//           {/* Overall Assessment */}
//           <OverallAssessment score={analysis.ATS_score} />

//           {/* Detailed Analysis Tabs */}
//           <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
//             <Tabs defaultValue="breakdown" className="w-full">
//               <CardHeader className="pb-0">
//                 <TabsList className="grid w-full grid-cols-5 bg-slate-100 dark:bg-neutral-800 h-12">
//                   <TabsTrigger
//                     value="breakdown"
//                     className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400"
//                   >
//                     Score Breakdown
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="keywords"
//                     className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400"
//                   >
//                     Keywords Analysis
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="skills"
//                     className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400"
//                   >
//                     Skills Assessment
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="feedback"
//                     className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400"
//                   >
//                     Detailed Feedback
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="recommendations"
//                     className="data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400"
//                   >
//                     Recommendations
//                   </TabsTrigger>
//                 </TabsList>
//               </CardHeader>

//               <div className="p-6">
//                 <TabsContent value="breakdown" className="mt-0 space-y-6">
//                   <ScoreBreakdown analysis={analysis} />
//                 </TabsContent>

//                 <TabsContent value="keywords" className="mt-0 space-y-6">
//                   <KeywordsAnalysis analysis={analysis} />
//                 </TabsContent>

//                 <TabsContent value="skills" className="mt-0 space-y-6">
//                   <SkillsAssessment analysis={analysis} />
//                 </TabsContent>

//                 <TabsContent value="feedback" className="mt-0 space-y-6">
//                   <DetailedFeedback analysis={analysis} />
//                 </TabsContent>

//                 <TabsContent value="recommendations" className="mt-0 space-y-6">
//                   <Recommendations analysis={analysis} />
//                 </TabsContent>
//               </div>
//             </Tabs>
//           </Card>
//         </div>
//       )}

//       {/* <Button
//         variant="outline"
//         className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
//         onClick={() => {
//           localStorage.removeItem("cachedResumeAnalysis");
//           window.location.reload();
//         }}
//       >
//         <RefreshCw className="w-4 h-4 mr-2" />
//         Refresh Analysis
//       </Button> */}
//     </motion.div>
//   );
// }
