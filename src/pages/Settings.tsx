import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    Lock,
    Eye,
    Zap,
    Trash2,
    User,
    Fingerprint,
    Bell,
    Globe,
    LogOut,
    Save,
    Wifi,
    Radio,
    Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';

type SettingsSection = 'profile' | 'security' | 'alerts' | 'network';

interface UserData {
    name: string;
    email: string;
    id: string;
    alias: string;
    customId?: string;
    lastSignIn?: string;
    lastSync?: string;
}

interface UserSettings {
    biometric: boolean;
    privacy: boolean;
    fastSync: boolean;
    notifications: boolean;
    publicProfile: boolean;
}

export function Settings({ onNavigate }: { onNavigate?: (page: string) => void }) {
    const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        id: '',
        alias: '',
        customId: '',
    });

    const [settings, setSettings] = useState<UserSettings>({
        biometric: true,
        privacy: true,
        fastSync: false,
        notifications: true,
        publicProfile: false
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const { data: { user } } = await db.auth.getUser();
                if (user) {
                    const meta = user.user_metadata || {};
                    const learnerId = user.id.substring(0, 12).toUpperCase();

                    setUserData({
                        name: meta.full_name || 'Neural Traveler',
                        email: user.email || 'unknown@void.net',
                        id: learnerId,
                        alias: meta.alias || meta.full_name?.split(' ')[0] || 'Traveler',
                        customId: meta.custom_id || '',
                        lastSignIn: user.last_sign_in_at,
                        lastSync: meta.last_sync
                    });

                    // Load settings from cloud metadata if available, else default
                    if (meta.settings) {
                        setSettings(meta.settings);
                    }
                }
            } catch (error) {
                console.error("Failed to load user data", error);
            }
        };

        loadUserData();
    }, []);

    const handleSettingChange = async (key: keyof UserSettings) => {
        const newSettings = { ...settings, [key]: !settings[key] };
        setSettings(newSettings); // Optimistic update

        // Persist to Cloud (Supabase Metadata)
        try {
            const { data: { user } } = await db.auth.getUser();
            if (user) {
                await db.auth.updateUser({
                    data: {
                        settings: newSettings,
                        last_sync: new Date().toISOString()
                    }
                });
                setUserData(prev => ({ ...prev, lastSync: new Date().toISOString() }));
            }
        } catch (error) {
            console.error("Failed to sync setting:", error);
            // Revert on failure in a real app
        }
    };

    const handleSignOut = async () => {
        try {
            await db.auth.signOut();
            onNavigate?.('landing');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const { data: { user } } = await db.auth.getUser();
            if (user) {
                const updateData = {
                    full_name: userData.name,
                    alias: userData.alias,
                    custom_id: userData.customId,
                    settings: settings, // Ensure existing settings are kept/synced
                    last_sync: new Date().toISOString()
                };

                const { error } = await db.auth.updateUser({
                    data: updateData
                });

                if (error) throw error;

                setUserData(prev => ({ ...prev, lastSync: new Date().toISOString() }));

                alert("NEURAL IDENTITY SYNCED TO CLOUD");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("SYNC FAILED: NETWORK DISRUPTION");
        } finally {
            setIsSaving(false);
        }
    };

    const handlePurgeData = async () => {
        if (confirm("WARNING: Confirm Neural Purge? This will reset your interface settings.")) {
            try {
                // Reset metadata to defaults
                await db.auth.updateUser({
                    data: {
                        settings: null,
                        last_sync: null
                    }
                });
                window.location.reload();
            } catch (err) {
                console.error("Purge failed", err);
            }
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-8 relative bg-[#0a0a12] overflow-hidden text-white">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#7C4DFF]/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#8AB4F8]/5 blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-12">

                    <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]">Settings</span>
                    </h1>
                    <p className="text-white/40 text-xs tracking-[0.4em] uppercase font-medium max-w-2xl">Configure your neural interface parameters and biometric security protocols.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Rail - Navigation Categories */}
                    <div className="space-y-4">
                        <CategoryItem
                            icon={<User size={18} />}
                            label="Identity Profile"
                            active={activeSection === 'profile'}
                            onClick={() => setActiveSection('profile')}
                        />
                        <CategoryItem
                            icon={<Shield size={18} />}
                            label="Security & Sync"
                            active={activeSection === 'security'}
                            onClick={() => setActiveSection('security')}
                        />
                        <CategoryItem
                            icon={<Bell size={18} />}
                            label="Neural Alerts"
                            active={activeSection === 'alerts'}
                            onClick={() => setActiveSection('alerts')}
                        />
                        <CategoryItem
                            icon={<Globe size={18} />}
                            label="Network Access"
                            active={activeSection === 'network'}
                            onClick={() => setActiveSection('network')}
                        />

                        {/* Sign Out Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-all group mt-8"
                        >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/10 text-red-500 transition-all group-hover:bg-red-500/20">
                                <LogOut size={18} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
                        </motion.button>
                    </div>

                    {/* Middle Section - Settings Detail */}
                    <div className="lg:col-span-2 space-y-8 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {activeSection === 'profile' && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    {/* Profile Card */}
                                    <div className="p-10 bg-[#12121e]/40 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl relative overflow-hidden">
                                        <div className="flex items-center gap-8 mb-10">
                                            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl relative group">
                                                👤
                                                <div className="absolute inset-0 rounded-3xl ring-2 ring-[#8AB4F8] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-2">
                                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Full Name</label>
                                                    <input
                                                        type="text"
                                                        value={userData.name}
                                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                        className="w-full bg-transparent border-b border-white/10 py-2 text-2xl font-black uppercase tracking-tight focus:border-[#8AB4F8] focus:outline-none transition-colors"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 mt-4">
                                                    <span className="px-3 py-1 bg-[#8AB4F8]/10 border border-[#8AB4F8]/20 rounded-full text-[9px] font-black text-[#8AB4F8] uppercase tracking-widest">Premium Tier</span>
                                                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[9px] font-black text-green-500 uppercase tracking-widest">Active Sync</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            <InputGroup
                                                label="Learner ID"
                                                value={userData.customId || userData.id}
                                                onChange={(e) => setUserData({ ...userData, customId: e.target.value })}
                                            />
                                            <InputGroup
                                                label="Neural Alias"
                                                value={userData.alias}
                                                onChange={(e) => setUserData({ ...userData, alias: e.target.value })}
                                            />
                                            <InputGroup
                                                label="Access Email"
                                                value={userData.email}
                                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                            />
                                        </div>

                                        <div className="flex justify-end pt-6 border-t border-white/5">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleSaveProfile}
                                                disabled={isSaving}
                                                className="px-8 py-4 bg-[#8AB4F8] text-[#0a0a12] rounded-xl font-black uppercase tracking-wider flex items-center gap-3 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSaving ? (
                                                    <span className="animate-pulse">Syncing...</span>
                                                ) : (
                                                    <>
                                                        <Save size={18} strokeWidth={3} />
                                                        Update Identity
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </div>

                                    <div className="p-6 border border-white/5 rounded-3xl bg-white/5 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Public Portfolio</h4>
                                            <p className="text-xs text-white/40">Allow other nodes to discover your certificates.</p>
                                        </div>
                                        <div
                                            onClick={() => handleSettingChange('publicProfile')}
                                            className={cn(
                                                "w-14 h-7 rounded-full p-1 transition-all cursor-pointer relative",
                                                settings.publicProfile ? "bg-[#8AB4F8]" : "bg-white/10"
                                            )}
                                        >
                                            <motion.div
                                                animate={{ x: settings.publicProfile ? 28 : 0 }}
                                                className="w-5 h-5 bg-white rounded-full shadow-lg"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === 'security' && (
                                <motion.div
                                    key="security"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="p-10 bg-gradient-to-br from-[#12121e]/40 to-black/40 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl">
                                        <h3 className="text-xl font-black uppercase tracking-wider mb-8 flex items-center gap-4">
                                            <Lock className="text-[#7C4DFF]" size={20} />
                                            Security Protocols
                                        </h3>

                                        <div className="space-y-6">
                                            <SettingToggle
                                                icon={<Fingerprint size={18} />}
                                                title="Biometric Authentication"
                                                description="Require facial scan for high-priority neural access."
                                                enabled={settings.biometric}
                                                onClick={() => handleSettingChange('biometric')}
                                            />
                                            <SettingToggle
                                                icon={<Eye size={18} />}
                                                title="Privacy Shield"
                                                description="Encrypt neural telemetry data from peer discovery."
                                                enabled={settings.privacy}
                                                onClick={() => handleSettingChange('privacy')}
                                            />
                                            <SettingToggle
                                                icon={<Zap size={18} />}
                                                title="Fast-Sync Mode"
                                                description="Prioritize speed over data validation on neural links."
                                                enabled={settings.fastSync}
                                                onClick={() => handleSettingChange('fastSync')}
                                            />
                                        </div>
                                    </div>

                                    {/* Danger Zone */}
                                    <div className="p-10 border border-red-500/20 rounded-[2.5rem] bg-red-500/5 backdrop-blur-3xl">
                                        <h3 className="text-xl font-black uppercase tracking-wider mb-4 flex items-center gap-4 text-red-400">
                                            <Trash2 size={20} />
                                            Danger Zone
                                        </h3>
                                        <p className="text-white/40 text-xs mb-8">Permanently erase all neural history and Purge Identity Profile.</p>
                                        <button
                                            onClick={handlePurgeData}
                                            className="px-8 py-4 border border-red-500/30 rounded-xl text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all"
                                        >
                                            Purge Neural Data
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === 'alerts' && (
                                <motion.div
                                    key="alerts"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-10 bg-[#12121e]/40 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl"
                                >
                                    <h3 className="text-xl font-black uppercase tracking-wider mb-8 flex items-center gap-4">
                                        <Bell className="text-[#8AB4F8]" size={20} />
                                        Neural Notifications
                                    </h3>
                                    <div className="space-y-6">
                                        <SettingToggle
                                            icon={<Activity size={18} />}
                                            title="System Activity"
                                            description="Receive real-time updates on core learning nodes."
                                            enabled={settings.notifications}
                                            onClick={() => handleSettingChange('notifications')}
                                        />
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <h4 className="font-mono text-xs text-[#8AB4F8] mb-4">RECENT LOGS</h4>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-xs text-white/60">
                                                    <span className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                        Login Session Active
                                                    </span>
                                                    <span className="font-mono opacity-50">
                                                        {userData.lastSignIn ? formatDistanceToNow(new Date(userData.lastSignIn)) + ' ago' : 'Just now'}
                                                    </span>
                                                </div>

                                                {userData.lastSync && (
                                                    <div className="flex justify-between items-center text-xs text-white/60">
                                                        <span className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#8AB4F8]" />
                                                            Neural Cloud Sync
                                                        </span>
                                                        <span className="font-mono opacity-50">
                                                            {formatDistanceToNow(new Date(userData.lastSync)) + ' ago'}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="flex justify-between items-center text-xs text-white/60">
                                                    <span className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                        System Integrity Check
                                                    </span>
                                                    <span className="font-mono opacity-50">Optimal</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === 'network' && (
                                <motion.div
                                    key="network"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-10 bg-[#12121e]/40 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl"
                                >
                                    <h3 className="text-xl font-black uppercase tracking-wider mb-8 flex items-center gap-4">
                                        <Globe className="text-[#5EEAD4]" size={20} />
                                        Network Status
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
                                            <Wifi className="text-green-500 mb-2" />
                                            <span className="text-2xl font-black">12ms</span>
                                            <span className="text-[10px] uppercase text-white/40">Latency</span>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
                                            <Radio className="text-[#8AB4F8] mb-2" />
                                            <span className="text-2xl font-black">Secure</span>
                                            <span className="text-[10px] uppercase text-white/40">Encryption</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-20 border-t border-white/5 pt-12 flex items-center justify-between">
                </div>
            </div>
        </div>
    );
}

function CategoryItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all group",
                active
                    ? "bg-[#8AB4F8]/10 border-[#8AB4F8]/30 text-white"
                    : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-white/10"
            )}>
            <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                active ? "bg-[#8AB4F8] text-black shadow-[0_0_15px_#8AB4F8]" : "bg-white/5 text-white/40"
            )}>
                {icon}
            </div>
            <span className="text-xs font-black uppercase tracking-widest">{label}</span>
            {active && <motion.div layoutId="settingCat" className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8AB4F8]" />}
        </button>
    );
}

function InputGroup({ label, value, readOnly, onChange }: { label: string; value: string; readOnly?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="space-y-3">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">{label}</label>
            <input
                type="text"
                value={value}
                readOnly={readOnly}
                onChange={onChange}
                className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:border-[#8AB4F8]/50 transition-all font-mono text-sm",
                    readOnly && "opacity-50 cursor-not-allowed"
                )}
            />
        </div>
    );
}

function SettingToggle({ icon, title, description, enabled = false, onClick }: { icon: React.ReactNode; title: string; description: string; enabled?: boolean; onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between p-6 bg-black/20 border border-white/5 rounded-3xl group hover:border-white/10 transition-all cursor-pointer"
        >
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                    {icon}
                </div>
                <div>
                    <h4 className="text-sm font-black uppercase tracking-tight">{title}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{description}</p>
                </div>
            </div>
            <div className={cn(
                "w-14 h-7 rounded-full p-1 transition-all relative",
                enabled ? "bg-[#8AB4F8]" : "bg-white/10"
            )}>
                <motion.div
                    animate={{ x: enabled ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 bg-white rounded-full shadow-lg"
                />
            </div>
        </div>
    );
}
