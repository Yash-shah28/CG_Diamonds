export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-7">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <a href="/" className="text-3xl font-[Pacifico] text-white mb-6 block">
                  CG Diamond
                </a>
                <p className="text-sm mb-6">
                  Experience the extraordinary beauty of untouched diamonds, each telling its own unique story.
                </p>
                <div className="flex space-x-4">
                  {["facebook-fill", "instagram-line", "pinterest-line"].map((icon, index) => (
                    <a key={index} href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800">
                      <i className={`ri-${icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
              {[
                {
                  title: "Quick Links",
                  links: ["About Us", "Our Collection", "Diamond Education", "Custom Design", "Contact Us"],
                },
                {
                  title: "Customer Service",
                  links: ["Shipping Policy", "Returns & Exchanges", "Size Guide", "Care Instructions", "FAQ"],
                },
                {
                  title: "Contact Us",
                  contacts: [
                    { icon: "map-pin-line", text: "123 Fifth Avenue, New York, NY 10160" },
                    { icon: "phone-line", text: "+1 (800) 123-4567" },
                    { icon: "mail-line", text: "contact@example.com" },
                  ],
                },
              ].map((section, index) => (
                <div key={index}>
                  <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links && section.links.map((link, i) => (
                      <li key={i}><a href="#" className="hover:text-white">{link}</a></li>
                    ))}
                    {section.contacts && section.contacts.map((contact, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <i className={`ri-${contact.icon}`}></i>
                        <span>{contact.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">&copy; CG Diamond. All rights reserved.</p>
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                    <a key={index} href="#" className="text-sm hover:text-white">{item}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
    };