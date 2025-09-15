import { 
  GraduationCap, 
  Briefcase, 
  Code, 
  Zap, 
  Paintbrush, 
  PencilRuler, 
  Truck, 
  Plane,
  Wind, 
  Hand, 
  Thermometer, 
  MapPin, 
  Lightbulb, 
  BookOpen, 
  Bot, 
  Smartphone,
  Mail,
  Linkedin,
  Github
} from 'lucide-react';

// Personal Information
export const PERSONAL_INFO = {
  name: 'Vineeth Kirandumkara',
  email: 'vineeth.kirandumkara@ucl.ac.uk',
  location: 'London, UK',
  tagline: 'IoT Systems Engineer & Connected Product Designer',
  bio: 'Passionate about creating intelligent, connected systems that bridge the physical and digital worlds.',
  expectedGraduation: 'Summer 2025'
};

// Social Media Links
export const SOCIAL_LINKS = {
  linkedin: {
    url: 'https://www.linkedin.com/in/vineeth-kirandumkara-3b322924',
    displayUrl: 'linkedin.com/in/vineeth-kirandumkara',
    icon: Linkedin,
    label: 'LinkedIn',
    color: 'text-blue-600'
  },
  github: {
    url: 'https://github.com/vineethk96',
    displayUrl: 'github.com/vineethk96',
    icon: Github,
    label: 'GitHub',
    color: 'text-gray-700 dark:text-gray-300'
  }
};

// Contact Information
export const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    color: 'text-blue-500'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: PERSONAL_INFO.location,
    href: null,
    color: 'text-green-500'
  },
  {
    icon: SOCIAL_LINKS.linkedin.icon,
    label: SOCIAL_LINKS.linkedin.label,
    value: SOCIAL_LINKS.linkedin.displayUrl,
    href: SOCIAL_LINKS.linkedin.url,
    color: SOCIAL_LINKS.linkedin.color
  },
  {
    icon: SOCIAL_LINKS.github.icon,
    label: SOCIAL_LINKS.github.label,
    value: SOCIAL_LINKS.github.displayUrl,
    href: SOCIAL_LINKS.github.url,
    color: SOCIAL_LINKS.github.color
  }
];

// Education Data
export const EDUCATION = [
  {
    year: '2024–2025',
    title: 'UCL',
    subtitle: 'MSc Connected Environments',
    icon: GraduationCap,
    color: 'bg-emerald-500',
    type: 'education',
    status: 'In Progress',
    description: 'Advanced study in IoT systems, urban technology, and connected product design.',
    location: 'London, UK'
  },
  {
    year: '2014–2019',
    title: 'Virginia Tech',
    subtitle: 'BSc Computer Engineering',
    icon: GraduationCap,
    color: 'bg-blue-500',
    type: 'education',
    status: 'Completed',
    description: 'Focus on embedded systems, computer architecture, and software engineering.',
    location: 'Blacksburg, VA'
  }
];

