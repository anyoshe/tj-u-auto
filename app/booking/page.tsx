"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "../actions/booking";
import { Loader2 } from "lucide-react";
const steps = [
  { id: 1, title: "Vehicle Details" },
  { id: 2, title: "Service Request" },
  { id: 3, title: "Customer Info" },
  { id: 4, title: "Delivery & Confirmation" },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    type: "",
    registrationNo: "",
    mileage: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    expectedCompletion: "",
    fullName: "",
    phone: "",
    email: "",
    deliveryMethod: "",
    description: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const result = await createBooking(formData);

    if (result.success) {
      alert(`Booking submitted successfully! Booking ID: ${result.bookingId}`);
      // Optionally redirect or reset form
    } else {
      alert("Failed to submit booking. Please try again.");
    }
  };
  return (

    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10 mt-6">
          <h1 className="text-4xl font-bold mb-3">Book Your Service</h1>
          <p className="text-gray-400">Fast. Easy. Professional.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-10 px-2">
          {steps.map((step, index) => (
            <div key={index} className={`flex-1 h-2.5 rounded-full mx-1 transition-all ${index + 1 <= currentStep ? 'bg-yellow-400' : 'bg-gray-700'}`} />
          ))}
        </div>


        {/* Form Card */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-yellow-400/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Vehicle Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Vehicle Make</Label>
                  <Input value={formData.make} onChange={(e) => updateForm("make", e.target.value)} placeholder="Toyota" />
                </div>
                <div>
                  <Label>Vehicle Model</Label>
                  <Input value={formData.model} onChange={(e) => updateForm("model", e.target.value)} placeholder="Corolla" />
                </div>
                <div>
                  <Label>Vehicle Type</Label>
                  <Select onValueChange={(v) => updateForm("type", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Saloon">Saloon</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Pickup">Pickup</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Registration Number</Label>
                  <Input value={formData.registrationNo} onChange={(e) => updateForm("registrationNo", e.target.value)} placeholder="KAA 123B" />
                </div>
                <div>
                  <Label>Current Mileage (km)</Label>
                  <Input type="number" value={formData.mileage} onChange={(e) => updateForm("mileage", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Service Request</h2>
              <div>
                <Label>Nature of Service Required</Label>
                <Input value={formData.serviceType} onChange={(e) => updateForm("serviceType", e.target.value)} placeholder="e.g. Full Service, Brake Repair" />
              </div>
              <div>
                <Label>Description / Problem</Label>
                <Textarea value={formData.description} onChange={(e) => updateForm("description", e.target.value)} placeholder="Describe the issue..." rows={4} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Preferred Drop-off Date</Label>
                  <Input type="date" value={formData.preferredDate} onChange={(e) => updateForm("preferredDate", e.target.value)} />
                </div>
                <div>
                  <Label>Preferred Time</Label>
                  <Input type="time" value={formData.preferredTime} onChange={(e) => updateForm("preferredTime", e.target.value)} />
                </div>
                <div>
                  <Label>Expected Completion</Label>
                  <Input type="date" value={formData.expectedCompletion} onChange={(e) => updateForm("expectedCompletion", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Full Name</Label>
                  <Input value={formData.fullName} onChange={(e) => updateForm("fullName", e.target.value)} />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+254" />
                </div>
                <div className="md:col-span-2">
                  <Label>Email Address</Label>
                  <Input type="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Delivery Method</h2>
              <Select onValueChange={(v) => updateForm("deliveryMethod", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="How will the vehicle be delivered?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Self Drive">Self Drive</SelectItem>
                  <SelectItem value="Towing">Towing</SelectItem>
                  <SelectItem value="Workshop Pickup">Workshop Pickup (Team collects)</SelectItem>
                  <SelectItem value="Service Call">Service Call (Mobile Mechanic)</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              <div className="pt-8 border-t border-gray-700">
                <Button onClick={handleSubmit} className="w-full bg-yellow-400 text-black hover:bg-yellow-300 text-lg py-6">
                  Submit Booking Request
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  You will receive confirmation via WhatsApp/Email
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="border-gray-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white disabled:text-gray-500"
          >
            <ArrowLeft className="mr-2" /> Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black"
            >
              Next <ArrowRight className="ml-2" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
