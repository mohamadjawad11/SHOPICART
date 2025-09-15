const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Best Sellers", "All Products", "Contact Us", "FAQs"]
        },
        {
            title: "Need Help?",
            links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
        },
        {
            title: "Follow Us",
            links: ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-0 border-t border-gray-800/50 mt-20 ml-12 mr-12 bottom-0 md:bottom-auto">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-800/50 text-gray-500">
                <div>
                    <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold select-none">
      <span className="text-[#4fbf8b]">Shopi</span><span className="text-gray-800">Cart</span>
    </h1>
<p className="max-w-[410px] mt-6">Welcome! Shop our fresh produce, quality meats, and everyday essentials. We're here to make your shopping easy and enjoyable.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-primary md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:underline transition">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-800/80">
                Copyright {new Date().getFullYear()} © ShopiCart. All rights reserved.
            </p>
        </div>
    );
};
export default Footer;