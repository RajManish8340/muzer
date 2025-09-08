
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Music, Users, Vote, Play, TrendingUp, ArrowRight, Headphones } from "lucide-react"
import { Appbar } from "../components/Appbar"

export default function Home() {

  const featuredRooms = [
    {
      id: 1,
      name: "Indie Vibes",
      creator: "Alex Chen",
      avatar: "/indie-musician.jpg",
      listeners: 234,
      currentSong: "Midnight City - M83",
      votes: 47,
      genre: "Indie Rock",
    },
    {
      id: 2,
      name: "Hip-Hop Central",
      creator: "DJ Marcus",
      avatar: "/hip-hop-dj.jpg",
      listeners: 512,
      currentSong: "HUMBLE. - Kendrick Lamar",
      votes: 89,
      genre: "Hip-Hop",
    },
    {
      id: 3,
      name: "Electronic Pulse",
      creator: "Luna Bass",
      avatar: "/electronic-producer.png",
      listeners: 178,
      currentSong: "Strobe - Deadmau5",
      votes: 62,
      genre: "Electronic",
    },
  ]

  const features = [
    {
      icon: <Music className="h-6 w-6" />,
      title: "Create Your Room",
      description: "Set up your music space and invite fans to join your listening party",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Driven",
      description: "Fans add songs to the queue and vote on what plays next",
    },
    {
      icon: <Vote className="h-6 w-6" />,
      title: "Democratic Playlists",
      description: "The highest voted songs rise to the top and play automatically",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Discover Together",
      description: "Find new music through community recommendations and voting",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Appbar/>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4 text-sm">
            🎵 The Future of Collaborative Music
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground">
            Create Rooms, Vote on Songs, <span className="text-accent">Discover Together</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Join the revolution in music streaming where creators build communities and fans shape the soundtrack. Every
            vote matters, every song tells a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Start Creating <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-border bg-transparent">
              <Play className="mr-2 h-4 w-4" />
              Join a Room
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Live Rooms Right Now</h2>
            <p className="text-muted-foreground text-lg">Jump into these active music sessions and start voting</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredRooms.map((room, index) => (
              <Card
                key={room.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg `}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={room.avatar || "/placeholder.svg"} alt={room.creator} />
                        <AvatarFallback>
                          {room.creator
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <CardDescription>by {room.creator}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{room.genre}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{room.listeners} listening</span>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Play className="h-4 w-4 text-accent" />
                        <span className="font-medium text-sm">Now Playing</span>
                      </div>
                      <p className="text-sm text-foreground font-medium">{room.currentSong}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Vote className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium">{room.votes} votes</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Join Room
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple, democratic, and designed for music lovers who want to discover and share together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-accent">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">50K+</div>
              <div className="text-muted-foreground">Active Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">2M+</div>
              <div className="text-muted-foreground">Songs Voted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">500K+</div>
              <div className="text-muted-foreground">Music Fans</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-balance">
            Ready to Shape the Future of Music?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
            Join thousands of creators and fans who are already building the most democratic music platform ever
            created.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Create Your First Room
            </Button>
            <Button size="lg" variant="outline" className="border-border bg-transparent">
              Explore Rooms
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-6 w-6 bg-accent rounded flex items-center justify-center">
                <Headphones className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="font-semibold text-foreground">SoundVote</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 SoundVote. Democratizing music, one vote at a time.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
