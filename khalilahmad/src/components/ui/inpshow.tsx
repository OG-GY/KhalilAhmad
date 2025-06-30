"use client"

import { EnhancedInput } from "./en"
import { Mail, Lock, Search, User, Phone, CreditCard } from "lucide-react"
import { useState } from "react"

export default function Component() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [search, setSearch] = useState("")
  const [bio, setBio] = useState("")
  const [phone, setPhone] = useState("")
  const [cardNumber, setCardNumber] = useState("")

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">

      {/* Default Variant */}
      <section className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <EnhancedInput
            label="Email Address"
            type="email"
            leftIcon={<Mail className="h-4 w-4" />}
            showClearButton
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="We'll never share your email"
            placeholder="Enter your email"
          />

          <EnhancedInput
            label="Password"
            type="password"
            leftIcon={<Lock className="h-4 w-4" />}
            showPasswordToggle
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Must be at least 8 characters"
            placeholder="Enter your password"
          />
        </div>
      </section>

      {/* Filled Variant */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Filled Variant</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <EnhancedInput
            variant="filled"
            size="lg"
            label="Search"
            leftIcon={<Search className="h-4 w-4" />}
            showClearButton
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
          />

          <EnhancedInput
            variant="filled"
            label="Full Name"
            leftIcon={<User className="h-4 w-4" />}
            success="Looks good!"
            placeholder="Enter your full name"
          />
        </div>
      </section>

      {/* Underlined Variant */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Underlined Variant</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <EnhancedInput
            variant="underlined"
            label="Phone Number"
            type="tel"
            leftIcon={<Phone className="h-4 w-4" />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 123-4567"
          />

          <EnhancedInput
            variant="underlined"
            label="Card Number"
            leftIcon={<CreditCard className="h-4 w-4" />}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            error="Invalid card number"
            placeholder="1234 5678 9012 3456"
          />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Different Sizes</h2>
        <div className="space-y-4">
          <EnhancedInput
            size="sm"
            label="Small Input"
            leftIcon={<User className="h-3 w-3" />}
            placeholder="Small size input"
          />

          <EnhancedInput
            size="md"
            label="Medium Input"
            leftIcon={<User className="h-4 w-4" />}
            placeholder="Medium size input (default)"
          />

          <EnhancedInput
            size="lg"
            label="Large Input"
            leftIcon={<User className="h-5 w-5" />}
            placeholder="Large size input"
          />
        </div>
      </section>

      {/* Character Count */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">With Character Count</h2>
        <EnhancedInput
          label="Bio"
          maxLength={150}
          showCharacterCount
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          helperText="Tell us about yourself"
          placeholder="Write a short bio..."
        />
      </section>

      {/* States Demo */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Different States</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <EnhancedInput
            label="Success State"
            leftIcon={<Mail className="h-4 w-4" />}
            success="Email is available!"
            defaultValue="john@example.com"
          />

          <EnhancedInput
            label="Error State"
            leftIcon={<Mail className="h-4 w-4" />}
            error="This email is already taken"
            defaultValue="invalid-email"
          />

          <EnhancedInput
            label="Disabled State"
            leftIcon={<Lock className="h-4 w-4" />}
            disabled
            defaultValue="Cannot edit this field"
          />

          <EnhancedInput
            label="With Helper Text"
            leftIcon={<User className="h-4 w-4" />}
            helperText="This will be your display name"
            placeholder="Choose a username"
          />
        </div>
      </section>
    </div>
  )
}
