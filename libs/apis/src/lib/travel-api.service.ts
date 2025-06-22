import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TravelQuery, TravelPlanResult } from '@ai-travel/models';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TravelApiService {

    // Import your environment file at the top:
    // import { environment } from '../../../environments/environment';
    private openAiKey = ''; // Set your OpenAI API key here or use environment.openAiKey
    //private openAiKey = ""

    constructor(private http: HttpClient) { }

    /**
     * Calls the AI Travel Planner backend to get a plan.
     * Replace the URL with your actual AI endpoint.
     */
    async getTravelPlan(query: TravelQuery): Promise<TravelPlanResult> {
        const openAiUrl = 'https://api.openai.com/v1/chat/completions';

        const body = {
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an AI Travel Planner. Respond in JSON only."
                },
                {
                    role: "user",
                    content: `
          Plan a trip:
          From: ${query.source}
          To: ${query.destination}
          Start: ${query.startDate}
          Return: ${query.returnDate}
          Adults: ${query.adults}
          Children: ${query.children}
          Budget: ${query.budget}
          Return JSON with:
          - itinerary (string)
          - totalCost (number)
          - suggestions (array of strings)
        `
                }
            ]
        };

        return firstValueFrom(
            this.http.post<any>(
                openAiUrl,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${this.openAiKey}`,
                    }
                }
            )
        ).then(res => {
            let answer = res.choices[0].message.content.trim();
            if (answer.startsWith('```')) {
                answer = answer.replace(/```json\n?/i, '').replace(/```$/, '');
            }

            return JSON.parse(answer) as TravelPlanResult;
        });
    }

}
