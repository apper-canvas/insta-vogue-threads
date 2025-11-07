import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-8">
            <ApperIcon name="Heart" className="w-10 h-10 text-accent" />
          </div>
          
          <h1 className="font-display text-5xl font-bold text-primary mb-6">
            About Fashion Market
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-yellow-500 mx-auto mb-8"></div>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We're passionate about bringing you the latest trends and timeless classics 
            in fashion. Our mission is to make style accessible, affordable, and 
            sustainable for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Fashion Market, we believe that great style shouldn't break the bank. 
                We carefully curate collections from emerging designers and established 
                brands to bring you quality pieces that reflect your unique personality.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We're committed to ethical sourcing, sustainable practices, and 
                supporting artisans and creators who share our values of quality, 
                creativity, and social responsibility.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                    <ApperIcon name="Users" className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">50K+</h3>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                    <ApperIcon name="Package" className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">1000+</h3>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                    <ApperIcon name="Globe" className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">25</h3>
                  <p className="text-sm text-gray-600">Countries</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                    <ApperIcon name="Award" className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">5</h3>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold text-primary mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <ApperIcon name="Leaf" className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                Sustainability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're committed to eco-friendly practices, sustainable materials, 
                and reducing our environmental impact with every decision we make.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <ApperIcon name="Star" className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every product is carefully selected and tested to ensure it meets 
                our high standards for durability, comfort, and style.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <ApperIcon name="Shield" className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                Trust
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in transparent pricing, honest communication, and 
                building lasting relationships with our customers and partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Fashion Market
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <ApperIcon name="User" className="w-12 h-12 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary mb-2">
                Sarah Johnson
              </h3>
              <p className="text-accent font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                With 10+ years in fashion retail, Sarah brings vision and 
                passion for sustainable, accessible style to Fashion Market.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <ApperIcon name="User" className="w-12 h-12 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary mb-2">
                Marcus Chen
              </h3>
              <p className="text-accent font-medium mb-3">Creative Director</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Marcus curates our collections with an eye for emerging trends 
                and timeless pieces that speak to diverse style preferences.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                <ApperIcon name="User" className="w-12 h-12 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary mb-2">
                Emma Rodriguez
              </h3>
              <p className="text-accent font-medium mb-3">Customer Experience</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Emma ensures every customer interaction exceeds expectations, 
                from browsing to delivery and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-6">
            Ready to Discover Your Style?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've found their perfect pieces 
            with Fashion Market. Browse our latest collections today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto bg-white text-accent hover:bg-gray-50 px-8 py-3"
            >
              <ApperIcon name="ShoppingBag" className="w-5 h-5 mr-2" />
              Shop Now
            </Button>
            
            <Button
              onClick={() => navigate("/")}
              variant="secondary"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 px-8 py-3"
            >
              <ApperIcon name="Home" className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;