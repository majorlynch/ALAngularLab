import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { ChatService } from "../chat-services";
import { ChatHistory, TextPrompt } from "@models/messageBase";


@Injectable({
    providedIn: 'root'
})

export class MockChatService {

    constructor() {
    }

    getGeminiChat(chatPrompt: string,userHistory: TextPrompt[],aiHistory: TextPrompt[])
    {
              const sampleText = `# Top-Level Heading (H1)
                                  This is the main heading for the entire document or section.  Its usually the title of the page or chapter.
                                  ## Second-Level Heading (H2)
                                  This heading divides the content below the main heading into major sections.
                                  ### Third-Level Heading (H3)
                                  Used to break down the H2 sections into more specific topics.
                                  #### Fourth-Level Heading (H4)
                                  These are used for even finer divisions within an H3 section.  Use them sparingly; too many levels can make the document harder to follow.
                                  ##### Fifth-Level Heading (H5)
                                  Rarely used.  Consider revising your structure if you need this many heading levels.
                                  ###### Sixth-Level Heading (H6)
                                  Almost never used.  At this point, consider using bullet points or another formatting method instead of another heading level.
                                  ### Dry Ingredients
                                  *   Flour
                                  *   Sugar
                                  *   Baking Powder
                                  ### Wet Ingredients
                                  *   Eggs
                                  *   Milk
                                  *   Vanilla Extract
                                  `;
              return from(sampleText);
    }

      getDeepSeekChat(chatPrompt: string, chatHistory: ChatHistory[]): Observable<string> {
          const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
          return from([sampleText]);
      }
}