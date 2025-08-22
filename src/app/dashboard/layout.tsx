import { DashboardLayout } from '../../components/DashboardLayout'
import { UserProvider } from '../../contexts/UserContext'

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </UserProvider>
  )
}
 
 