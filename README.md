# Stargazer

This is a simple AI chatbot which collects upcoming space launch information from: https://spaceflightnow.com/launch-schedule/

The chatbot knows about the launch data and it knwos the current date, allowing for queries like "What launches are going to happen next month?"   The model I'm using is not particularly reliable, so as with all AI chatbots, even with RAG, take any responses with a grain of salt.

Written by Scott McCusker, summer 2026, as a basic skills showcase.  It uses React, SemanticKernel, Ollama, Typescript and C#.  Built in Visual Studio 2026 Community.  If you want to test this app you'll need Ollama running on its default local IP and you'll need the right model - see unit LlamaWrapper.cs