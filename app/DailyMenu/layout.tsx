"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PopoverCart } from "./components/Mobile-PopoverCart";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();

    return (
        <>
            <div className="pt-20 md:pt-0">
                {children}
            </div>
            {pathName.includes("Checkout") ? (<></>) : (
                <PopoverCart />
            )}
        </>
    );
}
