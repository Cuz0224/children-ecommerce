"use client";

import React from "react";
import { Lock, Server } from "lucide-react";
export default function AdminFooterInfo() {
  return <div className="w-full max-w-sm mx-auto pt-6 flex flex-col items-center text-center space-y-3" data-api-unique-id='adminfooterinfo-r73084ed10a04d735-s3942151511' data-api-unique-page-name='src/backend/components/AdminLogin/AdminFooterInfo'>
      {/* Security & System Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground" data-api-unique-id='adminfooterinfo-r91a08dd2b352de83-s3942151511' data-api-unique-page-name='src/backend/components/AdminLogin/AdminFooterInfo'>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border" data-api-unique-id='adminfooterinfo-r5e1142ff0526a313-s3942151511' data-api-unique-page-name='src/backend/components/AdminLogin/AdminFooterInfo'>
          <Lock className="w-3 h-3" data-api-unique-id='adminfooterinfo-re69cfcef995caf14-s3942151511' data-api-unique-page-name='src/backend/components/AdminLogin/AdminFooterInfo' />
          <span data-api-unique-id='adminfooterinfo-r10483dd944836d3b-s3942151511' data-api-unique-page-name='src/backend/components/AdminLogin/AdminFooterInfo'>Encrypted Session</span>
        </div>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border" data-api-unique-id='adminfooterinfo-rce1c6c9a02ee6a15-s3942151511' data-api-unique-page-name='src/backend/components/AdminLogin/AdminFooterInfo'>
          <Server className="w-3 h-3" data-api-unique-id='adminfooterinfo-r60f15a1708d045eb-s3942151511' data-api-unique-page-name='src/backend/components/AdminLogin/AdminFooterInfo' />
          <span data-api-unique-id='adminfooterinfo-rf3ca2f1a1f901335-s3942151511' data-api-unique-page-name='src/backend/components/AdminLogin/AdminFooterInfo'>Cluster v2.4 (Active)</span>
        </div>
      </div>

      {/* Compliance statement */}
      <p className="text-[11px] text-muted-foreground/80 leading-relaxed max-w-xs" data-api-unique-id='adminfooterinfo-r8926246fc2f7dc2f-s3942151511' data-api-unique-page-name='src/backend/components/AdminLogin/AdminFooterInfo'>
        ToyJoy Admin operations are monitored and restricted to authorized retail and warehouse personnel.
      </p>
    </div>;
}