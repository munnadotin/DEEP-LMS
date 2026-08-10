"use client";

import Link from "next/link"
import { ReactNode } from "react";

type props = {
    href: string;
    text: string;
    className?: string;
    icon?: ReactNode;
}

function Button(props: props) {
    return (
        <Link
            href={props.href}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold active:scale-[0.98] transition-all duration-200 shadow-sm shadow-(--primary)/20 hover:shadow-sm hover:shadow-(--primary)/30 ${props.className}`}>
            <div>
                {props.icon}
            </div>
            <div>
                {props.text}
            </div>
        </Link>
    )
}

export default Button