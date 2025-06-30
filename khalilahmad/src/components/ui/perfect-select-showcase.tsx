"use client"

import { PerfectSelect, type SelectOption } from "./perfect-select"
import {
  User,
  MapPin,
  Globe,
  Star,
  Briefcase,
  Heart,
  Zap,
  Shield,
  Crown,
  Check,
  AlertCircle,
  Palette,
  Code,
  Database,
  Smartphone,
  Monitor,
  Coffee,
  Music,
  Camera,
  Gamepad2,
  Book,
  Plane,
} from "lucide-react"
import { useState } from "react"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  description?: string
  group?: string
  color?: string
}

export default function PerfectSelectShowcase() {
  const [country, setCountry] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [priority, setPriority] = useState("medium")
  const [categories, setCategories] = useState<string[]>(["design", "development"])
  const [status, setStatus] = useState("")
  const [team, setTeam] = useState<string[]>([])
  const [hobbies, setHobbies] = useState<string[]>([])
  const [tools, setTools] = useState("")
  const [languages, setLanguages] = useState<string[]>([])

  const countryOptions: SelectOption[] = [
    { value: "us", label: "United States", icon: <Globe className="h-4 w-4" />, description: "North America" },
    { value: "uk", label: "United Kingdom", icon: <Globe className="h-4 w-4" />, description: "Europe" },
    { value: "ca", label: "Canada", icon: <Globe className="h-4 w-4" />, description: "North America" },
    { value: "au", label: "Australia", icon: <Globe className="h-4 w-4" />, description: "Oceania" },
    { value: "de", label: "Germany", icon: <Globe className="h-4 w-4" />, description: "Europe" },
    { value: "fr", label: "France", icon: <Globe className="h-4 w-4" />, description: "Europe" },
    { value: "jp", label: "Japan", icon: <Globe className="h-4 w-4" />, description: "Asia" },
    { value: "kr", label: "South Korea", icon: <Globe className="h-4 w-4" />, description: "Asia" },
    { value: "br", label: "Brazil", icon: <Globe className="h-4 w-4" />, description: "South America" },
    { value: "in", label: "India", icon: <Globe className="h-4 w-4" />, description: "Asia" },
  ]

  const skillOptions: SelectOption[] = [
    { value: "react", label: "React", group: "Frontend", icon: <Zap className="h-4 w-4" />, color: "blue" },
    { value: "vue", label: "Vue.js", group: "Frontend", icon: <Zap className="h-4 w-4" />, color: "green" },
    { value: "angular", label: "Angular", group: "Frontend", icon: <Zap className="h-4 w-4" />, color: "red" },
    { value: "svelte", label: "Svelte", group: "Frontend", icon: <Zap className="h-4 w-4" />, color: "orange" },
    { value: "nodejs", label: "Node.js", group: "Backend", icon: <Shield className="h-4 w-4" />, color: "green" },
    { value: "python", label: "Python", group: "Backend", icon: <Shield className="h-4 w-4" />, color: "yellow" },
    { value: "java", label: "Java", group: "Backend", icon: <Shield className="h-4 w-4" />, color: "red" },
    { value: "go", label: "Go", group: "Backend", icon: <Shield className="h-4 w-4" />, color: "blue" },
    { value: "aws", label: "AWS", group: "Cloud", icon: <Globe className="h-4 w-4" />, color: "orange" },
    { value: "azure", label: "Azure", group: "Cloud", icon: <Globe className="h-4 w-4" />, color: "blue" },
    { value: "gcp", label: "Google Cloud", group: "Cloud", icon: <Globe className="h-4 w-4" />, color: "red" },
    { value: "docker", label: "Docker", group: "DevOps", icon: <Briefcase className="h-4 w-4" />, color: "blue" },
    {
      value: "kubernetes",
      label: "Kubernetes",
      group: "DevOps",
      icon: <Briefcase className="h-4 w-4" />,
      color: "blue",
    },
    {
      value: "terraform",
      label: "Terraform",
      group: "DevOps",
      icon: <Briefcase className="h-4 w-4" />,
      color: "purple",
    },
  ]

  const priorityOptions: SelectOption[] = [
    {
      value: "low",
      label: "Low Priority",
      icon: <div className="w-2 h-2 rounded-full bg-green-500" />,
      description: "Can wait",
    },
    {
      value: "medium",
      label: "Medium Priority",
      icon: <div className="w-2 h-2 rounded-full bg-yellow-500" />,
      description: "Normal timeline",
    },
    {
      value: "high",
      label: "High Priority",
      icon: <div className="w-2 h-2 rounded-full bg-orange-500" />,
      description: "Important",
    },
    {
      value: "urgent",
      label: "Urgent",
      icon: <div className="w-2 h-2 rounded-full bg-red-500" />,
      description: "Needs immediate attention",
    },
  ]

  const categoryOptions: SelectOption[] = [
    { value: "design", label: "Design", description: "UI/UX and visual design", icon: <Palette className="h-4 w-4" /> },
    {
      value: "development",
      label: "Development",
      description: "Frontend and backend coding",
      icon: <Code className="h-4 w-4" />,
    },
    {
      value: "marketing",
      label: "Marketing",
      description: "Digital marketing and campaigns",
      icon: <Star className="h-4 w-4" />,
    },
    {
      value: "sales",
      label: "Sales",
      description: "Business development and sales",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      value: "support",
      label: "Support",
      description: "Customer service and support",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      value: "data",
      label: "Data Science",
      description: "Analytics and machine learning",
      icon: <Database className="h-4 w-4" />,
    },
  ]

  const statusOptions: SelectOption[] = [
    {
      value: "active",
      label: "Active",
      icon: <div className="w-2 h-2 rounded-full bg-green-500" />,
      description: "Currently active",
    },
    {
      value: "inactive",
      label: "Inactive",
      icon: <div className="w-2 h-2 rounded-full bg-gray-500" />,
      description: "Not currently active",
    },
    {
      value: "pending",
      label: "Pending",
      icon: <div className="w-2 h-2 rounded-full bg-yellow-500" />,
      description: "Awaiting approval",
    },
    {
      value: "suspended",
      label: "Suspended",
      icon: <div className="w-2 h-2 rounded-full bg-red-500" />,
      disabled: true,
      description: "Account suspended",
    },
  ]

  const teamOptions: SelectOption[] = [
    { value: "john", label: "John Doe", description: "Senior Developer", icon: <User className="h-4 w-4" /> },
    { value: "jane", label: "Jane Smith", description: "Product Manager", icon: <Crown className="h-4 w-4" /> },
    { value: "bob", label: "Bob Johnson", description: "UI/UX Designer", icon: <Palette className="h-4 w-4" /> },
    { value: "alice", label: "Alice Brown", description: "Marketing Lead", icon: <Star className="h-4 w-4" /> },
    { value: "charlie", label: "Charlie Wilson", description: "DevOps Engineer", icon: <Shield className="h-4 w-4" /> },
    { value: "diana", label: "Diana Lee", description: "Data Scientist", icon: <Database className="h-4 w-4" /> },
    { value: "evan", label: "Evan Taylor", description: "Mobile Developer", icon: <Smartphone className="h-4 w-4" /> },
    { value: "fiona", label: "Fiona Chen", description: "QA Engineer", icon: <Check className="h-4 w-4" /> },
  ]

  const hobbyOptions: SelectOption[] = [
    { value: "photography", label: "Photography", icon: <Camera className="h-4 w-4" />, group: "Creative" },
    { value: "music", label: "Music", icon: <Music className="h-4 w-4" />, group: "Creative" },
    { value: "gaming", label: "Gaming", icon: <Gamepad2 className="h-4 w-4" />, group: "Entertainment" },
    { value: "reading", label: "Reading", icon: <Book className="h-4 w-4" />, group: "Learning" },
    { value: "travel", label: "Travel", icon: <Plane className="h-4 w-4" />, group: "Adventure" },
    { value: "cooking", label: "Cooking", icon: <Coffee className="h-4 w-4" />, group: "Lifestyle" },
  ]

  const toolOptions: SelectOption[] = [
    { value: "vscode", label: "VS Code", icon: <Code className="h-4 w-4" />, description: "Code editor" },
    { value: "figma", label: "Figma", icon: <Palette className="h-4 w-4" />, description: "Design tool" },
    { value: "notion", label: "Notion", icon: <Book className="h-4 w-4" />, description: "Note taking" },
    { value: "slack", label: "Slack", icon: <Monitor className="h-4 w-4" />, description: "Communication" },
  ]

  const languageOptions: SelectOption[] = [
    { value: "en", label: "English", description: "Native" },
    { value: "es", label: "Spanish", description: "Fluent" },
    { value: "fr", label: "French", description: "Intermediate" },
    { value: "de", label: "German", description: "Basic" },
    { value: "ja", label: "Japanese", description: "Learning" },
    { value: "zh", label: "Chinese", description: "Basic" },
  ]

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Perfect Select Components
        </h1>
        <p className="text-lg text-muted-foreground">
          Fully functional dropdown components with advanced features and perfect accessibility
        </p>
      </div>

      {/* Basic Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Basic Examples</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PerfectSelect
            label="Country"
            leftIcon={<MapPin className="h-4 w-4" />}
            options={countryOptions}
            value={country}
            onChange={(value) => setCountry(value as string)}
            helperText="Select your country of residence"
            searchable
            placeholder="Choose a country..."
            id="country-select"
          />

          <PerfectSelect
            label="Development Tools"
            leftIcon={<Code className="h-4 w-4" />}
            options={toolOptions}
            value={tools}
            onChange={(value) => setTools(value as string)}
            placeholder="Select your primary tool..."
            success="Great choice!"
          />
        </div>
      </section>

      {/* Multi-select Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Multi-select Examples</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PerfectSelect
            label="Technical Skills"
            leftIcon={<Zap className="h-4 w-4" />}
            options={skillOptions}
            value={skills}
            onChange={(value) => setSkills(value as string[])}
            helperText="Select your technical skills (max 8)"
            multiple
            searchable
            showSelectAll
            maxSelections={8}
            placeholder="Choose your skills..."
          />

          <PerfectSelect
            label="Project Categories"
            leftIcon={<Briefcase className="h-4 w-4" />}
            options={categoryOptions}
            value={categories}
            onChange={(value) => setCategories(value as string[])}
            multiple
            searchable
            placeholder="Select categories..."
            defaultValue={["design", "development"]}
          />
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Different Variants</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <PerfectSelect
            variant="default"
            label="Priority (Default)"
            options={priorityOptions}
            value={priority}
            onChange={(value) => setPriority(value as string)}
            placeholder="Select priority..."
          />

          <PerfectSelect
            variant="filled"
            label="Languages (Filled)"
            options={languageOptions}
            value={languages}
            onChange={(value) => setLanguages(value as string[])}
            multiple
            searchable
            placeholder="Select languages..."
          />

          <PerfectSelect
            variant="underlined"
            label="Status (Underlined)"
            options={statusOptions}
            value={status}
            onChange={(value) => setStatus(value as string)}
            placeholder="Select status..."
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Different Sizes</h2>
        <div className="space-y-4">
          <PerfectSelect
            size="sm"
            label="Small Select"
            leftIcon={<User className="h-3 w-3" />}
            options={priorityOptions.slice(0, 3)}
            placeholder="Small size select"
          />

          <PerfectSelect
            size="md"
            label="Medium Select"
            leftIcon={<User className="h-4 w-4" />}
            options={priorityOptions.slice(0, 3)}
            placeholder="Medium size select (default)"
          />

          <PerfectSelect
            size="lg"
            label="Large Select"
            leftIcon={<User className="h-5 w-5" />}
            options={priorityOptions.slice(0, 3)}
            placeholder="Large size select"
          />
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Advanced Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PerfectSelect
            label="Team Members with Search"
            leftIcon={<User className="h-4 w-4" />}
            options={teamOptions}
            value={team}
            onChange={(value) => setTeam(value as string[])}
            multiple
            searchable
            showSelectAll
            maxSelections={4}
            helperText="Search and select team members (max 4)"
            placeholder="Search team members..."
          />

          <PerfectSelect
            label="Hobbies with Groups"
            leftIcon={<Heart className="h-4 w-4" />}
            options={hobbyOptions}
            value={hobbies}
            onChange={(value) => setHobbies(value as string[])}
            multiple
            searchable
            placeholder="Select your hobbies..."
            helperText="Hobbies are grouped by category"
          />
        </div>
      </section>

      {/* States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Different States</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PerfectSelect
            label="Success State"
            leftIcon={<Check className="h-4 w-4" />}
            options={priorityOptions}
            success="Selection saved successfully!"
            defaultValue="high"
            placeholder="Select priority..."
          />

          <PerfectSelect
            label="Error State"
            leftIcon={<AlertCircle className="h-4 w-4" />}
            options={statusOptions}
            error="Please select a valid status"
            placeholder="Select status..."
            required
          />

          <PerfectSelect
            label="Loading State"
            leftIcon={<Globe className="h-4 w-4" />}
            options={[]}
            isLoading
            loadingMessage="Loading countries..."
            placeholder="Loading..."
          />

          <PerfectSelect
            label="Disabled State"
            leftIcon={<Shield className="h-4 w-4" />}
            options={statusOptions}
            disabled
            placeholder="This select is disabled"
            helperText="This field cannot be modified"
          />
        </div>
      </section>

      {/* Create New Options */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Create New Options</h2>
        <PerfectSelect
          label="Custom Tags"
          leftIcon={<Star className="h-4 w-4" />}
          options={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "angular", label: "Angular" },
          ]}
          multiple
          searchable
          allowCreate
          onCreate={(value) => {
            console.log("Creating new option:", value)
            // Here you would typically add the new option to your options array
          }}
          placeholder="Type to search or create new tags..."
          helperText="You can create new tags by typing and pressing Enter"
        />
      </section>

      {/* Form Integration */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Form Integration</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            console.log("Form submitted")
          }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <PerfectSelect
              label="Required Field"
              name="required_field"
              options={priorityOptions}
              required
              placeholder="This field is required..."
              helperText="This field is required for form submission"
            />

            <PerfectSelect
              label="Optional Field"
              name="optional_field"
              options={categoryOptions}
              multiple
              placeholder="This field is optional..."
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Submit Form
          </button>
        </form>
      </section>
    </div>
  )
}
