import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of, from, Observable } from 'rxjs';
import { GoogleGenAI } from '@google/genai';
import {
  aiDetail,
  ChatHistory,
  MessageDetail,
  TextPrompt,
} from '../shared/model/messageBase';
import { OpenAI } from 'openai';
import { MockChatService } from './mocks/mock-chat-service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  docs: any;
  response: any;
  //Gemini
  ai = new GoogleGenAI({
    apiKey: environment.apiKeyGemini,
  });

  openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    dangerouslyAllowBrowser: true,
    apiKey: environment.apiKeyDeepSeek,
  });

  constructor(private mockChatService: MockChatService){
  }
  async getGeminiChatPromise(
    chatPrompt: string,
    userHistory: TextPrompt[],
    aiHistory: TextPrompt[]
  ): Promise<string> {
    const chat = this.ai.chats.create({
      model: 'gemini-2.0-flash',
      history: [
        {
          role: 'user',
          parts: userHistory,
        },
        {
          role: 'model',
          parts: aiHistory,
        },
      ],
    });

    this.response = await chat.sendMessage({
      message: chatPrompt,
    });
    return this.response.text;
  }

  getGeminiChat(
    chatPrompt: string,
    userHistory: TextPrompt[],
    aiHistory: TextPrompt[],
    returnMockText?: boolean
  ): Observable<string> {
    if (!returnMockText)
    {
      return from(
        this.getGeminiChatPromise(chatPrompt, userHistory, aiHistory)
      );
    }
    else
     {
      return from(
        this.mockChatService.getGeminiChat(chatPrompt, userHistory, aiHistory)
      );
     }
  }

  formatGeminiContent(input: string): string {
    return input
      .replace(/\#\#\#\#\#\#(.*?)\n/g, '<h6>$1</h6>')
      .replace(/\#\#\#\#\#(.*?)\n/g, '<h5>$1</h5>')
      .replace(/\#\#\#\#(.*?)\n/g, '<h4>$1</h4>')
      .replace(/\#\#\#(.*?)\n/g, '<h3>$1</h3>')
      .replace(/\#\#(.*?)\n/g, '<h2>$1</h2>')
      .replace(/\#(.*?)\n/g, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>')
      .replace(/\*\*\*(.*?)\*\*\*/g, '<b><i>$1</i></b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>')
      .replace('```', '');
  }

  async getDeepseekChatPromise(chatPrompt: string, chatHistory: ChatHistory[]
  ): Promise<string> {
    chatHistory.push({ role: 'user', content: chatPrompt });
    const completion = await this.openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: chatHistory as any,
    });

    return completion.choices[0].message.content!;
  }

  getDeepseekChat(chatPrompt: string, chatHistory: ChatHistory[], returnMockText?: boolean
  ): Observable<string> {
    if (returnMockText)
      return this.mockChatService.getDeepSeekChat(chatPrompt, chatHistory)
    else
      return from(this.getDeepseekChatPromise(chatPrompt, chatHistory));
  }

  getContactData(): Observable<aiDetail[]> {
    return of([
      {
        aiName: 'Gemini',
        aiImage: 'assets/images/gemini.png',
        aiOnlineStatus: 'online',
      },
      {
        aiName: 'Deepseek',
        aiImage: 'assets/images/deepseek.png',
        aiOnlineStatus: 'online',
      },
    ]);
  }

  getMessages(): Observable<MessageDetail[]> {
    return of([]);
  }
}
