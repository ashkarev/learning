import React from "react"
import { Award } from "lucide-react"
import { Card } from "@/Components/ui/card"

const AchievementInProfile = () => {
  const earned = 3
  const total = 10
  const progress = (earned / total) * 100

  return (
    <>
      <div className="">
        <div className="grid grid-cols-3 gap-6 my-6 ">


          <Card className="col-span-3 rounded-2xl border-0 shadow-sm p-4 md:p-6 my-6 md:my-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">

              <div className="">
                <div>


                  <p className="text-xl text-gray-500 mt-1">
                    Certificates Earned
                  </p>

                  <div className="my-6">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="text-sm font-medium mt-2">
                      {earned}/{total}
                    </p>
                  </div>
                </div>


                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center shadow-lg w-full hover:scale-105 duration-700">
                  <Award className="h-8 w-8 text-blue-600" />
                  <h1 className="text-3xl font-bold mt-2">{earned}</h1>
                  <p className="text-sm text-gray-500">Total Certificates</p>

                  <p className="text-xs text-blue-500 mt-1">
                    Complete {total - earned} more courses to reach your goal
                  </p>
                </div>
              </div>



              <div className="grid gap-3 w-full">

                <Card className="rounded-xl border border-gray-200 items-center shadow-lg w-full hover:scale-105 duration-700 p-3">
                  <p className="text-lg text-blue-500 font-semibold">React Advanced Patterns</p>
                  <p className="text-xs text-gray-500">Web Development</p>
                  <p className="text-xs text-gray-400 mt-1">Dec 25, 2024</p>
                </Card>

                <Card className="rounded-xl border border-gray-200 items-center shadow-lg w-full hover:scale-105 duration-700 p-3">
                  <p className="text-lg text-blue-500 font-semibold">UI/UX Design Fundamentals</p>
                  <p className="text-xs text-gray-500">Design</p>
                  <p className="text-xs text-gray-400 mt-1">Nov 28, 2024</p>
                </Card>

                <Card className="rounded-xl border border-gray-200 items-center shadow-lg w-full hover:scale-105 duration-700 p-3">
                  <p className="text-lg text-blue-500 font-semibold">Data Structures & Algorithms</p>
                  <p className="text-xs text-gray-500">Computer Science</p>
                  <p className="text-xs text-gray-400 mt-1">Nov 10, 2024</p>
                </Card>

              </div>
            </div>
          </Card>

        </div>
      </div>

    </>

  )
}

export default AchievementInProfile
