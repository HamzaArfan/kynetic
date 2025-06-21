export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning>
      {children}
    </div>
  )
} 