export default function WhyChooseUs(){
    const features = [
        {
          icon: "ri-shield-check-line",
          title: "Certified Authentic",
          description: "Every diamond comes with GIA certification",
        },
        {
          icon: "ri-secure-payment-line",
          title: "Secure Payment",
          description: "Multiple secure payment options",
        },
        {
          icon: "ri-truck-line",
          title: "Free Shipping",
          description: "Complimentary insured shipping",
        },
        {
          icon: "ri-refresh-line",
          title: "30-Day Returns",
          description: "Money-back guarantee",
        },
      ];
    
    return (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-600">
                Discover the advantages of purchasing from our collection
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/5 flex items-center justify-center">
                    <i className={`${feature.icon} text-2xl text-primary`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
};
    