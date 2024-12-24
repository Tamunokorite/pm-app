import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkEmail(email: string) {
  const emailDomain = email.split("@").at(-1) as string
  const genericDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "aol.com",
  ]
  if (genericDomains.includes(emailDomain)) {
      throw new Error("generic_domain")
  }

  return emailDomain
}