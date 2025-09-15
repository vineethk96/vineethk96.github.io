import { 
  GraduationCap, 
  Code, 
  Wind, 
  Hand, 
  Thermometer, 
  MapPin, 
  Lightbulb, 
  Bot, 
  Smartphone, 
  Plane, 
  Truck, 
  PencilRuler, 
  Zap, 
  Mail,
  Linkedin,
  Github
} from 'lucide-react';

// Personal Information
export const PERSONAL_INFO = {
  name: 'Vineeth Kirandumkara',
  email: 'vineethkirandumkara+portfolio@gmail.com',
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
    title: 'University College London',
    subtitle: 'MSc Connected Environments',
    icon: GraduationCap,
    color: 'bg-emerald-500',
    type: 'education',
    status: 'Completed',
    description: 'Advanced study in IoT systems, urban technology, and connected product design.',
    location: 'London, UK',
    highlights: [
      'Urban IoT systems and smart city technologies',
      'Connected product design and user experience',
      'Scalable architecture for mass-market deployment',
      'Research in turbulent urban environments'
    ]
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
    location: 'Blacksburg, VA',
    highlights: [
      'Computer systems architecture and design',
      'Embedded systems and microcontroller programming',
      'Digital signal processing and communications',
      'IEEE Southeastcon robotics competition leadership'
    ]
  }
];

// Work Experience Data
export const WORK_EXPERIENCE = [
  {
    company: 'Grenova',
    position: 'Embedded Software Engineer',
    year: '2023–2024',
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
    ]
  },
  {
    company: 'Iontra Inc.',
    position: 'Embedded Software Engineer',
    year: '2022–2023',
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
    ]    
  },
  {
    company: 'Platform Aerospace',
    position: 'Embedded Systems Engineer',
    year: '2021–2023',
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
    ]    
  },
  {
    company: 'Daimler Trucks North America',
    position: 'Engineer I',
    year: '2019–2021',
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
    ]    
  },
  {
    company: 'CapTech Consulting',
    position: 'Software Engineering Intern',
    year: '2018',
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
    ]    
  },
  {
    company: 'Joba Design',
    position: 'Engineering Intern',
    year: '2017',
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
    ]  
  },
  {
    company: 'Communication Network Services',
    position: 'Software Engineering Intern',
    year: '2016',
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
    ]
  }
];

