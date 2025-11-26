// data/servicesData.js
import { Shield, Building2, Home } from 'lucide-react';

export const servicesData = {
  retail: {
    id: 'retail',
    title: "Retail Solutions",
    icon: Building2,
    description:
      "Comprehensive retail technology solutions designed to enhance customer experience, streamline operations, and boost security for your retail environment.",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    overview:
      "Transform your retail space with cutting-edge technology that enhances both customer experience and operational efficiency. Our integrated solutions help you stay competitive in today's fast-paced retail environment.",
    overviewImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    benefits: [
      "Enhanced customer experience with seamless technology integration",
      "Improved security and loss prevention measures",
      "Streamlined operations and inventory management",
      "Real-time monitoring and analytics for better decision making",
      "Scalable solutions that grow with your business",
    ],
    serviceItems: [
      {
        name: "CCTV Surveillance",
        description:
          "Advanced camera systems with AI-powered analytics for comprehensive store monitoring and security.",
      },
      {
        name: "Access Control & Time Attendance",
        description:
          "Secure employee access management with integrated time tracking solutions.",
      },
      {
        name: "Network Solutions",
        description:
          "Robust and reliable network infrastructure for seamless POS and operational connectivity.",
      },
      {
        name: "Video Intercom Systems",
        description:
          "Modern communication systems for staff coordination and customer service.",
      },
      {
        name: "Gate Barriers",
        description:
          "Automated access control for parking areas and restricted zones.",
      },
      {
        name: "Security & Access Control",
        description:
          "Comprehensive security systems to protect your assets and ensure safe shopping.",
      },
    ],
    features: [
      {
        title: "24/7 Monitoring",
        description:
          "Round-the-clock surveillance with instant alerts and remote access to keep your retail space secure at all times.",
      },
      {
        title: "Customer Analytics",
        description:
          "Advanced analytics to understand customer behavior, optimize store layout, and improve sales performance.",
      },
      {
        title: "Integrated Systems",
        description:
          "Seamlessly integrated solutions that work together to create a unified retail technology ecosystem.",
      },
      {
        title: "Scalable Infrastructure",
        description:
          "Flexible systems that can easily expand as your retail business grows and evolves.",
      },
    ],
  },

  office: {
    id: 'office',
    title: "Office Solutions",
    icon: Shield,
    description:
      "Modern workplace solutions designed for productivity, security, and seamless operations. Create a smart, secure, and efficient office environment.",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    overview:
      "Build a modern, secure, and productive workplace with our comprehensive office technology solutions. From cybersecurity to smart building systems, we help you create an environment where your team can thrive.",
    overviewImage:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    benefits: [
      "Enhanced workplace security with multi-layered protection",
      "Improved employee productivity through smart automation",
      "Seamless communication and collaboration systems",
      "Energy-efficient and sustainable building management",
      "Future-ready infrastructure for hybrid work environments",
    ],
    serviceItems: [
      {
        name: "CCTV Surveillance",
        description:
          "Professional-grade surveillance systems to monitor and secure your office premises.",
      },
      {
        name: "Access Control & Time Attendance",
        description:
          "Advanced biometric and card-based access systems with comprehensive attendance tracking.",
      },
      {
        name: "Cyber Security",
        description:
          "Enterprise-grade cybersecurity solutions to protect your digital assets and data.",
      },
      {
        name: "Network Solutions",
        description:
          "High-performance networking infrastructure for reliable connectivity across your office.",
      },
      {
        name: "Video Intercom Systems",
        description:
          "Modern video communication systems for reception and internal coordination.",
      },
      {
        name: "Public Address Systems",
        description:
          "Clear and effective communication systems for announcements and emergency alerts.",
      },
      {
        name: "Gate Barriers",
        description:
          "Automated parking and entrance management for controlled office access.",
      },
      {
        name: "SMATV Systems",
        description:
          "Satellite TV distribution systems for common areas and meeting rooms.",
      },
    ],
    features: [
      {
        title: "Zero Trust Security",
        description:
          "Implement comprehensive security protocols that verify every access request, protecting your office from internal and external threats.",
      },
      {
        title: "Smart Building Integration",
        description:
          "Unified control of lighting, HVAC, and access systems for optimal comfort and efficiency.",
      },
      {
        title: "Cloud-Based Management",
        description:
          "Manage all your office systems remotely with secure cloud-based platforms accessible from anywhere.",
      },
      {
        title: "Emergency Response",
        description:
          "Integrated alarm and notification systems for quick response during emergencies and critical situations.",
      },
    ],
  },

  home: {
    id: 'home',
    title: "Home Solutions",
    icon: Home,
    description:
      "Smart home technologies for comfort, security, and intelligent living spaces. Transform your house into a modern, connected smart home.",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    overview:
      "Experience the future of living with our smart home solutions. We bring together security, automation, and entertainment systems to create a home that's not just smart, but intuitive and responsive to your lifestyle.",
    overviewImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop",
    benefits: [
      "Complete home security with smart monitoring and alerts",
      "Energy savings through intelligent automation",
      "Convenience of controlling everything from your smartphone",
      "Increased property value with modern smart home features",
      "Peace of mind with 24/7 connected security systems",
    ],
    serviceItems: [
      {
        name: "CCTV Surveillance",
        description:
          "HD security cameras with mobile access for complete home monitoring.",
      },
      {
        name: "Video Intercom Systems",
        description:
          "Smart video doorbells and intercom systems to see and speak with visitors remotely.",
      },
      {
        name: "Gate Barriers",
        description:
          "Automated gate systems with remote control and smartphone integration.",
      },
      {
        name: "Home Automation",
        description:
          "Complete smart home control for lighting, climate, curtains, and appliances.",
      },
      {
        name: "Security & Access Control",
        description:
          "Smart locks, alarm systems, and sensors for comprehensive home security.",
      },
      {
        name: "SMATV Systems",
        description:
          "Whole-home entertainment with multi-room TV and audio distribution.",
      },
    ],
    features: [
      {
        title: "Voice Control Integration",
        description:
          "Control your entire home with voice commands through Alexa, Google Assistant, or Siri integration.",
      },
      {
        title: "Scene Automation",
        description:
          "Create custom scenes like 'Good Morning' or 'Movie Time' that control multiple devices with one command.",
      },
      {
        title: "Mobile App Control",
        description:
          "Manage your entire home from anywhere in the world with our intuitive mobile applications.",
      },
      {
        title: "Energy Management",
        description:
          "Monitor and optimize energy consumption with smart thermostats and automated scheduling.",
      },
    ],
  },

  // 🔹 NEW: IT SOLUTIONS
  it: {
    id: 'it',
    title: "IT Solutions",
    icon: Shield, // you can swap to another icon if you like
    description:
      "End-to-end IT infrastructure, cloud, and managed services to keep your business secure, scalable, and always-on.",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    overview:
      "Our IT Solutions are designed to modernize your infrastructure, reduce downtime, and improve overall performance. From on-premise to cloud, we help you build a resilient, secure, and future-ready IT environment.",
    overviewImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    benefits: [
      "Improved uptime and reliability across your IT stack",
      "Stronger security posture with proactive monitoring",
      "Scalable infrastructure that grows with your business",
      "Reduced operational costs through managed services",
      "Faster incident response and problem resolution",
    ],
    serviceItems: [
      {
        name: "IT Infrastructure Setup",
        description:
          "Design and deployment of servers, storage, and networking tailored to your business needs.",
      },
      {
        name: "Cloud Migration & Management",
        description:
          "Seamless migration to cloud platforms with ongoing optimization and monitoring.",
      },
      {
        name: "Managed IT Services",
        description:
          "End-to-end management of your IT environment including patching, backups, and support.",
      },
      {
        name: "Cyber Security Solutions",
        description:
          "Firewalls, endpoint protection, SIEM, and security policies to safeguard your data.",
      },
      {
        name: "Disaster Recovery & Backup",
        description:
          "Robust backup and recovery strategies to protect your critical business systems.",
      },
      {
        name: "Helpdesk & Support",
        description:
          "Responsive IT support for your team with clear SLAs and multi-channel support.",
      },
    ],
    features: [
      {
        title: "Proactive Monitoring",
        description:
          "24/7 monitoring of servers, networks, and endpoints to detect and resolve issues before they impact your business.",
      },
      {
        title: "Hybrid & Multi-Cloud Ready",
        description:
          "Architecture and management for on-premise, hybrid, and multi-cloud environments.",
      },
      {
        title: "Security-First Approach",
        description:
          "Built-in security at every layer of your IT stack, aligned with industry best practices.",
      },
      {
        title: "Scalable Service Models",
          description:
          "Flexible engagement models from project-based to fully managed services, tailored to your budget and needs.",
      },
    ],
  },
};
