"use client"

interface EditorContentProps {
  content: string
}

export function EditorContent({ content }: EditorContentProps) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      {content.split("\n").map((line, index) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="text-2xl font-bold mb-4 mt-6">
              {line.slice(2)}
            </h1>
          )
        } else if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="text-xl font-semibold mb-3 mt-5">
              {line.slice(3)}
            </h2>
          )
        } else if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="text-lg font-medium mb-2 mt-4">
              {line.slice(4)}
            </h3>
          )
        } else if (line.startsWith("- ")) {
          return (
            <li key={index} className="ml-4">
              {line.slice(2)}
            </li>
          )
        } else if (line.includes("**") && line.includes("**")) {
          const parts = line.split("**")
          return (
            <p key={index} className="mb-2">
              {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
            </p>
          )
        } else if (line.trim() === "") {
          return <br key={index} />
        } else {
          return (
            <p key={index} className="mb-2 leading-relaxed">
              {line}
            </p>
          )
        }
      })}
    </div>
  )
}