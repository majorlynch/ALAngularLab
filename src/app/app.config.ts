import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AppCommonModule } from './app.common.module';
import { PromptAiComponent } from './feature/prompt-ai/prompt-ai.component';
import { ChatAiComponent } from './feature/chat-ai/chat-ai.component';

const routes: Routes = [
  { path: 'chat', title: 'AI Chat', component: ChatAiComponent },
  { path: 'ai', title: 'AI Prompt', component: PromptAiComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AppCommonModule),
    provideRouter(routes)
  ],
};
