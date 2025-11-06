"use client";

import { Badge } from "@/components/ui/badge";
import { UserStats } from "./actions";

export default function ExpertDashboard({ userStats }: { userStats: UserStats[] }) {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">儀表板</h1>
      <p className="text-gray-600 mb-6">查看平台上所有選手及其練習完成情況</p>
      
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 font-semibold">選手</th>
                <th className="text-left p-4 font-semibold">權限</th>
                <th className="text-center p-4 font-semibold">已完成練習</th>
              </tr>
            </thead>
            <tbody>
              {userStats.map((stat) => {
                return (
                  <tr key={stat.user.$id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={stat.user.avatar}
                          alt={stat.user.name}
                          className="w-10 h-10 rounded-full border"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(stat.user.name)}&background=random`;
                          }}
                        />
                        <div>
                          <p className="font-medium">{stat.user.name}</p>
                          <p className="text-sm text-gray-500">{stat.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={stat.user.role === "expert" ? "default" : "secondary"}>
                        {stat.user.role.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="text-center p-4">
                      <span className="text-lg font-semibold text-green-600">
                        {stat.completedTasks}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {userStats.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            目前沒有選手數據
          </div>
        )}
      </div>
    </div>
  );
}
