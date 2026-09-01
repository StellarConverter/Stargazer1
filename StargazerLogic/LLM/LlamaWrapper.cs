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

        public static async Task<string> DoIt(string prompt, List<string> chatHistory)
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

            var history = new ChatHistory("Your name is Stargazer.  You give short and precise results, unless told otherwise.  Your area of interest is real-world upcoming space launches.");
            //LOLCAT -- actually use chatHistory
            history.AddUserMessage(prompt);

            var sb = new StringBuilder();
            await foreach (var data in chat.GetStreamingChatMessageContentsAsync(
                history,
                executionSettings: exSettings,
                kernel: kernel))
            {
                sb.Append(data.Content);
            }

            return sb.ToString();
        }
    }
}