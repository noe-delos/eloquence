/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Conversation } from "@/components/conversation";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Toaster } from "sonner";
import { Dancing_Script, PT_Serif } from "next/font/google";
import { cn } from "@/lib/utils";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-serif",
});

type AgentType = "declaration" | "comite" | "investisseurs";

interface Agent {
  id: AgentType;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  firstMessage: string;
  iconBgClass?: string;
}

const agents: Agent[] = [
  {
    id: "declaration",
    title: "Conférence de presse",
    description: "Pitchez votre projet et répondez aux questions de la presse",
    icon: "noto:studio-microphone",
    firstMessage:
      "Bonjour, vous avez la parole pour votre déclaration. Prenez votre temps.",
  },
  {
    id: "comite",
    title: "Comité social et économique (CSE)",
    description: "Faites face aux élus du personnel",
    image: "/gov.png",
    iconBgClass: "bg-white",
    firstMessage: "Bonjour, présentez-nous les résultats de l'exercice.",
  },
  {
    id: "investisseurs",
    title: "Interview Tv",
    description: "Répondez à un journaliste imprévisible",
    icon: "noto:movie-camera",
    firstMessage:
      "Bonjour, présentez-nous votre projet et votre demande de financement.",
  },
];

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);

  const handleBack = () => {
    setSelectedAgent(null);
  };

  if (selectedAgent) {
    return <Conversation agentType={selectedAgent} onBack={handleBack} />;
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#12182A] to-[#242E44] text-white ${dancingScript.variable} ${ptSerif.variable}`}
    >
      <Toaster position="top-center" />

      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-[#12182A]/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.jpeg"
                alt="Avec Eloquence"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
                  Avec Éloquence
                </h1>
                <p className="text-white/70 text-sm">
                  L'oral, ça s'apprend... et ça se travaille !
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choisissez votre{" "}
            <span
              className={`${dancingScript.className} font-dancing-script text-6xl`}
            >
              Simulation
            </span>
            .
          </motion.h2>
          <motion.p
            className="text-lg text-white/40 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sessions de 15 minutes avec analyse personnalisée.
          </motion.p>
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-xl rounded-xl bg-gradient-to-b from-[#1c2437] to-[#12182A] border border-white/10 overflow-hidden"
                onClick={() => setSelectedAgent(agent.id)}
              >
                <CardHeader className="text-center pb-2 border-b border-white/10">
                  <div
                    className={`w-16 h-16 ${
                      agent.iconBgClass ||
                      "bg-gradient-to-br from-amber-200 to-yellow-500"
                    } rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    {agent.icon ? (
                      <Icon
                        icon={agent.icon}
                        className={`w-8 h-8 ${
                          agent.iconBgClass ? "text-gray-700" : "text-[#12182A]"
                        }`}
                      />
                    ) : agent.image ? (
                      <Image
                        src={agent.image}
                        alt={agent.title}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                    ) : null}
                  </div>
                  <CardTitle
                    className={cn(
                      "text-2xl font-bold text-white pb-4",
                      index === 1 && "text-xl"
                    )}
                  >
                    {agent.title}
                  </CardTitle>
                  <CardDescription
                    className={cn(
                      "text-white/60 pb-4",
                      index === 0 && "text-xs"
                    )}
                  >
                    {agent.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-4">
                  <Button
                    className="w-full font-medium py-5 mt-4 text-[#12182A] bg-gradient-to-r from-amber-200 to-yellow-500 hover:from-amber-300 hover:to-yellow-600 rounded-lg transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAgent(agent.id);
                    }}
                  >
                    Commencer
                    <Icon icon="lucide:arrow-right" className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white/50">
            <p>&copy; 2025 Avec Éloquence. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
