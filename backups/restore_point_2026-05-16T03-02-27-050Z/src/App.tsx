/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchSection } from './components/SearchSection';
import { HowItWorks } from './components/HowItWorks';
import { Differentials } from './components/Differentials';
import { ActivationSteps } from './components/ActivationSteps';
import { VideoSection } from './components/VideoSection';
import { PlansSection } from './components/PlansSection';
import { Testimonials } from './components/Testimonials';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AdminPanel } from './components/AdminPanel';
import { CheckoutModal } from './components/CheckoutModal';
import { ContactModal } from './components/ContactModal';
import { PartnerModal } from './components/PartnerModal';
import { FloatingAssistant } from './components/FloatingAssistant';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminMode(window.location.hash === '#admin');
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminMode) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen">
      <Navbar onOpenPartner={() => setIsPartnerOpen(true)} />
      <main>
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <SearchSection />
        <HowItWorks />
        <Differentials />
        <ActivationSteps />
        <VideoSection />
        <PlansSection onOpenCheckout={(plan) => setCheckoutPlan(plan)} />
        <Testimonials />
        <CTASection onOpenContact={() => setIsContactOpen(true)} />
      </main>
      <Footer onOpenPartner={() => setIsPartnerOpen(true)} />
      <WhatsAppButton />

      {/* Global Modals */}
      <CheckoutModal 
        isOpen={!!checkoutPlan} 
        onClose={() => setCheckoutPlan(null)} 
        planName={checkoutPlan || ''} 
      />
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
      <PartnerModal 
        isOpen={isPartnerOpen} 
        onClose={() => setIsPartnerOpen(false)} 
      />
      <FloatingAssistant />
    </div>
  );
}
