"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Copy, Check } from "lucide-react"

// Token types for syntax highlighting
type TokenType = "keyword" | "string" | "number" | "comment" | "function" | "property" | "operator" | "punctuation" | "variable" | "builtin" | "plain"

interface Token {
  type: TokenType
  content: string
}

// Simple tokenizer for common languages
function tokenize(code: string, language: string): Token[][] {
  const lines = code.split("\n")
  
  const keywords: Record<string, string[]> = {
    javascript: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "async", "await", "export", "import", "from", "class", "new", "this", "try", "catch", "throw", "typeof", "instanceof", "true", "false", "null", "undefined"],
    typescript: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "async", "await", "export", "import", "from", "class", "new", "this", "try", "catch", "throw", "typeof", "instanceof", "true", "false", "null", "undefined", "interface", "type", "enum", "as", "implements", "extends", "private", "public", "protected", "readonly"],
    bash: ["curl", "npm", "npx", "node", "git", "cd", "mkdir", "echo", "export", "source", "sudo", "chmod", "cat", "grep", "awk", "sed", "docker", "yarn", "pnpm"],
    json: ["true", "false", "null"],
  }

  const builtins: Record<string, string[]> = {
    javascript: ["console", "Promise", "Array", "Object", "String", "Number", "JSON", "Math", "Date", "Error", "process", "require", "module", "exports"],
    typescript: ["console", "Promise", "Array", "Object", "String", "Number", "JSON", "Math", "Date", "Error", "process", "require", "module", "exports", "Record", "Partial", "Required", "Pick", "Omit"],
    bash: [],
    json: [],
  }

  const lang = language.toLowerCase()
  const langKeywords = keywords[lang] || keywords.javascript || []
  const langBuiltins = builtins[lang] || []

  return lines.map(line => {
    const tokens: Token[] = []
    let remaining = line
    let i = 0

    while (i < remaining.length) {
      // Comments
      if (remaining.slice(i).startsWith("//") || remaining.slice(i).startsWith("#")) {
        tokens.push({ type: "comment", content: remaining.slice(i) })
        break
      }

      // Multi-line comment start
      if (remaining.slice(i).startsWith("/*")) {
        const endIdx = remaining.indexOf("*/", i + 2)
        if (endIdx !== -1) {
          tokens.push({ type: "comment", content: remaining.slice(i, endIdx + 2) })
          i = endIdx + 2
          continue
        }
      }

      // Strings (double quotes)
      if (remaining[i] === '"') {
        let j = i + 1
        while (j < remaining.length && remaining[j] !== '"') {
          if (remaining[j] === "\\") j++
          j++
        }
        tokens.push({ type: "string", content: remaining.slice(i, j + 1) })
        i = j + 1
        continue
      }

      // Strings (single quotes)
      if (remaining[i] === "'") {
        let j = i + 1
        while (j < remaining.length && remaining[j] !== "'") {
          if (remaining[j] === "\\") j++
          j++
        }
        tokens.push({ type: "string", content: remaining.slice(i, j + 1) })
        i = j + 1
        continue
      }

      // Template literals
      if (remaining[i] === "`") {
        let j = i + 1
        while (j < remaining.length && remaining[j] !== "`") {
          if (remaining[j] === "\\") j++
          j++
        }
        tokens.push({ type: "string", content: remaining.slice(i, j + 1) })
        i = j + 1
        continue
      }

      // Numbers
      if (/\d/.test(remaining[i])) {
        let j = i
        while (j < remaining.length && /[\d.xXa-fA-F]/.test(remaining[j])) j++
        tokens.push({ type: "number", content: remaining.slice(i, j) })
        i = j
        continue
      }

      // Words (keywords, builtins, identifiers)
      if (/[a-zA-Z_$]/.test(remaining[i])) {
        let j = i
        while (j < remaining.length && /[a-zA-Z0-9_$]/.test(remaining[j])) j++
        const word = remaining.slice(i, j)
        
        if (langKeywords.includes(word)) {
          tokens.push({ type: "keyword", content: word })
        } else if (langBuiltins.includes(word)) {
          tokens.push({ type: "builtin", content: word })
        } else if (remaining[j] === "(") {
          tokens.push({ type: "function", content: word })
        } else if (i > 0 && remaining[i - 1] === ".") {
          tokens.push({ type: "property", content: word })
        } else {
          tokens.push({ type: "variable", content: word })
        }
        i = j
        continue
      }

      // Operators
      if (/[+\-*/%=<>!&|^~?:]/.test(remaining[i])) {
        let j = i
        while (j < remaining.length && /[+\-*/%=<>!&|^~?:]/.test(remaining[j])) j++
        tokens.push({ type: "operator", content: remaining.slice(i, j) })
        i = j
        continue
      }

      // Punctuation
      if (/[{}[\](),;.]/.test(remaining[i])) {
        tokens.push({ type: "punctuation", content: remaining[i] })
        i++
        continue
      }

      // Whitespace and other
      tokens.push({ type: "plain", content: remaining[i] })
      i++
    }

    return tokens
  })
}

const tokenColors: Record<TokenType, string> = {
  keyword: "text-purple-400",
  string: "text-emerald-400",
  number: "text-amber-400",
  comment: "text-gray-500 italic",
  function: "text-cyan-400",
  property: "text-cyan-300",
  operator: "text-pink-400",
  punctuation: "text-gray-400",
  variable: "text-gray-200",
  builtin: "text-amber-300",
  plain: "text-gray-300",
}

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = "javascript", filename, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [tokens, setTokens] = useState<Token[][]>([])

  useEffect(() => {
    setTokens(tokenize(code.trim(), language))
  }, [code, language])

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const languageLabel = language.toLowerCase()
  const langColors: Record<string, string> = {
    bash: "text-emerald-400",
    javascript: "text-amber-400",
    typescript: "text-blue-400",
    json: "text-purple-400",
    shell: "text-emerald-400",
  }

  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-800/60 bg-[#0c0c0e]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/50 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
          </div>
          {filename && (
            <>
              <div className="h-4 w-px bg-gray-800" />
              <span className="text-xs text-gray-500 font-mono">{filename}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-medium uppercase tracking-wider ${langColors[languageLabel] || "text-gray-500"}`}>
            {languageLabel}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md bg-gray-800/50 border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-700/50"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-[13px] leading-relaxed font-mono">
          <code>
            {tokens.map((lineTokens, lineIdx) => (
              <div key={lineIdx} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-right text-gray-600 select-none text-xs w-8">
                    {lineIdx + 1}
                  </span>
                )}
                <span className="table-cell">
                  {lineTokens.length === 0 ? (
                    <span>&nbsp;</span>
                  ) : (
                    lineTokens.map((token, tokenIdx) => (
                      <span key={tokenIdx} className={tokenColors[token.type]}>
                        {token.content}
                      </span>
                    ))
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

// Simple inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-gray-800/70 text-cyan-400 text-[13px] font-mono border border-gray-700/50">
      {children}
    </code>
  )
}
