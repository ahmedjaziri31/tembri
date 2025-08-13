'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Progress } from '../../components/ui/progress'
import { Badge } from '../../components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  BarChart3,
  Target,
  Award
} from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Applications',
      value: '24',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Briefcase,
      description: 'from last month'
    },
    {
      title: 'Interview Requests',
      value: '8',
      change: '+25%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'this week'
    },
    {
      title: 'Success Rate',
      value: '67%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Target,
      description: 'overall performance'
    },
    {
      title: 'Avg. Response Time',
      value: '2.3 days',
      change: '-0.5 days',
      changeType: 'positive' as const,
      icon: Clock,
      description: 'faster than average'
    }
  ]

  const recentApplications = [
    {
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Developer',
      status: 'Interview Scheduled',
      statusType: 'success' as const,
      date: '2024-01-15',
      salary: '$95,000 - $120,000'
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Engineer',
      status: 'Under Review',
      statusType: 'warning' as const,
      date: '2024-01-12',
      salary: '$80,000 - $100,000'
    },
    {
      company: 'Innovation Labs',
      position: 'React Developer',
      status: 'Application Sent',
      statusType: 'info' as const,
      date: '2024-01-10',
      salary: '$70,000 - $90,000'
    },
    {
      company: 'Digital Agency',
      position: 'UI/UX Developer',
      status: 'Rejected',
      statusType: 'error' as const,
      date: '2024-01-08',
      salary: '$75,000 - $95,000'
    }
  ]

  const upcomingEvents = [
    {
      title: 'Interview with TechCorp',
      time: '10:00 AM',
      date: 'Tomorrow',
      type: 'interview' as const
    },
    {
      title: 'Follow-up call with StartupXYZ',
      time: '2:00 PM',
      date: 'Jan 18',
      type: 'call' as const
    },
    {
      title: 'Portfolio review deadline',
      time: '11:59 PM',
      date: 'Jan 20',
      type: 'deadline' as const
    }
  ]

  const skillProgress = [
    { skill: 'React/Next.js', progress: 90 },
    { skill: 'TypeScript', progress: 85 },
    { skill: 'Node.js', progress: 75 },
    { skill: 'Python', progress: 60 },
    { skill: 'System Design', progress: 70 }
  ]

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's what&apos;s happening with your job search today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <span className={`font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="ml-1">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Your latest job applications and their status</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {app.position}
                          </h4>
                          <Badge className={getStatusColor(app.statusType)}>
                            {app.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{app.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {app.salary} • Applied {app.date}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        event.type === 'interview' ? 'bg-green-500' :
                        event.type === 'call' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm text-gray-900 dark:text-white">
                          {event.title}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {event.date} at {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Calendar
                </Button>
              </CardContent>
            </Card>

            {/* Skill Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Skill Progress
                </CardTitle>
                <CardDescription>Track your technical skills development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillProgress.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {skill.skill}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {skill.progress}%
                        </span>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Update Skills
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Find New Jobs
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    Update Resume
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Award className="w-4 h-4 mr-2" />
                    Take Skill Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
 