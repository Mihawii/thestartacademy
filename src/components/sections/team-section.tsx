import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Olzhas Mukhtarov",
      role: "Founder & CEO",
      description: "Visionary entrepreneur with extensive experience in business strategy and startup development. Passionate about empowering the next generation of business leaders.",
      expertise: ["Business Strategy", "Entrepreneurship", "Leadership Development"],
      image: "/team/Olzhas.png"
    },
    {
      name: "Khabibullokh Abdullakhonov",
      role: "Head of Operations",
      description: "Operations expert with deep experience in scaling educational programs and managing complex organizational systems.",
      expertise: ["Operations Management", "Program Scaling", "Systems Design"],
      image: "/team/Khabi.jpeg"
    },
    {
      name: "Jamshidbek Nazaraliev",
      role: "Director of Education",
      description: "Educational innovator focused on creating transformative learning experiences for young entrepreneurs and business leaders.",
      expertise: ["Educational Innovation", "Curriculum Design", "Student Development"],
      image: "/team/Jamshid.JPG"
    },
    {
      name: "Alisa Shcherbak",
      role: "Head of Student Success",
      description: "Student success specialist dedicated to ensuring every participant achieves their full potential through personalized support and mentorship.",
      expertise: ["Student Mentoring", "Success Coaching", "Personal Development"],
      image: "/team/Alisa.png"
    }
  ];

  const teamValues = [
    {
      icon: '🎓',
      title: 'Educational Excellence',
      description: 'Our team consists of Stanford Pre-Collegiate alumni and industry experts with proven track records in business education.'
    },
    {
      icon: '🌍',
      title: 'Global Perspective',
      description: 'We bring international experience and cross-cultural understanding to every program we deliver.'
    },
    {
      icon: '💡',
      title: 'Innovation First',
      description: 'We constantly evolve our curriculum to match the latest trends in entrepreneurship and project management.'
    },
    {
      icon: '🤝',
      title: 'Student-Centered',
      description: 'Every decision we make is focused on maximizing student success and real-world impact.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A dedicated team of educators, entrepreneurs, and industry experts committed to empowering the next generation of business leaders.
          </p>
        </div>

        {/* Infinity Scroll Team Members */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary bg-muted">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg mb-1">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium text-sm">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    {member.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-center">Expertise:</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Official Partnerships</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <div className="text-4xl">🎓</div>
              <h4 className="font-medium">Stanford Pre-Collegiate Alumni Network</h4>
              <p className="text-sm text-muted-foreground">Top-tier mentorship from Stanford graduates</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🇺🇿</div>
              <h4 className="font-medium">Youth Affairs Agency - Uzbekistan</h4>
              <p className="text-sm text-muted-foreground">Strategic government partnership for regional impact</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
