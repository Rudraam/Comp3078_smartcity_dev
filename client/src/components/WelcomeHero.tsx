import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Zap, Users, Shield } from "lucide-react";
import heroImage from "@assets/generated_images/Smart_city_hero_panorama_1d4c5ca4.png";

interface WelcomeHeroProps {
  onGetStarted: () => void;
}

export default function WelcomeHero({ onGetStarted }: WelcomeHeroProps) {
  const features = [
    {
      icon: MapPin,
      title: "Smart Navigation",
      description: "Real-time city exploration with live data"
    },
    {
      icon: Zap,
      title: "Live Updates",
      description: "Weather, pollution, and events in real-time"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Reviews and recommendations from locals"
    },
    {
      icon: Shield,
      title: "Trusted Data",
      description: "Verified information from reliable sources"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center text-white z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
            Explore Smart Cities
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed" data-testid="text-hero-subtitle">
            Discover comprehensive city information including weather, pollution levels, events, transportation, restaurants, and hotels - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
              onClick={onGetStarted}
              data-testid="button-get-started"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-3 text-lg font-semibold"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-features-title">
            Why Choose Smart City Explorer?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-subtitle">
            Experience cities like never before with our comprehensive platform designed for modern travelers and residents.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover-elevate" data-testid={`card-feature-${index}`}>
              <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-feature-title-${index}`}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}