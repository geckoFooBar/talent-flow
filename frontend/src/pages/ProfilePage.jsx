import Card from '../components/Card'
import { User2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'

export default function ProfilePage({ currentUser }) {

  return (
    <div>
      <PageHeader title="My Profile" />
      <Card>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div
            className="w-32 h-32 rounded-full mb-6 md:mb-0 md:mr-8"
            ><User2 size={130} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 w-full">
            <div>
              <label className="text-sm text-slate-500">Full Name</label>
              <p className="font-semibold text-slate-800">{currentUser.name}</p>
            </div>
            <div>
              <label className="text-sm text-slate-500">Email Address</label>
              <p className="font-semibold text-slate-800">{currentUser.email}</p>
            </div>
            <div>
              <label className="text-sm text-slate-500">Position</label>
              <p className="font-semibold text-slate-800">{currentUser.role}</p>
            </div>
            <div>
              <label className="text-sm text-slate-500">Department</label>
              <p className="font-semibold text-slate-800">{currentUser.department || <p>Superuser</p>}</p>
            </div>
            <div>
              <label className="text-sm text-slate-500">Join Date</label>
              <p className="font-semibold text-slate-800">{currentUser.joinDate}</p>
            </div>
            <div>
              <label className="text-sm text-slate-500">Location</label>
              <p className="font-semibold text-slate-800">{currentUser.location}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
