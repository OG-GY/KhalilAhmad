import { Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  community: string;
  date: string;
  location: string;
  role: string;
  description: string;
  poster: string;
  attendees?: number;
  eventUrl?: string;
  tags: string[];
}

const events: Event[] = [
  {
    id: "1",
    title: "Elevating Web Expertise: ASP .NET Core with DB",
    community: "MLSA UET Lahore",
    date: "2024-06-27",
    location: "Remote",
    role: "Technical Speaker",
    description:
      "Delivered an in-depth session on ASP .NET Core, focusing on integrating databases and best practices for scalable web applications.",
    poster: "/Events/aspevent.jpeg",
    attendees: 40,
    eventUrl: "#",
    tags: ["ASP.NET Core", "Database", "Web Development", ".NET"],
  },
  {
    id: "2",
    title: "Machine Learning Basic to Advanced (3 Days)",
    community: "MLSA UET Lahore",
    date: "2024-07-25",
    location: "Remote",
    role: "Technical Speaker",
    description:
      "Led a comprehensive 3-day workshop covering machine learning fundamentals, advanced algorithms, and real-world applications.",
    poster: "/Events/mlevent.png",
    attendees: 65,
    eventUrl: "#",
    tags: ["Machine Learning", "AI", "Workshop", "Algorithms"],
  },
  {
    id: "3",
    title: "Full Stack Web Development (3 Days)",
    community: "Youth Empowerment",
    date: "2024-12-14",
    location: "Innovation Hub, Islamabad",
    role: "Technical Speaker",
    description:
      "Presented a 3-day bootcamp on full stack web development, including frontend, backend, and deployment strategies.",
    poster: "/Events/fullstackevent.jpeg",
    attendees: 80,
    eventUrl: "#",
    tags: ["Full Stack", "Frontend", "Backend", "Web Development"],
  },
  {
    id: "4",
    title: "Web Scraping & Automation",
    community: "Youth Empowerment",
    date: "2025-03-21",
    location: "Remote",
    role: "Technical Speaker",
    description:
      "Explored web scraping techniques and automation tools, demonstrating data extraction and workflow automation.",
    poster: "/Events/scrapingevent.png",
    attendees: 50,
    eventUrl: "#",
    tags: ["Web Scraping", "Automation", "Python", "Data Extraction"],
  },
  {
    id: "5",
    title: "Full Stack Power with Next.js - From Basics to API",
    community: "Mentor Tech Hub",
    date: "2025-07-26",
    location: "Remote",
    role: "Technical Speaker",
    description:
      "Showcased building full stack applications using Next.js, from basic concepts to API integration and deployment.",
    poster: "/Events/mthevent.jpg",
    attendees: 40,
    eventUrl: "#",
    tags: ["Next.js", "Full Stack", "API", "Web Development"],
  },
];

export function EventsSection() {
  return (
    <section className="py-20 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Speaking <span className="text-yellow-400">Events</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            What I have shared with peeps.
          </p>
        </div>

        {/* Events Grid */}
        {/* Events Flex Layout */}
        <div className="flex flex-wrap gap-4">
          {events.map((event) => (
            <Card
              key={event.id}
              className="hover:shadow-2xl focus-within:ring-2 focus-within:ring-yellow-600/40 hover:scale-[1.01] transition-all duration-500 ease-out hover:bg-zinc-900 focus-within:bg-zinc-900 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-zinc-950/80 backdrop-blur-xl group overflow-hidden flex flex-col relative"
            >
              <div className="relative flex-shrink-0">
                {/* Event Poster */}
                <div className="aspect-[5/3] overflow-hidden">
                  <Image
                    width={300}
                    height={300}
                    src={event.poster || "/placeholder.svg"}
                    alt={`${event.title} poster`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Role Badge */}
                <Badge className="absolute top-3 right-3 bg-yellow-400 text-black hover:bg-yellow-500">
                  {event.role}
                </Badge>
              </div>

              <CardContent className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                  {/* Event Title */}
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                    {event.title}
                  </h3>

                  {/* Community */}
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      {event.community}
                    </span>
                  </div>
                </div>
              </CardContent>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col p-4">
                <div className="flex-1 space-y-3">
                  <h3 className="text-white font-semibold text-lg text-yellow-400">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">
                      {event.community}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-4">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-gray-700 text-gray-300 hover:border-yellow-400/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
                  {event.attendees && (
                    <span className="text-yellow-400 text-sm font-medium">
                      {event.attendees}+ attendees
                    </span>
                  )}
                  {event.eventUrl && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 p-2"
                      asChild
                    >
                      <a
                        href={event.eventUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        {/* <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 bg-transparent"
          >
            View All Events
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div> */}
      </div>
    </section>
  );
}
