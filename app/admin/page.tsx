import {requireChatGPTUser} from '@/app/chatgpt-auth';
import {adminUser} from '@/lib/admin';
import {AdminLibrary} from '@/components/admin-library';
export const dynamic='force-dynamic';
export const metadata={title:'Private team library',robots:{index:false,follow:false}};
export default async function AdminPage(){await requireChatGPTUser('/admin');const user=await adminUser();if(!user)return <main id="main" className="wrap section"><p className="eyebrow">Private team library</p><h1 className="admin-title">Team access required.</h1><p className="lead">Sign in with the authorised SignAds team account to manage content, artwork and enquiries.</p><p className="admin-help">The current team account is signadsindia@gmail.com.</p><a href="/signout-with-chatgpt?return_to=/admin" className="button" target="_top">Use another account</a></main>;return <main id="main"><AdminLibrary email={user.email}/></main>}
