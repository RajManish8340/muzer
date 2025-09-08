"use client"
import { Headphones } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeToggle } from "./themeToggle";
import { Button } from "@/components/ui/button";

export function Appbar() {
    const session = useSession()

    return  <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center">
                      <Headphones className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <span className="text-xl font-bold text-foreground">Muzi</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div>
                        {session.data?.user &&<Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => signOut()}> Logout</Button> }
                        {!session.data?.user &&<Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => signIn()}> SignIn</Button> }
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Get Started</Button>
                    </div>
                  </div>
                </div>
              </header>
    
}
