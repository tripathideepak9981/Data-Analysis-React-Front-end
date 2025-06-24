import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { Send, Sparkles, CheckCircle } from "lucide-react";
import emailjs from 'emailjs-com';

interface ContactFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  queryType: string;
  message: string;
}

const ModernContactSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    workEmail: '',
    companyName: '',
    queryType: '',
    message: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      queryType: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.fullName || !formData.workEmail || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to continue.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const templateParams = {
        full_name: formData.fullName,
        work_email: formData.workEmail,
        company_name: formData.companyName,
        query_type: formData.queryType,
        message: formData.message,
        to_email: "tripathideepak9981@gmail.com",
      };

      await emailjs.send(
        "service_1e7g98e",
        "template_w295d7i",
        templateParams,
        "onnTv6B8E_qGdCgMH"
      );

      toast({
        title: "Thank you for contacting us! 🙏",
        description: "We’ve received your message and will get back to you soon.",
      });

      setSuccessMessage("Thank you for contacting us!");
      setTimeout(() => setSuccessMessage(''), 5000);

      setFormData({
        fullName: '',
        workEmail: '',
        companyName: '',
        queryType: '',
        message: ''
      });
    } catch (error) {
      console.error("Email send error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const queryTypes = [
    { value: "data-navigator", label: "Data Navigator Support" },
    { value: "query-builder", label: "Query Builder Help" },
    { value: "pricing", label: "Pricing & Plans" },
    { value: "technical", label: "Technical Support" },
    { value: "partnership", label: "Partnership Opportunities" },
    { value: "general", label: "General Inquiry" }
  ];

  return (
    <div id="contact" className="relative py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-teal-400/20 rounded-full blur-3xl"></div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Ready to Transform Your Data?</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Let's Talk
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Need help with your data journey? Our AI experts are here to guide you.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>We'll get back within 24 hours</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-4">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="workEmail" className="text-sm font-medium text-gray-700">Work Email *</Label>
                      <Input
                        id="workEmail"
                        name="workEmail"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.workEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="Your Company"
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">I'm interested in</Label>
                      <Select value={formData.queryType} onValueChange={handleSelectChange}>
                        <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                          <SelectValue placeholder="Select query type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-xl">
                          {queryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value} className="hover:bg-blue-50">
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your data analytics needs..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>

                {/* ✅ Success message after submit */}
                {successMessage && (
                  <p className="text-green-600 font-medium text-center mt-6 animate-fade-in">
                    {successMessage}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernContactSection;