// Projects Data
export const PROJECTS = [
  {
    id: 'anemometer',
    title: 'Dissertation: Wind Mapping',
    description: 'Dissertation research on IoT wind measurement systems for urban environments, exploring scalable architectures for smart city applications and citizen engagement.',
    icon: Wind,
    tags: ['IoT', 'Sensors', 'Cloud', 'Analytics', 'PCB Design'],
    color: 'from-blue-500 to-cyan-500',
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/vineethk96/anemometer',
    demo: null,
    type: 'project',
    // SystemMap properties
    category: 'iot-sensor',
    technologies: ['Arduino', 'IoT', 'Cloud', 'Sensors'],
    mapColor: '#3b82f6',
    size: 8
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
    type: 'project',
    // SystemMap properties
    category: 'ml-embedded',
    technologies: ['ML', 'Sensors', 'Embedded', 'Arduino'],
    mapColor: '#8b5cf6',
    size: 7
  },
  {
    id: 'hot-stone',
    title: 'Hot Stone',
    description: 'Tactile warmth-sharing device connecting people through temperature, exploring emotional IoT interactions and long-distance relationships.',
    icon: Thermometer,
    tags: ['IoT', 'Design', 'Emotional Tech', 'Prototyping', 'ESP32'],
    color: 'from-orange-500 to-red-500',
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/vineethk96/hot-stone',
    demo: null,
    type: 'project',
    // SystemMap properties
    category: 'iot-design',
    technologies: ['IoT', 'Design', 'ESP32', 'Prototyping'],
    mapColor: '#f97316',
    size: 6
  },
  {
    id: 'traveler',
    title: 'Traveler Mobile App',
    description: 'Flutter-based travel companion with Supabase backend and Google Maps integration for seamless journey planning and expense tracking.',
    icon: MapPin,
    tags: ['Flutter', 'Supabase', 'Maps API', 'Mobile', 'Full-Stack'],
    color: 'from-green-500 to-emerald-500',
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/vineethk96/traveler-app',
    demo: 'https://traveler-demo.netlify.app',  // TODO: Setup Demo Link
    type: 'project',
    // SystemMap properties
    category: 'mobile-cloud',
    technologies: ['Flutter', 'Supabase', 'Maps API', 'Mobile'],
    mapColor: '#10b981',
    size: 7
  },
  {
    id: 'lumos',
    title: 'Lumos',
    description: 'MQTT-controlled smart lighting with rotary interfaces and magnetometer sensing for intuitive control. Features custom hardware and mobile app.',
    icon: Lightbulb,
    tags: ['MQTT', 'Smart Home', 'Sensors', 'UI', 'ESP32'],
    color: 'from-yellow-500 to-orange-500',
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/vineethk96/lumos-lighting',
    demo: null,
    type: 'project',
    // SystemMap properties
    category: 'iot-control',
    technologies: ['MQTT', 'Smart Home', 'Sensors', 'ESP32'],
    mapColor: '#f59e0b',
    size: 6
  },
  {
    id: 'ieee-robot',
    title: 'IEEE Autonomous Robot',
    subtitle: 'Autonomous Robot',
    description: 'Autonomous robot designed for IEEE Southeastcon competition. Features computer vision, path planning, and embedded control systems.',
    icon: Bot,
    tags: ['Robotics', 'Computer Vision', 'Embedded', 'C++', 'Competition'],
    color: 'from-red-500 to-pink-500',
    status: 'Completed',
    year: '2017-2018',
    github: 'https://github.com/vineethk96/ieee-robot',
    demo: null,
    type: 'project',
    // SystemMap properties
    category: 'robotics',
    technologies: ['Robotics', 'Computer Vision', 'Embedded', 'C++'],
    mapColor: '#ef4444',
    size: 6
  },
  {
    id: 'cartech',
    title: 'CarTech Mobile App',
    description: 'iOS application with AWS backend for vehicle browsing and management. Features secure authentication and real-time data synchronization.',
    icon: Smartphone,
    tags: ['iOS', 'AWS', 'Swift', 'REST API', 'Mobile'],
    color: 'from-cyan-500 to-blue-500',
    status: 'Completed',
    year: '2018',
    github: 'https://github.com/vineethk96/vehicle-app',
    demo: null,
    type: 'project',
    // SystemMap properties
    category: 'mobile-cloud',
    technologies: ['iOS', 'AWS', 'Swift', 'REST API'],
    mapColor: '#06b6d4',
    size: 5
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

// Personal Story/Bio
export const PERSONAL_STORY = {
  introduction: "I'm an embedded systems engineer transitioning to IoT architecture and product design. My journey spans from low-level firmware to cloud-connected systems, with a passion for creating technology that scales from prototype to mass market.",
  journey: [
    "My path in technology began with a fascination for how things work at the most fundamental level. During my computer engineering studies at Virginia Tech, I dove deep into embedded systems, digital design, and the intricate dance between hardware and software.",
    "Over the past five years, I've worked across various startups and established companies, building everything from UAV control systems to battery safety monitors. Each role has expanded my perspective from component-level optimization to system-level architecture.",
    "Now, pursuing my MSc in Connected Environments at UCL, I'm focused on the bigger picture: how connected devices can create meaningful experiences for people and communities. I'm passionate about bridging the gap between technical capability and human need, designing IoT systems that are not just functional, but truly valuable at scale."
  ],
  vision: "I'm excited to join teams that are building the next generation of connected products. My goal is to work at the intersection of IoT systems, product design, and user experience, creating technology that seamlessly integrates into people's lives and scales to serve millions of users worldwide."
};

// System Map Links (project relationships)
export const SYSTEM_MAP_LINKS = [
  // Research Application
  { source: 'anemometer', target: 'ieee-robot', relationship: 'research-application' },

  // IoT ecosystem connections
  { source: 'lumos', target: 'hot-stone', relationship: 'iot-platform' },
  { source: 'anemometer', target: 'lumos', relationship: 'iot-platform' },
  { source: 'hot-stone', target: 'anemometer', relationship: 'iot-platform' },

  // Sensor Systems
  { source: 'gesture-recognizer', target: 'anemometer', relationship: 'sensor-system' },
  { source: 'hot-stone', target: 'gesture-recognizer', relationship: 'sensor-system' },
  
  // Technology evolution
  { source: 'ieee-robot', target: 'gesture-recognizer', relationship: 'embedded-evolution' },
  { source: 'hot-stone', target: 'ieee-robot', relationship: 'embedded-evolution' },
  { source: 'anemometer', target: 'ieee-robot', relationship: 'embedded-evolution' },

  // Mobile App
  { source: 'cartech', target: 'traveler', relationship: 'mobile-app' },
  
  // System architecture connections
  { source: 'cartech', target: 'ieee-robot', relationship: 'systems-thinking' },
  { source: 'cartech', target: 'traveler', relationship: 'systems-thinking' },
  { source: 'cartech', target: 'hot-stone', relationship: 'systems-thinking' },
  { source: 'cartech', target: 'anemometer', relationship: 'systems-thinking' },
];

// Prototypes Data (moved from Lab.js)
export const PROTOTYPES = [
{
    id: 'anemometer-breadboard',
    title: 'Anemometer Signal Conditioning',
    category: 'hardware',
    date: '2024-03',
    description: 'Early breadboard prototype for ultrasonic wind sensor signal conditioning circuit. Testing amplification and filtering stages.',
    images: [
      {
        url: '/api/placeholder/800/600',
        alt: 'Breadboard circuit with op-amps and sensors',
        caption: 'Initial breadboard setup with signal conditioning circuit'
      },
      {
        url: '/api/placeholder/800/600',
        alt: 'Oscilloscope readings showing filtered signals',
        caption: 'Before and after filtering - noise reduction at 1kHz cutoff'
      }
    ],
    tags: ['Breadboard', 'Signal Processing', 'Sensors', 'Analog'],
    notes: 'Initial tests showed noise issues at high gain. Added low-pass filter at 1kHz cutoff.',
    materials: ['Op-amps', 'Resistors', 'Capacitors', 'Ultrasonic sensors'],
    detailedDescription: `
      <p>This prototype explored signal conditioning for ultrasonic wind sensors, focusing on amplification and noise reduction.</p>
      <h3>Testing Process</h3>
      <ul>
        <li>Initial gain stage testing revealed significant noise at frequencies above 1kHz</li>
        <li>Implemented Sallen-Key low-pass filter topology</li>
        <li>Tested various op-amp configurations for optimal signal-to-noise ratio</li>
      </ul>
      <h3>Lessons Learned</h3>
      <p>Proper grounding and power supply decoupling are critical for low-noise analog circuits. The final design achieved 40dB noise reduction while maintaining signal integrity.</p>
    `,
    testResults: 'Successfully reduced noise by 40dB while maintaining signal integrity across 0-500Hz range.'
  },
  {
    id: 'gesture-pipeline',
    title: 'Gesture Recognition Pipeline',
    category: 'software',
    date: '2024-02',
    description: 'Machine learning pipeline for processing flex sensor data into gesture classifications.',
    images: [
      {
        url: '/api/placeholder/800/600',
        alt: 'Data visualization showing gesture patterns',
        caption: 'Flex sensor data patterns for different hand gestures'
      },
      {
        url: '/api/placeholder/800/600',
        alt: 'Confusion matrix showing classification accuracy',
        caption: 'SVM classifier achieving 95% accuracy across 8 gesture classes'
      }
    ],
    tags: ['ML', 'Python', 'Data Processing', 'Classification'],
    notes: 'Achieved 95% accuracy with SVM classifier. Real-time processing at 50Hz sample rate.',
    materials: ['Flex sensors', 'Arduino', 'Python', 'Scikit-learn'],
    detailedDescription: `
      <p>Development of a real-time gesture recognition system using flex sensors and machine learning.</p>
      <h3>Data Collection</h3>
      <ul>
        <li>Collected 10,000+ samples across 8 different hand gestures</li>
        <li>Implemented sliding window feature extraction</li>
        <li>Applied signal smoothing and normalization techniques</li>
      </ul>
      <h3>Model Training</h3>
      <p>Compared multiple algorithms including SVM, Random Forest, and Neural Networks. SVM with RBF kernel provided the best balance of accuracy and real-time performance.</p>
    `,
    testResults: '95% classification accuracy with 20ms inference time on embedded hardware.'
  },
  {
    id: 'hotstone-mockup',
    title: 'Hot Stone Interface Mockups',
    category: 'design',
    date: '2024-01',
    description: 'Tactile interface explorations for temperature-based emotional communication device.',
    images: [
      {
        url: '/api/placeholder/800/600',
        alt: 'Various 3D printed housing prototypes',
        caption: 'Different form factor explorations for optimal hand contact'
      },
      {
        url: '/api/placeholder/800/600',
        alt: 'User testing session with temperature feedback',
        caption: 'User testing revealed preference for gradual temperature changes'
      }
    ],
    tags: ['UI/UX', 'Tactile', 'Emotional Design', 'Prototyping'],
    notes: 'Users preferred gradual temperature changes over sudden shifts. Optimal range: 25-35°C.',
    materials: ['Peltier elements', '3D printed housing', 'Temperature sensors'],
    detailedDescription: `
      <p>Exploration of tactile interfaces for emotional communication through temperature.</p>
      <h3>User Research</h3>
      <ul>
        <li>Conducted interviews with 15 participants about emotional communication</li>
        <li>Tested various temperature ranges and transition speeds</li>
        <li>Evaluated different form factors for comfort and usability</li>
      </ul>
      <h3>Design Iterations</h3>
      <p>Multiple 3D printed prototypes were tested, with the final design featuring a smooth, stone-like form that fits naturally in the palm.</p>
    `,
    testResults: 'Users reported 85% satisfaction with gradual temperature changes in 25-35°C range.'
  },
  {
    id: 'lumos-rotary',
    title: 'Lumos Rotary Control Demo',
    category: 'hardware',
    date: '2023-12',
    description: 'Magnetic rotary encoder with haptic feedback for intuitive lighting control.',
    images: [
      {
        url: '/api/placeholder/800/600',
        alt: 'Custom PCB with magnetometer and vibration motor',
        caption: 'Custom PCB design with integrated magnetometer and haptic feedback'
      },
      {
        url: '/api/placeholder/800/600',
        alt: 'Assembled rotary control with LED ring',
        caption: 'Final assembly with LED ring providing visual feedback'
      }
    ],
    tags: ['Rotary Encoder', 'Haptics', 'Smart Home', 'UI'],
    notes: 'Magnetometer-based sensing eliminates mechanical wear. Added vibration feedback.',
    materials: ['Magnetometer', 'Vibration motor', 'ESP32', 'Custom PCB'],
    detailedDescription: `
      <p>Development of a wear-free rotary control using magnetic sensing and haptic feedback.</p>
      <h3>Technical Innovation</h3>
      <ul>
        <li>Magnetometer-based position sensing eliminates mechanical contacts</li>
        <li>Custom PCB design optimizes component placement and signal integrity</li>
        <li>Haptic feedback provides tactile confirmation of input</li>
      </ul>
      <h3>Integration Testing</h3>
      <p>Successfully integrated with existing smart home systems via MQTT protocol.</p>
    `,
    testResults: 'Achieved 0.1° resolution with zero mechanical wear after 100,000+ rotations.'
  },
  {
    id: 'arduino-concepts',
    title: 'Arduino Concept Builds',
    category: 'hardware',
    date: '2017-08',
    description: 'Various Arduino-based prototypes from Joba Design internship exploring user interaction.',
    images: [
      {
        url: '/api/placeholder/800/600',
        alt: 'Collection of Arduino prototypes on workbench',
        caption: 'Various Arduino-based interaction prototypes'
      },
      {
        url: '/api/placeholder/800/600',
        alt: 'User testing different button and sensor configurations',
        caption: 'Rapid iteration based on user feedback and ergonomic testing'
      }
    ],
    tags: ['Arduino', 'Prototyping', 'User Testing', 'Sensors'],
    notes: 'Rapid iteration cycles. Focus on user feedback and ergonomic considerations.',
    materials: ['Arduino Uno', 'Various sensors', 'LEDs', 'Buttons'],
    detailedDescription: `
      <p>Exploration of user interaction paradigms through rapid Arduino prototyping.</p>
      <h3>Iterative Design Process</h3>
      <ul>
        <li>Built 20+ different interaction concepts over 8 weeks</li>
        <li>Conducted daily user testing sessions</li>
        <li>Focused on ergonomics and intuitive operation</li>
      </ul>
      <h3>Key Insights</h3>
      <p>Users prefer immediate visual feedback and consistent interaction patterns across different devices.</p>
    `,
    testResults: 'Identified optimal button placement and feedback timing through user testing.'
  },
  {
    id: 'network-dashboard',
    title: 'Network Monitoring Dashboard',
    category: 'software',
    date: '2016-06',
    description: 'Real-time network traffic visualization dashboard using ELK stack.',
    images: [
      {
        url: '/api/placeholder/800/600',
        alt: 'Kibana dashboard showing network traffic patterns',
        caption: 'Custom Kibana visualizations for real-time traffic monitoring'
      },
      {
        url: '/api/placeholder/800/600',
        alt: 'Network topology diagram with traffic flows',
        caption: 'Network topology visualization with real-time traffic flows'
      }
    ],
    tags: ['ELK Stack', 'Visualization', 'Networking', 'Dashboard'],
    notes: 'Processed 10GB+ daily logs. Custom Kibana visualizations for traffic patterns.',
    materials: ['Elasticsearch', 'Logstash', 'Kibana', 'Network routers'],
    detailedDescription: `
      <p>Development of a comprehensive network monitoring solution using the ELK stack.</p>
      <h3>Data Processing</h3>
      <ul>
        <li>Ingested 10GB+ of daily network logs</li>
        <li>Created custom Logstash parsers for various log formats</li>
        <li>Implemented real-time alerting for anomalous traffic patterns</li>
      </ul>
      <h3>Visualization Design</h3>
      <p>Custom Kibana dashboards provided network administrators with actionable insights into traffic patterns and potential security threats.</p>
    `,
    testResults: 'Successfully monitored 500+ network devices with 99.9% uptime and real-time alerting.'
  },
  {
  id: 'ultrasonic-3d-anemometer',
  title: 'ultrasonic 3d anemometer',
  description: '3D anemometer to measure wind flows in urban environments.',
  detailedDescription: 'TODO',
  category: 'hardware',
  date: '2025-06',
  tags: [
    'IoT',
    'Electrical',
    'Ultrasonic',
    'Sensors'
  ],
  notes: 'Inductance is important.',
  materials: [
    'Ultrasonic sensors',
    'ESP32',
    'Oscilliscope',
    'Signal Conditioning',
    'Phase-Lock Loop'
  ],
  images: [
    {
      url: '/prototypes/ultrasonic-3d-anemometer-image.jpg',
      alt: 'ultrasonic 3d anemometer - Prototype Image',
      caption: 'Lab setup'
    }
  ],
  testResults: 'Failed, however, learned a lot'
}
];

// Blog Posts Data
export const BLOG_POSTS = [
  {
    id: 'iot-architecture-patterns',
    title: 'IoT Architecture Patterns for Scale',
    category: 'technical',
    date: '2024-03-15',
    readTime: '8 min read',
    excerpt: 'Exploring scalable architecture patterns for IoT systems, from device management to data processing pipelines.',
    images: [
      {
        url: '/api/placeholder/800/400',
        alt: 'IoT architecture diagram',
        caption: 'Microservices-based IoT architecture for scalable device management'
      }
    ],
    tags: ['IoT', 'Architecture', 'Scalability', 'Cloud'],
    content: `
      <p>As IoT deployments grow from hundreds to millions of devices, traditional architectures often fail to scale. This post explores proven patterns for building scalable IoT systems.</p>
      <h2>The Challenge of Scale</h2>
      <p>Managing millions of connected devices requires careful consideration of data flow, device management, and system resilience...</p>
    `
  },
  {
    id: 'embedded-ml-optimization',
    title: 'Optimizing ML Models for Embedded Systems',
    category: 'technical',
    date: '2024-02-20',
    readTime: '6 min read',
    excerpt: 'Techniques for deploying machine learning models on resource-constrained embedded devices.',
    images: [
      {
        url: '/api/placeholder/800/400',
        alt: 'Embedded ML workflow diagram',
        caption: 'Model optimization pipeline for embedded deployment'
      }
    ],
    tags: ['Machine Learning', 'Embedded', 'Optimization', 'TinyML'],
    content: `
      <p>Deploying ML models on embedded devices requires careful optimization to balance accuracy with resource constraints...</p>
    `
  },
  {
    id: 'design-thinking-iot',
    title: 'Design Thinking in IoT Product Development',
    category: 'design',
    date: '2024-01-10',
    readTime: '5 min read',
    excerpt: 'Applying human-centered design principles to create meaningful IoT experiences.',
    images: [
      {
        url: '/api/placeholder/800/400',
        alt: 'Design thinking process diagram',
        caption: 'Human-centered design process for IoT product development'
      }
    ],
    tags: ['Design Thinking', 'IoT', 'UX', 'Product Development'],
    content: `
      <p>IoT products often focus on technical capabilities while neglecting user experience. Design thinking helps bridge this gap...</p>
    `
  }
];

// External Links
export const EXTERNAL_LINKS = {
  calendly: 'https://calendly.com/vineethk96',  // TODO: Setup Calendly Link
  resume: '/vineethCV.pdf'
};

// Skills/Technologies
export const SKILLS = {
  'Embedded Systems': {
    icon: 'Zap',
    skills: ['C/C++', 'FreeRTOS', 'ESP32/Arduino', 'PCB Design', 'Signal Processing'],
    color: 'text-blue-500'
  },
  'IoT & Cloud': {
    icon: 'Globe',
    skills: ['MQTT', 'AWS/Cloud Services', 'REST APIs', 'Data Analytics', 'System Architecture'],
    color: 'text-green-500'
  },
  'Software Development': {
    icon: 'Code',
    skills: ['Python', 'JavaScript/React', 'Flutter', 'Git', 'Agile/Scrum'],
    color: 'text-purple-500'
  },
  'Design & Prototyping': {
    icon: 'Target',
    skills: ['Product Design', 'User Research', 'CAD/3D Modeling', 'Rapid Prototyping', 'UI/UX'],
    color: 'text-pink-500'
  }
};

// Certifications
export const CERTIFICATIONS = [
  {
    name: 'Autodesk Inventor Professional',
    issuer: 'Autodesk',
    year: '2019',
    description: 'Advanced 3D CAD design and mechanical engineering'
  }
];
