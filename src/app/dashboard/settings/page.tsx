'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Label } from '../../../components/ui/label'
import { Switch } from '../../../components/ui/switch'
import { Badge } from '../../../components/ui/badge'
import { 
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Save
} from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    jobAlerts: true,
    marketingEmails: false,
    weeklyDigest: true
  })

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showActivity: false,
    allowIndexing: true
  })

  const [appearance, setAppearance] = useState({
    theme: 'system',
    fontSize: 'medium',
    density: 'comfortable'
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="text-sm font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications" className="text-sm font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="job-alerts" className="text-sm font-medium">
                      Job Alerts
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Get notified about new job opportunities
                    </p>
                  </div>
                  <Switch
                    id="job-alerts"
                    checked={notifications.jobAlerts}
                    onCheckedChange={(checked) => handleNotificationChange('jobAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails" className="text-sm font-medium">
                      Marketing Emails
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive updates about new features and tips
                    </p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-digest" className="text-sm font-medium">
                      Weekly Digest
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Weekly summary of your activity
                    </p>
                  </div>
                  <Switch
                    id="weekly-digest"
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public-profile" className="text-sm font-medium">
                      Public Profile
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Make your profile visible to employers
                    </p>
                  </div>
                  <Switch
                    id="public-profile"
                    checked={privacy.publicProfile}
                    onCheckedChange={(checked) => handlePrivacyChange('publicProfile', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-activity" className="text-sm font-medium">
                      Show Activity Status
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Let others see when you&apos;re active
                    </p>
                  </div>
                  <Switch
                    id="show-activity"
                    checked={privacy.showActivity}
                    onCheckedChange={(checked) => handlePrivacyChange('showActivity', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-indexing" className="text-sm font-medium">
                      Search Engine Indexing
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Allow search engines to index your profile
                    </p>
                  </div>
                  <Switch
                    id="allow-indexing"
                    checked={privacy.allowIndexing}
                    onCheckedChange={(checked) => handlePrivacyChange('allowIndexing', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the application looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Theme</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Choose your preferred color scheme
                  </p>
                  <div className="flex gap-2">
                    <Badge variant={appearance.theme === 'light' ? 'default' : 'secondary'}>
                      Light
                    </Badge>
                    <Badge variant={appearance.theme === 'dark' ? 'default' : 'secondary'}>
                      Dark
                    </Badge>
                    <Badge variant={appearance.theme === 'system' ? 'default' : 'secondary'}>
                      System
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Font Size</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Adjust the text size for better readability
                  </p>
                  <div className="flex gap-2">
                    <Badge variant={appearance.fontSize === 'small' ? 'default' : 'secondary'}>
                      Small
                    </Badge>
                    <Badge variant={appearance.fontSize === 'medium' ? 'default' : 'secondary'}>
                      Medium
                    </Badge>
                    <Badge variant={appearance.fontSize === 'large' ? 'default' : 'secondary'}>
                      Large
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                Language Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-600 dark:text-gray-400">Account Type</p>
                <p className="font-medium">Free Plan</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600 dark:text-gray-400">Member Since</p>
                <p className="font-medium">January 2024</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600 dark:text-gray-400">Last Login</p>
                <p className="font-medium">2 hours ago</p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
 