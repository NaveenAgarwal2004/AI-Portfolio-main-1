import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { contactAPI } from '../services/api';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await contactAPI.submitContact(formData);
      
      if (response.data.success) {
        toast({
          title: "Message Sent!",
          description: response.data.message || "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(response.data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'naveenagarwal7624@gmail.com',
      href: 'mailto:naveenagarwal7624@gmail.com',
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 90796 91064',
      href: 'tel:+919079691064',
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#',
      color: 'text-purple-400'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/NaveenAgarwal2004',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/naveen-agar',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/NaveenAgar47373',
      color: 'hover:text-cyan-400'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:naveenagarwal7624@gmail.com',
      color: 'hover:text-red-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 ">
          {/* Contact Form */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Send className="h-6 w-6 text-blue-400" />
                Send Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell me about your project or just say hello..."
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 ">
            {/* Contact Details */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <a
                      key={contact.label}
                      href={contact.href}
                      className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200 group"
                    >
                      <div className={`w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className={`h-6 w-6 ${contact.color}`} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{contact.label}</p>
                        <p className="text-white font-medium">{contact.value}</p>
                      </div>
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 ${social.color} transition-all duration-200 hover:scale-105`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Response Info */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                I typically respond to messages within 24 hours. For urgent inquiries, 
                feel free to reach out via phone or LinkedIn for faster communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
