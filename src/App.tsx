import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import { BootSequence } from './components/layout/BootSequence';
import { NeuralWeb } from './components/layout/NeuralWeb';
import { Toast } from './components/ui/Toast';

// 🔥 REVOLUTIONARY COMPONENTS
import { FutureYou } from './components/ui/future-you';
import { LearningDNA } from './components/ui/learning-dna';
import { FutureCertificates } from './components/ui/future-certificates';
import { AICommandPalette } from './components/ui/ai-command-palette';
import { SkillTopology } from './components/ui/skill-topology';
import { AIChatbot } from './components/ui/ai-chatbot';
import { NeuralNetwork } from './components/ui/neural-network';
import { NavigationRail } from './components/ui/navigation-rail';
import { DataOverlay } from './components/ui/data-overlay';
import { Courses } from './pages/Courses';
import { Mentors } from './pages/Mentors';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { LandingPage } from './pages/LandingPage';
import { StudentOnboarding } from './components/ui/student-onboarding';
import { ChangePasswordModal } from './components/ui/change-password-modal';
import { db } from './lib/supabase';
import { Search, Target as TargetIcon, Brain, Sparkles } from 'lucide-react';

type Page = 'landing' | 'onboarding' | 'future-you' | 'dashboard' | 'certificates' | 'cognitive' | 'skills' | 'ai-tutor' | 'courses' | 'mentors' | 'network' | 'analytics' | 'settings';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isMobile, setIsMobile] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const [currentUser] = useState<string | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      showToast(`Neural Link: Authenticated as ${currentUser}`);
    }, 2500);
    return () => clearTimeout(timer);
  }, [currentUser]);

  useEffect(() => {
    // Check for existing session immediately
    db.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthenticatedUser(session.user);
        if (currentPage === 'landing') {
          // checkUserProfile(session.user.id);
        }
      }
    });

    const { data: authListener } = db.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setShowPasswordReset(true);
        showToast("Secure Link Verified: Initiate Password Reset Protocol");
      } else if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session?.user) {
          setAuthenticatedUser(session.user);
          // Only redirect if we are on the landing page to avoid disrupting other flows
          if (currentPage === 'landing') {
            showToast(`Neural Link Established: ${session.user.email}`);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setAuthenticatedUser(null);
        setCurrentPage('landing');
        showToast("Neural Link Terminated");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [currentPage]);

  const [pageParams, setPageParams] = useState<any>(null);

  const handleNavigation = (page: string, params?: any) => {
    setCurrentPage(page as Page);
    setPageParams(params);
    showToast(`Neural Link: Navigating to ${page}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      showToast(`Neural Link: Processing intent for "${searchQuery}"...`);

      if (query.includes('mentor') || query.includes('teach') || query.includes('orion') || query.includes('nova')) {
        handleNavigation('mentors');
      } else if (query.includes('course') || query.includes('learn') || query.includes('python') || query.includes('library') || query.includes('science') || query.includes('engineer')) {
        handleNavigation('courses');
      } else if (query.includes('cert') || query.includes('achieve') || query.includes('future') || query.includes('path')) {
        handleNavigation('certificates');
      } else if (query.includes('skill') || query.includes('topology') || query.includes('map') || query.includes('dna')) {
        handleNavigation('skills');
      } else if (query.includes('friend') || query.includes('network') || query.includes('peer') || query.includes('student') || query.includes('social')) {
        handleNavigation('network');
      } else {
        showToast(`Deep Analysis: Querying quantum archives for "${searchQuery}"`);
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={(user) => {
          if (user) {
            // User signed in, check profile status
            setAuthenticatedUser(user);
            showToast(`Welcome! Let's set up your profile.`);
            setCurrentPage('dashboard');
          } else {
            // Just exploring, go to dashboard
            setCurrentPage('dashboard');
          }
        }} />;
      case 'onboarding':
        return <StudentOnboarding
          userEmail={authenticatedUser?.email}
          onComplete={async (details) => {
            console.log('Student details:', details);
            if (authenticatedUser) {
              try {
                // Update Auth User Metadata (for immediate UI updates)
                const { data: { user }, error } = await db.auth.updateUser({
                  data: { full_name: details.fullName }
                });

                if (user) setAuthenticatedUser(user);

                // Update Profile in Database
                await db.updateUserProfile(authenticatedUser.id, {
                  full_name: details.fullName,
                  // We could store other details if the profile schema supported them
                });

                showToast(`Welcome to the Collective, ${details.fullName}`);
              } catch (e) {
                console.error("Failed to save profile", e);
                showToast("Profile created locally. Syncing...");
              }
            }
            setCurrentPage('dashboard');
          }}
        />;

      case 'future-you':
        return <FutureYou onStartJourney={() => handleNavigation('dashboard')} />;
      case 'skills':
        return <SkillTopology />;
      case 'courses':
        return <Courses onShowToast={showToast} initialCourseId={pageParams?.courseId} />;
      case 'mentors':
        return <Mentors onShowToast={showToast} />;
      case 'network':
        return <NeuralNetwork />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings onNavigate={handleNavigation} />;
      case 'certificates':
        return (
          <div className="min-h-screen pt-12">
            <FutureCertificates onCertificateClick={(id) => {
              handleNavigation('courses');
              showToast(`Neural Link: Accessing protocol ${id}`);
            }} />
          </div>
        );
      case 'dashboard':
        return (
          <div className="min-h-screen">
            <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 50%, rgba(138, 180, 248, 0.1), transparent 60%)',
                      'radial-gradient(circle at 70% 50%, rgba(124, 77, 255, 0.1), transparent 60%)',
                      'radial-gradient(circle at 30% 50%, rgba(138, 180, 248, 0.1), transparent 60%)',
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </div>

              <div className="relative z-10 w-full max-w-5xl text-center">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#8AB4F8] animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#8AB4F8] font-mono">
                      {(() => {
                        const hour = new Date().getHours();
                        let greeting = 'Good Night';
                        if (hour >= 5 && hour < 12) greeting = 'Good Morning';
                        else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
                        else if (hour >= 17 && hour < 22) greeting = 'Good Evening';

                        const name = authenticatedUser?.user_metadata?.full_name?.split(' ')[0] || authenticatedUser?.email?.split('@')[0] || 'Operative';
                        return `${greeting}, ${name}`;
                      })()} // System Online
                    </span>
                  </div>
                  <h1 className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-b from-white via-white/80 to-[#8AB4F8]/40 bg-clip-text text-transparent leading-none tracking-tighter uppercase">
                    Evolve Your<br /><span className="text-[#8AB4F8]">Consciousness</span>
                  </h1>
                </motion.div>

                <motion.form
                  onSubmit={handleSearch}
                  className="relative mb-20 max-w-3xl mx-auto"
                >
                  <div className="absolute -inset-4 rounded-[2.5rem] opacity-20 blur-2xl bg-gradient-to-r from-[#8AB4F8] via-[#7C4DFF] to-[#5EEAD4]" />
                  <div className="relative flex items-center gap-4 bg-[#0a0a12]/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] px-10 py-6 group focus-within:border-[#8AB4F8]/50 transition-all">
                    <Search className="text-[#8AB4F8] group-focus-within:scale-110 transition-transform" size={40} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Input Intent: AI Engineer, Space Architect..."
                      className="flex-1 bg-transparent text-white text-3xl placeholder:text-white/10 outline-none font-light tracking-tight"
                    />
                  </div>
                </motion.form>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: 'Neural Sync', value: '78.4%', color: '#8AB4F8', icon: TargetIcon },
                    { label: 'Core Nodes', value: '14/20', color: '#7C4DFF', icon: Brain },
                    { label: 'Evolution', value: 'Phase 2', color: '#5EEAD4', icon: Sparkles }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl relative group overflow-hidden text-left"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <stat.icon className="text-white/20 mb-6 group-hover:text-white group-hover:scale-110 transition-all" size={32} />
                      <div className="text-5xl font-black mb-1 tracking-tighter text-white">{stat.value}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-mono">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <LearningDNA />
            <FutureCertificates onCertificateClick={(id) => {
              handleNavigation('courses');
              showToast(`Unlocking path for ${id}`);
            }} />
          </div>
        );
      default:
        return <FutureYou onStartJourney={() => handleNavigation('dashboard')} />;
    }
  };

  return (
    <>
      <DataOverlay />
      {!isMobile && <CustomCursor />}
      <Background />
      {!loading && <NeuralWeb />}
      <AnimatePresence mode="wait">
        {loading ? (
          <div key="loader">
            <BootSequence onComplete={() => setLoading(false)} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen relative"
          >
            {currentPage !== 'landing' && (
              <>
                <NavigationRail activePage={currentPage} onNavigate={handleNavigation} />
                <AICommandPalette onNavigate={handleNavigation} />
              </>
            )}

            <Toast
              isVisible={toast.show}
              message={toast.message}
              onClose={() => setToast({ ...toast, show: false })}
            />

            <ChangePasswordModal
              isOpen={showPasswordReset}
              onClose={() => setShowPasswordReset(false)}
              onSuccess={() => {
                setShowPasswordReset(false);
                showToast("Credentials Updated: Neural Link Secured");
              }}
            />

            {currentPage !== 'landing' && (
              <AIChatbot
                userId={currentUser || undefined}
                userName={authenticatedUser?.user_metadata?.full_name || authenticatedUser?.email?.split('@')[0]}
                onNavigate={handleNavigation}
              />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={currentPage === 'landing' ? "" : "pl-20"}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 3 }}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
            >
              <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase text-center pb-4">
                WE DIDN'T DESIGN A WEBSITE. WE DESIGNED YOUR FUTURE.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
