import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Clock, Heart, Leaf, Users, ShieldCheck, TrendingUp, Award, Target } from 'lucide-react';

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

  const coreValues = [
    {
      icon: <Leaf className="h-12 w-12 text-green-600" />,
      title: 'Sustainability',
      description: 'We prioritize environmental health in every decision, from farming practices to equipment selection.'
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: 'Community',
      description: 'Supporting local Ghanaian farmers and strengthening agricultural communities through technology and resources.'
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-green-600" />,
      title: 'Quality',
      description: 'We never compromise on the quality of our tools and equipment, ensuring farmers receive durable and effective resources.'
    },
    {
      icon: <Heart className="h-12 w-12 text-green-600" />,
      title: 'Innovation',
      description: 'Applying data-driven insights and technological solutions to transform traditional farming practices in Ghana.'
    }
  ];

  const journeyMilestones = [
    {
      year: '2019',
      title: 'The Inspiration',
      description: 'Boakye recognized the technology gap facing Ghanaian farmers during his data research project on agricultural productivity.'
    },
    {
      year: '2020-2021',
      title: 'Research & Development',
      description: 'Conducted extensive field research across rural Ghana, gathering data on farming challenges and equipment needs.'
    },
    {
      year: '2022',
      title: 'Building Partnerships',
      description: 'Established relationships with equipment manufacturers and secured initial funding from agricultural development investors.'
    },
    {
      year: '2023',
      title: 'Pilot Program',
      description: 'Launched a successful pilot program with 25 farms in the Ashanti Region, demonstrating 40% productivity improvement.'
    },
    {
      year: '2024',
      title: 'Farm Eco Launch',
      description: 'Officially founded Farm Eco with a full-scale platform connecting Ghanaian farmers with essential equipment and technological resources.'
    },
    {
      year: '2025',
      title: 'Expansion',
      description: 'Currently expanding operations to three additional regions in Ghana with plans for pan-African growth.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/api/placeholder/1920/600')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">About Farm Eco</h1>
          <p className="mt-6 text-xl max-w-3xl">Revolutionizing Ghanaian agriculture by connecting farmers with innovative tools and technology since 2024.</p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Story</h2>
          <div className="mt-8 text-lg text-gray-600 max-w-3xl mx-auto">
            <p className="mb-4">
              Farm Eco began with a powerful realization: Ghanaian farmers, despite their critical role in the nation's economy and food security, lacked access to modern farming equipment and technological support that could transform their productivity and livelihoods.
            </p>
            <p className="mb-4">
              Founded in 2024 by Boakye Yiadom Eric, a passionate data analyst and tech innovator, Farm Eco emerged from years of research and a deep commitment to agricultural development in Ghana. What started as a personal research project evolved into a mission to bridge the gap between traditional farming methods and modern agricultural technology.
            </p>
            <p>
              Today, we're proud to be creating a network that connects farmers across Ghana with essential equipment, training, and data-driven insights that increase crop yields, reduce labor intensity, and improve economic outcomes for farming communities.
            </p>
          </div>
        </div>
      </div>

      {/* Founder Profile */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="relative lg:col-span-1">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <img className="object-cover object-center" src="data:image/jpeg;base64,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" alt="Boakye Yiadom Eric" />
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-span-1">
              <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Founder</h2>
              <h3 className="mt-2 text-xl font-medium text-green-600">Boakye Yiadom Eric</h3>
              <p className="mt-3 text-lg text-gray-600">Founder & CEO</p>
              <div className="mt-6 text-gray-600">
                <p className="mb-4">
                  Boakye Yiadom Eric is a technology enthusiast and data analytics professional with over 5 years of experience transforming complex challenges into data-driven solutions. His journey to founding Farm Eco began during his time analyzing agricultural productivity data across sub-Saharan Africa.
                </p>
                <p className="mb-4">
                  With expertise in both data science and agricultural systems, Boakye identified a critical opportunity to leverage technology for empowering Ghanaian farmers. His background combines formal training in data analytics with hands-on experience working alongside farming communities throughout Ghana.
                </p>
                <p>
                  As both a researcher and entrepreneur, Boakye leads Farm Eco with a vision of technological inclusion that preserves traditional farming wisdom while introducing innovations that dramatically improve efficiency, sustainability, and profitability for Ghanaian farmers.
                </p>
              </div>
              <div className="mt-8 flex">
                <div className="mr-6 flex items-center">
                  <Award className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">Data Innovation Award 2023</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">AgriTech Pioneer 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Map */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Journey</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From insight to impact: The evolution of Farm Eco
          </p>
        </div>
        <div className="mt-12 relative">
          {/* Journey Line */}
          <div className="hidden md:block absolute top-1/2 w-full h-1 bg-green-200 transform -translate-y-1/2"></div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {journeyMilestones.map((milestone, index) => (
              <div key={index} className="relative bg-white rounded-lg shadow-md p-6">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-green-600">{milestone.year}</h3>
                <h4 className="mt-2 text-xl font-medium text-gray-900">{milestone.title}</h4>
                <p className="mt-3 text-gray-600">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our mission to transform Ghanaian agriculture.
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

      {/* Impact Stats */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Impact</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The difference we're making in Ghanaian agriculture
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white shadow rounded-lg px-6 py-8 text-center">
            <p className="text-4xl font-extrabold text-green-600">500+</p>
            <p className="mt-2 text-lg font-medium text-gray-900">Farmers Connected</p>
          </div>
          <div className="bg-white shadow rounded-lg px-6 py-8 text-center">
            <p className="text-4xl font-extrabold text-green-600">35%</p>
            <p className="mt-2 text-lg font-medium text-gray-900">Average Yield Increase</p>
          </div>
          <div className="bg-white shadow rounded-lg px-6 py-8 text-center">
            <p className="text-4xl font-extrabold text-green-600">4</p>
            <p className="mt-2 text-lg font-medium text-gray-900">Regions in Ghana</p>
          </div>
          <div className="bg-white shadow rounded-lg px-6 py-8 text-center">
            <p className="text-4xl font-extrabold text-green-600">12</p>
            <p className="mt-2 text-lg font-medium text-gray-900">Equipment Partners</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Get in Touch</h2>
              <p className="mt-3 text-lg text-gray-600">
                Have questions about our services, partnerships, or how we can help your farm? We'd love to hear from you.
              </p>
              <div className="mt-9">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-600">
                    <p>+233 54 123 4567</p>
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
                    <p>15 Independence Avenue</p>
                    <p className="mt-1">Accra, Ghana</p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-600">
                    <p>Monday-Friday: 8AM-5PM GMT</p>
                    <p className="mt-1">Saturday: 9AM-1PM GMT</p>
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