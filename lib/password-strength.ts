export interface PasswordStrength {
  score: number // 0-4
  label: string
  color: string
  suggestions: string[]
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0
  const suggestions: string[] = []

  // Length check
  if (password.length >= 8) {
    score += 1
  } else {
    suggestions.push("Use at least 8 characters")
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    suggestions.push("Add uppercase letters")
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    suggestions.push("Add lowercase letters")
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1
  } else {
    suggestions.push("Add numbers")
  }

  // Special character check
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    score += 1
  } else {
    suggestions.push("Add special characters (!@#$%^&*)")
  }

  // Bonus points for length
  if (password.length >= 12) {
    score = Math.min(score + 1, 4)
  }

  // Determine label and color based on score
  let label: string
  let color: string

  switch (score) {
    case 0:
    case 1:
      label = "Very Weak"
      color = "bg-red-500"
      break
    case 2:
      label = "Weak"
      color = "bg-orange-500"
      break
    case 3:
      label = "Good"
      color = "bg-yellow-500"
      break
    case 4:
      label = "Strong"
      color = "bg-green-500"
      break
    default:
      label = "Very Strong"
      color = "bg-green-600"
      break
  }

  return {
    score: Math.min(score, 4),
    label,
    color,
    suggestions: suggestions.slice(0, 3), // Limit to 3 suggestions
  }
}
