using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.Ollama;
using System;
using System.Collections.Generic;
using System.Text;

namespace Stargazer.StargazerLogic.LLM
{
    public static class LlamaWrapper
    {
        private static Uri llamaUri
        {
            get
            {
                return new Uri("http://localhost:11434/v1");
            }
        }

        private static string modelName = "qwen2.5:7b";

        public static async IAsyncEnumerable<string> DoIt(string prompt, List<string> chatHistory)
        {
            var builder = Kernel.CreateBuilder();
            builder.AddOpenAIChatCompletion(
                modelId: LlamaWrapper.modelName,
                apiKey: "ollama",
                endpoint: LlamaWrapper.llamaUri);
            var kernel = builder.Build();

            var chat = kernel.GetRequiredService<IChatCompletionService>();
            kernel.Plugins.AddFromType<LaunchInfosPlugIn>("Launches");
            kernel.Plugins.AddFromType<GetDatePlugIn>("Date");

            var exSettings = new OllamaPromptExecutionSettings()
            {
                FunctionChoiceBehavior = FunctionChoiceBehavior.Auto(),
                Temperature = 0.2f
            };

            var history = new ChatHistory("Your name is Stargazer.  You give short and precise answers, you don't waste time with long summarizations unless that is specfically asked for.  Your area of interest is real-world upcoming space launches.");
            //LOLCAT -- actually use chatHistory
            history.AddUserMessage(prompt);

            var sb = new StringBuilder();
            await foreach (var chunk in chat.GetStreamingChatMessageContentsAsync(
                history,
                executionSettings: exSettings,
                kernel: kernel))
            {
                string? content = chunk == null ? null : chunk.Content;
                yield return content == null ? string.Empty : content;
            }
        }
    }
}