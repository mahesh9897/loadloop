"use client"
import { calculatePasswordStrength } from "@/lib/password-strength"
import { CheckCircle, AlertCircle } from "lucide-react"

interface PasswordStrengthMeterProps {
  password: string
  showSuggestions?: boolean
}

export function PasswordStrengthMeter({ password, showSuggestions = true }: PasswordStrengthMeterProps) {
  if (!password) return null

  const strength = calculatePasswordStrength(password)
  const strengthPercentage = (strength.score / 4) * 100

  return (
    <div className="space-y-2 mt-2">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-700">Password Strength</span>
          <span
            className={`text-xs font-medium ${
              strength.score <= 1
                ? "text-red-600"
                : strength.score === 2
                  ? "text-orange-600"
                  : strength.score === 3
                    ? "text-yellow-600"
                    : "text-green-600"
            }`}
          >
            {strength.label}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
      </div>

      {/* Strength Indicators */}
      <div className="grid grid-cols-4 gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 rounded-full transition-all duration-300 ${
              strength.score >= level ? strength.color : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-1">
        <div className="text-xs font-medium text-gray-700 mb-1">Requirements:</div>
        <div className="space-y-1">
          <RequirementItem met={password.length >= 8} text="At least 8 characters" />
          <RequirementItem met={/[A-Z]/.test(password)} text="One uppercase letter" />
          <RequirementItem met={/[a-z]/.test(password)} text="One lowercase letter" />
          <RequirementItem met={/\d/.test(password)} text="One number" />
          <RequirementItem met={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)} text="One special character" />
        </div>
      </div>

      {/* Suggestions */}
      {showSuggestions && strength.suggestions.length > 0 && strength.score < 4 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-2">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs font-medium text-blue-800 mb-1">Suggestions:</div>
              <ul className="text-xs text-blue-700 space-y-0.5">
                {strength.suggestions.map((suggestion, index) => (
                  <li key={index}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface RequirementItemProps {
  met: boolean
  text: string
}

function RequirementItem({ met, text }: RequirementItemProps) {
  return (
    <div className={`flex items-center space-x-2 text-xs ${met ? "text-green-600" : "text-gray-500"}`}>
      <CheckCircle className={`w-3 h-3 ${met ? "text-green-500" : "text-gray-300"}`} />
      <span className={met ? "line-through" : ""}>{text}</span>
    </div>
  )
}