// Work Experience Data
export const WORK_EXPERIENCE = [
  {
    year: '2023–2024',
    title: 'Grenova',
    subtitle: 'Embedded SW Engineer',
    icon: Code,
    color: 'bg-yellow-500',
    type: 'work',
    status: 'Completed',
    description: 'Led firmware development for TipNovus 2.0, a laboratory pipette tip washing system.',
    location: 'Richmond, VA',
    technologies: ['C/C++', 'CMake', 'FreeRTOS', 'ESP32', 'JSON', 'Embedded Systems'],
    achievements: [
      'Co-developed firmware for TipNovus 2.0 laboratory equipment',
      'Built dependency-managed CMake architecture spanning 30+ repositories',
      'Developed drivers for temperature/humidity sensors, SD/MMC, and EEPROM',
      'Implemented memory pool management and secure JSON storage systems',
      'Authored comprehensive system diagnostics and command protocols'
    ],
    period: 'Nov 2023 – Aug 2024',
    position: 'Embedded Software Engineer',
    company: 'Grenova'
  },
  {
    year: '2022–2023',
    title: 'Iontra Inc.',
    subtitle: 'Embedded SW Engineer',
    icon: Zap,
    color: 'bg-pink-500',
    type: 'work',
    status: 'Completed',
    description: 'Developed firmware for battery safety systems and automated testing infrastructure.',
    location: 'Remote',
    technologies: ['C/C++', 'RTOS', 'Battery Management', 'Automated Testing', 'Firmware'],
    achievements: [
      'Automated firmware verification process for 2000+ circuit boards',
      'Developed firmware for pouch cell safety metrics monitoring',
      'Modularized RTOS architecture for cross-platform OS support',
      'Onboarded new engineering hires and led architecture reviews',
      'Contributed to pull request reviews and code quality standards'
    ],
    period: 'Nov 2022 – Nov 2023',
    position: 'Embedded Software Engineer',
    company: 'Iontra Inc.'
  },
  {
    year: '2021–2023',
    title: 'Platform Aerospace',
    subtitle: 'Embedded Systems Engineer',
    icon: Plane,
    color: 'bg-indigo-500',
    type: 'work',
    status: 'Completed',
    description: 'Architected UAV control systems and embedded web servers for drone orchestration.',
    location: 'Hollywood, MD',
    technologies: ['C/C++', 'Teensy', 'Web Servers', 'UAV Systems', 'HiL Testing', 'Agile'],
    achievements: [
      'Rewrote UAV controller codebase achieving 50% memory reduction and 40% performance improvement',
      'Built embedded web server for UAS orchestration on Teensy 4.1 platform',
      'Led Hardware-in-the-Loop (HiL) simulation development for UAV testing',
      'Established communication protocol documentation and code review processes',
      'Implemented agile development workflows for embedded systems team'
    ],
    period: 'Feb 2021 – Sept 2023',
    position: 'Embedded Systems Engineer',
    company: 'Platform Aerospace'
  },
  {
    year: '2019–2021',
    title: 'Daimler Trucks',
    subtitle: 'Engineer I',
    icon: Truck,
    color: 'bg-red-500',
    type: 'work',
    status: 'Completed',
    description: 'Developed automation tools and led process improvement initiatives.',
    location: 'Portland, OR',
    technologies: ['Python', 'Alteryx', 'Process Automation', 'Agile', 'Data Analysis'],
    achievements: [
      'Built Python + Alteryx automation tool for cross-team validation workflows',
      'Proposed and led organizational transition from Waterfall to Agile methodology',
      'Developed Skill Matrix framework for training and competency mapping',
      'Streamlined validation processes reducing manual work by 60%',
      'Facilitated cross-functional team collaboration and knowledge sharing'
    ],
    period: 'Jul 2019 – Feb 2021',
    position: 'Engineer I',
    company: 'Daimler Trucks North America'
  },
  {
    year: '2018',
    title: 'CapTech',
    subtitle: 'Intern (iOS + AWS App Dev)',
    icon: Code,
    color: 'bg-cyan-500',
    type: 'work',
    status: 'Completed',
    description: 'Developed iOS application with AWS backend for vehicle management system.',
    location: 'Richmond, VA',
    technologies: ['iOS', 'Swift', 'AWS', 'REST API', 'Mobile Development'],
    achievements: [
      'Built iOS application with AWS backend for vehicle browsing and management',
      'Implemented secure base-32 authentication system for employee access',
      'Coordinated REST API refactor with backend development team',
      'Delivered critical bug fixes within 24-hour demo deadlines',
      'Collaborated with UX designers on mobile interface optimization'
    ],
    period: 'May – Aug 2018',
    position: 'Software Engineering Intern',
    company: 'CapTech Consulting'
  },
  {
    year: '2017',
    title: 'Joba Design',
    subtitle: 'Intern (Design + Arduino prototyping)',
    icon: PencilRuler,
    color: 'bg-purple-500',
    type: 'work',
    status: 'Completed',
    description: 'Bridged design and engineering through rapid prototyping and user research.',
    location: 'Blacksburg, VA',
    technologies: ['Arduino', 'Prototyping', 'UX Research', 'Product Design', 'C++'],
    achievements: [
      'Bridged design and engineering teams through rapid prototyping',
      'Built Arduino-based interactive devices for user experience testing',
      'Conducted ergonomics research and usability studies',
      'Developed proof-of-concept prototypes for client presentations',
      'Collaborated with industrial designers on product development'
    ],
    period: 'Jun – Aug 2017',
    position: 'Engineering Intern',
    company: 'Joba Design'
  },
  {
    year: '2016',
    title: 'Comm. Network Services',
    subtitle: 'Intern (Networking/UI/ELK)',
    icon: Code,
    color: 'bg-green-500',
    type: 'work',
    status: 'Completed',
    description: 'Developed network monitoring dashboards and traffic analysis tools.',
    location: 'Blacksburg, VA',
    technologies: ['ELK Stack', 'Kibana', 'Network Monitoring', 'UI Development', 'Data Visualization'],
    achievements: [
      'Built UI dashboard for real-time network log monitoring',
      'Researched and implemented ELK stack for log aggregation',
      'Created Kibana visualizations for network traffic analysis',
      'Performed network router testing and performance optimization',
      'Developed traffic heatmaps for network capacity planning'
    ],
    period: 'Feb – Sept 2016',
    position: 'Software Engineering Intern',
    company: 'Communication Network Services'
  },
  {
    year: '2017–2018',
    title: 'GM IEEE Senior Design',
    subtitle: 'Lead Engineer',
    icon: Zap,
    color: 'bg-orange-500',
    type: 'project',
    status: 'Completed',
    description: 'Led autonomous robot development for IEEE Southeastcon competition.',
    location: 'Virginia Tech',
    technologies: ['C++', 'Computer Vision', 'Robotics', 'CAD', 'Embedded Systems'],
    achievements: [
      'Designed and built autonomous robot for IEEE Southeastcon competition',
      'Led CAD design, embedded software development, and system testing',
      'Implemented computer vision and path planning algorithms',
      'Managed interdisciplinary team of 6 engineering students',
      'Achieved top 10 finish in regional IEEE competition'
    ],
    period: 'Aug 2017 – May 2018',
    position: 'Lead Engineer',
    company: 'GM IEEE Senior Design'
  }
];

