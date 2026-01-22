import React from "react"
import type { Metadata } from "next"
import { Mail, Github, Twitter, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Six1Five Devs. Questions, collaboration ideas, or just want to say hi.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <MessageSquare className="size-8 text-primary" />
          </div>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question, collaboration idea, or just want to say hi?
          I&apos;d love to hear from you.
        </p>
      </div>

      {/* Contact Form */}
      <div className="mx-auto mt-16 max-w-xl">
        <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>

      {/* Alternative Contact Methods */}
      <div className="mx-auto mt-16 max-w-xl">
        <h2 className="text-center text-lg font-semibold text-muted-foreground mb-6">
          Or reach out directly
        </h2>
        <div className="space-y-4">
          <ContactCard
            icon={<Mail className="size-6" />}
            title="Email"
            description="Best for detailed questions or collaboration proposals."
            action={
              <Button asChild variant="outline" size="sm">
                <a href="mailto:hello@six1five.dev">hello@six1five.dev</a>
              </Button>
            }
          />

          <ContactCard
            icon={<Twitter className="size-6" />}
            title="Twitter / X"
            description="Quick questions, build updates, and general banter."
            action={
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://twitter.com/six1five"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @six1five
                </a>
              </Button>
            }
          />

          <ContactCard
            icon={<Github className="size-6" />}
            title="GitHub"
            description="Open source contributions, bug reports, and code discussions."
            action={
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://github.com/six1five"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  six1five
                </a>
              </Button>
            }
          />
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-2xl font-bold text-center">Common Questions</h2>
        <div className="mt-8 space-y-6">
          <FaqItem
            question="Are you available for freelance work?"
            answer="I'm currently focused on my own products, but I'm open to discussing interesting projects. Email me with details about what you're building."
          />
          <FaqItem
            question="Can I use your guides/code in my projects?"
            answer="Absolutely! All guides and code snippets are free to use. Attribution is appreciated but not required."
          />
          <FaqItem
            question="How can I support your work?"
            answer="The best way is to try the tools I build and share them with others. Subscribing to the newsletter and following along also helps a lot."
          />
          <FaqItem
            question="Do you offer consulting or mentorship?"
            answer="Not formally, but I'm always happy to answer questions. Send me a message and I'll do my best to help."
          />
        </div>
      </div>
    </div>
  )
}

function ContactCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-4 sm:p-6">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-12">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground hidden sm:block">{description}</p>
      </div>
      {action}
    </div>
  )
}

function FaqItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="font-semibold">{question}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {answer}
      </p>
    </div>
  )
}
