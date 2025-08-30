import React from "react";

// Utility functions for common cell renderers
export const cellRenderers = {
  currency: (value: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);
  },
  
  date: (value: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const date = typeof value === "string" ? new Date(value) : value;
    return date.toLocaleDateString("en-US", options);
  },
  
  dateTime: (value: Date | string) => {
    const date = typeof value === "string" ? new Date(value) : value;
    return date.toLocaleString("en-US");
  },
  
  badge: (value: string, variant: "default" | "destructive" | "outline" | "secondary" = "default") => {
    const variants = {
      default: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input bg-background",
      secondary: "bg-secondary text-secondary-foreground",
    };
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}>
        {value}
      </span>
    );
  },
  
  boolean: (value: boolean, trueText = "Yes", falseText = "No") => {
    return value ? trueText : falseText;
  },
  
  truncate: (value: string, length = 50) => {
    if (value.length <= length) return value;
    return value.substring(0, length) + "...";
  },
  
  link: (value: string, href?: string, target = "_blank") => {
    return (
      <a 
        href={href || value} 
        target={target}
        className="text-primary hover:underline"
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {value}
      </a>
    );
  },
  
  email: (value: string) => {
    return (
      <a 
        href={`mailto:${value}`}
        className="text-primary hover:underline"
      >
        {value}
      </a>
    );
  },
  
  phone: (value: string) => {
    return (
      <a 
        href={`tel:${value}`}
        className="text-primary hover:underline"
      >
        {value}
      </a>
    );
  },
};
