#!/usr/bin/env bash
# Ask a language model a question, for the probabilistic CI steps.
#   scripts/ask-model.sh <system-prompt-file> < question.txt > answer.md
#
# Set ONE of these as a repository secret (Repo > Settings > Secrets and variables > Actions):
#   ANTHROPIC_API_KEY   Claude, from console.anthropic.com. MODEL defaults to claude-haiku-4-5.
#   AI_API_KEY          any OpenAI-compatible API, with AI_BASE_URL and MODEL. For example Google's
#                       free tier (aistudio.google.com):
#                         AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai  MODEL=gemini-2.5-flash
set -euo pipefail

system_prompt="$(cat "$1")"
question="$(head -c 40000)" # keep each run small and cheap

if [ -n "${ANTHROPIC_API_KEY:-}" ]; then
  body="$(jq -n --arg model "${MODEL:-claude-haiku-4-5}" --arg system "$system_prompt" --arg user "$question" \
    '{model: $model, max_tokens: 2000, system: $system, messages: [{role: "user", content: $user}]}')"
  response="$(curl -sS --fail-with-body "${ANTHROPIC_BASE_URL:-https://api.anthropic.com}/v1/messages" \
    -H "x-api-key: $ANTHROPIC_API_KEY" -H "anthropic-version: 2023-06-01" -H "content-type: application/json" \
    -d "$body")" || { echo "Anthropic request failed: $response" >&2; exit 1; }
  jq -r '[.content[] | select(.type == "text") | .text] | join("")' <<<"$response"
elif [ -n "${AI_API_KEY:-}" ]; then
  : "${AI_BASE_URL:?Set AI_BASE_URL, the base URL of the API}" "${MODEL:?Set MODEL to the model name}"
  body="$(jq -n --arg model "$MODEL" --arg system "$system_prompt" --arg user "$question" \
    '{model: $model, messages: [{role: "system", content: $system}, {role: "user", content: $user}]}')"
  response="$(curl -sS --fail-with-body "${AI_BASE_URL%/}/chat/completions" \
    -H "Authorization: Bearer $AI_API_KEY" -H "Content-Type: application/json" -d "$body")" ||
    { echo "AI request failed: $response" >&2; exit 1; }
  jq -r '.choices[0].message.content' <<<"$response"
else
  echo "No model key: add an ANTHROPIC_API_KEY or AI_API_KEY secret to the repository (see scripts/ask-model.sh)." >&2
  exit 1
fi
