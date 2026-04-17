import Link from 'next/link'
import { Metadata } from 'next'
import { Play, Users, ThumbsUp, Zap, Lock, Share2, Code, MessageCircle, Mail, Sparkles } from 'lucide-react'
import Navbar from '@/components/nav'
import { auth } from '@/lib/auth'
import { signInAction } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'


export const metadata: Metadata = {
  title: 'Muzer - Watch Together, Vote Together',
  description: 'Create a collaborative video room, add YouTube links, and let everyone vote on what to watch next. Perfect for watch parties, study groups, and team collaboration.',
  openGraph: {
    title: 'Muzer - Watch Together, Vote Together',
    description: 'Collaborative video platform for watch parties and team viewing',
    type: 'website',
  },
}

export default async function Home() {
  const session = await auth()
  if (session?.user?.id) {
    redirect("/me")
  }
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .starfield {
          position: fixed;
          inset: 0;
          z-index: -20;
          background: 
            radial-gradient(2px 2px at 20px 30px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 60px 70px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 50px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 10px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 130px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 10px 90px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 80px, white, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          background-position: 0 0, 40px 60px, 130px 270px, 70px 100px, 100px 200px, 90px 10px, 130px 80px, 20px 140px;
          animation: twinkle 5s infinite;
        }
        
        .space-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(88, 28, 135, 0.2) 50%, transparent 100%);
          pointer-events: none;
        }
      `}</style>

      {/* Starfield Background */}
      <div className="starfield" />
      <div className="space-gradient" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8 z-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-600/40 to-violet-600/20 blur-3xl" />
          <div className="absolute left-1/3 top-1/4 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="mb-6 inline-block rounded-full bg-purple-950/60 px-4 py-1.5 text-sm font-medium text-purple-200 border border-purple-500/30 backdrop-blur-sm">
            ✨ Experience Premium Watch Parties
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Watch Together,
            <span className="block bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
              Vote Together
            </span>
          </h1>

          <p className="mb-12 text-lg text-purple-100/80 sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Create a collaborative video room, add YouTube links, and let everyone vote on what to watch next. Perfect for watch parties, study groups, and team collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session?.user?.id ? (
              <Link
                href="/me"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-violet-700 px-8 py-3 font-semibold text-white hover:from-purple-500 hover:to-violet-600 transition-all hover:scale-105 shadow-lg shadow-purple-500/50 group"
              >
                Create Room
                <Play className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" fill="currentColor" />
              </Link>
            ) : (
              // Server‑action form – works without "use client"
              <form action={signInAction.bind(null, "google")}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-violet-700 px-8 py-3 font-semibold text-white hover:from-purple-500 hover:to-violet-600 transition-all hover:scale-105 shadow-lg shadow-purple-500/50"
                >
                  Sign In to Create Room
                </button>
              </form>
            )}

            <Link href="#features" className="inline-flex items-center justify-center rounded-full border border-purple-500/50 px-8 py-3 font-semibold text-white hover:border-purple-400 hover:bg-purple-950/40 transition-all backdrop-blur-sm">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-4 py-20 sm:px-6 sm:py-32 lg:px-8 border-t border-purple-900/30 z-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Premium Features
            </h2>
            <p className="text-lg text-purple-200/60">
              Everything you need for collaborative video watching
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Share2,
                title: 'Create Video Rooms',
                description: 'Start a new room in seconds and share the link with friends'
              },
              {
                icon: Play,
                title: 'Add YouTube Videos',
                description: 'Paste YouTube links to build a collaborative queue'
              },
              {
                icon: ThumbsUp,
                title: 'Real-time Voting',
                description: 'Upvote and downvote to determine what plays next'
              },
              {
                icon: Users,
                title: 'Watch Synchronized',
                description: 'Everyone watches the same video in perfect sync'
              },
              {
                icon: Zap,
                title: 'Admin Controls',
                description: 'Room owner controls playback, skip, and playlist'
              },
              {
                icon: Lock,
                title: 'No Account Required',
                description: 'Join rooms as a guest or create an account for more'
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="group rounded-xl border border-purple-500/20 bg-black/40 backdrop-blur-sm p-8 hover:border-purple-500/50 hover:bg-purple-950/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-purple-600/30 to-violet-600/20 p-3 group-hover:from-purple-600/50 group-hover:to-violet-600/40 transition-colors">
                    <Icon className="h-6 w-6 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200/60 group-hover:text-purple-200/80 transition-colors">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-4 py-20 sm:px-6 sm:py-32 lg:px-8 border-t border-purple-900/30 z-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-purple-200/60">
              Three simple steps to start watching together
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Create a Room',
                description: 'Click "Create Room" and get an instant shareable link for your watch party'
              },
              {
                step: '02',
                title: 'Add Videos',
                description: 'Paste YouTube links to build your playlist. Anyone can suggest videos'
              },
              {
                step: '03',
                title: 'Vote & Watch',
                description: 'Vote on which video plays next and enjoy synchronized viewing with friends'
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-violet-700 text-xl font-bold text-white shadow-lg shadow-purple-500/50">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-purple-200/60">
                  {item.description}
                </p>
                {idx < 2 && (
                  <div className="absolute right-0 top-6 hidden h-1 w-full translate-x-full bg-gradient-to-r from-purple-500/50 to-transparent md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-20 sm:px-6 sm:py-32 lg:px-8 border-t border-purple-900/30 z-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to start your watch party?
          </h2>
          <p className="mb-10 text-lg text-purple-200/70">
            Create a room and invite friends in seconds. No setup required.
          </p>
          <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-violet-700 px-8 py-4 font-semibold text-white hover:from-purple-500 hover:to-violet-600 transition-all duration-300 group hover:scale-105 shadow-lg shadow-purple-500/50">
            Create Your First Room
            <Play className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" fill="white" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/30 px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-violet-700 shadow-lg shadow-purple-500/50">
                  <Sparkles className="h-5 w-5 text-white" fill="white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">Muzer</span>
              </div>
              <p className="text-sm text-purple-200/60">
                Collaborative video platform for watch parties and teams.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Product</h4>
              <ul className="space-y-2 text-sm text-purple-200/60">
                <li><Link href="#features" className="hover:text-purple-200 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-purple-200 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-purple-200 transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-purple-200/60 hover:text-purple-200 transition-colors">
                  <Code className="h-5 w-5" />
                </a>
                <a href="#" className="text-purple-200/60 hover:text-purple-200 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="#" className="text-purple-200/60 hover:text-purple-200 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-900/30 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-purple-200/60">
              <p>&copy; 2024 Muzer. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="#" className="hover:text-purple-200 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-purple-200 transition-colors">Terms</Link>
                <Link href="#" className="hover:text-purple-200 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
