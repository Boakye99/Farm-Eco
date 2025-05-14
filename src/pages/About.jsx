import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Clock, Heart, Leaf, Users, ShieldCheck } from 'lucide-react';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log('Form data submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Reset submission status after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const teamMembers = [
    {
      name: 'Emily Rodriguez',
      role: 'CEO & Founder',
      bio: 'With over 15 years of experience in sustainable agriculture, Emily founded Farm Eco with a vision to connect eco-conscious farmers with consumers.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Operations',
      bio: 'Marcus ensures our supply chain remains environmentally friendly while maintaining efficient delivery of fresh produce to our customers.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Amara Okafor',
      role: 'Sustainability Director',
      bio: 'Amara works closely with our partner farms to implement and maintain rigorous environmental standards across our network.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'James Wilson',
      role: 'Customer Relations',
      bio: 'James leads our customer support team, ensuring your farm-to-table experience is seamless and satisfying every time.',
      image: '/api/placeholder/150/150'
    }
  ];

  const coreValues = [
    {
      icon: <Leaf className="h-12 w-12 text-green-600" />,
      title: 'Sustainability',
      description: 'We prioritize environmental health in every decision, from farming practices to packaging materials.'
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: 'Community',
      description: 'Supporting local farmers and strengthening the bond between producers and consumers.'
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-green-600" />,
      title: 'Quality',
      description: 'We never compromise on the quality of our products, ensuring you receive the freshest organic goods.'
    },
    {
      icon: <Heart className="h-12 w-12 text-green-600" />,
      title: 'Care',
      description: 'Genuine care for our planet, our farmers, and our customers guides everything we do.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/api/placeholder/1920/600')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">About Farm Eco</h1>
          <p className="mt-6 text-xl max-w-3xl">Connecting eco-conscious farmers with sustainability-minded consumers since 2018.</p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Story</h2>
          <div className="mt-8 text-lg text-gray-600 max-w-3xl mx-auto">
            <p className="mb-4">
              Farm Eco began with a simple idea: making sustainable, organic farming accessible to everyone. Founded in 2018, we've grown from partnering with just three local farms to creating a nationwide network of over 200 eco-conscious producers.
            </p>
            <p className="mb-4">
              Our mission is to revolutionize the food supply chain by cutting out unnecessary middlemen, reducing environmental impact, and ensuring farmers receive fair compensation for their hard work and dedication to sustainable practices.
            </p>
            <p>
              Today, we're proud to connect thousands of households with fresh, organic produce while supporting the livelihoods of farmers committed to environmental stewardship and regenerative agriculture.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make at Farm Eco.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                {value.icon}
                <h3 className="mt-4 text-xl font-medium text-gray-900">{value.title}</h3>
                <p className="mt-2 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet Our Team</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The passionate individuals dedicated to our mission of sustainable agriculture.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-48 object-cover object-center" src={member.image} alt={member.name} />
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm font-medium text-green-600">{member.role}</p>
                <p className="mt-3 text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Get in Touch</h2>
              <p className="mt-3 text-lg text-gray-600">
                Have questions about our products, partnerships, or sustainability practices? We'd love to hear from you.
              </p>
              <div className="mt-9">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-600">
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-600">
                    <p>contact@farmeco.com</p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-600">
                    <p>123 Green Street</p>
                    <p className="mt-1">Portland, OR 97205</p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-600">
                    <p>Monday-Friday: 9AM-5PM PST</p>
                    <p className="mt-1">Saturday: 10AM-2PM PST</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Send us a message</h2>
              <form onSubmit={handleSubmit} className="mt-9 grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <div className="mt-1">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit
                  </button>
                </div>
                {submitted && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 flex">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-green-800">Thank you! Your message has been sent successfully.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;