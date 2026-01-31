"use client";

import { useSession } from "next-auth/react";
import { FaUser, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";
import { getRoleDisplayName } from "@/lib/auth-utils";

export default function UserStatusBar() {
    const { data: session } = useSession();

    if (!session || !session.user) return null;

    const user = session.user as any;

    return (
        <div className="bg-brand-green text-white text-[10px] md:text-xs py-1.5 px-4 font-bold uppercase tracking-widest flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <FaUser className="opacity-70" />
                    <span>{user.name}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-full">
                    <FaShieldAlt className="opacity-70" />
                    <span>{getRoleDisplayName(user.role)}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {(user.managedSection || (user.scoutInfo && user.scoutInfo.section)) && (
                    <div className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="opacity-70" />
                        <span>{user.managedSection || user.scoutInfo.section}</span>
                    </div>
                )}
                {user.scoutNumber && (
                    <span className="opacity-70">NII: {user.scoutNumber}</span>
                )}
            </div>
        </div>
    );
}
