import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card"
import { Zap, BookOpen, Clock, Target } from "lucide-react"

const PerformanceInsights = () => {
  return (

    <Card className="rounded-2xl border-0 my-6 md:my-10 mx-4 md:mx-20 shadow-none">
      {/* 4 Cards Responsive Grid */}
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:p-10">

        {/* Card 1 */}
        <div className="flex items-start gap-3 p-10 border border-gray-200  shadow-2xl rounded-3xl hover:scale-110 duration-700">
          <div className="p-2 rounded-xl bg-yellow-100">
            <Zap className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-semibold">Faster Completion</p>
            <p className="text-xs text-gray-500">CSS Mastery</p>
            <p className="text-xs text-gray-400">3 days</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-6 md:p-10 border border-gray-200 shadow-xl md:shadow-2xl rounded-3xl hover:scale-105 md:hover:scale-110 duration-700">
          <div className="p-2 rounded-xl bg-blue-100">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold">Most Studied Category</p>
            <p className="text-xs text-gray-500">Web Development</p>
            <p className="text-xs text-gray-400">68 hours</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-6 md:p-10 border border-gray-200 shadow-xl md:shadow-2xl rounded-3xl hover:scale-105 md:hover:scale-110 duration-700">
          <div className="p-2 rounded-xl bg-green-100">
            <Clock className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold">Longest Study Session</p>
            <p className="text-xs text-gray-500">6.5 hours</p>
            <p className="text-xs text-gray-400">Dec 24, 2025</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-6 md:p-10 border border-gray-200 shadow-xl md:shadow-2xl rounded-3xl hover:scale-105 md:hover:scale-110 duration-700">
          <div className="p-2 rounded-xl bg-purple-100">
            <Target className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-semibold">Goal Progress</p>
            <p className="text-xs text-gray-500">8 / 10 Completed</p>
            <p className="text-xs text-gray-400">On Track</p>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default PerformanceInsights