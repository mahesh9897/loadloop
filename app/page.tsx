import { ProtectedRoute } from "@/components/protected-route"

// Wrap the existing content with ProtectedRoute
export default function HomePage() {
  return <ProtectedRoute requireAuth={false}>{/* existing content */}</ProtectedRoute>
}