// Projects Data
export const PROJECTS = [
  {
    id: 'anemometer',
    title: 'Turbulent Spaces Dissertation',
    description: 'Dissertation research on IoT wind measurement systems for urban environments, exploring scalable architectures for smart city applications and citizen engagement.',
    icon: Wind,
    tags: ['IoT', 'Sensors', 'Cloud', 'Analytics', 'PCB Design'],
    color: 'from-blue-500 to-cyan-500',
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/vineethk96/anemometer',
    demo: null,
    type: 'project'
  },
  {
    id: 'gesture-recognizer',
    title: 'Gesture Recognizer',
    description: 'ML-powered gesture recognition using flex sensors and embedded processing for intuitive human-computer interaction. Real-time classification with 95% accuracy.',
    icon: Hand,
    tags: ['ML', 'Sensors', 'Embedded', 'HCI', 'Arduino'],
    color: 'from-purple-500 to-pink-500',
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/vineethk96/gesture-recognizer',
    demo: null,
    type: 'project'
  },
  {
    id: 'hot-stone',
    title: 'Hot Stone IoT Device',
    description: 'Tactile warmth-sharing device connecting people through temperature, exploring emotional IoT interactions and long-distance relationships.',
    icon: Thermometer,
    tags: ['IoT', 'Design', 'Emotional Tech', 'Prototyping', 'ESP32'],
    color: 'from-orange-500 to-red-500',
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/vineethk96/hot-stone',
    demo: null,
    type: 'project'
  },
  {
    id: 'traveler',
    title: 'Traveler App',
    description: 'Flutter-based travel companion with Supabase backend and Google Maps integration for seamless journey planning and expense tracking.',
    icon: MapPin,
    tags: ['Flutter', 'Supabase', 'Maps API', 'Mobile', 'Full-Stack'],
    color: 'from-green-500 to-emerald-500',
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/vineethk96/traveler-app',
    demo: 'https://traveler-demo.netlify.app',
    type: 'project'
  },
  {
    id: 'lumos',
    title: 'Lumos Lighting System',
    description: 'MQTT-controlled smart lighting with rotary interfaces and magnetometer sensing for intuitive control. Features custom hardware and mobile app.',
    icon: Lightbulb,
    tags: ['MQTT', 'Smart Home', 'Sensors', 'UI', 'ESP32'],
    color: 'from-yellow-500 to-orange-500',
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/vineethk96/lumos-lighting',
    demo: null,
    type: 'project'
  },
  {
    id: 'ieee-robot',
    title: 'GM IEEE Senior Design',
    subtitle: 'Autonomous Robot',
    description: 'Autonomous robot designed for IEEE Southeastcon competition. Features computer vision, path planning, and embedded control systems.',
    icon: Bot,
    tags: ['Robotics', 'Computer Vision', 'Embedded', 'C++', 'Competition'],
    color: 'from-red-500 to-pink-500',
    status: 'Completed',
    year: '2017-2018',
    github: 'https://github.com/vineethk96/ieee-robot',
    demo: null,
    type: 'project'
  },
  {
    id: 'vehicle-app',
    title: 'CarTech Mobile App',
    description: 'iOS application with AWS backend for vehicle browsing and management. Features secure authentication and real-time data synchronization.',
    icon: Smartphone,
    tags: ['iOS', 'AWS', 'Swift', 'REST API', 'Mobile'],
    color: 'from-cyan-500 to-blue-500',
    status: 'Completed',
    year: '2018',
    github: null,
    demo: null,
    type: 'project'
  }
];

// Timeline Data (combines education, work, and key projects)
export const TIMELINE_DATA = [
  ...EDUCATION,
  ...WORK_EXPERIENCE,
  // Key projects for timeline
  {
    year: '2017–2018',
    title: 'GM IEEE Senior Design',
    subtitle: 'Autonomous Robot',
    icon: Zap,
    color: 'bg-orange-500',
    type: 'project'
  }
].sort((a, b) => {
  // Sort by start year (extract first year from range)
  const getStartYear = (yearStr) => parseInt(yearStr.split('–')[0] || yearStr.split('-')[0]);
  return getStartYear(a.year) - getStartYear(b.year);
});

// External Links
export const EXTERNAL_LINKS = {
  calendly: 'https://calendly.com/vineethk96',
  resume: '/docs/vineethCV.pdf'
};

// Skills/Technologies (for future use)
export const SKILLS = {
  programming: ['C/C++', 'Python', 'JavaScript', 'Swift', 'Dart'],
  embedded: ['Arduino', 'ESP32', 'Embedded Linux', 'Real-time Systems'],
  iot: ['MQTT', 'LoRaWAN', 'Sensors', 'Cloud Integration'],
  web: ['React', 'Node.js', 'REST APIs', 'WebSockets'],
  mobile: ['iOS', 'Flutter', 'React Native'],
  cloud: ['AWS', 'Supabase', 'Firebase'],
  tools: ['Git', 'Docker', 'PCB Design', 'CAD']
};
