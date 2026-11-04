import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { LandingWhyUs } from './components/LandingWhyUs';
import { LandingFaq } from './components/LandingFaq';
import { LandingFooter } from './components/LandingFooter';
import { ActivateModal } from './components/ActivateModal';
import { BuyModal } from './components/BuyModal';
import { AdminKeysModal } from './components/AdminKeysModal';
import {
  auth,
  loginWithGoogle,
  logoutUser,
  getUserProfile,
  UserProfile
} from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { ChevronUp } from 'lucide-react';

export default function App() {
  // Modals
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isAdminKeysOpen, setIsAdminKeysOpen] = useState(false);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Auth & License state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const ADMIN_EMAIL = 'rxtools1@gmail.com';
  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
        if (profile?.isActivated) {
          setIsActivated(true);
          setLicenseKey(profile.activeKey || '');
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Performance-optimized scroll listener
  useEffect(() => {
    let ticking = false;
    const handleWindowScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 350);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      showToast(`Welcome, ${user.displayName || user.email}!`);
    } catch (err: any) {
      showToast(err?.message || 'Google sign-in was cancelled.');
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await logoutUser();
      setIsActivated(false);
      setLicenseKey('');
      showToast('Signed out successfully.');
    } catch (err: any) {
      showToast('Error signing out.');
    }
  };

  const handleActivateSuccess = (key: string) => {
    setIsActivated(true);
    setLicenseKey(key);
    setIsActivateOpen(false);
    showToast(`Key successfully activated and bound in Firebase: ${key}`);
  };

  const handlePurchaseSuccess = (key: string) => {
    setLicenseKey(key);
    showToast('Payment confirmed! Save your license key.');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col font-sans selection:bg-[#FF1E27] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c0d12] border border-[#FF1E27] px-5 py-3 rounded-xl shadow-[0_0_25px_rgba(255,30,39,0.35)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF1E27] animate-ping" />
          <span className="text-xs font-mono-code text-white">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        onOpenActivate={() => setIsActivateOpen(true)}
        onOpenBuy={() => setIsBuyOpen(true)}
        onOpenAdminKeys={() => setIsAdminKeysOpen(true)}
        isActivated={isActivated}
        currentUser={currentUser}
        onGoogleLogin={handleGoogleLogin}
        onGoogleLogout={handleGoogleLogout}
        isAdmin={isAdmin}
      />

      {/* Landing Content */}
      <main className="flex-1">
        <LandingHero
          onOpenBuy={() => setIsBuyOpen(true)}
          onOpenActivate={() => setIsActivateOpen(true)}
        />

        <LandingWhyUs />

        <LandingFaq />
      </main>

      {/* Footer */}
      <LandingFooter
        onOpenActivate={() => setIsActivateOpen(true)}
      />

      {/* Floating Tactical "Scroll to Top" Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-xl bg-[#0c0d12]/95 border border-[#FF1E27]/50 text-white hover:text-[#FF1E27] hover:border-[#FF1E27] shadow-[0_0_20px_rgba(255,30,39,0.25)] flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Activation Modal (Validates keys sent by admin via Firebase) */}
      <ActivateModal
        isOpen={isActivateOpen}
        onClose={() => setIsActivateOpen(false)}
        onActivateSuccess={handleActivateSuccess}
        isActivated={isActivated}
        activatedKey={licenseKey}
        currentUser={currentUser}
        onGoogleLogin={handleGoogleLogin}
      />

      {/* Buy / Simplified Crypto Payment Modal */}
      <BuyModal
        isOpen={isBuyOpen}
        onClose={() => setIsBuyOpen(false)}
        onPurchaseSuccess={handlePurchaseSuccess}
        onOpenActivate={(key) => {
          setLicenseKey(key);
          setIsActivateOpen(true);
        }}
      />

      {/* Admin Key Issuer Modal (Generate keys to send to customers) */}
      <AdminKeysModal
        isOpen={isAdminKeysOpen}
        onClose={() => setIsAdminKeysOpen(false)}
      />
    </div>
  );
}
