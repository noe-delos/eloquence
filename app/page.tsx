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

type AgentType = "presse" | "assemblee" | "investisseurs";

interface Agent {
  id: AgentType;
  title: string;
  description: string;
  icon: string;
  firstMessage: string;
}

const agents: Agent[] = [
  {
    id: "presse",
    title: "Conférence de Presse",
    description:
      "Affrontez les questions des journalistes et défendez votre position",
    icon: "noto:studio-microphone",
    firstMessage:
      "Bonjour, je suis Christophe Dubois, journaliste. Nous sommes ici pour cette conférence de presse. Pouvez-vous commencer par vous présenter et nous expliquer l'objet de cette rencontre ?",
  },
  {
    id: "assemblee",
    title: "Assemblée Générale",
    description:
      "Présentez vos résultats et répondez aux questions des actionnaires",
    icon: "fluent-color:people-community-16",
    firstMessage:
      "Mesdames et messieurs les actionnaires, je vous souhaite la bienvenue à cette assemblée générale. En tant que président de séance, je vous invite à présenter les résultats de l'exercice écoulé.",
  },
  {
    id: "investisseurs",
    title: "Réunion Investisseurs",
    description:
      "Convainquez des investisseurs potentiels de financer votre projet",
    icon: "fluent-emoji:money-bag",
    firstMessage:
      "Bonjour, je suis Christophe Martin. J'ai examiné votre dossier avec attention. Pouvez-vous nous présenter votre projet et nous expliquer pourquoi nous devrions investir dans votre entreprise ?",
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
    <div className="min-h-screen bg-gradient-to-br from-[#12182A] to-[#242E44] text-white">
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
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choisissez votre contexte d'entraînement
          </motion.h2>
          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sessions de 15 minutes avec analyse personnalisée
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
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      icon={agent.icon}
                      className="w-8 h-8 text-[#12182A]"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">
                    {agent.title}
                  </CardTitle>
                  <CardDescription className="text-white/70">
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
            <p>&copy; 2024 Avec Éloquence. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
